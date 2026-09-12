// src/lib/api.js — Jooblie shared backend (/api/v1)

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1').replace(
  /\/$/,
  '',
)
export const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'office-jobs'

export async function api(path, init = {}, token) {
  const normalizedPath = path.replace(/^\//, '')
  const url = `${BASE_URL}/${normalizedPath}`

  const headers = {
    'X-Site-Slug': SITE_SLUG,
    ...init.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (init.body && !(init.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, {
    ...init,
    headers,
  })

  if (!response.ok) {
    let data = null
    try {
      data = await response.json()
    } catch {
      // ignored
    }
    const envelope = data?.error
    const message =
      envelope?.message || data?.message || `Request failed (${response.status})`
    const err = new Error(message)
    err.status = response.status
    err.data = data
    throw err
  }

  if (response.status === 204) {
    return null
  }

  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}
