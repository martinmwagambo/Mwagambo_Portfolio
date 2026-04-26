import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from './useInView'
import { FiGithub } from 'react-icons/fi'

function useActiveItem(itemRefs) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const midY = window.innerHeight / 2
      let best = 0, bestDist = Infinity
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - midY)
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      setActive(best)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [itemRefs])
  return active
}

const projects = [
  {
    title: 'Greenview Hotel — The Food Haven',
    description: 'A full-featured hotel web platform with user authentication, food ordering, and a contact system. Built with PHP, Bootstrap, MySQL, and AJAX for a smooth, responsive experience.',
    stack: ['PHP', 'MySQL', 'Bootstrap', 'AJAX', 'JavaScript'],
    github: 'https://github.com/martinmwagambo/Blessed_Property',
    screenshot: '/greenview.png',
    gradient: 'from-green-400 to-emerald-500',
    badge: '⭐ Featured',
  },
  {
    title: 'Mwiki Primary School — Inventory System',
    description: 'A desktop inventory management system for a primary school. Tracks school assets, manages records, and generates reports using Visual Basic .NET.',
    stack: ['VB.NET', 'SQL Server'],
    github: 'https://github.com/martinmwagambo/MwikiPrimarySchool-Inventory-Management-System',
    screenshot: null,
    gradient: 'from-brand-400 to-indigo-500',
    badge: '⭐ Starred',
  },
  {
    title: 'Python Projects',
    description: 'A collection of Python scripts and mini-projects covering automation, data manipulation, and scripting challenges built while learning Python fundamentals.',
    stack: ['Python'],
    github: 'https://github.com/martinmwagambo/pythonproj',
    screenshot: null,
    gradient: 'from-yellow-400 to-orange-400',
    badge: '🐍 Python',
  },
  {
    title: 'Personal Portfolio Website',
    description: 'This portfolio — a responsive site showcasing my skills, experience, and projects. Built with performance, clean design, and smooth animations in mind.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/martinmwagambo',
    screenshot: null,
    gradient: 'from-purple-400 to-pink-500',
    badge: '🌐 Live',
  },
]

export default function Projects() {
  const [headingRef, headingInView] = useInView({ threshold: 0.15 })
  const timelineRef = useRef(null)
  const itemRefs = useRef([])
  const active = useActiveItem(itemRefs)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="projects" className="py-24 bg-white dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headingInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-mono text-brand-500 mb-2 tracking-widest uppercase">My Work</p>
          <h2 className="section-heading text-gray-900 dark:text-white">Projects</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-400 to-indigo-500 rounded-full mt-3" />
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Track */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-dark-border hidden md:block" />
          {/* Fill line */}
          <div className="absolute left-5 top-0 bottom-0 hidden md:block overflow-hidden" style={{ width: 1 }}>
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-brand-400 via-teal-400 to-purple-400" />
          </div>
          {/* Travelling glow dot */}
          <div className="absolute left-5 top-0 bottom-0 hidden md:block" style={{ width: 1 }}>
            <motion.div style={{ top: lineHeight }} className="absolute -left-2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-5 rounded-full bg-brand-500 shadow-[0_0_12px_4px_rgba(99,102,241,0.55)]"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-10">
            {projects.map((project, i) => {
              const isActive = active === i
              return (
                <motion.article
                  key={project.title}
                  ref={(el) => (itemRefs.current[i] = el)}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.06 }}
                  className="relative md:pl-16"
                >
                  {/* Dot */}
                  <motion.div
                    animate={isActive
                      ? { scale: [1, 1.5, 1], boxShadow: ['0 0 0px 0px rgba(99,102,241,0)', '0 0 14px 6px rgba(99,102,241,0.5)', '0 0 0px 0px rgba(99,102,241,0)'] }
                      : { scale: 1, boxShadow: '0 0 0px 0px rgba(0,0,0,0)' }
                    }
                    transition={{ duration: 1.4, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                    className={`absolute left-3.5 top-6 w-3 h-3 rounded-full border-2 border-white dark:border-dark-bg hidden md:block
                      transition-colors duration-300 ${isActive ? 'bg-brand-400' : 'bg-gray-300 dark:bg-dark-border'}`}
                  />

                  {/* Card */}
                  <motion.div
                    animate={isActive
                      ? { borderColor: 'rgba(99,102,241,0.45)', boxShadow: '0 4px 24px rgba(99,102,241,0.1)' }
                      : { borderColor: '', boxShadow: '0 0 0 rgba(0,0,0,0)' }
                    }
                    transition={{ duration: 0.35 }}
                    className="group rounded-2xl border border-gray-200 dark:border-dark-border
                               bg-white dark:bg-dark-card overflow-hidden hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    {/* If featured & has screenshot */}
                    {project.screenshot ? (
                      <div className="relative">
                        <img
                          src={project.screenshot}
                          alt={project.title}
                          className="w-full h-52 object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full
                                         bg-white/90 text-gray-800 shadow-md">
                          {project.badge}
                        </span>
                      </div>
                    ) : (
                      <div className={`relative h-16 bg-gradient-to-r ${project.gradient} flex items-center px-5 gap-3`}>
                        <div className="absolute inset-0 opacity-10"
                          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                        <span className="relative z-10 text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30">
                          {project.badge}
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span key={tech}
                              className="px-2.5 py-1 rounded-full text-xs font-medium
                                         bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-400
                                         border border-gray-200 dark:border-dark-border">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-brand-500 transition-colors">
                            <FiGithub size={14} /> View Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
