<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ToolGrid from '../components/tools/ToolGrid.vue'
import EmptyState from '../components/tools/EmptyState.vue'
import LoadingState from '../components/tools/LoadingState.vue'
import ErrorState from '../components/tools/ErrorState.vue'
import Button from '../components/ui/Button.vue'
import { useTools } from '../composables/useTools.js'
import { useShortlistStore } from '../stores/shortlist.js'

const MAX_COMPARE = 3

const router = useRouter()
const shortlist = useShortlistStore()
const { tools, loading, error, retry } = useTools()

const compareIds = ref([])

/** Keep the order the user saved them in, and skip ids that are no longer in the data. */
const savedTools = computed(() =>
  shortlist.ids
    .map((id) => tools.value.find((tool) => tool.id === id))
    .filter(Boolean),
)

/** Drop a comparison pick as soon as its tool leaves the shortlist. */
watch(savedTools, (list) => {
  const available = new Set(list.map((tool) => tool.id))
  compareIds.value = compareIds.value.filter((id) => available.has(id))
})

function openCompare() {
  if (compareIds.value.length >= 2) {
    router.push({ name: 'compare', query: { ids: compareIds.value.join(',') } })
  }
}

const errorMessage = computed(() =>
  error.value ? `We couldn't load the tools (${error.value}).` : undefined,
)
</script>

<template>
  <section aria-labelledby="saved-heading" :aria-busy="loading">
    <header class="border-b border-line pb-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-muted">Saved</p>
          <h1
            id="saved-heading"
            class="mt-3 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Your shortlist
          </h1>
          <p class="mt-4 max-w-xl text-sm leading-6 text-muted">
            Tools you saved. They stay in this browser until you remove them.
          </p>
        </div>
        <p
          v-if="shortlist.count && !loading && !error"
          class="text-sm text-muted"
          role="status"
          aria-live="polite"
        >
          <span class="tabular-nums text-ink">{{ shortlist.count }}</span>
          {{ shortlist.count === 1 ? 'tool' : 'tools' }} saved
        </p>
      </div>
    </header>

    <LoadingState v-if="loading" />

    <ErrorState
      v-else-if="error"
      :message="errorMessage"
      class="mt-6"
      @retry="retry"
    />

    <div v-else-if="savedTools.length">
      <section
        v-if="savedTools.length > 1"
        aria-labelledby="compare-heading"
        class="mt-8 border-y border-line py-6"
      >
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="compare-heading" class="text-sm font-medium text-ink">
              Compare saved tools
            </h2>
            <p class="mt-1 text-sm text-muted">Pick two or three tools.</p>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <p class="text-sm text-muted" aria-live="polite">
              {{ compareIds.length }} of {{ MAX_COMPARE }}
            </p>
            <Button
              :variant="compareIds.length >= 2 ? 'primary' : 'secondary'"
              :disabled="compareIds.length < 2"
              @click="openCompare"
            >
              Compare {{ compareIds.length }} selected
            </Button>
          </div>
        </div>

        <ul class="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <li v-for="tool in savedTools" :key="tool.id">
            <label class="flex items-center gap-2 text-sm text-ink">
              <input
                v-model="compareIds"
                type="checkbox"
                :value="tool.id"
                :disabled="compareIds.length >= MAX_COMPARE && !compareIds.includes(tool.id)"
                class="h-4 w-4 accent-ink"
              />
              {{ tool.name }}
            </label>
          </li>
        </ul>
      </section>

      <ToolGrid
        :tools="savedTools"
        :saved-ids="shortlist.ids"
        @toggle-save="shortlist.toggle"
      />

      <div class="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <Button variant="secondary" @click="shortlist.clear()">Clear shortlist</Button>
        <p class="text-sm text-muted">
          Removing a tool here also removes it from the finder.
        </p>
      </div>
    </div>

    <EmptyState
      v-else
      class="mt-8"
      title="Your shortlist is empty"
      message="Save a tool from the finder and it will show up here."
      action-label="Find tools"
      @action="router.push('/')"
    />
  </section>
</template>
