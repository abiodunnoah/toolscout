import { ref } from 'vue'

const STORAGE_KEY = 'toolscout:theme'

function readChoice() {
  if (typeof localStorage === 'undefined') return null
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

function writeChoice(isDark) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  } catch {
    // Storage can be blocked. The toggle still works for this visit.
  }
}

/**
 * System-aware theme. Starts from the OS setting, then remembers the user's
 * choice in localStorage. Choosing "dark" or "light" overrides the OS.
 */
export function useTheme() {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const stored = readChoice()
  const isDark = ref(stored ? stored === 'dark' : media.matches)
  let userChose = Boolean(stored)

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
    writeChoice(isDark.value)
    apply()
  }

  return { isDark, toggle }
}
