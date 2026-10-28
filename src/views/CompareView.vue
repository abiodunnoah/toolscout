<script setup>
import { computed, nextTick, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Button from '../components/ui/Button.vue'
import LoadingState from '../components/tools/LoadingState.vue'
import ErrorState from '../components/tools/ErrorState.vue'
import { useTools } from '../composables/useTools.js'
import { useShortlistStore } from '../stores/shortlist.js'

const MAX_TOOLS = 3

const route = useRoute()
const router = useRouter()
const shortlist = useShortlistStore()
const { tools, loading, error, retry } = useTools()

const heading = ref(null)

/** Read ids from the URL, remove blanks and duplicates, and cap the list. */
const ids = computed(() => {
  const raw = route.query.ids
  const value = Array.isArray(raw) ? raw.join(',') : (raw ?? '')
  return [...new Set(String(value).split(',').map((id) => id.trim()).filter(Boolean))].slice(
    0,
    MAX_TOOLS,
  )
})

const selected = computed(() =>
  ids.value
    .map((id) => tools.value.find((tool) => tool.id === id))
    .filter(Boolean),
)

async function remove(id) {
  const next = ids.value.filter((item) => item !== id)
  await router.replace({
    name: 'compare',
    query: next.length ? { ids: next.join(',') } : {},
  })
  // The Remove button is gone now, so put focus on a stable heading.
  await nextTick()
  heading.value?.focus()
}

const errorMessage = computed(() =>
  error.value ? `We couldn't load the tools (${error.value}).` : undefined,
)

const yesNo = (value) => (value ? 'Yes' : 'No')
</script>

<template>
  <section aria-labelledby="compare-heading">
    <header class="border-b border-line pb-8">
      <p class="text-xs uppercase tracking-[0.2em] text-muted">Compare</p>
      <h1
        id="compare-heading"
        ref="heading"
        tabindex="-1"
        class="mt-3 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl"
      >
        Compare tools
      </h1>
      <p class="mt-4 max-w-2xl text-sm leading-6 text-muted">
        Up to three tools side by side. Each column comes from your shortlist and the
        comparison is saved in the URL, so you can bookmark or share it.
      </p>
    </header>

    <LoadingState v-if="loading" />

    <ErrorState
      v-else-if="error"
      :message="errorMessage"
      class="mt-6"
      @retry="retry"
    />

    <div v-else-if="selected.length < 2" class="py-20 text-center">
      <h2 class="text-xl font-medium tracking-tight text-ink">
        Pick at least two tools
      </h2>
      <p class="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        A comparison needs two or three tools. Choose them from your shortlist.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <Button v-if="shortlist.count >= 2" to="/saved">Choose from your shortlist</Button>
        <Button v-else to="/">Find tools to save</Button>
      </div>
    </div>

    <div v-else class="mt-8">
      <div class="overflow-x-auto border-b border-line">
        <table class="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption class="sr-only">
            Comparison of {{ selected.map((tool) => tool.name).join(', ') }}
          </caption>

          <thead>
            <tr class="border-b border-line">
              <th scope="col" class="w-40 p-5">
                <span class="sr-only">Attribute</span>
              </th>
              <th
                v-for="tool in selected"
                :key="tool.id"
                scope="col"
                class="p-5 align-top"
              >
                <RouterLink
                  :to="`/tool/${tool.id}`"
                  class="text-base font-medium text-ink underline-offset-4 hover:underline"
                >
                  {{ tool.name }}
                </RouterLink>
                <p class="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                  {{ tool.price }}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  class="-ml-3 mt-3"
                  :aria-label="`Remove ${tool.name} from the comparison`"
                  @click="remove(tool.id)"
                >
                  Remove
                </Button>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-line">
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Category
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top text-ink"
              >
                {{ tool.category }}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Best for
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top leading-6 text-ink"
              >
                {{ tool.bestFor }}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Pricing
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top leading-6 text-ink"
              >
                {{ tool.pricingNote }}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Free tier
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top text-ink"
              >
                {{ yesNo(tool.freeTier) }}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Student friendly
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top text-ink"
              >
                {{ yesNo(tool.studentFriendly) }}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Editor score
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top text-ink"
              >
                {{ tool.editorScore }} / 5
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Platforms
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top leading-6 text-ink"
              >
                {{ tool.platforms.join(', ') }}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Features
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top"
              >
                <ul class="space-y-1.5 text-muted">
                  <li v-for="feature in tool.features" :key="feature">{{ feature }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Strengths
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top"
              >
                <ul class="space-y-1.5 text-muted">
                  <li v-for="pro in tool.pros" :key="pro">{{ pro }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Limitations
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top"
              >
                <ul class="space-y-1.5 text-muted">
                  <li v-for="limitation in tool.limitations" :key="limitation">
                    {{ limitation }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                class="p-5 align-top text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                Website
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-5 align-top"
              >
                <a
                  :href="tool.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-ink underline underline-offset-4 hover:opacity-70"
                >
                  Visit {{ tool.name }}
                  <span class="sr-only"> (opens in a new tab)</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <Button
          v-if="selected.length < MAX_TOOLS && shortlist.count > selected.length"
          to="/saved"
          variant="secondary"
          size="sm"
        >
          Add another tool
        </Button>
        <Button to="/saved" variant="ghost" size="sm">Back to your shortlist</Button>
      </div>
    </div>
  </section>
</template>
