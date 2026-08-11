export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo?: string
  image?: string
}

export const projects: Project[] = [
  {
    title: "Network Monitor",
    description: "A lightweight, unobtrusive desktop network monitoring application for Windows. It provides a transparent, click-through widget to track your upload and download speeds in real-time, coupled with a background Windows service that continually logs data usage.",
    tech: [
      "Python",
      "VBScript"
    ],
    github: "https://github.com/SAR4NGA/Network_Monitor"
  },
  {
    title: "DeepSeekV4Pro Token Optimizer",
    description: "Token optimizer for DeepSeek v4 Pro — predicts relevant files, compresses prompts, and tracks token budget. Use when optimizing large context windows or reducing token consumption.",
    tech: [
      "TypeScript"
    ],
    github: "https://github.com/SAR4NGA/DeepSeekV4Pro-token-optimizer"
  },
  {
    title: "SAR4NGA.Github.Io",
    description: "Pasindu Saranga's personal GitHub Pages site and portfolio.",
    tech: [],
    github: "https://github.com/SAR4NGA/SAR4NGA.github.io"
  },
  {
    title: "LiteReader",
    description: "lightweight Android .docx reader app that renders documents with high fidelity (tables, images, formatting)",
    tech: [
      "HTML",
      "Kotlin"
    ],
    github: "https://github.com/SAR4NGA/liteReader"
  },
  {
    title: "ADBMS Project",
    description: "An advanced Budget & Expense Management System with a modern React dashboard and a REST API backed by Microsoft SQL Server. Vaultix helps organizations track expenses, enforce budgets, manage suppliers, run approval workflows, and surface business intelligence with forecasting and anomaly detection.",
    tech: [
      "JavaScript",
      "TSQL",
      "CSS",
      "HTML",
      "Dockerfile"
    ],
    github: "https://github.com/SAR4NGA/ADBMS_project"
  },
  {
    title: "Inflex Mobile",
    description: "A cross-platform Flutter mobile application with native integrations, designed for flexible and scalable mobile experiences across iOS and Android. Utilizes platform channels for native functionality and efficient resource management.",
    tech: [
      "Dart",
      "C++",
      "CMake",
      "Swift",
      "C",
      "HTML",
      "Kotlin",
      "Objective-C"
    ],
    github: "https://github.com/SAR4NGA/inflex_mobile"
  },
  {
    title: "Busapp",
    description: "A Flutter-based mobile app for real-time bus tracking, route planning, and public transit information. Designed to help commuters find nearby bus stops, track bus locations, and plan their journeys efficiently.",
    tech: [
      "Dart",
      "HTML",
      "Swift",
      "Kotlin",
      "Objective-C"
    ],
    github: "https://github.com/SAR4NGA/busapp"
  },
  {
    title: "FinancialTracker",
    description: "A simple financial tracking web application built using ASP.NET Core Razor Pages. This project is build to help me to track my expences and incomes.It can track,categorize and summerize my main expenses and incomes. Then Thought it'll be helpful to others too.",
    tech: [
      "C#",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    github: "https://github.com/SAR4NGA/financialTracker"
  },
  {
    title: "LiteCordChat",
    description: "liteCordChat is a high-performance, low-bandwidth voice coordination engine designed for users with limited data quotas and low-end hardware. It provides a \"zero-friction, zero-trace\" experience by eliminating mandatory accounts and social media bloat, focusing strictly on real-time team communication. ",
    tech: [
      "TypeScript",
      "Python",
      "CSS",
      "HTML"
    ],
    github: "https://github.com/SAR4NGA/liteCordChat"
  }
]
