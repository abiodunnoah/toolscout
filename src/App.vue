<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { useTheme } from './composables/useTheme.js'
import { useShortlistStore } from './stores/shortlist.js'

const { isDark, toggle: toggleTheme } = useTheme()
const shortlist = useShortlistStore()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>

    <AppHeader
      :is-dark="isDark"
      :saved-count="shortlist.count"
      @toggle-theme="toggleTheme"
    />

    <main
      id="main"
      tabindex="-1"
      class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10"
    >
      <RouterView />
    </main>

    <AppFooter :saved-count="shortlist.count" />
  </div>
</template>
