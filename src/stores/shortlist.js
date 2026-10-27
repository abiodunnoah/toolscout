import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'toolscout:shortlist'

/**
 * Read the saved ids from the browser. Anything unexpected (blocked storage,
 * old data, a broken string) falls back to an empty list.
 */
function readIds() {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function writeIds(ids) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Storage can be full or blocked (private mode). The list still works in memory.
  }
}

export const useShortlistStore = defineStore('shortlist', () => {
  const ids = ref(readIds())

  const count = computed(() => ids.value.length)

  function has(id) {
    return ids.value.includes(id)
  }

  function toggle(id) {
    ids.value = has(id) ? ids.value.filter((item) => item !== id) : [...ids.value, id]
  }

  function remove(id) {
    ids.value = ids.value.filter((item) => item !== id)
  }

  function clear() {
    ids.value = []
  }

  watch(ids, writeIds, { deep: true })

  return { ids, count, has, toggle, remove, clear }
})
