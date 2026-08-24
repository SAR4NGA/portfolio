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
    github: "https://github.com/SAR4NGA/Network_Monitor",
    image: "/projects/2fb89045893a3e1805acf219de3bc43e.jpg"
  },
  {
    title: "LiteReader",
    description: "lightweight Android .docx reader app that renders documents with high fidelity (tables, images, formatting)",
    tech: [
      "HTML",
      "Kotlin"
    ],
    github: "https://github.com/SAR4NGA/liteReader",
    image: "/projects/318f4bbaeec605914fa88e401f8229fe.jpg"
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
    github: "https://github.com/SAR4NGA/ADBMS_project",
    image: "/projects/563ab0af7bfb3b5fd470045f980a1b2d.jpg"
  },
  {
    title: "SAR4NGA.Github.Io",
    description: "Pasindu Saranga's personal GitHub Pages site and portfolio.",
    tech: [],
    github: "https://github.com/SAR4NGA/SAR4NGA.github.io",
    image: "/projects/5a7da154c5c3985cce7da3eb04b106a4.jpg"
  },
  {
    title: "DeepSeekV4Pro Token Optimizer",
    description: "Token optimizer for DeepSeek v4 Pro — predicts relevant files, compresses prompts, and tracks token budget. Use when optimizing large context windows or reducing token consumption.",
    tech: [
      "TypeScript"
    ],
    github: "https://github.com/SAR4NGA/DeepSeekV4Pro-token-optimizer",
    image: "/projects/8204f5dc904bce4f94a45a6e047ff8eb.jpg"
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
    github: "https://github.com/SAR4NGA/busapp",
    image: "/projects/bc37987a5ee6567ded80105f5b84ee21.jpg"
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
    github: "https://github.com/SAR4NGA/liteCordChat",
    image: "/projects/c09329a9973c6fd515cdc7c5f25b606a.jpg"
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
    github: "https://github.com/SAR4NGA/inflex_mobile",
    image: "/projects/d98275d36ad63a9f68e841df1db2d3e4.jpg"
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
    github: "https://github.com/SAR4NGA/financialTracker",
    image: "/projects/e4e21e2e4b31e3887135d69bf572bab7.jpg"
  }
]
