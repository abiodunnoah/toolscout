<script setup>
defineProps({
  message: { type: String, default: "We couldn't load the tools." },
})

defineEmits(['retry'])
</script>

<template>
  <div
    role="alert"
    class="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12 text-center dark:border-rose-900 dark:bg-rose-950/40"
  >
    <div
      class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-300"
      aria-hidden="true"
    >
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m0 3.75h.008M10.34 3.94 2.7 17.06A1.5 1.5 0 0 0 4 19.5h16a1.5 1.5 0 0 0 1.3-2.24L13.66 3.94a1.5 1.5 0 0 0-2.6 0Z"
        />
      </svg>
    </div>
    <p class="mt-4 font-semibold text-rose-900 dark:text-rose-100">{{ message }}</p>
    <p class="mt-1 text-sm text-rose-700 dark:text-rose-300">
      Check your connection and try again.
    </p>
    <button
      type="button"
      class="mt-5 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </div>
</template>
