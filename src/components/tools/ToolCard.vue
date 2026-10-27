<script setup>
import { computed } from 'vue'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import Card from '../ui/Card.vue'

const props = defineProps({
  tool: { type: Object, required: true },
  saved: { type: Boolean, default: false },
})

defineEmits(['toggle-save'])

const initials = computed(() =>
  props.tool.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)

const PRICE_VARIANTS = { Free: 'success', Freemium: 'warning', Paid: 'danger' }

const priceVariant = computed(() => PRICE_VARIANTS[props.tool.price] ?? 'neutral')
</script>

<template>
  <Card as="article" interactive class="flex h-full flex-col">
    <div class="flex items-start justify-between gap-3">
      <div class="flex min-w-0 items-center gap-3">
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
          aria-hidden="true"
        >
          {{ initials }}
        </span>
        <div class="min-w-0">
          <h3 class="truncate font-semibold text-slate-900 dark:text-white">
            {{ tool.name }}
          </h3>
          <p
            class="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-400"
          >
            {{ tool.category }}
          </p>
        </div>
      </div>
      <Badge :variant="priceVariant" class="shrink-0">{{ tool.price }}</Badge>
    </div>

    <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
      {{ tool.description }}
    </p>

    <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
      <li
        v-for="tag in tool.tags"
        :key="tag"
        class="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        #{{ tag }}
      </li>
    </ul>

    <div
      class="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-800"
    >
      <Button
        :href="tool.url"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        size="sm"
      >
        Visit
        <svg
          class="h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H18m0 0v4.5M18 6l-6.75 6.75M15 15v2.25A2.25 2.25 0 0 1 12.75 19.5h-6A2.25 2.25 0 0 1 4.5 17.25v-6A2.25 2.25 0 0 1 6.75 9H9"
          />
        </svg>
        <span class="sr-only"> {{ tool.name }} (opens in a new tab)</span>
      </Button>

      <Button
        :variant="saved ? 'primary' : 'secondary'"
        size="sm"
        :aria-pressed="saved"
        @click="$emit('toggle-save', tool.id)"
      >
        {{ saved ? 'Saved' : 'Save' }}
      </Button>
    </div>
  </Card>
</template>
