<script setup>
import Button from '../ui/Button.vue'
import Card from '../ui/Card.vue'

defineProps({
  title: { type: String, default: 'No tools match your search' },
  message: { type: String, default: 'Try a different task, or clear your filters.' },
  actionLabel: { type: String, default: 'Clear filters' },
})

defineEmits(['action'])
</script>

<template>
  <Card :padded="false" class="border-dashed px-6 py-16 text-center">
    <div
      class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
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
    <p class="mt-4 font-semibold text-slate-900 dark:text-white">{{ title }}</p>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ message }}</p>
    <Button class="mt-5" @click="$emit('action')">{{ actionLabel }}</Button>
  </Card>
</template>
