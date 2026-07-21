import type { FC } from 'react'
import {
  _React as ReactIcon,
  TypescriptIcon,
  NextjsIcon,
  TailwindIcon,
  Vite,
  Html5,
  Css3Icon,
  NodejsIcon,
  Express,
  Python,
  Postgresql,
  MongodbIcon,
  GitIcon,
  DockerIcon,
  LinuxTux,
  Figma,
} from '@dev.icons/react'
import { Server } from 'lucide-react'

interface IconSVGProps {
  size?: string | number
  className?: string
}

const iconMap: Record<string, FC<IconSVGProps>> = {
  react: ReactIcon,
  typescript: TypescriptIcon,
  nextjs: NextjsIcon,
  tailwind: TailwindIcon,
  vite: Vite,
  'html-5': Html5,
  css: Css3Icon,
  nodejs: NodejsIcon,
  express: Express,
  python: Python,
  postgresql: Postgresql,
  mongodb: MongodbIcon,
  git: GitIcon,
  docker: DockerIcon,
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
