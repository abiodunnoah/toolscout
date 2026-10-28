<script setup>
import Button from '../components/ui/Button.vue'
</script>

<template>
  <section class="py-24 text-center">
    <p class="text-xs uppercase tracking-[0.2em] text-muted">404</p>
    <h1 class="mt-4 text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
      We can't find that page
    </h1>
    <p class="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">
      The link may be old, or the address may have a typo.
    </p>
    <Button to="/" class="mt-8">Back to the tool finder</Button>
  </section>
</template>
