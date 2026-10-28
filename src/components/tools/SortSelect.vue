<script setup>
defineProps({
  modelValue: { type: String, default: 'featured' },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-center gap-2">
    <label for="sort" class="text-sm text-muted">Sort</label>
    <select
      id="sort"
      :value="modelValue"
      class="h-9 rounded-lg border border-muted bg-paper px-3 text-sm text-ink transition-colors focus:border-ink"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="featured">Featured</option>
      <option value="name">Name (A–Z)</option>
      <option value="price">Price (free first)</option>
    </select>
  </div>
</template>
