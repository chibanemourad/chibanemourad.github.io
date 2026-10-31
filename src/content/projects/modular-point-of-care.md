---
title: "Building a modular foundation for point-of-care software"
description: "How I designed and built the foundations of a WPF application from scratch, with modular architecture, clear engineering principles, and long-term maintainability in mind."
employer: "Diagnostica Stago"
role: "Technical Lead — Point of Care (2021–2024)"
technologies:
  [
    "C#",
    ".NET",
    "WPF",
    "Prism",
    "EF Core",
    "SQLite",
    "Serilog",
    "Roslyn",
    "NDepend",
    "CI/CD",
  ]
featured: true
order: 2
---

## The challenge

Starting a new application from scratch is an exciting opportunity, but it also comes with a lot of responsibility.

Every early architectural decision has the potential to shape how the software evolves, how easily new features can be introduced, and how comfortable developers will be working with the codebase years later.

At Diagnostica Stago, I worked on a new WPF application for a point-of-care medical device. The goal was to establish a solid technical foundation that could support a modular application while keeping the codebase understandable, maintainable, and ready to evolve.

For me, the challenge wasn't simply to get the application working. It was to **build something that other developers could confidently extend and maintain over time**.

## Designing the architecture

As Technical Lead, I was involved throughout the application lifecycle, from technical analysis and architectural design to hands-on development.

I chose **Prism** as the foundation for the application's modular architecture, providing a structured approach to organizing features and managing dependencies.

Rather than building a tightly coupled application where every component knows too much about the others, I focused on establishing clear boundaries and responsibilities.

**SOLID principles** played an important role in guiding those decisions, particularly when it came to:

- **Separation of concerns:** Keeping presentation logic, business responsibilities, and data access appropriately separated.
- **Modularity:** Organizing the application into components with clearly defined responsibilities.
- **Dependency management:** Reducing unnecessary coupling and making components easier to evolve independently.
- **Extensibility:** Designing foundations that could accommodate new features without requiring changes throughout the entire application.

The intention was to create an architecture that remained practical for everyday development, rather than introducing complexity for its own sake.

## Building the technical foundations

Architecture only becomes valuable when it translates into code that developers can actually work with.

Alongside the architectural design, I contributed directly to the application's implementation using **C#, .NET, WPF, and Prism**.

The technical stack also included **Entity Framework Core and SQLite** for data persistence, along with **Serilog** for application logging.

An important part of my work was ensuring that these technologies fit together within a coherent application structure.

I wanted the foundations to be predictable: developers should be able to understand where functionality belongs, how components interact, and how to introduce changes without unnecessarily affecting unrelated parts of the application.

## Making quality part of the development process

I believe software architecture and engineering quality go hand in hand.

A clean architecture is difficult to maintain if the development process doesn't help teams preserve it.

That's why I also worked on integrating engineering practices and tools that supported the application's long-term maintainability.

This included:

- **Roslyn analyzers** to automate code analysis and encourage consistent coding practices.
- **NDepend** to provide deeper insight into code structure and maintainability.
- **Continuous integration and delivery** to support repeatable build and validation workflows.
- **Architectural Decision Records (ADRs)** to document important technical choices and the reasoning behind them.

ADRs were particularly valuable to me.

Technical decisions often make perfect sense when they're made, but their original context can easily disappear as a project evolves.

Documenting not only _what_ we decided, but also _why_, helped make those decisions easier to understand and revisit.

The objective wasn't to introduce process for the sake of process. It was to make good engineering practices easier to follow as part of normal development.

## Why it mattered

Over the course of this assignment, I helped establish and develop a modular WPF application with a structured architecture and a consistent set of engineering practices.

The main outcomes were:

- A modular application foundation built with WPF and Prism.
- Clearer separation of responsibilities guided by SOLID principles.
- An integrated persistence and logging stack.
- Automated code-quality tooling as part of the engineering workflow.
- Documented architectural decisions to support future technical discussions and evolution.

Together, these elements provided a foundation for developing the application while keeping maintainability and architectural consistency central to the work.

## What I took away

This project reinforced an important lesson from my experience as a Technical Lead: **good architecture isn't about choosing the most sophisticated design. It's about making future changes easier to reason about.**

When you're building software from scratch, it's tempting to anticipate every possible requirement and design for every scenario.

But I've learned that the most useful architectural decisions are often the ones that establish clear boundaries, keep complexity under control, and leave room for the software to evolve.

For me, this project was as much about establishing those engineering habits as it was about building the application itself.
