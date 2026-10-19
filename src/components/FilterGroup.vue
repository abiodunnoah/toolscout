<script setup>
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
      class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500"
    >
      {{ legend }}
    </legend>
    <div class="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-start">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        :aria-pressed="active.includes(option)"
        class="rounded-full border px-3 py-1.5 text-sm font-medium transition"
        :class="
          active.includes(option)
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
        "
        @click="$emit('toggle', option)"
      >
        {{ option }}
      </button>
    </div>
  </fieldset>
</template>
