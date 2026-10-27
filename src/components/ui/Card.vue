<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Any HTML tag or component: div, section, article, li... */
  as: { type: String, default: 'div' },
  /** Adds padding. Turn off when the card owns its own layout. */
  padded: { type: Boolean, default: true },
  /** Adds a hover lift for cards that link somewhere. */
  interactive: { type: Boolean, default: false },
})

const classes = computed(() => [
  'rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900',
  props.padded ? 'p-5' : '',
  props.interactive
    ? 'transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:hover:border-slate-700'
    : '',
])
</script>

<template>
  <component :is="as" :class="classes"><slot /></component>
</template>
