import { UNDIP_FOUNDERS } from './data/exhibits'

/**
 * Museum Virtual Undip - Master Spatial Layout & Dimensions
 * Spacious monumental hall divided cleanly into side sections:
 * - Left Side: 13 Founders of UNDIP
 * - Right Side: UNDIP History, Early Photos, Founding Decree, & Founding Archives
 * - Center: Red Carpet Axis, Miniature Map of UNDIP, and Ceremonial Podium
 * - Roof: Rectangular coffer with alternating large & small rectangular gaps
 */

export const HALL = {
  halfWidth: 7.6, // 15.2m wide interior
  height: 8.8,    // 8.8m elevated grand monumental ceiling height (as requested)
  zFront: 12.0,   // Entrance wall
  zBack: -26.0,   // Back wall
} as const

export const HALL_LENGTH = HALL.zFront - HALL.zBack // 38.0m
export const HALL_CENTER_Z = (HALL.zFront + HALL.zBack) / 2 // -7.0m

export const EYE_HEIGHT = 1.65
export const START_POSITION: [number, number, number] = [0, EYE_HEIGHT, 11.4]
export const WALK_SPEED = 3.6
export const RUN_SPEED = 7.2 // 2x speed sprint with Shift key

/** Navigation Clamping Limits */
export const BOUNDS = {
  minX: -(HALL.halfWidth - 1.2),
  maxX: HALL.halfWidth - 1.2,
  minZ: HALL.zBack + 1.8,
  maxZ: HALL.zFront - 0.28, // Flush/mepet right at the entrance doors (Z = 11.72)
} as const

/** Red Carpet - Runs flush from the entrance door sill (z = 11.88) to the stage front (z = -16.4) */
export const RED_CARPET = {
  width: 3.2,
  zStart: 11.88,
  zEnd: -16.4,
  y: 0.02,
} as const

/** Left Side (Section 1: Founders Wing) */
export const FOUNDERS_WALL_X = -(HALL.halfWidth - 0.16)
export const FOUNDERS_COUNT = UNDIP_FOUNDERS.length // 13
export const FOUNDERS_START_Z = 8.5
export const FOUNDERS_SPACING = 2.3
export const FOUNDERS_FRAME_Y = 2.8

/** Right Side (Section 2: History & Archives Wing) */
export const HISTORY_WALL_X = HALL.halfWidth - 0.16
export const HISTORY_START_Z = 7.5
export const HISTORY_SPACING = 5.0
export const HISTORY_PANEL_Y = 2.8

/** Center Exhibits & Monuments */
export const MINIATURE_MAP_POS: [number, number, number] = [0, 0, -3.5]
export const PODIUM_POS: [number, number, number] = [0, 0, -18.2]
export const DIRECTORY_BOARD_POS: [number, number, number] = [3.8, 0, 8.5]
export const DIRECTORY_PROXIMITY_RADIUS = 3.2
/** Section Teleport Targets for quick navigation */
export const SECTION_TARGETS = {
  entrance: [0, EYE_HEIGHT, 11.4] as [number, number, number],
  founders: [-4.5, EYE_HEIGHT, 0.0] as [number, number, number],
  map: [0, EYE_HEIGHT, 0.5] as [number, number, number],
  podium: [0, EYE_HEIGHT, -14.5] as [number, number, number],
  history: [4.5, EYE_HEIGHT, 0.0] as [number, number, number],
  prasasti: [-2.6, EYE_HEIGHT, -15.5] as [number, number, number],
}

/** Ceiling Alternating Gaps Configuration */
export interface CeilingGap {
  z: number
  length: number
  width: number
  isLarge: boolean
}

export function generateCeilingGaps(): CeilingGap[] {
  const gaps: CeilingGap[] = []
  // Rhythmic alternating sequence along the center length of the ceiling
  // Patterns: Large (3.4m), divider (0.6m), Small (1.2m), divider (0.6m) -> period 5.8m
  let currentZ = 9.0
  let isLarge = true

  while (currentZ > HALL.zBack + 3.0) {
    const gapLength = isLarge ? 3.4 : 1.3
    const gapWidth = 5.6
    gaps.push({
      z: currentZ - gapLength / 2,
      length: gapLength,
      width: gapWidth,
      isLarge,
    })
    currentZ -= (gapLength + 0.9)
    isLarge = !isLarge
  }

  return gaps
}

export const CEILING_GAPS = generateCeilingGaps()

/** Look Controls */
export const PITCH_LIMIT = 0.72
export const LOOK_SENSITIVITY = 0.0024
export const DRAG_SENSITIVITY = 0.0048
export const DRAG_THRESHOLD = 5

/** Legacy exports for compatibility */
export const FIRST_Z = 6
export const FRAME_Y = 2.3
export const SPACING = 4.2
export const WALL_X = 2.92
