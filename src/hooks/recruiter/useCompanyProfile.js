import { useState, useEffect } from 'react'
import { getMyCompanies, createRecruiterCompany } from '../../lib/jobs'
import { mapCompanyToForm } from '../../lib/mappers'
import { useAuth } from '../useAuth'

export function useCompanyProfile() {
  const { token, isAuthenticated } = useAuth()
  const [rawCompany, setRawCompany] = useState(null)
  const [company, setCompany] = useState(mapCompanyToForm(null))
  const [formData, setFormData] = useState(mapCompanyToForm(null))
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated || !token) {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      try {
        const companies = await getMyCompanies(token)
        setRawCompany(companies[0] || null)
        const mapped = mapCompanyToForm(companies[0] || null)
        setCompany(mapped)
        setFormData(mapped)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [token, isAuthenticated])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!token) return
    setIsSaving(true)
    setError(null)
    try {
      if (company.id) {
        setCompany({ ...company, ...formData })
        setFormData({ ...company, ...formData })
      } else {
        const res = await createRecruiterCompany(
          {
            name: formData.name,
            website: formData.website,
            registration_number: formData.registration_number || 'N/A',
            description: formData.description || undefined,
          },
          token,
        )
        setRawCompany(res.company)
        const mapped = mapCompanyToForm(res.company)
        setCompany(mapped)
        setFormData(mapped)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    rawCompany,
    company,
    formData,
    isLoading,
    isSaving,
    error,
    handleChange,
    handleSave,
    setFormData,
  }
}
