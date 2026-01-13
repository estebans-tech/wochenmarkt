import { describe, expect, it, vi } from 'vitest'
import { addStallsLayer } from '../domain/layer'
import type { StallFeatureCollection } from '$lib/types/stall'

type Handler = () => void

function makeLeafletMock() {
  const group = {
    addTo: vi.fn().mockReturnThis()
  }

  // håll alla skapade rektanglar så vi kan inspektera dem
  const createdRects: Array<{
    addTo: ReturnType<typeof vi.fn>
    bindPopup: ReturnType<typeof vi.fn>
    on: ReturnType<typeof vi.fn>
    _handlers: Record<string, Handler>
    _boundsArg: unknown
    _styleArg: unknown
  }> = []

  const rectangle = vi.fn((boundsArg: unknown, styleArg: unknown) => {
    const handlers: Record<string, Handler> = {}

    const rect = {
      _handlers: handlers,
      _boundsArg: boundsArg,
      _styleArg: styleArg,

      addTo: vi.fn().mockReturnThis(),
      bindPopup: vi.fn().mockReturnThis(),
      on: vi.fn((event: string, cb: Handler) => {
        handlers[event] = cb
        return rect
      })
    }

    createdRects.push(rect)
    return rect
  })

  const L = {
    layerGroup: vi.fn(() => group),
    rectangle
  }

  return { L, group, rectangle, createdRects }
}

describe('addStallsLayer', () => {
  it('creates rectangles, binds popup, stores byId, and wires click -> onSelect(id)', () => {
    const { L, group, rectangle, createdRects } = makeLeafletMock()
    const map = {} as any
    const onSelect = vi.fn()

    const data: StallFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 'stall-1',
          geometry: { type: 'Point', coordinates: [9.755647, 52.360594] },
          properties: {
            name: 'Stall 1',
            size: '4x2',
            categories: ['vegetables_potatoes_fruit'],
            primaryCategory: 'vegetables_potatoes_fruit'
          }
        },
        {
          type: 'Feature',
          id: 'stall-2',
          geometry: { type: 'Point', coordinates: [9.755473, 52.36055] },
          properties: {
            name: 'Stall 2',
            size: '3x2',
            categories: ['plants_flowers']
          }
        }
      ]
    }

    const { byId } = addStallsLayer({ L: L as any, map, data, onSelect })

    // layerGroup skapas och läggs på kartan
    expect(L.layerGroup).toHaveBeenCalledTimes(1)
    expect(group.addTo).toHaveBeenCalledWith(map)

    // rektanglar skapas för varje feature
    expect(rectangle).toHaveBeenCalledTimes(2)

    // bindPopup med stallnamn
    expect(createdRects[0].bindPopup).toHaveBeenCalledWith('Stall 1')
    expect(createdRects[1].bindPopup).toHaveBeenCalledWith('Stall 2')

    // addTo(group) för varje rektangel
    expect(createdRects[0].addTo).toHaveBeenCalledWith(group)
    expect(createdRects[1].addTo).toHaveBeenCalledWith(group)

    // byId mappar id -> rect
    expect(byId.has('stall-1')).toBe(true)
    expect(byId.has('stall-2')).toBe(true)

    // klick-handler registreras och kallar onSelect med rätt id
    expect(createdRects[0].on).toHaveBeenCalledWith('click', expect.any(Function))
    createdRects[0]._handlers.click?.()
    expect(onSelect).toHaveBeenCalledWith('stall-1')
  })

  it('skips byId/onSelect wiring when feature.id is missing', () => {
    const { L, createdRects } = makeLeafletMock()
    const map = {} as any
    const onSelect = vi.fn()

    const data: StallFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          // id saknas
          geometry: { type: 'Point', coordinates: [9.7, 52.3] },
          properties: {
            name: 'No ID stall',
            size: '2x2',
            categories: ['specialities']
          }
        }
      ]
    }

    const { byId } = addStallsLayer({ L: L as any, map, data, onSelect })

    expect(byId.size).toBe(0)
    // handler ska inte finnas eftersom id saknas
    expect(createdRects[0]._handlers.click).toBeUndefined()
  })
})

