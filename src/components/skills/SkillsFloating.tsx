import { motion } from 'framer-motion'
import type { Skill } from '../../data/skills'

interface SkillsFloatingProps {
  skills: Skill[]
}

function FloatingBadge({ skill, index }: { skill: Skill; index: number }) {
  const seed = index * 137.5
  const xShift = ((seed % 60) - 30)
  const yAmp = 8 + (seed % 12)
  const duration = 3 + (seed % 3)
  const delay = (seed % 2)

  return (
    <motion.span
      initial={{ opacity: 0, y: 20, x: 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="inline-flex shrink-0 cursor-default items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300"
      animate={{
        y: [0, -yAmp, 0],
        x: [0, xShift, 0],
        transition: {
          y: {
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          },
          x: {
            duration: duration * 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + 0.5,
          },
        },
      }}
    >
      <span className="text-lg">{skill.icon}</span>
      {skill.name}
    </motion.span>
  )
}

export default function SkillsFloating({ skills }: SkillsFloatingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3"
    >
      {skills.map((skill, i) => (
        <FloatingBadge key={skill.name} skill={skill} index={i} />
      ))}
    </motion.div>
  )
}
