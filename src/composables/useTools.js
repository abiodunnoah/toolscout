import { onMounted, ref } from 'vue'

/** Dev: JSON Server at :3001. Production build: the static copy in /api. */
function endpoint() {
  const explicit = import.meta.env.VITE_API_URL
  if (explicit) return `${explicit.replace(/\/$/, '')}/tools`
  return import.meta.env.DEV ? 'http://localhost:3001/tools' : '/api/tools.json'
}

/** Drop malformed records so bad data can never crash the UI. */
function isValidTool(tool) {
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

export function useTools() {
  const tools = ref([])
  const loading = ref(true)
  const error = ref(null)

  let requestId = 0
  let controller = null

  async function load() {
    const id = ++requestId
    controller?.abort()
    controller = new AbortController()

    loading.value = true
    error.value = null

    try {
      const response = await fetch(endpoint(), {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`Request failed (${response.status})`)

      const payload = await response.json()
      const list = Array.isArray(payload) ? payload : payload?.tools
      if (!Array.isArray(list)) throw new Error('Unexpected data format')

      if (id !== requestId) return
      tools.value = list.filter(isValidTool)
    } catch (err) {
      if (id !== requestId || err.name === 'AbortError') return
      error.value = err instanceof Error ? err.message : 'Unknown error'
      tools.value = []
    } finally {
      if (id === requestId) loading.value = false
    }
  }

  onMounted(load)

  return { tools, loading, error, retry: load }
}
