/**
 * All reads of the tool dataset live here, so views and components never
 * build URLs or parse responses themselves.
 *
 * Development uses JSON Server on port 3001. The production build uses the
 * static copy made by scripts/sync-data.mjs, so the live site needs no server.
 */

const DEV_API = 'http://localhost:3001'

/** The URL the tool list is read from in the current environment. */
export function toolsEndpoint() {
  const explicit = import.meta.env.VITE_API_URL
  if (explicit) return `${explicit.replace(/\/$/, '')}/tools`
  return import.meta.env.DEV ? `${DEV_API}/tools` : '/api/tools.json'
}

/** Drop malformed records so bad data can never crash the UI. */
export function isValidTool(tool) {
  return (
    tool &&
    typeof tool.id === 'string' &&
    typeof tool.name === 'string' &&
    typeof tool.category === 'string' &&
    typeof tool.price === 'string' &&
    Array.isArray(tool.tasks) &&
    Array.isArray(tool.tags) &&
    Array.isArray(tool.platforms) &&
    Array.isArray(tool.features) &&
    Array.isArray(tool.pros) &&
    Array.isArray(tool.limitations)
  )
}

/**
 * Fetch and validate the tool list.
 * Throws an Error with a short message when the request or the data is bad.
 */
export async function fetchTools({ signal } = {}) {
  const response = await fetch(toolsEndpoint(), {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)

  const payload = await response.json()
  const list = Array.isArray(payload) ? payload : payload?.tools
  if (!Array.isArray(list)) throw new Error('Unexpected data format')

  return list.filter(isValidTool)
}
