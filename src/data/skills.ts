export interface Skill {
  name: string
  icon: string
  category: string
}

export const skills: Skill[] = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Frontend' },
  { name: 'Vite', icon: '⚡', category: 'Frontend' },
  { name: 'HTML/CSS', icon: '🌐', category: 'Frontend' },
  { name: 'Node.js', icon: '💚', category: 'Backend' },
  { name: 'Express', icon: '🚂', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', category: 'Backend' },
  { name: 'REST APIs', icon: '🔗', category: 'Backend' },
  { name: 'Git', icon: '📦', category: 'Tools' },
  { name: 'Docker', icon: '🐳', category: 'Tools' },
  { name: 'Linux', icon: '🐧', category: 'Tools' },
  { name: 'Figma', icon: '🎯', category: 'Tools' },
]
