<script setup>
import { computed, ref } from 'vue'
import ToolCard from './components/ToolCard.vue'
import tools from './data/tools.js'

// --- Data -----------------------------------------------------------------
const categories = [...new Set(tools.map((tool) => tool.category))]
const prices = ['Free', 'Freemium', 'Paid']
const priceOrder = { Free: 0, Freemium: 1, Paid: 2 }

// --- State ----------------------------------------------------------------
const query = ref('')
const activeCategories = ref([])
const activePrices = ref([])
const savedIds = ref([])
const sortBy = ref('featured')
const searchInput = ref(null)
const resultsSection = ref(null)

// --- Behaviour 1: live search + filters -----------------------------------
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

const sortedTools = computed(() => {
  const list = [...filteredTools.value]
  if (sortBy.value === 'price') {
    list.sort(
      (a, b) => priceOrder[a.price] - priceOrder[b.price] || a.name.localeCompare(b.name),
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

// --- Behaviour 2: shortlist ------------------------------------------------
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

function clearSearch() {
  query.value = ''
  searchInput.value?.focus()
}

function onSearch() {
  resultsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// --- Behaviour 3: theme (system-aware; persistence arrives in Week 3) ------
const media = window.matchMedia('(prefers-color-scheme: dark)')
const isDark = ref(media.matches)
let userChoseTheme = false

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}
applyTheme()

media.addEventListener('change', (event) => {
  if (!userChoseTheme) {
    isDark.value = event.matches
    applyTheme()
  }
})

function toggleTheme() {
  userChoseTheme = true
  isDark.value = !isDark.value
  applyTheme()
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header
      class="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <a
          href="/"
          class="flex items-center gap-2 rounded-lg text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <span
            class="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"
            aria-hidden="true"
          >
            <svg
              class="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
              />
            </svg>
          </span>
          ToolScout
        </a>

        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          :aria-pressed="isDark"
          @click="toggleTheme"
        >
          <svg
            v-if="isDark"
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
          <span class="sr-only">Toggle dark mode</span>
        </button>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <!-- Hero + search -->
      <section
        class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-slate-900 sm:px-10"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-950/40"
          aria-hidden="true"
        ></div>
        <div class="relative">
          <h1
            class="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
          >
            Find the right AI tool for your task
          </h1>
          <p class="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Describe what you need to get done, then compare and shortlist the tools
            that fit.
          </p>

          <form class="mt-6 max-w-2xl" role="search" @submit.prevent="onSearch">
            <label for="tool-search" class="sr-only">What do you need to do?</label>
            <div class="flex flex-col gap-3 sm:flex-row">
              <div class="relative flex-1">
                <svg
                  class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                  />
                </svg>
                <input
                  id="tool-search"
                  ref="searchInput"
                  v-model="query"
                  type="search"
                  placeholder="e.g. summarise a long PDF"
                  class="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-10 text-slate-900 transition placeholder:text-slate-500 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <button
                  v-if="query"
                  type="button"
                  class="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="Clear search"
                  @click="clearSearch"
                >
                  <svg
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                class="h-12 rounded-xl bg-indigo-600 px-6 font-medium text-white transition hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Filters + results -->
      <div class="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside aria-labelledby="filters-heading" class="lg:sticky lg:top-24 lg:self-start">
          <div
            class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 id="filters-heading" class="text-sm font-semibold text-slate-900 dark:text-white">
              Filters
            </h2>
            <div class="mt-4 space-y-5">
              <fieldset>
                <legend class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Category
                </legend>
                <div class="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                  <button
                    v-for="category in categories"
                    :key="category"
                    type="button"
                    :aria-pressed="activeCategories.includes(category)"
                    class="rounded-full border px-3 py-1.5 text-sm font-medium transition"
                    :class="
                      activeCategories.includes(category)
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                    "
                    @click="toggleCategory(category)"
                  >
                    {{ category }}
                  </button>
                </div>
              </fieldset>

              <fieldset>
                <legend class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Price
                </legend>
                <div class="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                  <button
                    v-for="price in prices"
                    :key="price"
                    type="button"
                    :aria-pressed="activePrices.includes(price)"
                    class="rounded-full border px-3 py-1.5 text-sm font-medium transition"
                    :class="
                      activePrices.includes(price)
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
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
                class="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                @click="clearFilters"
              >
                Clear filters
              </button>
            </div>
          </div>
        </aside>

        <section
          ref="resultsSection"
          aria-labelledby="results-heading"
          class="scroll-mt-24"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 id="results-heading" class="sr-only">Results</h2>
            <p
              class="text-sm text-slate-500 dark:text-slate-400"
              role="status"
              aria-live="polite"
            >
              <span class="font-semibold text-slate-900 dark:text-white">
                {{ sortedTools.length }}
              </span>
              {{ sortedTools.length === 1 ? 'tool' : 'tools' }} found
            </p>
            <div class="flex items-center gap-2">
              <label for="sort" class="text-sm text-slate-500 dark:text-slate-400">Sort</label>
              <select
                id="sort"
                v-model="sortBy"
                class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A–Z)</option>
                <option value="price">Price (free first)</option>
              </select>
            </div>
          </div>

          <ul
            v-if="sortedTools.length"
            class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <li v-for="tool in sortedTools" :key="tool.id">
              <ToolCard
                :tool="tool"
                :saved="isSaved(tool.id)"
                @toggle-save="toggleSave"
              />
            </li>
          </ul>

          <div
            v-else
            class="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700"
          >
            <div
              class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
              aria-hidden="true"
            >
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                />
              </svg>
            </div>
            <p class="mt-4 font-semibold text-slate-900 dark:text-white">
              No tools match your search
            </p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try a different task, or clear your filters.
            </p>
            <button
              type="button"
              class="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              @click="clearFilters"
            >
              Clear filters
            </button>
          </div>
        </section>
      </div>
    </main>

    <footer class="border-t border-slate-200 dark:border-slate-800">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-slate-400"
      >
        <p>
          Shortlist:
          <span class="font-semibold text-slate-900 dark:text-white">{{ savedCount }}</span>
        </p>
        <p>ToolScout · Vue 3 + Tailwind CSS · Week 1</p>
      </div>
    </footer>
  </div>
</template>
