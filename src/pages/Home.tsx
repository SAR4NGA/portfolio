import { useState, useCallback, useRef } from 'react'
import HeroNetworkAnimation from '../components/HeroLightAnimations'
import { GitHubCalendar } from 'react-github-calendar'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowDown, Mail, MapPin, Calendar, LayoutGrid, LayoutList } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'
import SkillsGrid from '../components/skills/SkillsGrid'
import ProjectCard from '../components/ProjectCard'
import ProjectCarousel from '../components/ProjectCarousel'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { skills } from '../data/skills'
import { projects } from '../data/projects'
import { certifications } from '../data/certifications'

export default function Home() {
  const [projectView, setProjectView] = useState<'grid' | 'carousel'>('carousel')
  const [projectsTab, setProjectsTab] = useState<'projects' | 'github'>('projects')
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    const glow = glowRef.current
    if (!rect || !glow) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    glow.style.left = `${x}%`
    glow.style.top = `${y}%`
  }, [])

  return (
    <>
      <Helmet>
        <title>Saranga's</title>
      </Helmet>

      {/* Hero */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="sticky top-0 z-0 flex min-h-[calc(100vh-4rem)] items-center overflow-x-hidden"
      >
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-[#0a0f1c] dark:via-[#0c1222] dark:to-[#0a0f1c]" />

        {/* Light mode animation (hidden in dark mode) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
          <HeroNetworkAnimation color="59, 130, 246" />
        </div>

        {/* Dark mode beam */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
          <div className="absolute inset-0 beam-dark-sharp" />
          <div className="absolute inset-0 blur-3xl beam-dark-glow" />
        </div>

        {/* Cursor-following glow (dark mode only) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
          <div
            ref={glowRef}
            className="absolute h-[120%] w-[120%] rounded-full blur-[100px] opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(96,165,250,0.3) 30%, rgba(147,197,253,0.15) 55%, transparent 80%)',
              left: '30%',
              top: '70%',
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.6s ease-out, top 0.6s ease-out, background 1s ease-in-out',
            }}
          />
        </div>


        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="mb-1 font-mono text-blue-600 dark:text-blue-400"
          >
            <span className="text-4xl">
              {"Hello,".split("").map((char, i) => (
                <motion.span key={`h-${i}`} variants={{ hidden: { opacity: 0, display: 'none' }, visible: { opacity: 1, display: 'inline' } }}>{char}</motion.span>
              ))}
            </span>
            <span className="text-3xl">
              {" I'm".split("").map((char, i) => (
                <motion.span key={`i-${i}`} variants={{ hidden: { opacity: 0, display: 'none' }, visible: { opacity: 1, display: 'inline' } }}>{char}</motion.span>
              ))}
            </span>
          </motion.div>
          <h1
            className="mb-2 font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="inline-block text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-700 dark:text-gray-300" 
              style={{ fontFamily: '"Edu VIC WA NT Hand", cursive' }}
            >
              PASINDU
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="inline-block ml-2 sm:ml-4 text-5xl sm:text-6xl md:text-8xl font-black text-gray-900 dark:text-white underline decoration-2"
            >
              SARANGA
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="mb-6 text-md text-gray-800 dark:text-gray-400"
          >
            Software Engineering Undergraduate
          </motion.p>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.02, delayChildren: 2.5 } },
            }}
            className="mb-8 max-w-xl mx-auto text-lg text-gray-500 dark:text-gray-500"
          >
            {"From coursework to full stack systems, I like turning messy requirements into software that actually works.".split("").map((char, i) => (
              <motion.span key={`desc-${i}`} variants={{ hidden: { opacity: 0, display: 'none' }, visible: { opacity: 1, display: 'inline' } }}>{char}</motion.span>
            ))}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 4.6 }}
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
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-200 px-6 py-2.5 text-base font-medium text-blue-900 dark:bg-blue-800 dark:text-blue-200"
            >
              <div className="absolute left-1/2 top-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 opacity-0 animate-border-glow-cycle">
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
          <ArrowDown size={24} className="animate-pulse motion-safe:animate-pulse" />
        </motion.a>
      </section>

      {/* Content wrapper */}
      <div className="relative z-10 bg-white dark:bg-gray-950">

      {/* About */}
      <SectionWrapper id="about" title="About" subtitle="A little about me">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr] items-start">
          <div className="flex justify-center md:justify-start">
            <img
              src="/profile.png"
              alt="Profile"
              width="600"
              height="600"
              className="w-full max-w-[600px] aspect-square rounded-2xl object-cover shadow-xl border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I&apos;m a Software Engineering Undergraduate building products that make a difference. I focus on full-stack web development, with an eye for clean, performant user experiences.
            </p>
            <p>
My work spans web, mobile, and desktop, from Flutter apps to ASP.NET services to lightweight desktop tools. I care about writing code that's as readable as it is functional.            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 text-base text-gray-500 dark:text-gray-500">
                <MapPin size={14} /> Colombo, Sri Lanka
              </span>
              <span className="inline-flex items-center gap-1.5 text-base text-gray-500 dark:text-gray-500">
                <Calendar size={14} /> Available for internships
              </span>
            </div>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/50">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Education</h3>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">NSBM Green University</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">BSc (Hons) in Software Engineering <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Reading</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper id="skills" title="Skills" subtitle="Technologies I worked with" className="bg-gray-50 dark:bg-gray-900/50">
        <SkillsGrid skills={skills} />
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper id="certifications" title="Certifications" subtitle="What I've achieved">
        <div className="relative space-y-10 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-2.5rem)] before:w-px before:bg-gray-200 dark:before:bg-gray-800">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative flex gap-6"
            >
              <div className="relative mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-blue-600 bg-white dark:border-blue-400 dark:bg-gray-950" />
              <div className="flex-1 rounded-xl border border-gray-200 overflow-hidden transition-colors hover:border-blue-200 dark:border-gray-800 dark:hover:border-blue-800">
                <div className="flex flex-col sm:flex-row">
                  {/* Text content */}
                  <div className="flex-1 min-w-0 p-6">
                    <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                      <span className="text-base text-blue-600 dark:text-blue-400">@ {cert.issuer}</span>
                    </div>
                    <p className="mb-3 font-mono text-sm text-gray-500 dark:text-gray-500">{cert.date}</p>
                    <p className="mb-3 text-base text-gray-600 dark:text-gray-400">{cert.description}</p>
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cert.skills.map((skill, j) => (
                          <span key={j} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Certificate image — flush to the card edge */}
                  {cert.image && (
                    <div className="shrink-0 sm:w-64 md:w-80">
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate`}
                        loading="lazy"
                        className="h-full w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(cert.image, '_blank')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Projects & GitHub Status */}
      <SectionWrapper id="projects" title={projectsTab === 'projects' ? 'Projects' : 'GitHub Status'} subtitle={projectsTab === 'projects' ? "Things I've built" : 'My open-source activity'} className="bg-gray-50 dark:bg-gray-900/50">
        {/* Centered tab toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-900">
            <button
              onClick={() => setProjectsTab('projects')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                projectsTab === 'projects'
                  ? 'bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setProjectsTab('github')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                projectsTab === 'github'
                  ? 'bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              GitHub Status
            </button>
          </div>
        </div>

        {projectsTab === 'projects' ? (
          <>
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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
              <img
                src="https://github-stats-extended.vercel.app/api?username=SAR4NGA&show_icons=true&theme=default&hide_border=true&bg_color=00000000&title_color=1f2937&text_color=4b5563&icon_color=3b82f6"
                alt="GitHub Stats"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                className="w-full rounded-xl border border-gray-200 bg-white p-2 dark:hidden dark:border-gray-800"
              />
              <img
                src="https://github-stats-extended.vercel.app/api?username=SAR4NGA&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=9ca3af&icon_color=60a5fa"
                alt="GitHub Stats"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                className="hidden w-full rounded-xl border border-gray-800 bg-gray-900/50 p-2 dark:block"
              />
              <img
                src="https://github-stats-extended.vercel.app/api/top-langs/?username=SAR4NGA&layout=compact&hide_border=true&bg_color=00000000&title_color=1f2937&text_color=4b5563"
                alt="Top Languages"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                className="w-full rounded-xl border border-gray-200 bg-white p-2 dark:hidden dark:border-gray-800"
              />
              <img
                src="https://github-stats-extended.vercel.app/api/top-langs/?username=SAR4NGA&layout=compact&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=9ca3af"
                alt="Top Languages"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                className="hidden w-full rounded-xl border border-gray-800 bg-gray-900/50 p-2 dark:block"
              />
            </div>
            <img
              src="https://streak-stats.demolab.com/?user=SAR4NGA&hide_border=true&background=00000000&ring=3b82f6&fire=3b82f6&currStreakLabel=1f2937&sideLabels=4b5563&currStreakNum=1f2937&sideNums=4b5563&dates=9ca3af"
              alt="GitHub Streak"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-2 dark:hidden"
            />
            <img
              src="https://streak-stats.demolab.com/?user=SAR4NGA&hide_border=true&background=00000000&ring=60a5fa&fire=60a5fa&currStreakLabel=ffffff&sideLabels=9ca3af&currStreakNum=ffffff&sideNums=9ca3af&dates=6b7280"
              alt="GitHub Streak"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              className="hidden w-full max-w-3xl rounded-xl border border-gray-800 bg-gray-900/50 p-2 dark:block"
            />
            {/* Contribution calendar */}
            <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/50">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Contribution Graph</p>
              <div className="block overflow-hidden dark:hidden">
                <GitHubCalendar
                  username="SAR4NGA"
                  colorScheme="light"
                  blockSize={13}
                  blockRadius={3}
                  blockMargin={4}
                  fontSize={12}
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  }}
                />
              </div>
              <div className="hidden overflow-hidden dark:block">
                <GitHubCalendar
                  username="SAR4NGA"
                  colorScheme="dark"
                  blockSize={11}
                  blockRadius={3}
                  blockMargin={3}
                  fontSize={12}
                  theme={{
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                />
              </div>
            </div>
            <a
              href="https://github.com/SAR4NGA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <GithubIcon size={16} /> View Full Profile
            </a>
          </motion.div>
        )}
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper id="contact" title="Contact" subtitle="Get in touch" className="pb-24">
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
              href="mailto:swpsaranga@students.nsbm.ac.lk"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <Mail size={16} /> swpsaranga@students.nsbm.ac.lk
            </a>
            <a
              href="https://github.com/SAR4NGA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sar4nga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </motion.div>
      </SectionWrapper>
      </div>
    </>
  )
}
