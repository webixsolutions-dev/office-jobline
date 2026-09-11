// src/lib/api.js
// Custom fetch wrapper for dynamic backend communication

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/$/, '');
const SITE_SLUG = import.meta.env.VITE_SITE_SLUG || 'service-care';

export async function api(path, init = {}, token) {
  const url = `${BASE_URL}/${path.replace(/^\//, '')}`;

  const headers = {
    'X-Site-Slug': SITE_SLUG,
    ...init.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (init.body && !(init.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch (e) {
      // Ignored
    }
    const message = errorData?.message || `HTTP error! Status: ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = errorData;
    throw err;
  }

  // Handle empty or 204 responses
  if (response.status === 204) {
    return null;
  }

  return response.json();
}
