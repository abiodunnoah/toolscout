<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'submit'])
const input = ref(null)

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function clear() {
  emit('update:modelValue', '')
  input.value?.focus()
}
</script>

<template>
  <form class="mt-6 max-w-2xl" role="search" @submit.prevent="emit('submit')">
    <label for="tool-search" class="sr-only">What do you need to do?</label>
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="relative flex-1">
        <svg
          class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500"
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
        <input
          id="tool-search"
          ref="input"
          :value="modelValue"
          type="search"
          placeholder="e.g. summarise a long PDF"
          class="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-10 text-slate-900 transition placeholder:text-slate-500 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
          @input="onInput"
        />
        <button
          v-if="modelValue"
          type="button"
          class="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
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
        </button>
      </div>
      <button
        type="submit"
        class="h-12 rounded-xl bg-indigo-600 px-6 font-medium text-white transition hover:bg-indigo-700"
      >
        Search
      </button>
    </div>
  </form>
</template>
