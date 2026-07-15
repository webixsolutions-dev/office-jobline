// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   HiOutlineMail,
//   HiOutlinePhone,
//   HiOutlineLocationMarker,
//   HiOutlineClock,
//   HiCheckCircle,
//   HiOutlineUser,
//   HiOutlineChatAlt2,
// } from 'react-icons/hi'
// // import HeroBackground from '../components/HeroBackground'
// // import { heroImages } from '../assets/heroImages'

// const contactInfo = [
//   { icon: HiOutlineMail, title: 'Email Us', value: 'hello@officejobline.com', sub: 'We reply within one business day.' },
//   { icon: HiOutlinePhone, title: 'Call Us', value: '+92 300 1234567', sub: 'Mon – Fri, 9:00 AM – 6:00 PM' },
//   { icon: HiOutlineLocationMarker, title: 'Visit Us', value: '142 Corporate Avenue, Gulberg III', sub: 'Lahore, Pakistan' },
//   { icon: HiOutlineClock, title: 'Office Hours', value: 'Monday – Friday', sub: '9:00 AM – 6:00 PM (PKT)' },
// ]

// export default function ContactUs() {
//   const [submitted, setSubmitted] = useState(false)
//   const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

//   const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setSubmitted(true)
//   }

//   return (
//     <div>
//       <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
//         <HeroBackground image={heroImages.contactUs} alt="Workspace desk with laptop and phone" />
//         <div className="pointer-events-none absolute -top-16 right-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
//         <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
//           <motion.span
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-5 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400"
//           >
//             Contact Us
//           </motion.span>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="font-display text-3xl font-extrabold text-white sm:text-4xl"
//           >
//             We'd Love to Hear From You
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mt-4 text-slate-300"
//           >
//             Questions about job seeking, hiring, or partnerships? Our team is ready to help.
//           </motion.p>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {contactInfo.map((c, i) => (
//             <motion.div
//               key={c.title}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.45, delay: i * 0.08 }}
//               className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
//             >
//               <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-900/5 text-navy-900">
//                 <c.icon className="h-6 w-6" />
//               </div>
//               <h3 className="font-display text-sm font-semibold text-navy-900">{c.title}</h3>
//               <p className="mt-1.5 text-sm font-medium text-navy-800">{c.value}</p>
//               <p className="mt-1 text-xs text-slate-400">{c.sub}</p>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
//           <motion.div
//             initial={{ opacity: 0, x: -24 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"
//           >
//             <AnimatePresence mode="wait">
//               {submitted ? (
//                 <motion.div
//                   key="success"
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex flex-col items-center py-10 text-center"
//                 >
//                   <HiCheckCircle className="h-16 w-16 text-gold-600" />
//                   <h3 className="mt-6 font-display text-xl font-bold text-navy-900">Message Sent!</h3>
//                   <p className="mt-3 max-w-sm text-sm text-slate-500">
//                     Thanks {form.name || 'there'}, we've received your message and will get back to you
//                     at {form.email || 'your email'} soon.
//                   </p>
//                   <button
//                     onClick={() => setSubmitted(false)}
//                     className="mt-8 rounded-md bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
//                   >
//                     Send Another Message
//                   </button>
//                 </motion.div>
//               ) : (
//                 <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
//                   <h2 className="font-display text-xl font-bold text-navy-900">Send Us a Message</h2>
//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-2 block text-sm font-semibold text-navy-900">Full Name</label>
//                       <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                         <HiOutlineUser className="h-5 w-5 shrink-0 text-slate-400" />
//                         <input
//                           required
//                           value={form.name}
//                           onChange={update('name')}
//                           placeholder="Your full name"
//                           className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="mb-2 block text-sm font-semibold text-navy-900">Email Address</label>
//                       <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                         <HiOutlineMail className="h-5 w-5 shrink-0 text-slate-400" />
//                         <input
//                           required
//                           type="email"
//                           value={form.email}
//                           onChange={update('email')}
//                           placeholder="you@example.com"
//                           className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-navy-900">Subject</label>
//                     <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                       <HiOutlineChatAlt2 className="h-5 w-5 shrink-0 text-slate-400" />
//                       <input
//                         required
//                         value={form.subject}
//                         onChange={update('subject')}
//                         placeholder="How can we help?"
//                         className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-semibold text-navy-900">Message</label>
//                     <textarea
//                       required
//                       rows={5}
//                       value={form.message}
//                       onChange={update('message')}
//                       placeholder="Tell us more..."
//                       className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:border-gold-500 focus:outline-none"
//                     />
//                   </div>

//                   <motion.button
//                     whileTap={{ scale: 0.97 }}
//                     type="submit"
//                     className="w-full rounded-lg bg-gold-500 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 sm:w-auto sm:px-10"
//                   >
//                     Send Message
//                   </motion.button>
//                 </motion.form>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 24 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="overflow-hidden rounded-2xl border border-slate-200"
//           >
//             <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center bg-navy-950 bg-noise p-10 text-center">
//               <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gold-500/60 text-gold-500">
//                 <HiOutlineLocationMarker className="h-8 w-8" />
//               </div>
//               <h3 className="mt-6 font-display text-lg font-bold text-white">Office Jobline HQ</h3>
//               <p className="mt-2 max-w-xs text-sm text-slate-300">
//                 142 Corporate Avenue, Gulberg III, Lahore, Pakistan
//               </p>
//               <p className="mt-6 text-xs uppercase tracking-wider text-gold-500">
//                 Proudly serving job seekers &amp; employers nationwide
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   )
// }

import React from 'react'
import ContactHero from '../components/contact/ContactHero'
import WaysToReachUs from '../components/contact/WayToReachUs'
import NeedHelpSection from '../components/contact/NeedHelpSection'
import ContactCTA from '../components/contact/ContactCTA'

const ContactUs = () => {
  return (
    <div>
      <ContactHero />
      <WaysToReachUs />
      <NeedHelpSection />
      <ContactCTA />

    </div>
  )
}

export default ContactUs