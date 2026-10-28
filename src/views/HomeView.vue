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
    <!-- Hero -->
    <section class="mx-auto max-w-3xl pb-12 pt-6 text-center sm:pb-20 sm:pt-14">
      <p class="text-xs font-medium uppercase tracking-[0.2em] text-muted">
        Task-first AI tool finder
      </p>
      <h1
        class="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-balance text-ink sm:text-6xl"
      >
        Find the right AI tool for your task
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
        Describe the job. Compare the options. Keep a shortlist.
      </p>
      <div class="mx-auto mt-9 max-w-2xl text-left">
        <SearchBar v-model="query" @submit="onSearch" />
      </div>
    </section>

    <!-- Filters and results -->
    <section
      ref="resultsSection"
      aria-labelledby="results-heading"
      :aria-busy="loading"
      class="scroll-mt-24 border-t border-line pt-6"
    >
      <h2 id="results-heading" class="sr-only">Results</h2>

      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:gap-8">
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
            variant="ghost"
            size="sm"
            class="self-start"
            @click="clearFilters"
          >
            Clear
          </Button>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 lg:justify-end">
          <p
            v-if="!loading && !error"
            class="text-sm text-muted"
            role="status"
            aria-live="polite"
          >
            <span class="tabular-nums text-ink">{{ sortedTools.length }}</span>
            {{ sortedTools.length === 1 ? 'tool' : 'tools' }}
          </p>
          <SortSelect v-model="sortBy" />
        </div>
      </div>

      <LoadingState v-if="loading" />

      <ErrorState
        v-else-if="error"
        :message="errorMessage"
        class="mt-8"
        @retry="retry"
      />

      <ToolGrid
        v-else-if="sortedTools.length"
        :tools="sortedTools"
        :saved-ids="shortlist.ids"
        @toggle-save="shortlist.toggle"
      />

      <EmptyState v-else class="mt-8" @action="clearFilters" />
    </section>
  </div>
</template>
