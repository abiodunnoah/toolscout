<script setup>
import { RouterLink } from 'vue-router'
import Button from '../ui/Button.vue'

defineProps({
  isDark: { type: Boolean, default: false },
  savedCount: { type: Number, default: 0 },
})

defineEmits(['toggle-theme'])
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <RouterLink
        to="/"
        class="flex items-center gap-2.5 rounded-md text-base font-semibold tracking-tight text-ink"
      >
        <span
          class="grid h-7 w-7 place-items-center rounded-md bg-ink text-paper"
          aria-hidden="true"
        >
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            />
          </svg>
        </span>
        ToolScout
      </RouterLink>

      <nav aria-label="Main" class="flex items-center gap-1 sm:gap-2">
        <RouterLink
          to="/"
          class="hidden rounded-md px-2.5 py-2 text-sm text-muted transition-colors hover:text-ink aria-[current=page]:text-ink sm:inline-flex"
        >
          Find tools
        </RouterLink>

        <RouterLink
          to="/saved"
          class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
        >
          Saved
          <span
            v-if="savedCount"
            class="rounded-full border border-line px-1.5 py-0.5 text-xs tabular-nums text-muted"
          >
            {{ savedCount }}
          </span>
        </RouterLink>

        <Button
          variant="ghost"
          size="icon"
          :aria-pressed="isDark"
          aria-label="Dark mode"
          @click="$emit('toggle-theme')"
        >
          <svg
            v-if="isDark"
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.6"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.6"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </Button>
      </nav>
    </div>
  </header>
</template>
