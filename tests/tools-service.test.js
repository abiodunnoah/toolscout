import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchTools } from '../src/services/tools.js'
import { makeTool } from './helpers.js'

function respond(body, { ok = true, status = 200 } = {}) {
  return { ok, status, json: async () => body }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchTools', () => {
  it('keeps valid records and drops malformed ones', async () => {
    const valid = makeTool()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(respond({ tools: [valid, { id: 42, name: 'Broken' }] })),
    )

    await expect(fetchTools()).resolves.toEqual([valid])
  })

  it('accepts a bare array as well as a wrapped list', async () => {
    const valid = makeTool()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond([valid])))

    await expect(fetchTools()).resolves.toEqual([valid])
  })

  it('throws a short error when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond(null, { ok: false, status: 500 })))

    await expect(fetchTools()).rejects.toThrow('Request failed (500)')
  })

  it('throws when the payload has the wrong shape', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond({ data: [] })))

    await expect(fetchTools()).rejects.toThrow('Unexpected data format')
  })
})
