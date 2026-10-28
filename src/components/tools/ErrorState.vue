<script setup>
import Button from '../ui/Button.vue'

defineProps({
  message: { type: String, default: "We couldn't load the tools." },
})

defineEmits(['retry'])
</script>

<template>
  <div
    role="alert"
    class="rounded-xl border border-line bg-raised px-6 py-16 text-center"
  >
    <p class="text-base font-medium text-ink">{{ message }}</p>
    <p class="mt-2 text-sm text-muted">Check your connection and try again.</p>
    <Button class="mt-6" @click="$emit('retry')">Try again</Button>
  </div>
</template>
