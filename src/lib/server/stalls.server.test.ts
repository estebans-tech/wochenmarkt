import { describe, it, expect, vi, afterEach } from 'vitest'

// Mock fs/promise BEFORE module import 
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
}))

import { readFile } from 'node:fs/promises'
import { loadStallsGeoJSON } from './stalls'

afterEach(() => {
  vi.resetAllMocks()
})

describe('loadStallsGeoJSON', () => {
  it('return parsed FeatureCollection', async () => {
      const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [13.405, 52.52] },
          properties: {
            name: 'Stall 1',
            size: '3x2',
            categories: ['bakery'],
            primaryCategory: 'bakery',
          },
        },
      ],
    }

    vi.mocked(readFile).mockResolvedValueOnce(JSON.stringify(geojson))

    const result = await loadStallsGeoJSON()

    expect(result.type).toBe('FeatureCollection')
    expect(Array.isArray(result.features)).toBe(true)
    expect(result.features).toHaveLength(1)
  })

  it('throws if json is not a FeatureCollection', async () => {
    vi.mocked(readFile).mockResolvedValueOnce(JSON.stringify({ type: 'nope' }))

    await expect(loadStallsGeoJSON()).rejects.toThrow(/expected FeatureCollection/i)
  })

  it('throws if file cannot be read', async () => {
    vi.mocked(readFile).mockRejectedValueOnce(new Error('ENOENT'))

    await expect(loadStallsGeoJSON()).rejects.toThrow('ENOENT')
  })
})
