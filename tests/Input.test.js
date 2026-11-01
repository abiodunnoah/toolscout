import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '../src/components/ui/Input.vue'

describe('Input', () => {
  it('ties its label and hint to the input, and emits changes', async () => {
    const wrapper = mount(Input, {
      props: {
        id: 'tool-search',
        modelValue: '',
        label: 'What do you need to do?',
        hint: 'Use a short task, not a tool name.',
      },
    })

    const input = wrapper.get('input')

    expect(wrapper.get('label').attributes('for')).toBe('tool-search')
    expect(input.attributes('id')).toBe('tool-search')
    expect(input.attributes('aria-describedby')).toBe('tool-search-hint')
    expect(wrapper.get('#tool-search-hint').text()).toContain('short task')

    await input.setValue('summarise a PDF')

    expect(wrapper.emitted('update:modelValue')).toEqual([['summarise a PDF']])
  })
})
