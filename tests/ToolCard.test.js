import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ToolCard from '../src/components/tools/ToolCard.vue'
import { makeRouter, makeTool } from './helpers.js'

async function mountCard(props) {
  const router = makeRouter()
  await router.push('/')
  await router.isReady()
  return mount(ToolCard, { props, global: { plugins: [router] } })
}

describe('ToolCard', () => {
  it('renders the tool name, link and price', async () => {
    const wrapper = await mountCard({ tool: makeTool(), saved: false })

    expect(wrapper.get('h3').text()).toBe('ChatPDF')
    expect(wrapper.get('a[href="/tool/chatpdf"]').text()).toBe('ChatPDF')
    expect(wrapper.text()).toContain('Freemium')
    expect(wrapper.text()).toContain('Upload a paper')
  })

  it('emits toggle-save with the tool id when Save is clicked', async () => {
    const wrapper = await mountCard({ tool: makeTool(), saved: false })
    const save = wrapper.get('button[aria-pressed]')

    expect(save.attributes('aria-pressed')).toBe('false')
    expect(save.text()).toBe('Save')

    await save.trigger('click')

    expect(wrapper.emitted('toggle-save')).toEqual([['chatpdf']])
  })

  it('shows the saved state when the tool is on the shortlist', async () => {
    const wrapper = await mountCard({ tool: makeTool(), saved: true })
    const save = wrapper.get('button[aria-pressed]')

    expect(save.attributes('aria-pressed')).toBe('true')
    expect(save.text()).toBe('Saved')
    expect(save.find('svg').exists()).toBe(true)
  })
})
