import { computed, ref } from 'vue'

/** In-memory shortlist. Persistence (Pinia + localStorage) arrives in Week 3. */
export function useShortlist() {
  const savedIds = ref([])

  const savedCount = computed(() => savedIds.value.length)

  function toggleSave(id) {
    savedIds.value = savedIds.value.includes(id)
      ? savedIds.value.filter((item) => item !== id)
      : [...savedIds.value, id]
  }

  function isSaved(id) {
    return savedIds.value.includes(id)
  }

  return { savedIds, savedCount, toggleSave, isSaved }
}
