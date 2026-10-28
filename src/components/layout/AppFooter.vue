<script setup>
defineProps({
  savedCount: { type: Number, default: 0 },
})
</script>

<template>
  <footer class="border-t border-line">
    <div class="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6">
      Shortlist:
      <span class="tabular-nums text-ink">{{ savedCount }}</span>
    </div>
  </footer>
</template>
