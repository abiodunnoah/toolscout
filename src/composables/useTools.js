import { onMounted, ref } from 'vue'
import { fetchTools } from '../services/tools.js'

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
      const list = await fetchTools({ signal: controller.signal })
      if (id !== requestId) return
      tools.value = list
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
