import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from '../src/components/ui/Button.vue'
import { makeRouter } from './helpers.js'

describe('Button', () => {
  it('renders a real button with the chosen variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'ghost', size: 'sm' },
      slots: { default: 'Ghost' },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.text()).toBe('Ghost')
  })

  it('renders an anchor when href is given', () => {
    const wrapper = mount(Button, {
      props: { href: 'https://example.com' },
      slots: { default: 'Visit' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.attributes('type')).toBeUndefined()
  })

  it('renders a router link when to is given', async () => {
    const router = makeRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Button, {
      props: { to: '/saved' },
      slots: { default: 'Saved' },
      global: { plugins: [router] },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/saved')
  })
})
