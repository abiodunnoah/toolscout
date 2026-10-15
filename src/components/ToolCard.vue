<script setup>
import { computed } from 'vue'

const props = defineProps({
  tool: { type: Object, required: true },
  saved: { type: Boolean, default: false },
})

defineEmits(['toggle-save'])

const priceClass = computed(() => {
  switch (props.tool.price) {
    case 'Free':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Paid':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
    default:
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
  }
})
</script>

<template>
  <article
    class="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
  >
    <div class="flex items-start justify-between gap-2">
      <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
        {{ tool.name }}
      </h3>
      <span
        class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
        :class="priceClass"
      >
        {{ tool.price }}
      </span>
    </div>

    <p class="mt-1 text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
      {{ tool.category }}
    </p>

    <p class="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
      {{ tool.description }}
    </p>

    <ul class="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
      <li
        v-for="tag in tool.tags"
        :key="tag"
        class="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      >
        #{{ tag }}
      </li>
    </ul>

    <div class="mt-4 flex items-center justify-between gap-2">
      <a
        :href="tool.url"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
      >
        Visit<span class="sr-only"> {{ tool.name }} (opens in a new tab)</span>
      </a>
      <button
        type="button"
        :aria-pressed="saved"
        class="rounded-lg border px-3 py-1.5 text-sm font-medium transition"
        :class="
          saved
            ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700'
            : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
        "
        @click="$emit('toggle-save', tool.id)"
      >
        {{ saved ? 'Saved' : 'Save' }}
      </button>
    </div>
  </article>
</template>
