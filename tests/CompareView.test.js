import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CompareView from '../src/views/CompareView.vue'
import { makeRouter, makeTool } from './helpers.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('CompareView', () => {
  it('caps the comparison at three tools, even with four ids', async () => {
    const tools = [
      makeTool({ id: 'chatgpt', name: 'ChatGPT', category: 'Productivity' }),
      makeTool({ id: 'claude', name: 'Claude', category: 'Writing' }),
      makeTool({ id: 'gemini', name: 'Gemini', category: 'Research' }),
      makeTool({ id: 'deepseek', name: 'DeepSeek', category: 'Coding' }),
    ]
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ tools }) }),
    )

    const router = makeRouter()
    await router.push('/compare?ids=chatgpt,claude,gemini,deepseek')
    await router.isReady()

    const wrapper = mount(CompareView, {
      global: { plugins: [createPinia(), router] },
    })
    await flushPromises()
    await wrapper.vm.$nextTick()

    const headers = wrapper.findAll('thead th')
    expect(headers).toHaveLength(4)
    expect(wrapper.get('caption').text()).toContain('ChatGPT, Claude, Gemini')
    expect(wrapper.get('caption').text()).not.toContain('DeepSeek')
  })
})
