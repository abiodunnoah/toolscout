<script setup>
import { RouterLink } from 'vue-router'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import Card from '../ui/Card.vue'

defineProps({
  tool: { type: Object, required: true },
  saved: { type: Boolean, default: false },
})

defineEmits(['toggle-save'])
</script>

<template>
  <Card as="article" class="flex h-full flex-col">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h3 class="text-base font-medium leading-snug text-ink">
          <RouterLink
            :to="`/tool/${tool.id}`"
            class="underline-offset-4 transition-colors hover:underline"
          >
            {{ tool.name }}
          </RouterLink>
        </h3>
        <p class="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
          {{ tool.category }}
        </p>
      </div>
      <Badge variant="outline" class="shrink-0">{{ tool.price }}</Badge>
    </div>

    <p class="mt-4 flex-1 text-sm leading-6 text-muted">
      {{ tool.description }}
    </p>

    <div
      class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4"
    >
      <div class="flex items-center gap-1">
        <Button
          :href="tool.url"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="sm"
        >
          Visit
          <svg
            class="h-3.5 w-3.5"
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
              d="M13.5 6H18m0 0v4.5M18 6l-6.75 6.75M15 15v2.25A2.25 2.25 0 0 1 12.75 19.5h-6A2.25 2.25 0 0 1 4.5 17.25v-6A2.25 2.25 0 0 1 6.75 9H9"
            />
          </svg>
          <span class="sr-only"> {{ tool.name }} (opens in a new tab)</span>
        </Button>

        <Button :to="`/tool/${tool.id}`" variant="ghost" size="sm">Details</Button>
      </div>

      <Button
        variant="secondary"
        size="sm"
        :aria-pressed="saved"
        @click="$emit('toggle-save', tool.id)"
      >
        <svg
          v-if="saved"
          class="h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        {{ saved ? 'Saved' : 'Save' }}
      </Button>
    </div>
  </Card>
</template>
