<template>
  <div role="status" aria-live="polite" class="mt-4">
    <span class="sr-only">Loading tools…</span>
    <ul
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-hidden="true"
    >
      <li
        v-for="n in 6"
        :key="n"
        class="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 motion-reduce:animate-none dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
        <div class="mt-3 h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-800"></div>
        <div class="mt-5 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
        <div class="mt-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800"></div>
        <div class="mt-2 h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800"></div>
      </li>
    </ul>
  </div>
</template>
