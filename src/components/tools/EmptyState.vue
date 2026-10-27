<script setup>
defineEmits(['clear'])
</script>

<template>
  <div
    class="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700"
  >
    <div
      class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
      aria-hidden="true"
    >
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
        />
      </svg>
    </div>
    <p class="mt-4 font-semibold text-slate-900 dark:text-white">
      No tools match your search
    </p>
    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
      Try a different task, or clear your filters.
    </p>
    <button
      type="button"
      class="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      @click="$emit('clear')"
    >
      Clear filters
    </button>
  </div>
</template>
