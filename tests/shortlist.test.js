import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useShortlistStore } from '../src/stores/shortlist.js'

const KEY = 'toolscout:shortlist'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('shortlist store', () => {
  it('toggles ids, updates the count and writes to localStorage', async () => {
    const store = useShortlistStore()

    store.toggle('chatpdf')
    store.toggle('elicit')

    expect(store.count).toBe(2)
    expect(store.has('chatpdf')).toBe(true)

    await nextTick()
    expect(JSON.parse(localStorage.getItem(KEY))).toEqual(['chatpdf', 'elicit'])

    store.remove('chatpdf')
    expect(store.ids).toEqual(['elicit'])

    store.clear()
    expect(store.count).toBe(0)
  })

  it('restores saved ids and drops values that are not strings', () => {
    localStorage.setItem(KEY, JSON.stringify(['chatpdf', 7, null, 'elicit']))
    setActivePinia(createPinia())

    const store = useShortlistStore()

    expect(store.ids).toEqual(['chatpdf', 'elicit'])
  })

  it('starts empty when the stored value is not valid JSON', () => {
    localStorage.setItem(KEY, '{not json')
    setActivePinia(createPinia())

    expect(useShortlistStore().ids).toEqual([])
  })
})
