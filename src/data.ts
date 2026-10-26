import type { Location } from './types'

export const cities: Location[] = [
  { name: 'Berlin', lat: 52.52, lng: 13.405, timeZone: 'Europe/Berlin' },
  { name: 'Augsburg', lat: 48.3705, lng: 10.8978, timeZone: 'Europe/Berlin' },
  { name: 'Kiew', lat: 50.4501, lng: 30.5234, timeZone: 'Europe/Kyiv' },
  { name: 'Tokio', lat: 35.6762, lng: 139.6503, timeZone: 'Asia/Tokyo' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, timeZone: 'Australia/Sydney' },
]

export const highlightedStarNames = new Set([
  'Sirius', 'Vega', 'Arcturus', 'Betelgeuse', 'Rigel',
  'Capella', 'Aldebaran', 'Antares', 'Deneb', 'Polaris',
])
