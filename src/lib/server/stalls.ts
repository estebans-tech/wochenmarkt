import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { StallFeatureCollection } from '$lib/types/stall'

const GEOJSON_RELATIVE_PATH = 'static/data/stall.geojson'

/**
 * Reads the GeoJSON file from /static and returns it as a typed StallFeatureCollection.
 * Throws if the file can't be read or if the shape is not a FeatureCollection.
 */
export async function loadStallsGeoJSON(): Promise<StallFeatureCollection> {
  const filePath = path.resolve(process.cwd(), GEOJSON_RELATIVE_PATH)
  const raw = await readFile(filePath, 'utf-8')

  const parsed: unknown = JSON.parse(raw)

  // Minimal runtime check (keeps it lightweight but catches obvious issues)
  if (
    !parsed ||
    typeof parsed !== 'object' ||
    (parsed as any).type !== 'FeatureCollection' ||
    !Array.isArray((parsed as any).features)
  ) {
    throw new Error(`Invalid GeoJSON in ${GEOJSON_RELATIVE_PATH}: expected FeatureCollection`)
  }

  return parsed as StallFeatureCollection
}
