<script setup>
import Button from '../ui/Button.vue'

defineProps({
  title: { type: String, default: 'No tools match your search' },
  message: { type: String, default: 'Try a different task, or clear your filters.' },
  actionLabel: { type: String, default: 'Clear filters' },
})

defineEmits(['action'])
</script>

<template>
  <div
    role="status"
    class="rounded-xl border border-dashed border-line px-6 py-20 text-center"
  >
    <p class="text-base font-medium text-ink">{{ title }}</p>
    <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{{ message }}</p>
    <Button class="mt-6" @click="$emit('action')">{{ actionLabel }}</Button>
  </div>
</template>
