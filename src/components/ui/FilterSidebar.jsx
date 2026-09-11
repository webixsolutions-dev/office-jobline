import { useState } from 'react'
import { FiChevronDown, FiSliders } from 'react-icons/fi'
import Button from './Button'
import {
  JOB_TYPES,
  WORK_MODES,
  EXPERIENCE_LEVELS,
  PROVINCES,
  SALARY_OPTIONS,
} from '../../lib/jobFilters'
import { categories } from '../../constants/categories'

function formatSalary(value) {
  return `$${Number(value).toLocaleString('en-CA')}`
}

function FilterSection({ title, open, onToggle, children, idPrefix = '' }) {
  const slug = title.replace(/\s+/g, '-').toLowerCase()
  const headingId = `${idPrefix}${slug}-heading`
  const panelId = `${idPrefix}${slug}-panel`

  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span id={headingId} className="text-sm font-bold text-navy">
          {title}
        </span>
        <FiChevronDown
          className={`h-4 w-4 text-muted transition ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={headingId} className="mt-3">
          {children}
        </div>
      )}
    </div>
  )
}

function CheckboxList({ items, values, onToggle, name }) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const id = `${name}-${item.slug}`
        return (
          <label key={item.slug} htmlFor={id} className="flex cursor-pointer items-center justify-between text-sm text-muted">
            <span className="flex items-center gap-2">
              <input
                id={id}
                type="checkbox"
                name={name}
                checked={values.includes(item.slug)}
                onChange={() => onToggle(item.slug)}
                className="h-4 w-4 rounded border-border text-teal focus:ring-teal"
              />
              {item.label}
            </span>
            <span className="text-muted/80">({item.count.toLocaleString('en-CA')})</span>
          </label>
        )
      })}
    </div>
  )
}

/**
 * Left-hand filter panel. Draft state is local until Show Results is pressed.
 */
export default function FilterSidebar({ draft, onDraftChange, onApply, onReset, idPrefix = '' }) {
  const [open, setOpen] = useState({
    type: true,
    mode: true,
    experience: true,
    province: true,
    salary: true,
    category: true,
  })

  const toggleOpen = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))

  const toggleList = (key, slug) => {
    const list = draft[key]
    onDraftChange({
      ...draft,
      [key]: list.includes(slug) ? list.filter((v) => v !== slug) : [...list, slug],
    })
  }

  return (
    <aside className="h-fit rounded-xl bg-white p-5 shadow-card sm:p-6" aria-labelledby={`${idPrefix}filter-jobs-heading`}>
      <div className="flex items-center justify-between">
        <h2 id={`${idPrefix}filter-jobs-heading`} className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <FiSliders className="h-4 w-4" aria-hidden />
          Filter Jobs
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Job Type" idPrefix={idPrefix} open={open.type} onToggle={() => toggleOpen('type')}>
        <CheckboxList
          name={`${idPrefix}job-type`}
          items={JOB_TYPES}
          values={draft.types}
          onToggle={(slug) => toggleList('types', slug)}
        />
      </FilterSection>

      <FilterSection title="Work Mode" idPrefix={idPrefix} open={open.mode} onToggle={() => toggleOpen('mode')}>
        <CheckboxList
          name={`${idPrefix}work-mode`}
          items={WORK_MODES}
          values={draft.modes}
          onToggle={(slug) => toggleList('modes', slug)}
        />
      </FilterSection>

      <FilterSection title="Experience Level" idPrefix={idPrefix} open={open.experience} onToggle={() => toggleOpen('experience')}>
        <CheckboxList
          name={`${idPrefix}experience`}
          items={EXPERIENCE_LEVELS}
          values={draft.experience}
          onToggle={(slug) => toggleList('experience', slug)}
        />
      </FilterSection>

      <FilterSection title="Province" idPrefix={idPrefix} open={open.province} onToggle={() => toggleOpen('province')}>
        <label htmlFor={`${idPrefix}filter-province`} className="sr-only">
          Province
        </label>
        <select
          id={`${idPrefix}filter-province`}
          value={draft.province}
          onChange={(e) => onDraftChange({ ...draft, province: e.target.value })}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm text-navy outline-none focus:border-teal"
        >
          <option value="">Select province</option>
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Salary Range" idPrefix={idPrefix} open={open.salary} onToggle={() => toggleOpen('salary')}>
        <div className="flex items-center gap-2">
          <label htmlFor={`${idPrefix}min-salary`} className="sr-only">
            Minimum salary
          </label>
          <select
            id={`${idPrefix}min-salary`}
            value={draft.minSalary}
            onChange={(e) => onDraftChange({ ...draft, minSalary: e.target.value })}
            className="w-full rounded-lg border border-border px-2 py-2 text-xs text-navy outline-none focus:border-teal"
          >
            <option value="">Min Salary</option>
            {SALARY_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {formatSalary(n)}
              </option>
            ))}
          </select>
          <span className="text-muted">to</span>
          <label htmlFor={`${idPrefix}max-salary`} className="sr-only">
            Maximum salary
          </label>
          <select
            id={`${idPrefix}max-salary`}
            value={draft.maxSalary}
            onChange={(e) => onDraftChange({ ...draft, maxSalary: e.target.value })}
            className="w-full rounded-lg border border-border px-2 py-2 text-xs text-navy outline-none focus:border-teal"
          >
            <option value="">Max Salary</option>
            {SALARY_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {formatSalary(n)}
              </option>
            ))}
          </select>
        </div>
      </FilterSection>

      <FilterSection title="Category" idPrefix={idPrefix} open={open.category} onToggle={() => toggleOpen('category')}>
        <label htmlFor={`${idPrefix}filter-category`} className="sr-only">
          Category
        </label>
        <select
          id={`${idPrefix}filter-category`}
          value={draft.category}
          onChange={(e) => onDraftChange({ ...draft, category: e.target.value })}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm text-navy outline-none focus:border-teal"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </FilterSection>

      <Button variant="teal" className="mt-5 w-full" onClick={onApply}>
        Show Results
      </Button>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 w-full text-center text-sm font-semibold text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Reset Filters
      </button>
    </aside>
  )
}
