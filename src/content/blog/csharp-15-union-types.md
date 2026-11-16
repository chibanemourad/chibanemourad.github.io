---
title: "C# 15 union types: stop making callers guess the state"
description: "Replace contradictory flags with explicit job states, then explore how C# 15 unions work behind the scenes."
date: 2026-11-15
draft: false
---

A background job has finished, but `IsRunning` is still true. There is an output path—and an error message. Which property should the UI believe?

Here is a model that allows exactly that situation:

```csharp
public sealed class Job
{
    public bool IsRunning { get; init; }
    public bool IsCompleted { get; init; }
    public string? OutputPath { get; init; }
    public string? Error { get; init; }
}

var job = new Job
{
    IsRunning = true,
    IsCompleted = true,
    OutputPath = "report.csv",
    Error = "Connection lost"
};
```

Nothing here tells us which property takes precedence. Perhaps the job produced a partial file before failing. Perhaps one flag is stale. The caller has to guess, or find a convention documented somewhere else.

C# 15 unions let us describe the alternatives directly. For this example, the job is queued, running, completed, or failed. Each state comes with its own data.

## Give each state its own shape

Start with four small records:

```csharp
public sealed record Queued;
public sealed record Running(int ProgressPercent);
public sealed record Completed(string OutputPath);
public sealed record Failed(string Reason);

public union JobState(Queued, Running, Completed, Failed);
```

`Running` carries progress. `Completed` carries the output path. `Failed` carries the reason. `Queued` needs no extra data.

The union groups those existing types into a named set of alternatives. They do not need to inherit from a common base class or implement a marker interface.

A value can be created directly from a case:

```csharp
JobState state = new Running(40);
state = new Completed("report.csv");
```

The compiler supplies an implicit union conversion. We will look at what that conversion calls later.

The important difference from the flags is already visible: this value cannot contain both a `Running` and a `Completed` case at once. Choosing a case also chooses the data available to its consumer. There is no separate error field hanging around beside a successful result.

This is the use case described by the [Microsoft Learn union reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/union): a value drawn from a fixed set of case types, with conversions and pattern matching supported by the language.

## Let the caller handle the alternatives

Suppose we need a status label. We can write it without depending on a UI framework:

```csharp
static string Describe(JobState state) => state switch
{
    Queued => "Waiting to start",
    Running running => $"Running: {running.ProgressPercent}%",
    Completed completed => $"Saved to {completed.OutputPath}",
    Failed failed => $"Failed: {failed.Reason}",
    null => throw new InvalidOperationException("Uninitialized job state.")
};
```

Each arm gets a value with the right properties. In the completed arm, there is an output path. In the failed arm, there is a reason. We no longer test several flags before deciding which fields are safe to read.

The `null` arm deserves an explanation: the generated union is a struct, and its default value has empty contents. We reject that empty state here. It is different from `Queued`, which is an intentional domain state. The final section explains this distinction in more detail.

This model still has boundaries. A `Running(150)` value is possible; the union does not validate percentages. A `Completed` record does not prove that the file exists. Those are separate validation decisions.

We are also modeling a **snapshot**, not building a state machine. The union does not prevent a caller from replacing a completed state with a running state. Transition rules, synchronization, and scheduling belong in the code that owns the job lifecycle.

## What happens when a new state arrives?

Now suppose users can cancel a job. Add a case:

```csharp
public sealed record Cancelled;

public union JobState(Queued, Running, Completed, Failed, Cancelled);
```

The existing `Describe` switch no longer covers every declared case type. The compiler reports a non-exhaustive switch-expression warning, pointing us toward the missing decision.

We can resolve it explicitly:

```csharp
Cancelled => "Cancelled by the user",
```

That feedback is particularly useful when several consumers interpret the same state: a status label, a notification, and a log message may each need a different response to cancellation.

A fallback such as `_ => "Unknown"` would accept the new case silently. An explicit `null` arm handles empty contents without swallowing future case types.

The diagnostic is a warning by default; treating warnings as errors is a project choice. This coverage behavior applies to switch expressions—do not assume that every branching construct provides the same checks. See the [reference on union exhaustiveness](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/union#union-exhaustiveness).

## Try the complete example

This program uses the original four-state model. It needs the .NET 11 SDK and a console project targeting `net11.0`. C# 15 is the default for that target; these unions do not require preview language settings. [C# 15 setup](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15)

<details class="complete-example">
<summary>Complete runnable example</summary>

```csharp
using System;

JobState[] states =
[
    new Queued(),
    new Running(40),
    new Completed("report.csv"),
    new Failed("Connection lost")
];

foreach (JobState state in states)
    Console.WriteLine(Describe(state));

static string Describe(JobState state) => state switch
{
    Queued => "Waiting to start",
    Running running => $"Running: {running.ProgressPercent}%",
    Completed completed => $"Saved to {completed.OutputPath}",
    Failed failed => $"Failed: {failed.Reason}",
    null => throw new InvalidOperationException("Uninitialized job state.")
};

public sealed record Queued;
public sealed record Running(int ProgressPercent);
public sealed record Completed(string OutputPath);
public sealed record Failed(string Reason);
public union JobState(Queued, Running, Completed, Failed);
```

</details>

The output is:

```text
Waiting to start
Running: 40%
Saved to report.csv
Failed: Connection lost
```

To try the evolution exercise, add `Cancelled` to the complete program and its union declaration, leaving `Describe` unchanged. Build it to see the missing-case warning, then add the new arm.

An enum could also name these states, but it would not associate a different payload with each one. An interface is useful when cases share behavior; a union makes the closed list of alternatives explicit. Neither approach replaces the other everywhere. For this status-label example, it is the alternatives and their data that we want callers to see.

## The magic behind the scenes

There are two related ideas in the official [C# language repository's unions specification](https://github.com/dotnet/csharplang/blob/main/proposals/csharp-15.0/unions.md): a _union declaration_ is the shorthand we wrote, while a _union type_ is a type recognized by the compiler's union rules.

### The declaration creates a wrapper

Our declaration generates a struct with a single object-reference field. Its storage and creation members conceptually resemble this:

```csharp
// Conceptual expansion, not exact generated source.
using System.Runtime.CompilerServices;

[Union]
public struct JobState : IUnion
{
    private readonly object? _value;

    public JobState(Queued value) => _value = value;
    public JobState(Running value) => _value = value;
    public JobState(Completed value) => _value = value;
    public JobState(Failed value) => _value = value;

    public object? Value => _value;
}
```

`UnionAttribute` identifies the type as a union. In this basic pattern, the single-parameter constructors establish its case types, and `Value` exposes the contents. The generated declaration implements `IUnion`; the runtime support types are included in .NET 11.

All four cases here are reference-type records. The wrapper stores a reference to the case object, and constructing those records still allocates. If we instead used a value-type case, such as a record struct, the generated union would box that value on entry. A struct wrapper is not a promise of allocation-free storage.

### Construction and matching work together

This assignment:

```csharp
JobState state = new Running(40);
```

conceptually invokes `new JobState(new Running(40))`. An implicit union conversion calls a creation member. It does not require a generated implicit conversion operator for every case.

When the switch encounters `Running running`, it tests the wrapper's contents and gives us the matching `Running` value. The known case types let the compiler analyze whether the arms cover the alternatives. This explains the behavior; it is not a claim about the exact emitted instructions.

Pattern shape matters, too. A typed pattern tests contents, while `var` captures the wrapper. An untyped property pattern examines the wrapper's members. For everyday case handling, typed patterns make the intended operation clear.

### Default is not a domain state

Like every struct, `JobState` has a default value:

```csharp
JobState empty = default;
Console.WriteLine(empty.Value is null); // True
```

Default-initialized fields and array elements can therefore contain an empty wrapper. A `null` pattern on this union checks its contents, which is why `Describe` includes a null arm.

Even when every declared case is nonnullable, nullability analysis does not guarantee that default contents cannot reach a switch. Covering every case type is not the same as covering an empty wrapper. Handle that possibility at boundaries where default values can enter your code.

This is also why the model should not be described as making _all_ invalid states impossible. It removes the contradictory flag combinations from our original design. Case validation and empty contents remain concerns we must address deliberately.

<details>
<summary>Further detail: custom storage and overlapping cases</summary>

A custom union type can opt into union behavior through the documented attribute and member patterns, choosing storage other than the generated object-reference field. Optional `HasValue` and `TryGetValue` members allow strongly typed access for matching. Actual boxing behavior depends on that implementation.

Case types can overlap—for example, a base class and a derived class. A type union does not generally preserve a separate tag recording which creation member was used. Our sealed, unrelated records avoid that ambiguity and give each domain alternative its own identity.

</details>

The change to our job model is small, but its effect is concrete: callers handle a running job, a successful job, or a failed job directly. They no longer have to reconstruct the answer from a collection of flags.
