<script setup>
import Button from '../components/ui/Button.vue'
</script>

<template>
  <section class="mx-auto max-w-xl py-16 text-center">
    <p
      class="text-sm font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300"
    >
      404
    </p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
      We can't find that page
    </h1>
    <p class="mt-3 text-slate-600 dark:text-slate-400">
      The link may be old, or the address may have a typo.
    </p>
    <Button to="/" class="mt-6">Back to the tool finder</Button>
  </section>
</template>
