import { useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import ProfileCompletenessBar from '../../components/dashboard/ProfileCompletenessBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { calculateProfileCompleteness, useDashboardData } from '../../lib/DashboardDataContext'

function RepeatableSection({ title, optional, items, onAdd, onRemove, renderForm, emptyLabel }) {
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({})

  const handleAdd = () => {
    onAdd(form)
    setForm({})
    setAdding(false)
  }

  return (
    <div className="border-t border-[var(--color-border)] pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-[var(--color-text-primary)]">
          {title}
          {optional && <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">(Optional)</span>}
        </h3>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-teal)] hover:underline"
          >
            <FiPlus className="h-4 w-4" aria-hidden />
            Add
          </button>
        )}
      </div>

      {items.length === 0 && !adding && (
        <p className="text-sm text-[var(--color-text-secondary)]">{emptyLabel}</p>
      )}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3"
          >
            <div className="text-sm">
              <p className="font-semibold text-[var(--color-text-primary)]">{item.title || item.institution}</p>
              <p className="text-[var(--color-text-secondary)]">{item.company || item.field}</p>
              {item.dates && <p className="text-xs text-[var(--color-text-secondary)]">{item.dates}</p>}
              {item.description && <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{item.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="ml-2 rounded p-1 text-[var(--color-text-secondary)] hover:text-[var(--status-error)]"
              aria-label="Remove entry"
            >
              <FiX className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {adding && (
        <div className="mt-4 space-y-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
          {renderForm(form, setForm)}
          <div className="flex gap-2">
            <Button variant="teal" onClick={handleAdd}>
              Save entry
            </Button>
            <Button variant="outline-teal" onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MyProfilePage() {
  const { profile, updateProfile } = useDashboardData()
  const [form, setForm] = useState({ ...profile })
  const [skillInput, setSkillInput] = useState('')
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleAddSkill = () => {
    const skill = skillInput.trim()
    if (!skill || form.skills.includes(skill)) return
    setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
    setSkillInput('')
    setSaved(false)
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSave = () => {
    updateProfile(form)
    setSaved(true)
  }

  const addExperience = (entry) => {
    if (!entry.title?.trim()) return
    setForm((prev) => ({
      ...prev,
      experience: [...prev.experience, { id: `exp-${Date.now()}`, ...entry }],
    }))
    setSaved(false)
  }

  const addEducation = (entry) => {
    if (!entry.institution?.trim()) return
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, { id: `edu-${Date.now()}`, ...entry }],
    }))
    setSaved(false)
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Profile & Settings"
        subtitle="Keep this up to date — it's what employers see with every application."
      />

      <ProfileCompletenessBar percent={calculateProfileCompleteness(form)} showLink={false} />

      <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-8">
        <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">Personal Details</h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Fill in your details below. Don't worry — you can always come back and update them later.
        </p>

        <div className="mt-6 space-y-5">
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          <Input
            label="City / Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., Toronto, ON"
          />

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[var(--color-text-primary)]">Skills</label>
            <p className="mb-2 text-xs text-[var(--color-text-secondary)]">
              Add a few skills that describe what you're good at — press Enter after each one.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--color-teal-light)] px-3 py-1 text-sm font-medium text-[var(--color-teal)]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
                      setSaved(false)
                    }}
                    className="rounded-full p-0.5 hover:bg-[var(--color-teal)]/10"
                    aria-label={`Remove ${skill}`}
                  >
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter"
              className="w-full rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-teal)]"
            />
          </div>

          <RepeatableSection
            title="Work Experience"
            optional
            items={form.experience}
            emptyLabel="No work experience added yet. That's okay — you can skip this for now."
            onAdd={addExperience}
            onRemove={(id) => {
              setForm((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }))
              setSaved(false)
            }}
            renderForm={(f, setF) => (
              <>
                <input
                  type="text"
                  placeholder="What was your job title?"
                  value={f.title || ''}
                  onChange={(e) => setF({ ...f, title: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Where did you work?"
                  value={f.company || ''}
                  onChange={(e) => setF({ ...f, company: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="When did you work there? (e.g., 2022 – 2024)"
                  value={f.dates || ''}
                  onChange={(e) => setF({ ...f, dates: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Brief description (optional)"
                  value={f.description || ''}
                  onChange={(e) => setF({ ...f, description: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                />
              </>
            )}
          />

          <RepeatableSection
            title="Education"
            optional
            items={form.education}
            emptyLabel="No education added yet. You can add this later if you'd like."
            onAdd={addEducation}
            onRemove={(id) => {
              setForm((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }))
              setSaved(false)
            }}
            renderForm={(f, setF) => (
              <>
                <input
                  type="text"
                  placeholder="School or institution name"
                  value={f.institution || ''}
                  onChange={(e) => setF({ ...f, institution: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="What did you study?"
                  value={f.field || ''}
                  onChange={(e) => setF({ ...f, field: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="When? (e.g., 2018 – 2022)"
                  value={f.dates || ''}
                  onChange={(e) => setF({ ...f, dates: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                />
              </>
            )}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="teal" onClick={handleSave}>
            Save Changes
          </Button>
          {saved && (
            <p className="text-sm font-medium text-[var(--status-success-text)]" role="status">
              Your profile has been saved.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
