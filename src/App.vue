<script setup>
import { computed, ref } from 'vue'
import ToolCard from './components/ToolCard.vue'
import tools from './data/tools.js'

const query = ref('')
const activeCategories = ref([])
const activePrices = ref([])
const savedIds = ref([])
const theme = ref('light')
const resultsSection = ref(null)

const categories = [...new Set(tools.map((tool) => tool.category))]
const prices = ['Free', 'Freemium', 'Paid']

// Behaviour 1 — live search + filtering.
const filteredTools = computed(() => {
  const q = query.value.trim().toLowerCase()
  return tools.filter((tool) => {
    const matchesQuery =
      q === '' ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(q))
    const matchesCategory =
      activeCategories.value.length === 0 ||
      activeCategories.value.includes(tool.category)
    const matchesPrice =
      activePrices.value.length === 0 || activePrices.value.includes(tool.price)
    return matchesQuery && matchesCategory && matchesPrice
  })
})

const hasActiveFilters = computed(
  () =>
    query.value.trim() !== '' ||
    activeCategories.value.length > 0 ||
    activePrices.value.length > 0,
)

// Behaviour 2 — save to shortlist.
const savedCount = computed(() => savedIds.value.length)

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

function toggleSave(id) {
  savedIds.value = toggleValue(savedIds.value, id)
}

function isSaved(id) {
  return savedIds.value.includes(id)
}

function clearFilters() {
  query.value = ''
  activeCategories.value = []
  activePrices.value = []
}

function onSearch() {
  resultsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Behaviour 3 — theme toggle (persistence arrives in Week 3).
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header
      class="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="/"
          class="flex items-center gap-2 rounded text-lg font-bold text-slate-900 dark:text-slate-100"
        >
          <span aria-hidden="true">🧭</span>
          ToolScout
        </a>
        <button
          type="button"
          class="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          :aria-pressed="theme === 'dark'"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? '☀ Light' : '☾ Dark' }}
          <span class="sr-only">theme</span>
        </button>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Find the right AI tool for your task
      </h1>
      <p class="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
        Describe what you need to get done, then compare and shortlist the tools that fit.
      </p>

      <form class="mt-6" role="search" @submit.prevent="onSearch">
        <label
          for="tool-search"
          class="block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          What do you need to do?
        </label>
        <div class="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="tool-search"
            v-model="query"
            type="search"
            placeholder="e.g. summarise a long PDF"
            class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            type="submit"
            class="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>

      <div class="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside aria-labelledby="filters-heading">
          <h2 id="filters-heading" class="sr-only">Filters</h2>
          <div class="space-y-6">
            <fieldset>
              <legend class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Category
              </legend>
              <div class="mt-2 flex flex-wrap gap-2 md:flex-col md:gap-1">
                <button
                  v-for="category in categories"
                  :key="category"
                  type="button"
                  :aria-pressed="activeCategories.includes(category)"
                  class="rounded-full border px-3 py-1 text-sm md:w-full md:rounded-md md:text-left"
                  :class="
                    activeCategories.includes(category)
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
                  "
                  @click="toggleCategory(category)"
                >
                  {{ category }}
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Price
              </legend>
              <div class="mt-2 flex flex-wrap gap-2 md:flex-col md:gap-1">
                <button
                  v-for="price in prices"
                  :key="price"
                  type="button"
                  :aria-pressed="activePrices.includes(price)"
                  class="rounded-full border px-3 py-1 text-sm md:w-full md:rounded-md md:text-left"
                  :class="
                    activePrices.includes(price)
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
                  "
                  @click="togglePrice(price)"
                >
                  {{ price }}
                </button>
              </div>
            </fieldset>

            <button
              v-if="hasActiveFilters"
              type="button"
              class="rounded text-sm font-medium text-indigo-600 underline hover:text-indigo-800 dark:text-indigo-400"
              @click="clearFilters"
            >
              Clear filters
            </button>
          </div>
        </aside>

        <section ref="resultsSection" aria-labelledby="results-heading" class="scroll-mt-4">
          <h2 id="results-heading" class="sr-only">Results</h2>
          <p
            class="text-sm text-slate-600 dark:text-slate-300"
            role="status"
            aria-live="polite"
          >
            {{ filteredTools.length }}
            {{ filteredTools.length === 1 ? 'tool' : 'tools' }} found
          </p>

          <ul v-if="filteredTools.length" class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <li v-for="tool in filteredTools" :key="tool.id">
              <ToolCard
                :tool="tool"
                :saved="isSaved(tool.id)"
                @toggle-save="toggleSave"
              />
            </li>
          </ul>

          <div
            v-else
            class="mt-4 rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-600"
          >
            <p class="font-medium text-slate-900 dark:text-slate-100">
              No tools match your search.
            </p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Try a different task, or clear your filters.
            </p>
            <button
              type="button"
              class="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              @click="clearFilters"
            >
              Clear filters
            </button>
          </div>
        </section>
      </div>
    </main>

    <footer
      class="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between dark:text-slate-300"
      >
        <p>
          Shortlist:
          <span class="font-semibold text-slate-900 dark:text-slate-100">
            {{ savedCount }}
          </span>
        </p>
        <p>ToolScout · Vue 3 + Tailwind CSS · Week 1</p>
      </div>
    </footer>
  </div>
</template>
