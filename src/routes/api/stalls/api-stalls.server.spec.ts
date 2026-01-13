import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock before importing +server
vi.mock('$lib/server/stalls', () => ({
  loadStallsGeoJSON: vi.fn(),
}))

import { loadStallsGeoJSON } from '$lib/server/stalls'
import { GET } from './+server'

describe('GET /api/stalls', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns GeoJSON with cache headers', async () => {
    const geojson = {
      type: 'FeatureCollection',
      features: []
    }

    vi.mocked(loadStallsGeoJSON).mockResolvedValueOnce(geojson as any)

    const res = await GET({} as any)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type') ?? '').toContain('application/json')
    expect(res.headers.get('cache-control')).toBe(
      'public, max-age=300, stale-while-revalidate=600'
    )

    const body = await res.json()
    expect(body).toEqual(geojson)
  })

  it('propagates errors from loader', async () => {
    vi.mocked(loadStallsGeoJSON).mockRejectedValueOnce(new Error('boom'))

    await expect(GET({} as any)).rejects.toThrow('boom')
  })
})

