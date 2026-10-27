<script setup>
defineProps({
  modelValue: { type: String, default: 'featured' },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-center gap-2">
    <label for="sort" class="text-sm text-slate-600 dark:text-slate-400">Sort</label>
    <select
      id="sort"
      :value="modelValue"
      class="rounded-lg border border-slate-500 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-200"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="featured">Featured</option>
      <option value="name">Name (A–Z)</option>
      <option value="price">Price (free first)</option>
    </select>
  </div>
</template>
