export const MAP_CONFIG = {
  tilesUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; OpenStreetMap contributors',

  // Leaflet uses [lat, lng]
  defaultCenter: [52.36059, 9.755661] as const,
  defaultZoom: 19,

  minZoom: 15,
  
  maxZoom: 22,
  maxNativeZoom: 19,

  // Fallback if they are missing
  maxZoom: 22,
  defaultFeatureName: 'Stall',
  defaultSize: '3x2' as const
}
