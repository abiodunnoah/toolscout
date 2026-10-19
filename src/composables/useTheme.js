import { ref } from 'vue'

/**
 * System-aware theme. Starts from prefers-color-scheme and lets the user override.
 * The choice is not persisted yet — that arrives in Week 3.
 */
export function useTheme() {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const isDark = ref(media.matches)
  let userChose = false

  function apply() {
    document.documentElement.classList.toggle('dark', isDark.value)
  }
  apply()

  media.addEventListener('change', (event) => {
    if (!userChose) {
      isDark.value = event.matches
      apply()
    }
  })

  function toggle() {
    userChose = true
    isDark.value = !isDark.value
    apply()
  }

  return { isDark, toggle }
}
