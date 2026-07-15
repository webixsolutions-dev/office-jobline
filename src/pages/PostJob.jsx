// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   HiOutlineBriefcase,
//   HiOutlineOfficeBuilding,
//   HiOutlineLocationMarker,
//   HiOutlineCash,
//   HiOutlineDocumentText,
//   HiOutlineMail,
//   HiCheckCircle,
// } from 'react-icons/hi'
// // import HeroBackground from '../components/HeroBackground'
// // import { heroImages } from '../assets/heroImages'

// const categories = ['Technology', 'Marketing', 'Design', 'Finance', 'Healthcare', 'Education', 'Human Resources', 'Sales']
// const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']

// export default function PostJob() {
//   const [submitted, setSubmitted] = useState(false)
//   const [form, setForm] = useState({
//     title: '',
//     company: '',
//     email: '',
//     location: '',
//     category: '',
//     type: '',
//     minSalary: '',
//     maxSalary: '',
//     description: '',
//     requirements: '',
//   })

//   const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setSubmitted(true)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return (
//     <div>
//       <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
//         <HeroBackground image={heroImages.postJob} alt="HR manager interviewing a candidate" />
//         <div className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
//         <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
//           <motion.span
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-5 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400"
//           >
//             Post a Job
//           </motion.span>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="font-display text-3xl font-extrabold text-white sm:text-4xl"
//           >
//             Reach Thousands of Qualified Candidates
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mt-4 text-slate-300"
//           >
//             Fill in the details below and your listing will go live within minutes.
//           </motion.p>
//         </div>
//       </section>

//       <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
//         <AnimatePresence mode="wait">
//           {submitted ? (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
//             >
//               <HiCheckCircle className="h-16 w-16 text-gold-600" />
//               <h2 className="mt-6 font-display text-2xl font-bold text-navy-900">
//                 Your Job Has Been Submitted!
//               </h2>
//               <p className="mt-3 max-w-md text-slate-500">
//                 Thanks, {form.company || 'there'}! Our team will review your listing for{' '}
//                 <span className="font-semibold text-navy-900">{form.title || 'your role'}</span> and it
//                 will go live shortly.
//               </p>
//               <button
//                 onClick={() => setSubmitted(false)}
//                 className="mt-8 rounded-md bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
//               >
//                 Post Another Job
//               </button>
//             </motion.div>
//           ) : (
//             <motion.form
//               key="form"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               onSubmit={handleSubmit}
//               className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"
//             >
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-navy-900">Job Title</label>
//                   <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                     <HiOutlineBriefcase className="h-5 w-5 shrink-0 text-slate-400" />
//                     <input
//                       required
//                       value={form.title}
//                       onChange={update('title')}
//                       placeholder="e.g. Senior Product Designer"
//                       className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-navy-900">Company Name</label>
//                   <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                     <HiOutlineOfficeBuilding className="h-5 w-5 shrink-0 text-slate-400" />
//                     <input
//                       required
//                       value={form.company}
//                       onChange={update('company')}
//                       placeholder="e.g. Nexora Studio"
//                       className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-navy-900">Contact Email</label>
//                   <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                     <HiOutlineMail className="h-5 w-5 shrink-0 text-slate-400" />
//                     <input
//                       required
//                       type="email"
//                       value={form.email}
//                       onChange={update('email')}
//                       placeholder="hr@company.com"
//                       className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-navy-900">Location</label>
//                   <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                     <HiOutlineLocationMarker className="h-5 w-5 shrink-0 text-slate-400" />
//                     <input
//                       required
//                       value={form.location}
//                       onChange={update('location')}
//                       placeholder="City, Country or Remote"
//                       className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-navy-900">Category</label>
//                   <select
//                     required
//                     value={form.category}
//                     onChange={update('category')}
//                     className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none"
//                   >
//                     <option value="">Select category</option>
//                     {categories.map((c) => (
//                       <option key={c} value={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-navy-900">Job Type</label>
//                   <select
//                     required
//                     value={form.type}
//                     onChange={update('type')}
//                     className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none"
//                   >
//                     <option value="">Select job type</option>
//                     {jobTypes.map((t) => (
//                       <option key={t} value={t}>{t}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-navy-900">Salary Range</label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                     <HiOutlineCash className="h-5 w-5 shrink-0 text-slate-400" />
//                     <input
//                       value={form.minSalary}
//                       onChange={update('minSalary')}
//                       placeholder="Min ($)"
//                       className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                     <HiOutlineCash className="h-5 w-5 shrink-0 text-slate-400" />
//                     <input
//                       value={form.maxSalary}
//                       onChange={update('maxSalary')}
//                       placeholder="Max ($)"
//                       className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-navy-900">Job Description</label>
//                 <div className="flex gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                   <HiOutlineDocumentText className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
//                   <textarea
//                     required
//                     rows={4}
//                     value={form.description}
//                     onChange={update('description')}
//                     placeholder="Describe the role, responsibilities and what makes it exciting..."
//                     className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-navy-900">Requirements</label>
//                 <div className="flex gap-2 rounded-lg border border-slate-200 px-4 py-3 focus-within:border-gold-500">
//                   <HiOutlineDocumentText className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
//                   <textarea
//                     rows={4}
//                     value={form.requirements}
//                     onChange={update('requirements')}
//                     placeholder="List required skills, experience and qualifications..."
//                     className="w-full bg-transparent text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 type="submit"
//                 className="w-full rounded-lg bg-gold-500 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 sm:w-auto sm:px-10"
//               >
//                 Publish Job Listing
//               </motion.button>
//             </motion.form>
//           )}
//         </AnimatePresence>
//       </section>
//     </div>
//   )
// }

import React from 'react'
import PostJobHero from '../components/postJob/PostJobHero'
import HowPostingWorks from '../components/postJob/HowPostingWorks'
import PricingPlans from '../components/postJob/PricingPlans'
import CTAFAQ from '../components/postJob/CTAFAQ'

const PostJob = () => {
  return (
    <div>
      <PostJobHero />

      <HowPostingWorks />
      <PricingPlans />
      <CTAFAQ />
    </div>
  )
}

export default PostJob