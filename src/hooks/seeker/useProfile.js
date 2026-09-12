import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../useAuth'
import { auth } from '../../lib/auth'
import { validateProfilePatch, hasValidationErrors } from '../../lib/validation'
import { getApiErrorMessage, mapApiFieldErrors, getApiErrorCode } from '../../lib/apiErrors'

const emptyProfile = {
  full_name: '',
  email: '',
  phone: '',
  headline: '',
  location_province: '',
  location_city: '',
  skills: [],
  role: 'job_seeker',
  created_at: null,
  default_resume_path: null,
  resume_upload_date: null,
}

export function useProfile() {
  const navigate = useNavigate()
  const { token, user, loadProfile } = useAuth()
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(emptyProfile)
  const [formData, setFormData] = useState({ ...emptyProfile })
  const [skillInput, setSkillInput] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (!user) return
    const next = {
      full_name: user.full_name || '',
      email: user.email || '',
      phone: user.phone || '',
      headline: user.headline || '',
      location_province: user.location_province || '',
      location_city: user.location_city || '',
      skills: user.skills || [],
      role: user.role || 'job_seeker',
      created_at: user.createdAt || user.created_at || null,
      default_resume_path: user.default_resume_path || null,
      resume_upload_date: null,
    }
    setProfile(next)
    setFormData(next)
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    setSaveError('')
  }

  const handleAddSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed) return
    if (trimmed.length > 80) {
      setFieldErrors((prev) => ({
        ...prev,
        skills: 'Each skill must be 80 characters or fewer.',
      }))
      return
    }
    if (formData.skills.length >= 50) {
      setFieldErrors((prev) => ({
        ...prev,
        skills: 'You can list at most 50 skills.',
      }))
      return
    }
    if (!formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }))
      setSkillInput('')
      setFieldErrors((prev) => {
        if (!prev.skills) return prev
        const next = { ...prev }
        delete next.skills
        return next
      })
    }
  }

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setFieldErrors((prev) => ({
          ...prev,
          resume: 'Resume must be a PDF file.',
        }))
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setFieldErrors((prev) => ({
          ...prev,
          resume: 'Resume must be 5 MB or smaller.',
        }))
        return
      }
      setFormData((prev) => ({
        ...prev,
        default_resume_path: file.name,
        resume_upload_date: new Date().toISOString(),
      }))
      setFieldErrors((prev) => {
        if (!prev.resume) return prev
        const next = { ...prev }
        delete next.resume
        return next
      })
    }
  }

  const handleSave = async () => {
    if (!token) {
      setSaveError('Sign in again to update your profile.')
      return
    }

    const patch = {
      full_name: formData.full_name,
      phone: formData.phone || null,
      headline: formData.headline || null,
      location_province: formData.location_province || null,
      location_city: formData.location_city || null,
      skills: formData.skills,
    }

    const errors = validateProfilePatch(patch)
    if (hasValidationErrors(errors)) {
      setFieldErrors(errors)
      setSaveError('Fix the highlighted fields before saving.')
      return
    }

    setIsSaving(true)
    setSaveError('')
    setFieldErrors({})

    try {
      const res = await auth.updateProfile(patch, token)
      const updated = res?.profile ?? patch
      const merged = { ...formData, ...updated }
      setProfile(merged)
      setFormData(merged)
      setIsEditing(false)
      await loadProfile?.()
    } catch (error) {
      if (getApiErrorCode(error) === 'VALIDATION_ERROR') {
        setFieldErrors(mapApiFieldErrors(error))
        setSaveError('')
      } else {
        setSaveError(getApiErrorMessage(error))
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({ ...profile })
    setIsEditing(false)
    setSkillInput('')
    setFieldErrors({})
    setSaveError('')
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    try {
      navigate('/')
    } finally {
      setIsLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return {
    profile,
    formData,
    skillInput,
    setSkillInput,
    isEditing,
    setIsEditing,
    isLoading,
    isSaving,
    showDeleteConfirm,
    setShowDeleteConfirm,
    fileInputRef,
    handleChange,
    handleAddSkill,
    handleRemoveSkill,
    handleKeyDown,
    handleResumeUpload,
    handleSave,
    handleCancel,
    handleDeleteAccount,
    getInitials,
    formatDate,
    fieldErrors,
    saveError,
  }
}
