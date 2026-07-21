export interface Skill {
  name: string
  icon: string
  category: string
}

export const skills: Skill[] = [
  { name: 'React', icon: 'react', category: 'Frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'Frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend' },
  { name: 'Vite', icon: 'vite', category: 'Frontend' },
  { name: 'HTML5', icon: 'html-5', category: 'Frontend' },
  { name: 'CSS3', icon: 'css', category: 'Frontend' },
  { name: 'Node.js', icon: 'nodejs', category: 'Backend' },
  { name: 'Express', icon: 'express', category: 'Backend' },
  { name: 'Python', icon: 'python', category: 'Backend' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'Backend' },
  { name: 'MongoDB', icon: 'mongodb', category: 'Backend' },
  { name: 'REST APIs', icon: 'api', category: 'Backend' },
  { name: 'Git', icon: 'git', category: 'Tools' },
  { name: 'Docker', icon: 'docker', category: 'Tools' },
  { name: 'Linux', icon: 'linux-tux', category: 'Tools' },
  { name: 'Figma', icon: 'figma', category: 'Tools' },
]
