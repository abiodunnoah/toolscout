<script setup>
import { computed } from 'vue'

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

const priceClass = computed(() => {
  switch (props.tool.price) {
    case 'Free':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
    case 'Paid':
      return 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
    default:
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
  }
})
</script>

<template>
  <article
    class="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex min-w-0 items-center gap-3">
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
          aria-hidden="true"
        >
          {{ initials }}
        </span>
        <div class="min-w-0">
          <h3 class="truncate font-semibold text-slate-900 dark:text-white">
            {{ tool.name }}
          </h3>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {{ tool.category }}
          </p>
        </div>
      </div>
      <span
        class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
        :class="priceClass"
      >
        {{ tool.price }}
      </span>
    </div>

    <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
      {{ tool.description }}
    </p>

    <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
      <li
        v-for="tag in tool.tags"
        :key="tag"
        class="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400"
      >
        #{{ tag }}
      </li>
    </ul>

    <div
      class="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-800"
    >
      <a
        :href="tool.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
      </a>

      <button
        type="button"
        :aria-pressed="saved"
        class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
        :class="
          saved
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
        "
        @click="$emit('toggle-save', tool.id)"
      >
        {{ saved ? 'Saved' : 'Save' }}
      </button>
    </div>
  </article>
</template>
