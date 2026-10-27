<script setup>
import { computed, watchEffect } from 'vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import LoadingState from '../components/tools/LoadingState.vue'
import ErrorState from '../components/tools/ErrorState.vue'
import ToolGrid from '../components/tools/ToolGrid.vue'
import { useTools } from '../composables/useTools.js'
import { useShortlistStore } from '../stores/shortlist.js'

const props = defineProps({
  id: { type: String, required: true },
})

const { tools, loading, error, retry } = useTools()
const shortlist = useShortlistStore()

const tool = computed(() => tools.value.find((item) => item.id === props.id) ?? null)
const saved = computed(() => (tool.value ? shortlist.has(tool.value.id) : false))

const related = computed(() => {
  if (!tool.value) return []
  return tools.value
    .filter((item) => item.category === tool.value.category && item.id !== tool.value.id)
    .slice(0, 3)
})

const initials = computed(() =>
  tool.value
    ? tool.value.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '',
)

const PRICE_VARIANTS = { Free: 'success', Freemium: 'warning', Paid: 'danger' }
const priceVariant = computed(() =>
  tool.value ? (PRICE_VARIANTS[tool.value.price] ?? 'neutral') : 'neutral',
)

watchEffect(() => {
  if (tool.value) document.title = `${tool.value.name} · ToolScout`
})

const errorMessage = computed(() =>
  error.value ? `We couldn't load the tools (${error.value}).` : undefined,
)
</script>

<template>
  <div>
    <Button to="/" variant="ghost" size="sm" class="-ml-2">
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      Back to the tool finder
    </Button>

    <LoadingState v-if="loading" />

    <ErrorState
      v-else-if="error"
      :message="errorMessage"
      class="mt-6"
      @retry="retry"
    />

    <div v-else-if="!tool" class="mt-6">
      <Card :padded="false" class="px-6 py-16 text-center">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
          We couldn't find that tool
        </h1>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          The link may be old, or the tool may have been removed from the list.
        </p>
        <Button to="/" class="mt-6">Search all tools</Button>
      </Card>
    </div>

    <article v-else class="mt-6">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex min-w-0 items-start gap-4">
          <span
            class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
            aria-hidden="true"
          >
            {{ initials }}
          </span>
          <div class="min-w-0">
            <h1
              class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {{ tool.name }}
            </h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">{{ tool.tagline }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <Badge variant="info">{{ tool.category }}</Badge>
              <Badge :variant="priceVariant">{{ tool.price }}</Badge>
              <Badge v-if="tool.studentFriendly" variant="success">Student friendly</Badge>
              <Badge v-if="tool.freeTier" variant="neutral">Free tier</Badge>
            </div>
          </div>
        </div>

        <div class="flex shrink-0 flex-wrap gap-2">
          <Button
            :variant="saved ? 'primary' : 'secondary'"
            :aria-pressed="saved"
            @click="shortlist.toggle(tool.id)"
          >
            {{ saved ? 'Saved' : 'Save to shortlist' }}
          </Button>
          <Button :href="tool.url" target="_blank" rel="noopener noreferrer">
            Visit site
            <span class="sr-only"> (opens in a new tab)</span>
          </Button>
        </div>
      </div>

      <p class="mt-6 max-w-3xl leading-relaxed text-slate-700 dark:text-slate-300">
        {{ tool.description }}
      </p>

      <dl class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Best for
          </dt>
          <dd class="mt-1 text-sm text-slate-900 dark:text-slate-100">{{ tool.bestFor }}</dd>
        </Card>
        <Card>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Pricing
          </dt>
          <dd class="mt-1 text-sm text-slate-900 dark:text-slate-100">
            {{ tool.pricingNote }}
          </dd>
        </Card>
        <Card>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Platforms
          </dt>
          <dd class="mt-1 text-sm text-slate-900 dark:text-slate-100">
            {{ tool.platforms.join(', ') }}
          </dd>
        </Card>
        <Card>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Editor score
          </dt>
          <dd class="mt-1 text-sm text-slate-900 dark:text-slate-100">
            {{ tool.editorScore }} / 5
            <span class="block text-xs text-slate-600 dark:text-slate-400">
              My own rating, not review data
            </span>
          </dd>
        </Card>
      </dl>

      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" class="text-lg font-semibold text-slate-900 dark:text-white">
            Good for these tasks
          </h2>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li
              v-for="task in tool.tasks"
              :key="task"
              class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {{ task }}
            </li>
          </ul>
        </section>

        <section aria-labelledby="features-heading">
          <h2 id="features-heading" class="text-lg font-semibold text-slate-900 dark:text-white">
            Features
          </h2>
          <ul class="mt-3 space-y-1.5">
            <li
              v-for="feature in tool.features"
              :key="feature"
              class="text-sm text-slate-700 dark:text-slate-300"
            >
              {{ feature }}
            </li>
          </ul>
        </section>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Strengths</h2>
          <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
            <li v-for="pro in tool.pros" :key="pro">{{ pro }}</li>
          </ul>
        </Card>
        <Card>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Limitations</h2>
          <ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
            <li v-for="limitation in tool.limitations" :key="limitation">
              {{ limitation }}
            </li>
          </ul>
        </Card>
      </div>

      <section v-if="related.length" class="mt-10" aria-labelledby="related-heading">
        <h2 id="related-heading" class="text-lg font-semibold text-slate-900 dark:text-white">
          More {{ tool.category.toLowerCase() }} tools
        </h2>
        <ToolGrid
          :tools="related"
          :saved-ids="shortlist.ids"
          @toggle-save="shortlist.toggle"
        />
      </section>
    </article>
  </div>
</template>
