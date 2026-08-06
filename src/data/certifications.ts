export interface Certification {
  title: string
  issuer: string
  date: string
  description: string
  skills: string[]
  image?: string
}

export const certifications: Certification[] = [
  {
    title: 'Python Programming',
    issuer: 'University of Moratuwa',
    date: 'Aug 2024',
    description: 'Completed the Python Programming course at the University of Moratuwa, covering object-oriented programming, data structures, and an introduction to machine learning with Python.',
    skills: ['Python'],
    image: '/certs/Python_Programming_E-Certificate.png',
  },
  {
    title: 'Python for Beginners',
    issuer: 'University of Moratuwa',
    date: 'Mar 2024',
    description: 'Completed the Python for Beginners course at the University of Moratuwa, covering fundamental Python syntax, control flow, functions, and basic programming logic.',
    skills: ['Python'],
    image: '/certs/Python_for_Beginners_E-Certificate.png',
  },
  {
    title: 'Web Design for Beginners',
    issuer: 'University of Moratuwa',
    date: 'Dec 2023',
    description: 'Completed the Web Design for Beginners course at the University of Moratuwa, covering HTML5 semantics, CSS3 styling, responsive layouts, and foundational web design principles.',
    skills: ['HTML5', 'CSS3', 'Web Design'],
    image: '/certs/Web_Design_for_Beginners_E-Certificate.png',
  },
  {
    title: 'EF SET Certificate',
    issuer: 'EF Standard English Test',
    date: 'Jun 2024',
    description: 'Achieved C2 Proficient level with a score of 72/100 on the EF Standard English Test, demonstrating advanced proficiency in Reading and Listening.',
    skills: ['English Proficiency', 'C2 Level'],
    image: '/certs/EF SET Certificate.png',
  },
]
