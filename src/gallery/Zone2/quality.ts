/**
 * Graphics Quality Preset System for Museum Virtual UNDIP
 * Provides dynamic runtime switching between Standar, HD, and Full HD presets.
 */

export type QualityLevel = 'standar' | 'hd' | 'fullhd'

export interface QualityPreset {
  id: QualityLevel
  label: string
  subtitle: string
  dpr: number
  antialias: boolean
  shadows: boolean
  shadowMapSize: number
  maxDistance: number
  textureResolution: number
  anisotropy: number
  cullThreshold: number
  bloom: boolean
}

export const QUALITY_PRESETS: Record<QualityLevel, QualityPreset> = {
  standar: {
    id: 'standar',
    label: 'Standar (Ringan)',
    subtitle: 'Optimal untuk laptop hemat daya & perangkat mobile',
    dpr: 1.0,
    antialias: false,
    shadows: false,
    shadowMapSize: 512,
    maxDistance: 32,
    textureResolution: 512,
    anisotropy: 2,
    cullThreshold: 18,
    bloom: false,
  },
  hd: {
    id: 'hd',
    label: 'HD (Seimbang)',
    subtitle: 'Kualitas tajam dengan performa halus (Rekomendasi)',
    dpr: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1.5,
    antialias: true,
    shadows: true,
    shadowMapSize: 1024,
    maxDistance: 48,
    textureResolution: 1024,
    anisotropy: 8,
    cullThreshold: 26,
    bloom: true,
  },
  fullhd: {
    id: 'fullhd',
    label: 'Full HD (Tertinggi)',
    subtitle: 'Visual fotorealistik maksimal untuk PC desktop bertenaga',
    dpr: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2.0) : 2.0,
    antialias: true,
    shadows: true,
    shadowMapSize: 2048,
    maxDistance: 65,
    textureResolution: 2048,
    anisotropy: 16,
    cullThreshold: 35,
    bloom: true,
  },
}

const STORAGE_KEY = 'undip_museum_quality_preset'
const FPS_COUNTER_KEY = 'undip_museum_show_fps'

export function getSavedQualityLevel(): QualityLevel {
  if (typeof window === 'undefined') return 'hd'

  // Developer mode overrides to standard immediately
  const params = new URLSearchParams(window.location.search)
  if (params.get('dev') === '1') {
    return 'standar'
  }

  const saved = localStorage.getItem(STORAGE_KEY) as QualityLevel | null
  if (saved && saved in QUALITY_PRESETS) {
    return saved
  }
  return 'hd'
}

export function saveQualityLevel(level: QualityLevel): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, level)
  }
}

export function getSavedFpsCounter(): boolean {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  if (params.get('dev') === '1') return true
  return localStorage.getItem(FPS_COUNTER_KEY) === 'true'
}

export function saveFpsCounter(show: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FPS_COUNTER_KEY, show ? 'true' : 'false')
  }
}

export function isDevMode(): boolean {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('dev') === '1'
}
