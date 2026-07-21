import { useRef } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'
import type { Skill } from '../../data/skills'
import SkillIcon from '../SkillIcon'

interface SkillsCarousel3DProps {
  skills: Skill[]
}

function CarouselCard({ skill, index, total }: { skill: Skill; index: number; total: number }) {
  const angle = (index / total) * 360
  const radius = 180

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
    >
      <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <SkillIcon name={skill.icon} size={32} />
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
      </div>
    </div>
  )
}

export default function SkillsCarousel3D({ skills }: SkillsCarousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(0)
  const frozenRef = useRef(false)

  useAnimationFrame((_, delta) => {
    if (!containerRef.current || frozenRef.current) return
    angleRef.current += delta * 0.015
    containerRef.current.style.transform = `rotateY(${angleRef.current}deg)`
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => { frozenRef.current = true }}
      onMouseLeave={() => { frozenRef.current = false }}
    >
      <div className="relative h-[400px] w-full max-w-[500px] mx-auto" style={{ perspective: '900px' }}>
        <div
          ref={containerRef}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {skills.map((skill, i) => (
            <CarouselCard key={skill.name} skill={skill} index={i} total={skills.length} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-400 dark:text-gray-500">Drag or hover to pause</p>
    </motion.div>
  )
}
