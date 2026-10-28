<template>
  <div role="status" aria-live="polite" class="mt-6">
    <span class="sr-only">Loading tools…</span>
    <ul
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      <li
        v-for="n in 6"
        :key="n"
        class="h-56 animate-pulse rounded-xl border border-line bg-paper p-6 motion-reduce:animate-none"
      >
        <div class="h-4 w-1/2 rounded bg-raised"></div>
        <div class="mt-3 h-3 w-1/4 rounded bg-raised"></div>
        <div class="mt-6 h-3 w-full rounded bg-raised"></div>
        <div class="mt-2 h-3 w-5/6 rounded bg-raised"></div>
        <div class="mt-2 h-3 w-2/3 rounded bg-raised"></div>
      </li>
    </ul>
  </div>
</template>
