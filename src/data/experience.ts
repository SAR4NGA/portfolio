export interface Experience {
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Software Engineering Intern',
    company: 'TechCorp Inc.',
    period: 'Jun 2025 — Present',
    description:
      'Working on the core platform team, building and maintaining full-stack features for the company’s SaaS product.',
    highlights: [
      'Developed React components used by 50K+ users',
      'Improved API response times by 35% through query optimization',
      'Implemented comprehensive test suite with Jest and Playwright',
    ],
  },
  {
    role: 'Junior Developer',
    company: 'StartupXYZ',
    period: 'Jan 2025 — May 2025',
    description:
      'Contributed to building the MVP of an AI-powered content generation tool as part of a small engineering team.',
    highlights: [
      'Built REST APIs with Node.js and Express',
      'Designed PostgreSQL schema and wrote complex queries',
      'Integrated OpenAI API for content generation features',
    ],
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    period: 'Sep 2024 — Dec 2024',
    description:
      'Built custom websites and web applications for small businesses and startups.',
    highlights: [
      'Delivered 5+ client projects on time and on budget',
      'Worked with diverse tech stacks including React, Next.js, and Vue',
      'Managed client communication and requirements gathering',
    ],
  },
]
