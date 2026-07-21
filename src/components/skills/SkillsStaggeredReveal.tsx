import { motion } from 'framer-motion'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsStaggeredRevealProps {
  skills: Skill[]
}

const categories = [...new Set(['Frontend', 'Backend', 'Tools'])]

function FlipCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
      whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      }}
      className="perspective-500"
    >
      <motion.span
        whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
        className="inline-flex cursor-default items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300"
      >
        <motion.span
          className="inline-flex"
          animate={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.6, ease: 'easeInOut' }}
        >
          <SkillIcon name={skill.icon} size={20} />
        </motion.span>
        {skill.name}
      </motion.span>
    </motion.div>
  )
}

export default function SkillsStaggeredReveal({ skills }: SkillsStaggeredRevealProps) {
  return (
    <div className="space-y-10">
      {categories.map(category => (
        <div key={category}>
          <motion.h3
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 font-mono text-xs font-medium tracking-wider text-gray-500 dark:text-gray-500 uppercase"
          >
            {category}
          </motion.h3>
          <div className="flex flex-wrap gap-3">
            {skills
              .filter(s => s.category === category)
              .map((skill, i) => (
                <FlipCard key={skill.name} skill={skill} index={i} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
