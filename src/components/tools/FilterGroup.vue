<script setup>
import Button from '../ui/Button.vue'

defineProps({
  legend: { type: String, required: true },
  options: { type: Array, required: true },
  active: { type: Array, default: () => [] },
})

defineEmits(['toggle'])
</script>

<template>
  <fieldset>
    <legend
      class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400"
    >
      {{ legend }}
    </legend>
    <div class="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-start">
      <Button
        v-for="option in options"
        :key="option"
        variant="chip"
        size="sm"
        :aria-pressed="active.includes(option)"
        @click="$emit('toggle', option)"
      >
        {{ option }}
      </Button>
    </div>
  </fieldset>
</template>
