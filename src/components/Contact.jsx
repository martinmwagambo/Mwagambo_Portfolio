import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from './useInView'
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

// ─── EmailJS config ──────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create an Email Service (Gmail) → copy Service ID below
// 3. Create an Email Template with variables {{from_name}}, {{reply_to}}, {{message}}
//    → set "To Email" to martmwagambo2000@gmail.com → copy Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // e.g. 'AbCdEfGhIjKlMnOp'
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setLoading(false)
        setSent(true)
      })
      .catch(() => {
        setLoading(false)
        setError('Something went wrong. Please try again or email me directly.')
      })
  }

  const slideIn = (delay = 0) => ({
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut', delay } },
  })

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-surface" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          variants={slideIn(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <p className="text-sm font-mono text-brand-500 mb-2 tracking-widest uppercase">Say Hello</p>
          <h2 className="section-heading text-gray-900 dark:text-white">Get In Touch</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-400 to-indigo-500 rounded-full mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Left info panel */}
          <motion.div
            variants={slideIn(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm open to new opportunities and collaborations. Whether you have a question,
              a project idea, or just want to connect — feel free to send a message.
            </p>

            {/* Contact info items */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:martmwagambo2000@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-dark-border
                           bg-white dark:bg-dark-card hover:border-brand-400/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-200/60 dark:border-brand-800/50
                                flex items-center justify-center text-brand-500">
                  <FiMail size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-500 transition-colors">
                    martmwagambo2000@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/martinmwagambo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-dark-border
                           bg-white dark:bg-dark-card hover:border-brand-400/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-200/60 dark:border-brand-800/50
                                flex items-center justify-center text-brand-500">
                  <FiGithub size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">GitHub</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-500 transition-colors">
                    github.com/martinmwagambo
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/martin-mwagambo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-dark-border
                           bg-white dark:bg-dark-card hover:border-brand-400/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-200/60 dark:border-brand-800/50
                                flex items-center justify-center text-brand-500">
                  <FiLinkedin size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">LinkedIn</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-500 transition-colors">
                    linkedin.com/in/martin-mwagambo
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            variants={slideIn(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="md:col-span-3"
          >
            <div className="rounded-2xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card p-8 shadow-sm">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                    <FiCheckCircle size={32} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Message Sent!</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                    className="btn-outline mt-2"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="from_name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface
                                   px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600
                                   focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500
                                   transition-all duration-150"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="reply_to"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface
                                   px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600
                                   focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500
                                   transition-all duration-150"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface
                                 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600
                                 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500
                                 transition-all duration-150 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20
                                 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
                    >
                      <FiAlertCircle size={15} className="flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
