import { describe, expect, it } from 'vitest'
import { useFilters } from '../src/composables/useFilters.js'
import { makeTool } from './helpers.js'

describe('useFilters categories', () => {
  it('matches a tool through a secondary category', () => {
    const tools = [
      makeTool({
        id: 'chatgpt',
        name: 'ChatGPT',
        category: 'Productivity',
        categories: ['Productivity', 'Coding'],
      }),
    ]
    const { activeCategories, toggleCategory, sortedTools } = useFilters(() => tools)

    toggleCategory('Coding')

    expect(activeCategories.value).toEqual(['Coding'])
    expect(sortedTools.value.map((tool) => tool.id)).toEqual(['chatgpt'])
  })

  it('falls back to the primary category when categories is missing', () => {
    const tools = [makeTool({ id: 'chatpdf', name: 'ChatPDF', category: 'Research' })]
    const { activeCategories, toggleCategory, sortedTools } = useFilters(() => tools)

    toggleCategory('Coding')
    expect(sortedTools.value).toEqual([])

    toggleCategory('Coding')
    toggleCategory('Research')

    expect(activeCategories.value).toEqual(['Research'])
    expect(sortedTools.value.map((tool) => tool.id)).toEqual(['chatpdf'])
  })
})
