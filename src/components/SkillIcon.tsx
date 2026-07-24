import type { FC } from 'react'
import {
  _React as ReactIcon,
  TypescriptIcon,
  Javascript,
  NextjsIcon,
  TailwindIcon,
  Vite,
  Html5,
  Css3Icon,
  NodejsIcon,
  Express,
  Python,
  GitIcon,
  GithubIcon,
  DockerIcon,
  Cloudflare,
  Cursor,
  LinuxTux,
  Figma,
  Selenium,
  Playwright,
  Flutter,
  Firebase,
  Sqlite,
  CSharp,
  Kotlin,
  Dart,
  Swift,
  CPlusplus,
  Dotnet,
} from '@dev.icons/react'
import { Server, Database } from 'lucide-react'

interface IconSVGProps {
  size?: string | number
  className?: string
}

function RenderIcon({ size = 20, className }: IconSVGProps) {
  const numSize = typeof size === 'number' ? size : 20
  return (
    <svg width={numSize} height={numSize} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="render-grad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E599" />
          <stop offset="1" stopColor="#00A86B" />
        </linearGradient>
      </defs>
      <path d="M4 4h10.5C17.54 4 20 6.46 20 9.5c0 2.2-1.3 4.1-3.2 5l3.7 5.5H16l-3.3-5H9.5V20H4V4zm5.5 3.5v3.5h5c1 0 1.8-.8 1.8-1.8s-.8-1.7-1.8-1.7h-5z" fill="url(#render-grad)" />
    </svg>
  )
}

function AntigravityIcon({ size = 20, className }: IconSVGProps) {
  const numSize = typeof size === 'number' ? size : 20
  return (
    <svg width={numSize} height={numSize} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="ag-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="0.5" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path d="M12 2L3 18h5l4-8 4 8h5L12 2z" fill="url(#ag-grad)" />
      <circle cx="12" cy="17" r="2.5" fill="#38BDF8" />
      <path d="M6 21c3.5 1.5 8.5 1.5 12 0" stroke="url(#ag-grad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function OpenCodeIcon({ size = 20, className }: IconSVGProps) {
  const numSize = typeof size === 'number' ? size : 20
  return (
    <svg width={numSize} height={numSize} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="opencode-grad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect x="2" y="3" width="20" height="18" rx="4" fill="url(#opencode-grad)" />
      <path d="M7 9l4 3-4 3M13 15h4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const iconMap: Record<string, FC<IconSVGProps>> = {
  react: ReactIcon,
  typescript: TypescriptIcon,
  javascript: Javascript,
  nextjs: NextjsIcon,
  flutter: Flutter,
  kotlin: Kotlin,
  dart: Dart,
  swift: Swift,
  tailwind: TailwindIcon,
  vite: Vite,
  'html-5': Html5,
  css: Css3Icon,
  nodejs: NodejsIcon,
  express: Express,
  python: Python,
  csharp: CSharp,
  dotnet: Dotnet,
  cplusplus: CPlusplus,
  tsql: Database,
  firebase: Firebase,
  sqlite: Sqlite,
  git: GitIcon,
  github: GithubIcon,
  docker: DockerIcon,
  cloudflare: Cloudflare,
  cursor: Cursor,
  opencode: OpenCodeIcon,
  antigravity: AntigravityIcon,
  render: RenderIcon,
  selenium: Selenium,
  playwright: Playwright,
  'linux-tux': LinuxTux,
  figma: Figma,
  api: Server,
}



interface SkillIconProps {
  name: string
  size?: number
  className?: string
}

export default function SkillIcon({ name, size = 20, className }: SkillIconProps) {
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon size={size} className={className} />
}


