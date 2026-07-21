import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowDown, Mail, MapPin, Calendar, LayoutGrid, LayoutList } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'
import SkillsMarquee from '../components/skills/SkillsMarquee'
import ProjectCard from '../components/ProjectCard'
import ProjectCarousel from '../components/ProjectCarousel'
import { skills } from '../data/skills'
import { projects } from '../data/projects'
import { experiences } from '../data/experience'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Home() {
  const [projectView, setProjectView] = useState<'grid' | 'carousel'>('carousel')

  return (
    <>
      <Helmet>
        <title>Saranga's</title>
      </Helmet>

      {/* Hero */}
      <section className="sticky top-0 z-0 flex min-h-[calc(100vh-4rem)] items-center overflow-x-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-blue-600 dark:text-blue-400"
          >
            <span className="text-5xl">Hello,</span>{' '}
            <span className="text-4xl">I&apos;m</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 font-bold tracking-tight text-gray-900 dark:text-white"
        >
            <span className="text-hero-sm text-gray-400 dark:text-gray-600">PASINDU</span>
            <span className="ml-4 text-hero-lg underline decoration-2">SARANGA</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-2 text-3xl text-gray-600 dark:text-gray-400"
          >
            Software Engineering Undergraduate
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 max-w-md mx-auto text-lg text-gray-500 dark:text-gray-500"
          >
            From coursework to full stack systems, I like turning messy requirements into software that actually works.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open to internship opportunities
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-gray-900 px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <span className="relative z-10">Get in touch</span>
              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-900/25 animate-button-shine" />
            </a>
            <a
              href="#about"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-200 px-6 py-2.5 text-base font-medium text-gray-700 dark:bg-blue-800 dark:text-gray-300"
            >
              <div className="absolute left-1/2 top-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span
                  className="absolute inset-0 animate-spin [animation-duration:3s]"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 20%, transparent 40%)' }}
                />
              </div>
              <span className="absolute inset-[1px] rounded-full bg-white transition-colors dark:bg-gray-950" />
              <span className="relative z-10">Learn more</span>
            </a>
          </motion.div>
        </div>
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <ArrowDown size={24} className="animate-bounce" />
        </motion.a>
      </section>

      {/* Content wrapper */}
      <div className="relative z-10 bg-white dark:bg-gray-950">

      {/* About */}
      <SectionWrapper id="about" title="About" subtitle="A little about me">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] items-start">
          <div className="flex justify-center md:justify-start">
            <div className="h-40 w-40 rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-4xl">
              👤
            </div>
          </div>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I&apos;m a Software Engineering undergraduate passionate about building products that make a difference. I specialize in full-stack web development with a focus on creating clean, performant user experiences.
            </p>
            <p>
              When I&apos;m not coding, you can find me reading about system design, contributing to open-source projects, or experimenting with new technologies. I believe in writing code that is as readable as it is functional.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 text-base text-gray-500 dark:text-gray-500">
                <MapPin size={14} /> Colombo, Sri Lanka
              </span>
              <span className="inline-flex items-center gap-1.5 text-base text-gray-500 dark:text-gray-500">
                <Calendar size={14} /> Available for internships
              </span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper id="skills" title="Skills" subtitle="Technologies I work with" className="bg-gray-50 dark:bg-gray-900/50">
        <SkillsMarquee skills={skills} />
      </SectionWrapper>

      {/* Experience */}
      <SectionWrapper id="experience" title="Experience" subtitle="Where I've worked">
        <div className="relative space-y-10 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-2.5rem)] before:w-px before:bg-gray-200 dark:before:bg-gray-800">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative flex gap-6"
            >
              <div className="relative mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-blue-600 bg-white dark:border-blue-400 dark:bg-gray-950" />
              <div className="rounded-xl border border-gray-200 p-6 transition-colors hover:border-blue-200 dark:border-gray-800 dark:hover:border-blue-800">
                <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                  <span className="text-base text-blue-600 dark:text-blue-400">@ {exp.company}</span>
                </div>
                <p className="mb-3 font-mono text-sm text-gray-500 dark:text-gray-500">{exp.period}</p>
                <p className="mb-3 text-base text-gray-600 dark:text-gray-400">{exp.description}</p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-base text-gray-600 dark:text-gray-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Projects */}
      <SectionWrapper id="projects" title="Projects" subtitle="Things I've built" className="bg-gray-50 dark:bg-gray-900/50">
        <div className="mb-6 flex items-center justify-end gap-1">
          <button
            onClick={() => setProjectView('grid')}
            className={`rounded-lg p-2 transition-colors ${
              projectView === 'grid'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setProjectView('carousel')}
            className={`rounded-lg p-2 transition-colors ${
              projectView === 'carousel'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            aria-label="Carousel view"
          >
            <LayoutList size={18} />
          </button>
        </div>

        {projectView === 'carousel' ? (
          <ProjectCarousel projects={projects} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper id="contact" title="Contact" subtitle="Get in touch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-lg text-center"
        >
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            I&apos;m always open to new opportunities, collaborations, and interesting conversations. Feel free to reach out!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@yourdomain.dev"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <Mail size={16} /> hello@yourdomain.dev
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </motion.div>
      </SectionWrapper>
      <div className="h-[15vh]" />
      </div>
    </>
  )
}
