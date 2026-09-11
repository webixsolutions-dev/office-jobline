import { useState } from 'react'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { categories } from '../../constants/categories'

const industryOptions = categories.map((c) => ({ value: c.slug, label: c.title }))

const sizeOptions = [
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-500', label: '201–500 employees' },
  { value: '500+', label: '500+ employees' },
]

export default function CompanyProfileForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [saved, setSaved] = useState(false)

  const setField = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setValues((prev) => ({ ...prev, logoFilename: file.name }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.(values)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Company Name"
        name="name"
        icon={HiOutlineBuildingOffice2}
        value={values.name}
        onChange={setField('name')}
        placeholder="Your company name"
        required
      />

      <div>
        <label
          htmlFor="company-logo"
          className="mb-1.5 block text-sm font-semibold text-[var(--color-text-primary)]"
        >
          Company Logo
        </label>
        <input
          id="company-logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="block w-full text-sm text-[var(--color-text-secondary)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-teal-light)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-teal)]"
        />
        {values.logoFilename && (
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            Selected: {values.logoFilename}
          </p>
        )}
      </div>

      <Select
        label="Industry"
        name="industry"
        value={values.industry}
        onChange={setField('industry')}
        options={industryOptions}
        placeholder="Select industry"
      />

      <Select
        label="Company Size"
        name="size"
        value={values.size}
        onChange={setField('size')}
        options={sizeOptions}
        placeholder="Select company size"
      />

      <Input
        label="Website"
        name="website"
        type="url"
        value={values.website}
        onChange={setField('website')}
        placeholder="https://yourcompany.com"
      />

      <Input
        label="Headquarters Location"
        name="location"
        value={values.location}
        onChange={setField('location')}
        placeholder="City, province"
      />

      <div>
        <label
          htmlFor="company-description"
          className="mb-1.5 block text-sm font-semibold text-[var(--color-text-primary)]"
        >
          Company Description
        </label>
        <textarea
          id="company-description"
          name="description"
          rows={5}
          value={values.description}
          onChange={setField('description')}
          placeholder="Tell candidates about your company…"
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/20"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="teal">Save Changes</Button>
        {saved && (
          <p className="text-sm font-medium text-[var(--status-success-text)]" role="status">
            Company profile saved.
          </p>
        )}
      </div>
    </form>
  )
}
