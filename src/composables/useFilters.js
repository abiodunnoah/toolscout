import { computed, ref } from 'vue'

const PRICE_ORDER = { Free: 0, Freemium: 1, Paid: 2 }

/**
 * Search, filtering and sorting over a tool list.
 * `getTools` is a function so the source can be static now and async later.
 */
export function useFilters(getTools) {
  const query = ref('')
  const activeCategories = ref([])
  const activePrices = ref([])
  const sortBy = ref('featured')

  const filteredTools = computed(() => {
    const q = query.value.trim().toLowerCase()
    return getTools().filter((tool) => {
      const matchesQuery =
        q === '' ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        tool.tasks.some((task) => task.toLowerCase().includes(q))
      const matchesCategory =
        activeCategories.value.length === 0 ||
        activeCategories.value.includes(tool.category)
      const matchesPrice =
        activePrices.value.length === 0 || activePrices.value.includes(tool.price)
      return matchesQuery && matchesCategory && matchesPrice
    })
  })

  const sortedTools = computed(() => {
    const list = [...filteredTools.value]
    if (sortBy.value === 'price') {
      list.sort(
        (a, b) =>
          PRICE_ORDER[a.price] - PRICE_ORDER[b.price] || a.name.localeCompare(b.name),
      )
    } else if (sortBy.value === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  })

  const hasActiveFilters = computed(
    () =>
      query.value.trim() !== '' ||
      activeCategories.value.length > 0 ||
      activePrices.value.length > 0,
  )

  function toggleValue(list, value) {
    return list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value]
  }

  function toggleCategory(category) {
    activeCategories.value = toggleValue(activeCategories.value, category)
  }

  function togglePrice(price) {
    activePrices.value = toggleValue(activePrices.value, price)
  }

  function clearFilters() {
    query.value = ''
    activeCategories.value = []
    activePrices.value = []
  }

  return {
    query,
    activeCategories,
    activePrices,
    sortBy,
    filteredTools,
    sortedTools,
    hasActiveFilters,
    toggleCategory,
    togglePrice,
    clearFilters,
  }
}
