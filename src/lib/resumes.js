import { api } from './api'
import { auth } from './auth'
import { getSupabaseClient, isSupabaseConfigured } from './supabase'

const MAX_BYTES = 5 * 1024 * 1024

export async function listSeekerResumes(token) {
  const data = await api('job-seeker/resumes', { method: 'GET' }, token)
  return data?.items ?? []
}

export function validateResumeFile(file) {
  if (!file) return 'Choose a PDF file to upload.'
  if (file.type !== 'application/pdf') {
    return 'Only PDF resumes are accepted.'
  }
  if (file.size < 1 || file.size > MAX_BYTES) {
    return 'Resume must be between 1 byte and 5 MB.'
  }
  return null
}

function buildStoragePath(userId, originalName) {
  const safe = originalName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200)
  return `${userId}/${Date.now()}-${safe}`
}

/**
 * 1) Upload PDF to Supabase bucket `resumes`
 * 2) Register via POST job-seeker/resumes
 * 3) Set profile default_resume_path
 */
export async function uploadAndRegisterResume(file, { userId, token, session }) {
  const validationError = validateResumeFile(file)
  if (validationError) {
    throw new Error(validationError)
  }
  if (!userId) {
    throw new Error('Sign in again to upload a resume.')
  }
  if (!isSupabaseConfigured()) {
    throw new Error('Resume storage is not configured on this site.')
  }

  const storagePath = buildStoragePath(userId, file.name)
  const supabase = getSupabaseClient()

  if (session?.access_token && session?.refresh_token) {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    })
    if (sessionError) {
      throw new Error(sessionError.message || 'Could not authenticate for file upload.')
    }
  }

  const { error: uploadError } = await supabase.storage.from('resumes').upload(storagePath, file, {
    contentType: 'application/pdf',
    upsert: false,
  })

  if (uploadError) {
    throw new Error(uploadError.message || 'Failed to upload file to storage.')
  }

  const registered = await api(
    'job-seeker/resumes',
    {
      method: 'POST',
      body: JSON.stringify({
        path: storagePath,
        original_name: file.name.slice(0, 255),
        size_bytes: file.size,
        content_type: 'application/pdf',
      }),
    },
    token,
  )

  await auth.updateProfile({ default_resume_path: storagePath }, token)

  return registered?.resume ?? registered
}
