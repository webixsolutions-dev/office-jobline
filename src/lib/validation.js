/** Client-side validators aligned with jooblie-shared-backend Zod schemas. */

export function isBlank(value) {
  return value == null || String(value).trim() === ''
}

export function validateEmail(email) {
  if (isBlank(email)) return 'Enter your email address.'
  const trimmed = email.trim()
  if (trimmed.length > 320) return 'Email must be 320 characters or fewer.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address.'
  return null
}

export function validatePassword(password, { forSignUp = false } = {}) {
  if (isBlank(password)) {
    return forSignUp ? 'Create a password (at least 8 characters).' : 'Enter your password.'
  }
  if (password.length < 8) return 'Password must be at least 8 characters.'
  if (password.length > 200) return 'Password must be 200 characters or fewer.'
  return null
}

export function validatePersonName(name, label = 'Name') {
  if (isBlank(name)) return `Enter your ${label.toLowerCase()}.`
  const trimmed = name.trim()
  if (trimmed.length < 2) return `${label} must be at least 2 characters.`
  if (trimmed.length > 160) return `${label} must be 160 characters or fewer.`
  return null
}

export function validateFullNameFromParts(firstName, lastName) {
  const firstErr = validatePersonName(firstName, 'First name')
  if (firstErr) return { firstName: firstErr, lastName: null, name: null }
  const lastErr = validatePersonName(lastName, 'Last name')
  if (lastErr) return { firstName: null, lastName: lastErr, name: null }
  const full = `${firstName.trim()} ${lastName.trim()}`
  if (full.length > 160) {
    return {
      firstName: null,
      lastName: null,
      name: 'Combined name must be 160 characters or fewer.',
    }
  }
  return { firstName: null, lastName: null, name: null }
}

export function validateUrl(url, { required = true, label = 'Website', max = 1000 } = {}) {
  if (isBlank(url)) {
    return required ? `Enter your ${label.toLowerCase()}.` : null
  }
  const trimmed = url.trim()
  if (trimmed.length > max) return `${label} must be ${max} characters or fewer.`
  try {
    const parsed = new URL(trimmed)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return `Enter a valid ${label.toLowerCase()} URL (https://...).`
    }
  } catch {
    return `Enter a valid ${label.toLowerCase()} URL (https://...).`
  }
  return null
}

export function validateCompanyName(name) {
  if (isBlank(name)) return 'Enter your company name.'
  const trimmed = name.trim()
  if (trimmed.length < 2) return 'Company name must be at least 2 characters.'
  if (trimmed.length > 180) return 'Company name must be 180 characters or fewer.'
  return null
}

export function validateCompanyRegistrationNumber(value) {
  if (isBlank(value)) return 'Enter your company registration number.'
  const trimmed = value.trim()
  if (trimmed.length < 2) return 'Registration number must be at least 2 characters.'
  if (trimmed.length > 180) return 'Registration number must be 180 characters or fewer.'
  return null
}

export function validateSignInFields({ email, password }) {
  const errors = {}
  const emailErr = validateEmail(email)
  if (emailErr) errors.email = emailErr
  const passwordErr = validatePassword(password)
  if (passwordErr) errors.password = passwordErr
  return errors
}

export function validateSignUpFields({
  firstName,
  lastName,
  email,
  password,
  role,
  companyName,
  companyWebsite,
  companyRegistrationNumber,
  agreeTerms,
}) {
  const errors = {}

  const nameParts = validateFullNameFromParts(firstName, lastName)
  if (nameParts.firstName) errors.firstName = nameParts.firstName
  if (nameParts.lastName) errors.lastName = nameParts.lastName
  if (nameParts.name) errors.name = nameParts.name

  const emailErr = validateEmail(email)
  if (emailErr) errors.email = emailErr

  const passwordErr = validatePassword(password, { forSignUp: true })
  if (passwordErr) errors.password = passwordErr

  if (!agreeTerms) {
    errors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy.'
  }

  if (role === 'recruiter') {
    const companyErr = validateCompanyName(companyName)
    if (companyErr) errors.companyName = companyErr
    const websiteErr = validateUrl(companyWebsite, { label: 'Company website' })
    if (websiteErr) errors.companyWebsite = websiteErr
    const regErr = validateCompanyRegistrationNumber(companyRegistrationNumber)
    if (regErr) errors.companyRegistrationNumber = regErr
  }

  return errors
}

export function validateJobTitle(title) {
  if (isBlank(title)) return 'Enter a job title.'
  const t = title.trim()
  if (t.length < 3) return 'Job title must be at least 3 characters.'
  if (t.length > 180) return 'Job title must be 180 characters or fewer.'
  return null
}

export function validateJobDescription(description) {
  if (isBlank(description)) return 'Enter a job description.'
  const t = description.trim()
  if (t.length < 20) return 'Description must be at least 20 characters.'
  if (t.length > 30000) return 'Description must be 30,000 characters or fewer.'
  return null
}

export function validateRecruiterJobForm({
  title,
  category_id,
  employment_type,
  description,
  location_province,
  is_remote,
  workplace_type,
}) {
  const errors = {}
  const titleErr = validateJobTitle(title)
  if (titleErr) errors.title = titleErr

  if (isBlank(category_id)) errors.category_id = 'Select a job category.'

  if (isBlank(employment_type)) errors.employment_type = 'Select an employment type.'

  const descErr = validateJobDescription(description)
  if (descErr) errors.description = descErr

  const remote =
    is_remote === true ||
    workplace_type === 'remote'
  if (!remote && isBlank(location_province)) {
    errors.location_province = 'Select a province for on-site jobs.'
  }

  return errors
}

export function validateDashboardJobPostingForm(values) {
  const errors = {}
  const titleErr = validateJobTitle(values.jobTitle)
  if (titleErr) errors.jobTitle = titleErr

  if (isBlank(values.category)) {
    errors.category = 'Select a job category.'
  } else if (!/^\d+$/.test(String(values.category).trim())) {
    errors.category = 'Choose a category from the list (do not type a custom value).'
  }
  if (isBlank(values.employmentType)) errors.employmentType = 'Select an employment type.'

  const descErr = validateJobDescription(values.description)
  if (descErr) errors.description = descErr

  return errors
}

export function validateProfilePatch({
  full_name,
  phone,
  headline,
  location_province,
  location_city,
  skills,
}) {
  const errors = {}

  if (full_name !== undefined) {
    const nameErr = validatePersonName(full_name, 'Full name')
    if (nameErr) errors.full_name = nameErr
  }

  if (phone !== undefined && phone !== null && String(phone).trim() !== '') {
    if (String(phone).length > 40) errors.phone = 'Phone number is too long.'
  }

  if (headline !== undefined && headline !== null && String(headline).length > 200) {
    errors.headline = 'Headline must be 200 characters or fewer.'
  }

  if (skills !== undefined && Array.isArray(skills)) {
    if (skills.length > 50) errors.skills = 'You can list at most 50 skills.'
    const tooLong = skills.find((s) => String(s).length > 80)
    if (tooLong) errors.skills = 'Each skill must be 80 characters or fewer.'
  }

  if (location_province !== undefined && location_province !== null) {
    if (String(location_province).length > 80) {
      errors.location_province = 'Province must be 80 characters or fewer.'
    }
  }

  if (location_city !== undefined && location_city !== null) {
    if (String(location_city).length > 80) {
      errors.location_city = 'City must be 80 characters or fewer.'
    }
  }

  return errors
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0
}
