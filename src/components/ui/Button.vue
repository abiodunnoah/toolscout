<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  /** primary | secondary | ghost | danger | chip */
  variant: { type: String, default: 'primary' },
  /** sm | md | lg | icon */
  size: { type: String, default: 'md' },
  /** Renders a RouterLink when set. */
  to: { type: [String, Object], default: null },
  /** Renders an anchor when set. */
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
})

const BASE =
  'inline-flex items-center justify-center gap-1.5 font-medium transition disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS = {
  primary: 'rounded-lg bg-indigo-600 text-white hover:bg-indigo-700',
  secondary:
    'rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  ghost:
    'rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
  danger: 'rounded-lg bg-rose-600 text-white hover:bg-rose-700',
  chip: 'rounded-full border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100 aria-pressed:border-indigo-600 aria-pressed:bg-indigo-600 aria-pressed:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:aria-pressed:border-indigo-500 dark:aria-pressed:bg-indigo-500 dark:aria-pressed:text-white',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-9 w-9 p-0',
}

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const bindings = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: props.type }
})

const classes = computed(() => [
  BASE,
  VARIANTS[props.variant] ?? VARIANTS.primary,
  SIZES[props.size] ?? SIZES.md,
])
</script>

<template>
  <component :is="tag" v-bind="bindings" :class="classes">
    <slot />
  </component>
</template>
