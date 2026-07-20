import { motion } from 'framer-motion'
import type { Skill } from '../../data/skills'

interface SkillsMarqueeProps {
  skills: Skill[]
}

export default function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  const doubled = [...skills, ...skills]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-4 pr-4">
          {doubled.map((skill, i) => (
            <motion.span
              key={`${skill.name}-${i}`}
              whileHover={{ scale: 1.1, y: -4 }}
              className="inline-flex shrink-0 cursor-default items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-base font-medium text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300"
            >
              <span className="text-lg">{skill.icon}</span>
              {skill.name}
            </motion.span>
          ))}
        </div>
        <div className="animate-marquee2 flex shrink-0 gap-4 pr-4" aria-hidden>
          {doubled.map((skill, i) => (
            <span
              key={`dup-${skill.name}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-base font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
            >
              <span className="text-lg">{skill.icon}</span>
              {skill.name}
            </span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-white dark:to-gray-950" />
    </motion.div>
  )
}
