import { motion } from 'framer-motion'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsMarqueeProps {
  skills: Skill[]
}

const categories = ['Frontend', 'Backend', 'Tools']

function MarqueeRow({
  category,
  skills,
  reverse = false,
}: {
  category: string
  skills: Skill[]
  reverse?: boolean
}) {
  const doubled = [...skills, ...skills, ...skills]

  return (
    <div>
      <h3 className="mb-3 font-mono text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
        {category}
      </h3>
      <div className="group relative overflow-hidden py-2">
        {/* Side gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900/80" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900/80" />

        <div className="flex overflow-hidden">
          <div
            className={`flex shrink-0 gap-6 pr-6 group-hover:[animation-play-state:paused] ${
              reverse ? 'animate-marquee-reverse' : 'animate-marquee'
            }`}
          >
            {doubled.map((skill, i) => (
              <motion.div
                key={`${skill.name}-${i}`}
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex shrink-0 flex-col items-center justify-center p-3 sm:p-4 min-w-[90px] sm:min-w-[100px] rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-colors cursor-default hover:border-blue-300 dark:hover:border-blue-600"
              >
                <SkillIcon name={skill.icon} size={48} />
                <span className="mt-2 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-600 dark:text-gray-400">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  const grouped = categories.map(cat => ({
    category: cat,
    items: skills.filter(s => s.category === cat),
  }))

  return (
    <div className="space-y-6">
      {grouped.map(({ category, items }, index) => (
        <MarqueeRow
          key={category}
          category={category}
          skills={items}
          reverse={index % 2 === 1}
        />
      ))}
    </div>
  )
}
