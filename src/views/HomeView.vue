<script setup>
import { computed, ref } from 'vue'
import SearchBar from '../components/tools/SearchBar.vue'
import FilterGroup from '../components/tools/FilterGroup.vue'
import SortSelect from '../components/tools/SortSelect.vue'
import ToolGrid from '../components/tools/ToolGrid.vue'
import EmptyState from '../components/tools/EmptyState.vue'
import LoadingState from '../components/tools/LoadingState.vue'
import ErrorState from '../components/tools/ErrorState.vue'
import Button from '../components/ui/Button.vue'
import { useFilters } from '../composables/useFilters.js'
import { useTools } from '../composables/useTools.js'
import { useShortlistStore } from '../stores/shortlist.js'

const shortlist = useShortlistStore()
const { tools, loading, error, retry } = useTools()

const {
  query,
  activeCategories,
  activePrices,
  sortBy,
  sortedTools,
  hasActiveFilters,
  toggleCategory,
  togglePrice,
  clearFilters,
} = useFilters(() => tools.value)

const categories = computed(() => [
  ...new Set(tools.value.map((tool) => tool.category)),
])
const prices = ['Free', 'Freemium', 'Paid']

const errorMessage = computed(() =>
  error.value ? `We couldn't load the tools (${error.value}).` : undefined,
)

const resultsSection = ref(null)
function onSearch() {
  resultsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div>
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

        <SearchBar v-model="query" @submit="onSearch" />
      </div>
    </section>

    <!-- Filters + results -->
    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside aria-labelledby="filters-heading" class="lg:sticky lg:top-24 lg:self-start">
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <h2
            id="filters-heading"
            class="text-sm font-semibold text-slate-900 dark:text-white"
          >
            Filters
          </h2>
          <div class="mt-4 space-y-5">
            <FilterGroup
              legend="Category"
              :options="categories"
              :active="activeCategories"
              @toggle="toggleCategory"
            />
            <FilterGroup
              legend="Price"
              :options="prices"
              :active="activePrices"
              @toggle="togglePrice"
            />

            <Button
              v-if="hasActiveFilters"
              variant="secondary"
              size="sm"
              class="w-full"
              @click="clearFilters"
            >
              Clear filters
            </Button>
          </div>
        </div>
      </aside>

      <section
        ref="resultsSection"
        aria-labelledby="results-heading"
        :aria-busy="loading"
        class="scroll-mt-24"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 id="results-heading" class="sr-only">Results</h2>
          <p
            v-if="!loading && !error"
            class="text-sm text-slate-600 dark:text-slate-400"
            role="status"
            aria-live="polite"
          >
            <span class="font-semibold text-slate-900 dark:text-white">
              {{ sortedTools.length }}
            </span>
            {{ sortedTools.length === 1 ? 'tool' : 'tools' }} found
          </p>
          <SortSelect v-model="sortBy" />
        </div>

        <LoadingState v-if="loading" />
        <ErrorState v-else-if="error" :message="errorMessage" @retry="retry" />
        <ToolGrid
          v-else-if="sortedTools.length"
          :tools="sortedTools"
          :saved-ids="shortlist.ids"
          @toggle-save="shortlist.toggle"
        />
        <EmptyState v-else @action="clearFilters" />
      </section>
    </div>
  </div>
</template>
