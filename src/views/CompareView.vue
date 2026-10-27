<script setup>
import { computed, nextTick, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
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

const PRICE_VARIANTS = { Free: 'success', Freemium: 'warning', Paid: 'danger' }
const priceVariant = (price) => PRICE_VARIANTS[price] ?? 'neutral'

const yesNo = (value) => (value ? 'Yes' : 'No')
</script>

<template>
  <section aria-labelledby="compare-heading">
    <h1
      id="compare-heading"
      ref="heading"
      tabindex="-1"
      class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
    >
      Compare tools
    </h1>
    <p class="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
      Up to three tools side by side. Each column comes from your shortlist and the
      comparison is saved in the URL, so you can bookmark or share it.
    </p>

    <LoadingState v-if="loading" />

    <ErrorState
      v-else-if="error"
      :message="errorMessage"
      class="mt-6"
      @retry="retry"
    />

    <Card v-else-if="selected.length < 2" :padded="false" class="mt-6 px-6 py-16 text-center">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white">
        Pick at least two tools
      </h2>
      <p class="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
        A comparison needs two or three tools. Choose them from your shortlist.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <Button v-if="shortlist.count >= 2" to="/saved">Choose from your shortlist</Button>
        <Button v-else to="/">Find tools to save</Button>
      </div>
    </Card>

    <div v-else class="mt-6">
      <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table class="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption class="sr-only">
            Comparison of {{ selected.map((tool) => tool.name).join(', ') }}
          </caption>

          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/60">
              <th scope="col" class="w-40 p-4">
                <span class="sr-only">Attribute</span>
              </th>
              <th
                v-for="tool in selected"
                :key="tool.id"
                scope="col"
                class="p-4 align-top"
              >
                <div class="flex flex-col items-start gap-2">
                  <RouterLink
                    :to="`/tool/${tool.id}`"
                    class="rounded text-base font-semibold text-slate-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-300"
                  >
                    {{ tool.name }}
                  </RouterLink>
                  <Badge :variant="priceVariant(tool.price)">{{ tool.price }}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    :aria-label="`Remove ${tool.name} from the comparison`"
                    @click="remove(tool.id)"
                  >
                    Remove
                  </Button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Category
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                {{ tool.category }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Best for
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                {{ tool.bestFor }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Pricing
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                {{ tool.pricingNote }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Free tier
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                {{ yesNo(tool.freeTier) }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Student friendly
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                {{ yesNo(tool.studentFriendly) }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Editor score
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                {{ tool.editorScore }} / 5
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Platforms
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                {{ tool.platforms.join(', ') }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Features
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                <ul class="space-y-1">
                  <li v-for="feature in tool.features" :key="feature">{{ feature }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Strengths
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                <ul class="space-y-1">
                  <li v-for="pro in tool.pros" :key="pro">{{ pro }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Limitations
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top text-slate-700 dark:text-slate-300"
              >
                <ul class="space-y-1">
                  <li v-for="limitation in tool.limitations" :key="limitation">
                    {{ limitation }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row" class="p-4 align-top font-medium text-slate-900 dark:text-white">
                Website
              </th>
              <td
                v-for="tool in selected"
                :key="tool.id"
                class="p-4 align-top"
              >
                <a
                  :href="tool.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
                >
                  Visit {{ tool.name }}
                  <span class="sr-only"> (opens in a new tab)</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-3">
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
