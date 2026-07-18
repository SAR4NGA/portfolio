export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce application with user authentication, product catalog, cart, checkout flow, and admin dashboard. Features server-side rendering and optimized performance.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    github: 'https://github.com/yourusername/ecommerce',
    demo: 'https://ecommerce-demo.vercel.app',
  },
  {
    title: 'Task Management API',
    description:
      'RESTful API for task management with real-time updates via WebSockets. Includes role-based access control, file uploads, and comprehensive test coverage.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.io', 'Docker'],
    github: 'https://github.com/yourusername/task-api',
  },
  {
    title: 'Weather Dashboard',
    description:
      'Beautiful weather dashboard with location search, 7-day forecast, interactive charts, and dynamic backgrounds based on weather conditions.',
    tech: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    github: 'https://github.com/yourusername/weather',
    demo: 'https://weather-dash.netlify.app',
  },
  {
    title: 'Developer Blog Starter',
    description:
      'A minimal, performant blog starter with MDX support, syntax highlighting, RSS feed, and SEO optimization. Perfect for technical writing.',
    tech: ['Astro', 'MDX', 'Tailwind CSS', 'RSS'],
    github: 'https://github.com/yourusername/dev-blog',
  },
]
