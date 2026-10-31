export interface Experience {
  employer: string;
  role: string;
  period: string;
  summary?: string;
}
export const profile = {
  name: "Mourad Chibane",
  location: "Paris, France",
  title:
    "Cross-Functional Technical Lead | Software Architecture & Engineering Excellence",
  description:
    "Technical Lead and software engineer based in Paris, specializing in .NET architecture, modular applications, engineering standards, and developer productivity. Experienced in building software for medical devices, designing reusable technical foundations, and improving quality across large multi-repository codebases. Also experienced in React/Python product development and distributed messaging systems.",
  resume: "https://cvdesignr.com/p/5fe1cfcb33f89",
  github: "https://github.com/chibanemourad",
  linkedin: "https://www.linkedin.com/in/mouradchibane/",
  experience: [
    {
      employer: "Diagnostica Stago",
      role: "Cross-Functional Technical Lead",
      period: "March 2025–present",
      summary:
        "Cross-functional technical leadership focused on software architecture, engineering consistency, and shared technical practices.",
    },
    {
      employer: "CO2 AI",
      role: "Senior Software Engineer",
      period: "July–December 2024",
      summary:
        "Developed Targets and Strategic Levers capabilities within the Measure team, supporting carbon-footprint reduction tracking and tailored emissions-reduction recommendations. Established clean-code standards, reorganized the repository to improve maintainability, and mentored junior engineers. Stack: React, Python, PostgreSQL, RabbitMQ, Docker.",
    },
    {
      employer: "Diagnostica Stago",
      role: "Technical Lead — Point-of-Care Applications",
      period: "January 2021–June 2024",
      summary:
        "Led architecture, design, and greenfield development of a WPF application for a point-of-care medical device. Designed a modular architecture with Prism and SOLID principles; incorporated architectural decision records, Roslyn analyzers, NDepend, and CI/CD quality controls. Stack: .NET 7, C# 11, EF Core, SQLite, WPF, MSBuild, Serilog.",
    },
    {
      employer: "Diagnostica Stago",
      role: "Technical Lead — Cross-Team Engineering Initiatives",
      period: "Assignment began September 2018",
      summary:
        "Designed Stago.NET.Sdk, a shared SDK-style build system that centralized MSBuild configuration and automated Roslyn/NDepend quality checks across 50+ Git repositories and approximately 500 C# projects. Developed RabbitMQ publishing, consumption, and file-dispatch components for instrument-data collection, including handling of sensitive data. Contributed to Hadoop-based data-lake architecture and proposed Lambda-inspired data ingestion and processing patterns.",
    },
    {
      employer: "Diagnostica Stago",
      role: "Technical Lead — Mobile Point-of-Care",
      period: "June 2016–September 2018",
      summary:
        "Architected and developed a Xamarin.Android application for a point-of-care medical device from the ground up. Built reusable application components and a measurement-core simulator to support manual testing. Strengthened engineering quality through pull-request reviews, SOLID practices, and NDepend rules integrated into continuous builds. Stack: Xamarin.Android, .NET Standard, SQLite, EF Core, NUnit, TeamCity.",
    },
    {
      employer: "Diagnostica Stago",
      role: "C# Software Engineer — Point-of-Care Clinical Systems",
      period: "September 2015–December 2017",
      summary:
        "Designed and developed software for a point-of-care clinical-study instrument, including device control, patient-result calculations, and result presentation. Extracted a shared technical framework and reusable calculation engine for use across applications with different clinical workflows. Stack: C#, .NET Framework, WPF, NHibernate, PostgreSQL, TeamCity.",
    },
    {
      employer: "Diagnostica Stago",
      role: "C# Software Engineer — Instrument Console",
      period: "October 2013–August 2015",
      summary:
        "Implemented and tested instrument-console features, resolved defects, and designed algorithms for calculating patient-analysis results. Stack: C#, .NET Framework, WPF, MVVM, LINQ, NHibernate, PostgreSQL.",
    },
    {
      employer: "Diagnostica Stago",
      role: "Software Engineering Intern — 3D Instrument Visualization",
      period: "February–October 2013",
      summary:
        "Built 3D visualizations of laboratory instruments and operational data to improve usability and support routine workflows, including consumable handling and inventory visibility. Applied MVVM with C#, WPF, and Helix Toolkit.",
    },
  ] satisfies Experience[],
  expertise: [
    {
      title: "Software Architecture & .NET Engineering",
      text: "C#, .NET, WPF, Prism, MVVM, SOLID, modular application design, reusable frameworks, EF Core, and architectural decision records (ADRs).",
    },
    {
      title: "Engineering Excellence & Developer Productivity",
      text: "SDK-style projects, MSBuild, shared build tooling, multi-repository standardization, CI/CD, Roslyn analyzers, NDepend, NUnit, code review, GitHub, and TeamCity.",
    },
    {
      title: "Messaging, Data & Distributed Systems",
      text: "RabbitMQ, asynchronous messaging, instrument-data ingestion, PostgreSQL, SQLite, SQL Server, Hadoop ecosystem, and Lambda-inspired data-processing architecture.",
    },
    {
      title: "Product Engineering & Technical Leadership",
      text: "React, Python, Docker, Xamarin.Android, greenfield product development, technical mentoring, cross-team collaboration, Scrum, and Kanban.",
    },
  ],
  education: [
    "Master's Degree (Master 2) in Computer Science — Complex and Distributed Systems, University of Le Havre, France (2010–2012).",
    "Engineering Degree in Computer Science — Information Systems and Web Technologies, Frères Mentouri University, Constantine, Algeria (2005–2010).",
  ],
  languages: [
    "French — bilingual",
    "English — professional working proficiency",
    "Arabic — native",
  ],
} as const;
