<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  /** primary | secondary | ghost | chip */
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
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition disabled:cursor-not-allowed disabled:opacity-40'

const VARIANTS = {
  primary: 'rounded-lg bg-ink text-paper hover:opacity-80',
  secondary: 'rounded-lg border border-line text-ink hover:bg-raised aria-pressed:border-ink',
  ghost: 'rounded-lg text-muted hover:bg-raised hover:text-ink',
  chip: 'rounded-full border border-line text-muted hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper',
}

const SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10 p-0',
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
