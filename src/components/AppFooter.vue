<script setup>
defineProps({
  savedCount: { type: Number, default: 0 },
})
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-slate-400"
    >
      <p>
        Shortlist:
        <span class="font-semibold text-slate-900 dark:text-white">{{ savedCount }}</span>
      </p>
      <p>ToolScout · Vue 3 + Tailwind CSS · Week 2</p>
    </div>
  </footer>
</template>
