<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Any HTML tag or component: div, section, article, li... */
  as: { type: String, default: 'div' },
  /** Adds padding. Turn off when the card owns its own layout. */
  padded: { type: Boolean, default: true },
  /** Adds a hover border for cards that link somewhere. */
  interactive: { type: Boolean, default: false },
})

const classes = computed(() => [
  'rounded-xl border border-line bg-paper',
  props.padded ? 'p-5 sm:p-6' : '',
  props.interactive ? 'transition-colors hover:border-muted' : '',
])
</script>

<template>
  <component :is="as" :class="classes"><slot /></component>
</template>
