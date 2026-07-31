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
    issuer: 'E-Certificate',
    date: '',
    description: '',
    skills: ['Python'],
    image: '/certs/Python_Programming_E-Certificate.png',
  },
  {
    title: 'Python for Beginners',
    issuer: 'E-Certificate',
    date: '',
    description: '',
    skills: ['Python'],
    image: '/certs/Python_for_Beginners_E-Certificate.png',
  },
  {
    title: 'Web Design for Beginners',
    issuer: 'E-Certificate',
    date: '',
    description: '',
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
