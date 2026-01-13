import { json } from '@sveltejs/kit'
import { loadStallsGeoJSON } from '$lib/server/stalls'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const data = await loadStallsGeoJSON()

  return json(data, {
    headers: {
      // bra default: cache i 5 min + allow stale while revalidate
      'cache-control': 'public, max-age=300, stale-while-revalidate=600',
    },
  })
}
