import { motion } from 'framer-motion'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsMarqueeProps {
  skills: Skill[]
}

const categoryOrder = ['Frontend', 'Backend', 'Tools']

function MarqueeRow({ category, skills }: { category: string; skills: Skill[] }) {
  const doubled = [...skills, ...skills]

  return (
    <div>
      <h3 className="mb-4 font-mono text-xs font-medium tracking-wider text-gray-500 dark:text-gray-500 uppercase">
        {category}
      </h3>
      <div className="group relative overflow-hidden py-4">
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-4 pr-4">
            {doubled.map((skill, i) => (
              <motion.span
                key={`${skill.name}-${i}`}
                whileHover={{ scale: 1.1, y: -4 }}
                className="inline-flex shrink-0 cursor-default items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-base font-medium text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300"
              >
                <SkillIcon name={skill.icon} size={20} />
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
                <SkillIcon name={skill.icon} size={20} />
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  const grouped = categoryOrder
    .map(cat => ({ category: cat, items: skills.filter(s => s.category === cat) }))
    .filter(g => g.items.length > 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {grouped.map(({ category, items }) => (
        <MarqueeRow key={category} category={category} skills={items} />
      ))}
    </motion.div>
  )
}
