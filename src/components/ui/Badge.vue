<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** neutral | info | success | warning | danger */
  variant: { type: String, default: 'neutral' },
  /** sm | md */
  size: { type: String, default: 'md' },
})

const VARIANTS = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  info: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  success: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  warning: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
}

const SIZES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

const classes = computed(() => [
  'inline-flex items-center gap-1 rounded-full font-semibold',
  VARIANTS[props.variant] ?? VARIANTS.neutral,
  SIZES[props.size] ?? SIZES.md,
])
</script>

<template>
  <span :class="classes"><slot /></span>
</template>
