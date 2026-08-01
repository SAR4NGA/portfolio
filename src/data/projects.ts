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
    title: "Inflex Mobile",
    description: "",
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
    title: "Network Monitor",
    description: "A lightweight, unobtrusive desktop network monitoring application for Windows. It provides a transparent, click-through widget to track your upload and download speeds in real-time, coupled with a background Windows service that continually logs data usage.",
    tech: [
      "Python",
      "VBScript"
    ],
    github: "https://github.com/SAR4NGA/Network_Monitor"
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
    title: "DeepSeekV4Pro Token Optimizer",
    description: "Token optimizer for DeepSeek v4 Pro — predicts relevant files, compresses prompts, and tracks token budget. Use when optimizing large context windows or reducing token consumption.",
    tech: [
      "TypeScript"
    ],
    github: "https://github.com/SAR4NGA/DeepSeekV4Pro-token-optimizer"
  },
  {
    title: "ADBMS Project",
    description: "",
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
    title: "LiteCordChat",
    description: "liteCordChat is a high-performance, low-bandwidth voice coordination engine designed for users with limited data quotas and low-end hardware. It provides a \"zero-friction, zero-trace\" experience by eliminating mandatory accounts and social media bloat, focusing strictly on real-time team communication. ",
    tech: [
      "TypeScript",
      "Python",
      "CSS",
      "HTML"
    ],
    github: "https://github.com/SAR4NGA/liteCordChat"
  },
  {
    title: "Busapp",
    description: "",
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
  }
]
