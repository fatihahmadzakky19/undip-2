/**
 * Master Color Palette Configuration for Zone 2 (The Growth of Knowledge)
 * Standardized to maintain visual harmony with Zone 1 and the UNDIP Heritage Brand.
 */
export const PALETTE = {
  // Deep Royal Navy Blue (accent walls, upholstery, information signboards, podium)
  navyDark: '#0B1A3A',
  navyPrimary: '#0E2250',
  navyDeep: '#071228',

  // Radiant Heritage Gold (frames, moldings, titles, emblems, light fixtures)
  goldTrim: '#D4AF37',
  goldAccent: '#C9A227',
  goldBright: '#FFD700',
  goldLight: '#FFE89C',

  // Warm Ivory / Cream (gallery main walls, coffer ceiling panels, stone plinths)
  ivoryMain: '#E8E0D0',
  ivoryWarm: '#D9D0BE',
  ivoryLight: '#F5F0E6',

  // Imperial Burgundy / Maroon (central aisle runner carpet)
  maroonCarpet: '#6B0F1A',
  maroonBorder: '#4E0A12',

  // Antique Dark Walnut & Teak Wood (bookshelves, display cases, pedestals, architectural ribs)
  darkWood: '#3B2412',
  teakDeep: '#2A1A0E',
  teakPolished: '#4A2E18',

  // Polished Light Ceramic Marble Floor
  floorMarble: '#F0ECE4',
  floorTileBorder: '#D8D2C5',

  // Warm Illumination & Accent Glows
  warmLight: '#FFF2D9',
  coveGlow: '#FFE6B0',
  spotlightBeam: '#FFF7E6',
} as const

export type PaletteColor = keyof typeof PALETTE
