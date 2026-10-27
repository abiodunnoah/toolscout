<script setup>
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'

const model = defineModel({ type: String, default: '' })

const emit = defineEmits(['submit'])
const field = ref(null)

function clear() {
  model.value = ''
  field.value?.focus()
}
</script>

<template>
  <form class="mt-6 max-w-2xl" role="search" @submit.prevent="emit('submit')">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
      <Input
        id="tool-search"
        ref="field"
        v-model="model"
        class="flex-1"
        label="What do you need to do?"
        type="search"
        size="lg"
        placeholder="e.g. summarise a long PDF"
      >
        <template #leading>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            />
          </svg>
        </template>

        <template #trailing>
          <Button
            v-if="model"
            variant="ghost"
            size="icon"
            aria-label="Clear search"
            @click="clear"
          >
            <svg
              class="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Button>
        </template>
      </Input>

      <Button type="submit" size="lg" class="w-full sm:w-auto">Search</Button>
    </div>
  </form>
</template>
