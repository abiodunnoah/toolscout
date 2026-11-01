import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from '../src/composables/useTheme.js'

function stubSystemDark(matches) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches,
      media: '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useTheme', () => {
  it('starts from the system setting and remembers a toggle', () => {
    stubSystemDark(true)

    const { isDark, toggle } = useTheme()

    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    toggle()

    expect(isDark.value).toBe(false)
    expect(localStorage.getItem('toolscout:theme')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('lets a stored choice override the system setting', () => {
    localStorage.setItem('toolscout:theme', 'light')
    stubSystemDark(true)

    const { isDark } = useTheme()

    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
