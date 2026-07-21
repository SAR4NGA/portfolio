import { motion } from 'framer-motion'
import SkillIcon from './SkillIcon'

interface SkillBadgeProps {
  name: string
  icon: string
  index: number
}

export default function SkillBadge({ name, icon, index }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300"
    >
      <SkillIcon name={icon} size={20} />
      {name}
    </motion.span>
  )
}
