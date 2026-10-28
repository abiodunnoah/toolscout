<script setup>
import { computed, watchEffect } from 'vue'
import Button from '../components/ui/Button.vue'
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

watchEffect(() => {
  if (tool.value) document.title = `${tool.value.name} · ToolScout`
})

const errorMessage = computed(() =>
  error.value ? `We couldn't load the tools (${error.value}).` : undefined,
)
</script>

<template>
  <div>
    <Button to="/" variant="ghost" size="sm" class="-ml-3">
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      All tools
    </Button>

    <LoadingState v-if="loading" class="mt-6" />

    <ErrorState
      v-else-if="error"
      :message="errorMessage"
      class="mt-6"
      @retry="retry"
    />

    <div v-else-if="!tool" class="py-24 text-center">
      <h1 class="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        We couldn't find that tool
      </h1>
      <p class="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        The link may be old, or the tool may have been removed from the list.
      </p>
      <Button to="/" class="mt-8">Search all tools</Button>
    </div>

    <article v-else class="mt-8">
      <header class="border-b border-line pb-10">
        <div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            <h1
              class="max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl"
            >
              {{ tool.name }}
            </h1>
            <p class="mt-4 max-w-2xl text-lg leading-7 text-muted">{{ tool.tagline }}</p>

            <ul
              class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-[0.14em] text-muted"
            >
              <li>{{ tool.category }}</li>
              <li>{{ tool.price }}</li>
              <li v-if="tool.studentFriendly">Student friendly</li>
              <li v-if="tool.freeTier">Free tier</li>
            </ul>
          </div>

          <div class="flex shrink-0 flex-wrap gap-2">
            <Button
              variant="secondary"
              :aria-pressed="saved"
              @click="shortlist.toggle(tool.id)"
            >
              <svg
                v-if="saved"
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {{ saved ? 'Saved' : 'Save to shortlist' }}
            </Button>
            <Button :href="tool.url" target="_blank" rel="noopener noreferrer">
              Visit site
              <span class="sr-only"> (opens in a new tab)</span>
            </Button>
          </div>
        </div>
      </header>

      <p class="mt-8 max-w-3xl text-base leading-7 text-muted">
        {{ tool.description }}
      </p>

      <dl
        class="mt-10 grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
      >
        <div class="bg-paper p-5">
          <dt class="text-xs uppercase tracking-[0.14em] text-muted">Best for</dt>
          <dd class="mt-2 text-sm leading-6 text-ink">{{ tool.bestFor }}</dd>
        </div>
        <div class="bg-paper p-5">
          <dt class="text-xs uppercase tracking-[0.14em] text-muted">Pricing</dt>
          <dd class="mt-2 text-sm leading-6 text-ink">{{ tool.pricingNote }}</dd>
        </div>
        <div class="bg-paper p-5">
          <dt class="text-xs uppercase tracking-[0.14em] text-muted">Platforms</dt>
          <dd class="mt-2 text-sm leading-6 text-ink">
            {{ tool.platforms.join(', ') }}
          </dd>
        </div>
        <div class="bg-paper p-5">
          <dt class="text-xs uppercase tracking-[0.14em] text-muted">Editor score</dt>
          <dd class="mt-2 text-sm leading-6 text-ink">
            {{ tool.editorScore }} / 5
            <span class="mt-1 block text-xs text-muted">My own rating, not review data</span>
          </dd>
        </div>
      </dl>

      <div class="mt-10 grid grid-cols-1 gap-10 border-t border-line pt-10 lg:grid-cols-2">
        <section aria-labelledby="tasks-heading">
          <h2
            id="tasks-heading"
            class="text-xs uppercase tracking-[0.16em] text-muted"
          >
            Good for these tasks
          </h2>
          <ul class="mt-4 divide-y divide-line border-t border-line">
            <li
              v-for="task in tool.tasks"
              :key="task"
              class="py-3 text-sm leading-6 text-ink"
            >
              {{ task }}
            </li>
          </ul>
        </section>

        <section aria-labelledby="features-heading">
          <h2
            id="features-heading"
            class="text-xs uppercase tracking-[0.16em] text-muted"
          >
            Features
          </h2>
          <ul class="mt-4 divide-y divide-line border-t border-line">
            <li
              v-for="feature in tool.features"
              :key="feature"
              class="py-3 text-sm leading-6 text-ink"
            >
              {{ feature }}
            </li>
          </ul>
        </section>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <section aria-labelledby="pros-heading">
          <h2
            id="pros-heading"
            class="text-xs uppercase tracking-[0.16em] text-muted"
          >
            Strengths
          </h2>
          <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li v-for="pro in tool.pros" :key="pro">{{ pro }}</li>
          </ul>
        </section>

        <section aria-labelledby="limitations-heading">
          <h2
            id="limitations-heading"
            class="text-xs uppercase tracking-[0.16em] text-muted"
          >
            Limitations
          </h2>
          <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li v-for="limitation in tool.limitations" :key="limitation">
              {{ limitation }}
            </li>
          </ul>
        </section>
      </div>

      <section v-if="related.length" class="mt-16 border-t border-line pt-10">
        <h2 class="text-xs uppercase tracking-[0.16em] text-muted">
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
