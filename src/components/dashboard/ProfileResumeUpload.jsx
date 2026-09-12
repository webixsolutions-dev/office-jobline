import { useCallback, useEffect, useRef, useState } from 'react'
import { FiCheck, FiFileText, FiUpload } from 'react-icons/fi'
import Button from '../ui/Button'
import { listSeekerResumes, uploadAndRegisterResume } from '../../lib/resumes'
import { useAuth } from '../../hooks/useAuth'
import { readSession } from '../../lib/auth'

function displayName(pathOrName) {
  if (!pathOrName) return ''
  const part = pathOrName.split('/').pop() || pathOrName
  return part.replace(/^\d+-/, '')
}

export default function ProfileResumeUpload({ defaultResumePath, onUploaded }) {
  const { token, user } = useAuth()
  const inputRef = useRef(null)
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const userId = user?.id

  const refreshList = useCallback(async () => {
    if (!token) {
      setResumes([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const items = await listSeekerResumes(token)
      setResumes(items)
      setError('')
    } catch (err) {
      setError(err.message || 'Could not load your resumes.')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    refreshList()
  }, [refreshList])

  const handleFile = async (file) => {
    if (!file || !token) return
    setUploading(true)
    setError('')
    setSuccess('')
    try {
      const session = readSession()?.session
      await uploadAndRegisterResume(file, {
        userId,
        token,
        session,
      })
      setSuccess('Resume uploaded and ready for job applications.')
      await refreshList()
      onUploaded?.()
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const onInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const activePath = defaultResumePath || resumes.find((r) => r.is_active)?.storage_path

  return (
    <div className="mt-8 border-t border-[var(--color-border)] pt-8">
      <h3 className="font-display text-base font-bold text-[var(--color-text-primary)]">
        Resume (required to apply)
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
        Upload a PDF resume (max 5 MB). It will be sent when you click Apply on job listings.
      </p>

      {error && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {success}
        </p>
      )}

      {loading ? (
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">Loading resumes…</p>
      ) : activePath ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-teal-light)] text-[var(--color-teal)]">
            <FiFileText className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
              <FiCheck className="h-4 w-4 text-[var(--color-teal)]" aria-hidden />
              Resume on file
            </p>
            <p className="truncate text-sm text-[var(--color-text-secondary)]">
              {displayName(activePath)}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-amber-900 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          No resume uploaded yet. Add one below before applying to jobs.
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={onInputChange}
      />

      <div className="mt-4">
        <Button
          type="button"
          variant="teal"
          icon={FiUpload}
          disabled={uploading || !token}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? 'Uploading…' : activePath ? 'Replace resume (PDF)' : 'Upload resume (PDF)'}
        </Button>
      </div>

      {resumes.length > 1 && (
        <ul className="mt-4 space-y-2 text-xs text-[var(--color-text-secondary)]">
          {resumes.map((r) => (
            <li key={r.id}>
              {r.original_name}
              {r.storage_path === activePath ? ' · default' : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
