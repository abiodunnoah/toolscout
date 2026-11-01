import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useTools } from '../src/composables/useTools.js'
import { makeTool } from './helpers.js'

const Harness = defineComponent({
  setup() {
    return useTools()
  },
  template: `
    <div>
      <span data-test="loading">{{ loading }}</span>
      <span data-test="error">{{ error }}</span>
      <span data-test="count">{{ tools.length }}</span>
      <button type="button" @click="retry">Retry</button>
    </div>
  `,
})

const validTool = makeTool()

function respond(body, { ok = true, status = 200 } = {}) {
  return { ok, status, json: async () => body }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useTools', () => {
  it('starts loading, then exposes the fetched tools', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond({ tools: [validTool] })))

    const wrapper = mount(Harness)
    expect(wrapper.get('[data-test="loading"]').text()).toBe('true')

    await flushPromises()

    expect(wrapper.get('[data-test="loading"]').text()).toBe('false')
    expect(wrapper.get('[data-test="error"]').text()).toBe('')
    expect(wrapper.get('[data-test="count"]').text()).toBe('1')
  })

  it('shows a readable error and recovers through retry', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(respond(null, { ok: false, status: 500 }))
      .mockResolvedValueOnce(respond({ tools: [validTool] }))
    vi.stubGlobal('fetch', fetchMock)

    const wrapper = mount(Harness)
    await flushPromises()

    expect(wrapper.get('[data-test="error"]').text()).toContain('Request failed (500)')
    expect(wrapper.get('[data-test="count"]').text()).toBe('0')

    await wrapper.get('button').trigger('click')
    await flushPromises()

    expect(wrapper.get('[data-test="error"]').text()).toBe('')
    expect(wrapper.get('[data-test="count"]').text()).toBe('1')
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
