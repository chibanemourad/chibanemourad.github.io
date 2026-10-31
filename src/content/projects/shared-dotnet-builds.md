---
title: "Bringing consistency to builds across 500 .NET projects"
description: "How I built a shared .NET SDK to simplify build configuration and integrate code quality checks across 50+ repositories."
employer: "Diagnostica Stago"
role: "Technical Lead — Cross-Team Engineering"
technologies:
  ["C#", ".NET", "MSBuild", "Roslyn", "NDepend", "SDK-style Projects"]
featured: true
order: 1
---

## The challenge

When you're working with a handful of .NET projects, managing build configuration is relatively straightforward. But when your ecosystem grows to more than **50 Git repositories and around 500 C# projects**, keeping everything consistent becomes a challenge of its own.

At Diagnostica Stago, we had a large .NET codebase with shared build requirements, common dependencies, and engineering standards that needed to be applied across multiple projects.

The problem wasn't just maintaining build files. It was making sure teams could evolve their applications without having to repeatedly deal with the same configuration details.

I wanted to make that easier.

## What I built

As part of my cross-team technical lead responsibilities, I designed and developed **Stago.NET.Sdk**, a custom SDK built on top of MSBuild and the .NET SDK-style project system.

The idea was simple: **define common build conventions once and make them reusable everywhere.**

Instead of maintaining the same configuration across individual project files, the SDK provided a central place for shared build resources, including:

- **MSBuild `.props` and `.targets`** to standardize build configuration and behavior.
- **Shared rulesets** to establish consistent code analysis standards.
- **Versioning resources** to keep common version-related configuration together.
- **Reusable build conventions** to reduce duplication and simplify project maintenance.

This helped turn build configuration into a shared engineering foundation rather than something each project had to manage independently.

It also made project files easier to understand and created a cleaner starting point for future framework and component upgrades.

## Making code quality part of the workflow

Standardizing builds was only part of the work.

I also integrated **Roslyn analyzers and NDepend** into the automated build process.

My goal was to make code quality checks a natural part of everyday development, rather than something developers had to remember to run separately.

By automating these tools, we could apply common analysis rules more consistently across projects and make quality feedback available through the existing build workflow.

For me, this was an important principle: engineering standards are much more useful when they're supported by tooling, not just written in documentation.

## Why it mattered

The value of Stago.NET.Sdk wasn't in adding another layer of tooling. It was in **removing repetitive configuration work and giving teams a common foundation to build on**.

The work brought several practical improvements to the engineering environment:

- A shared SDK for common .NET build configuration.
- Simpler project files with less duplicated configuration.
- Centralized resources that could be maintained consistently.
- Automated static analysis integrated into the build.
- A more maintainable foundation for future framework and dependency updates.

The scale was significant: more than 50 repositories and approximately 500 C# projects were part of the ecosystem this initiative was designed to support.

## What I took away

This project reinforced something I strongly believe about software engineering: **good developer tooling should make the right practices easier to follow**.

A well-designed build system doesn't need to be visible in everyday development. It should provide sensible defaults, enforce shared conventions, and let engineers focus on delivering software.

Building Stago.NET.Sdk was an opportunity to work on that kind of infrastructure — solving a recurring engineering problem once, at the ecosystem level, instead of repeatedly solving it project by project.
