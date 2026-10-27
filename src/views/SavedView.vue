<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ToolGrid from '../components/tools/ToolGrid.vue'
import EmptyState from '../components/tools/EmptyState.vue'
import LoadingState from '../components/tools/LoadingState.vue'
import ErrorState from '../components/tools/ErrorState.vue'
import Button from '../components/ui/Button.vue'
import { useTools } from '../composables/useTools.js'
import { useShortlistStore } from '../stores/shortlist.js'

const router = useRouter()
const shortlist = useShortlistStore()
const { tools, loading, error, retry } = useTools()

/** Keep the order the user saved them in, and skip ids that are no longer in the data. */
const savedTools = computed(() =>
  shortlist.ids
    .map((id) => tools.value.find((tool) => tool.id === id))
    .filter(Boolean),
)

const errorMessage = computed(() =>
  error.value ? `We couldn't load the tools (${error.value}).` : undefined,
)
</script>

<template>
  <section aria-labelledby="saved-heading">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1
          id="saved-heading"
          class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Your shortlist
        </h1>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Tools you saved. They stay in this browser until you remove them.
        </p>
      </div>
      <p
        v-if="shortlist.count && !loading && !error"
        class="text-sm text-slate-600 dark:text-slate-400"
        role="status"
        aria-live="polite"
      >
        <span class="font-semibold text-slate-900 dark:text-white">
          {{ shortlist.count }}
        </span>
        {{ shortlist.count === 1 ? 'tool saved' : 'tools saved' }}
      </p>
    </div>

    <LoadingState v-if="loading" />

    <ErrorState
      v-else-if="error"
      :message="errorMessage"
      class="mt-6"
      @retry="retry"
    />

    <div v-else-if="savedTools.length" class="mt-6">
      <ToolGrid
        :tools="savedTools"
        :saved-ids="shortlist.ids"
        @toggle-save="shortlist.toggle"
      />

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <Button variant="secondary" @click="shortlist.clear()">Clear shortlist</Button>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Removing a tool here also removes it from the finder.
        </p>
      </div>
    </div>

    <EmptyState
      v-else
      class="mt-6"
      title="Your shortlist is empty"
      message="Save a tool from the finder and it will show up here."
      action-label="Find tools"
      @action="router.push('/')"
    />
  </section>
</template>
