<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** outline | solid */
  variant: { type: String, default: 'outline' },
  /** sm | md */
  size: { type: String, default: 'md' },
})

const VARIANTS = {
  outline: 'border border-line text-muted',
  solid: 'bg-ink text-paper',
}

const SIZES = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
}

const classes = computed(() => [
  'inline-flex items-center gap-1 rounded-full font-medium',
  VARIANTS[props.variant] ?? VARIANTS.outline,
  SIZES[props.size] ?? SIZES.md,
])
</script>

<template>
  <span :class="classes"><slot /></span>
</template>
