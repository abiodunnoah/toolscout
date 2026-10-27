<script setup>
import { computed, ref, useSlots } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  id: { type: String, required: true },
  label: { type: String, default: '' },
  /** Visually hide the label but keep it for screen readers. */
  labelHidden: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  /** sm | md | lg */
  size: { type: String, default: 'md' },
  autocomplete: { type: String, default: 'off' },
})

defineEmits(['update:modelValue'])

const slots = useSlots()
const input = ref(null)

function focus() {
  input.value?.focus()
}

defineExpose({ focus })

const SIZES = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
  lg: 'h-12 text-base',
}

const sizeClass = computed(() => SIZES[props.size] ?? SIZES.md)
const paddingClass = computed(() => [
  slots.leading ? 'pl-11' : 'pl-4',
  slots.trailing ? 'pr-10' : 'pr-4',
])
const hintId = computed(() => (props.hint ? `${props.id}-hint` : undefined))
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="id"
      :class="
        labelHidden
          ? 'sr-only'
          : 'block text-sm font-medium text-slate-700 dark:text-slate-300'
      "
    >
      {{ label }}
    </label>

    <div class="relative" :class="label && !labelHidden ? 'mt-1.5' : ''">
      <span
        v-if="$slots.leading"
        class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
      >
        <slot name="leading" />
      </span>

      <input
        :id="id"
        ref="input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :aria-describedby="hintId"
        class="w-full rounded-xl border border-slate-300 bg-white text-slate-900 transition placeholder:text-slate-500 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
        :class="[sizeClass, paddingClass]"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <span v-if="$slots.trailing" class="absolute right-2 top-1/2 -translate-y-1/2">
        <slot name="trailing" />
      </span>
    </div>

    <p v-if="hint" :id="hintId" class="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
      {{ hint }}
    </p>
  </div>
</template>
