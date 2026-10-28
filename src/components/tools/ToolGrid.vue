<script setup>
import ToolCard from './ToolCard.vue'

defineProps({
  tools: { type: Array, required: true },
  savedIds: { type: Array, default: () => [] },
})

defineEmits(['toggle-save'])
</script>

<template>
  <ul class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="tool in tools" :key="tool.id">
      <ToolCard
        :tool="tool"
        :saved="savedIds.includes(tool.id)"
        @toggle-save="$emit('toggle-save', $event)"
      />
    </li>
  </ul>
</template>
