/**
 * Parse Jooblie shared backend error envelope: { error: { code, message, details? } }
 */

export function getApiErrorMessage(err) {
  const envelope = err?.data?.error
  if (envelope?.message) return envelope.message
  return err?.message || 'Something went wrong. Please try again.'
}

export function getApiErrorCode(err) {
  return err?.data?.error?.code ?? null
}

/** Map Zod flatten() fieldErrors from VALIDATION_ERROR responses. */
export function mapApiFieldErrors(err) {
  const details = err?.data?.error?.details
  if (!details || typeof details !== 'object') return {}

  const fieldErrors = details.fieldErrors
  if (!fieldErrors || typeof fieldErrors !== 'object') return {}

  const mapped = {}
  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (Array.isArray(messages) && messages.length > 0) {
      mapped[key] = messages[0]
    }
  }
  return mapped
}

/**
 * Prefer server field errors; otherwise a single form-level message for non-validation failures.
 */
export function resolveSubmitError(err, fallbackMessage) {
  const code = getApiErrorCode(err)
  if (code === 'VALIDATION_ERROR') {
    const fields = mapApiFieldErrors(err)
    if (Object.keys(fields).length > 0) {
      return { fieldErrors: fields, formError: null }
    }
  }
  return {
    fieldErrors: {},
    formError: getApiErrorMessage(err) || fallbackMessage,
  }
}
