import { motion } from 'framer-motion'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsStaggeredSlideProps {
  skills: Skill[]
}

const categories = ['Frontend', 'Backend', 'Tools']

function StaggeredRow({ category, skills }: { category: string; skills: Skill[] }) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
        {category}
      </h3>
      <div className="no-scrollbar flex overflow-x-auto gap-4 py-2 px-1" style={{ scrollbarWidth: 'none' }}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              type: 'spring',
              stiffness: 140,
              damping: 16,
            }}
            whileHover={{ y: -6, scale: 1.08 }}
            className="group flex shrink-0 flex-col items-center justify-center p-4 min-w-[100px] sm:min-w-[110px] rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-all hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-default"
          >
            <div className="relative flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <SkillIcon name={skill.icon} size={50} />
            </div>
            <span className="mt-2 text-center text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function SkillsStaggeredSlide({ skills }: SkillsStaggeredSlideProps) {
  const grouped = categories.map(cat => ({
    category: cat,
    items: skills.filter(s => s.category === cat),
  }))

  return (
    <div className="space-y-6">
      {grouped.map(({ category, items }) => (
        <StaggeredRow key={category} category={category} skills={items} />
      ))}
    </div>
  )
}
