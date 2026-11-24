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
export const START_POSITION: [number, number, number] = [0, EYE_HEIGHT, 11.2]
export const WALK_SPEED = 3.6
export const RUN_SPEED = 7.2 // 2x speed sprint with Shift key

/** Camera & Visitor Collision Physical Radius */
export const PLAYER_RADIUS = 0.40

/** Room Wall Boundaries (clamped with player radius to prevent near-plane mesh clipping) */
export const ROOM_BOUNDS = {
  minX: -(HALL.halfWidth - PLAYER_RADIUS),
  maxX: HALL.halfWidth - PLAYER_RADIUS,
  minZ: HALL.zBack + PLAYER_RADIUS + 0.15,
  maxZ: HALL.zFront - PLAYER_RADIUS - 0.35,
} as const

/** Legacy Navigation Limits (kept for backward compatibility) */
export const BOUNDS = {
  minX: -(HALL.halfWidth - 1.2),
  maxX: HALL.halfWidth - 1.2,
  minZ: HALL.zBack + 1.8,
  maxZ: HALL.zFront - 0.28,
} as const

/** Solid Object Colliders in the Hall (AABB boxes in world coordinates) */
export interface ColliderAABB {
  name: string
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

export const OBSTACLE_COLLIDERS: ColliderAABB[] = [
  // 1. Panggung Utama & Podium Kehormatan (Stage Dais & Ceremonial Podium)
  {
    name: 'stage-dais-and-podium',
    minX: -2.85,
    maxX: 2.85,
    minZ: -26.0,
    maxZ: -16.35,
  },
  // 2. Monumen Prasasti Undip (Sayap Kiri Panggung)
  {
    name: 'prasasti-monument',
    minX: -4.95,
    maxX: -3.05,
    minZ: -26.0,
    maxZ: -19.25,
  },
  // 3. Tiang Bendera Upacara (Sayap Kanan Panggung)
  {
    name: 'ceremonial-flags',
    minX: 2.95,
    maxX: 5.05,
    minZ: -26.0,
    maxZ: -19.55,
  },
  // 4. Rak Buku Dinding Rendah - Sayap Kiri (Left Wall Bookshelves)
  {
    name: 'wall-bookshelf-left-1',
    minX: -7.6,
    maxX: -7.1,
    minZ: 0.35,
    maxZ: 8.65,
  },
  {
    name: 'wall-bookshelf-left-2',
    minX: -7.6,
    maxX: -7.1,
    minZ: -12.35,
    maxZ: -2.65,
  },
  {
    name: 'wall-bookshelf-left-3',
    minX: -7.6,
    maxX: -7.1,
    minZ: -23.35,
    maxZ: -13.65,
  },
  // 5. Rak Buku Dinding Rendah - Sayap Kanan (Right Wall Bookshelves)
  {
    name: 'wall-bookshelf-right-1',
    minX: 7.1,
    maxX: 7.6,
    minZ: -3.85,
    maxZ: 6.05,
  },
  {
    name: 'wall-bookshelf-right-2',
    minX: 7.1,
    maxX: 7.6,
    minZ: -14.45,
    maxZ: -4.55,
  },
  {
    name: 'wall-bookshelf-right-3',
    minX: 7.1,
    maxX: 7.6,
    minZ: -22.35,
    maxZ: -14.65,
  },
  // 6. Lemari Buku Vertikal Tinggi (Tall Heritage Bookcases)
  {
    name: 'tall-bookcase-front-right',
    minX: 6.95,
    maxX: 7.6,
    minZ: 9.55,
    maxZ: 11.65,
  },
  {
    name: 'tall-bookcase-front-left',
    minX: -7.6,
    maxX: -6.95,
    minZ: 9.55,
    maxZ: 11.65,
  },
  {
    name: 'tall-bookcase-back-right',
    minX: 6.95,
    maxX: 7.6,
    minZ: -24.65,
    maxZ: -22.55,
  },
  {
    name: 'tall-bookcase-back-left',
    minX: -7.6,
    maxX: -6.95,
    minZ: -24.65,
    maxZ: -22.55,
  },
  // 7. Papan Petunjuk Direktori Standing
  {
    name: 'directory-board',
    minX: 3.15,
    maxX: 4.45,
    minZ: 7.85,
    maxZ: 9.15,
  },
  // 8. Visitor Lounge (Sofa & Meja Kaca Kiri dan Kanan)
  {
    name: 'lounge-left',
    minX: -5.9,
    maxX: -3.7,
    minZ: 2.7,
    maxZ: 4.9,
  },
  {
    name: 'lounge-right',
    minX: 3.7,
    maxX: 5.9,
    minZ: 2.7,
    maxZ: 4.9,
  },
  // 9. Maket Miniatur Kampus (Miniature Map)
  {
    name: 'miniature-map',
    minX: -1.35,
    maxX: 1.35,
    minZ: -5.15,
    maxZ: -1.85,
  },
]

/** Test if circle at (x, z) with given radius intersects an AABB box */
export function isCollidingWithBox(
  x: number,
  z: number,
  radius: number,
  box: ColliderAABB,
): boolean {
  const closestX = Math.max(box.minX, Math.min(box.maxX, x))
  const closestZ = Math.max(box.minZ, Math.min(box.maxZ, z))
  const dx = x - closestX
  const dz = z - closestZ
  return dx * dx + dz * dz < radius * radius
}

/** Check if position (x, z) collides with boundaries or any solid obstacle */
export function checkCollision(
  x: number,
  z: number,
  radius: number = PLAYER_RADIUS,
  colliders: ColliderAABB[] = OBSTACLE_COLLIDERS,
  bounds: typeof ROOM_BOUNDS = ROOM_BOUNDS,
): boolean {
  if (x < bounds.minX || x > bounds.maxX || z < bounds.minZ || z > bounds.maxZ) {
    return true
  }
  for (let i = 0; i < colliders.length; i++) {
    if (isCollidingWithBox(x, z, radius, colliders[i])) {
      return true
    }
  }
  return false
}

/**
 * Slide-based collision resolution for smooth, realistic camera navigation.
 * Uses substepping to eliminate tunneling and allow natural sliding along walls and obstacles.
 */
export function resolveMovement(
  currentX: number,
  currentZ: number,
  dx: number,
  dz: number,
  radius: number = PLAYER_RADIUS,
  colliders: ColliderAABB[] = OBSTACLE_COLLIDERS,
  bounds: typeof ROOM_BOUNDS = ROOM_BOUNDS,
): [number, number] {
  if (dx === 0 && dz === 0) return [currentX, currentZ]

  const distance = Math.hypot(dx, dz)
  const maxStep = radius * 0.4
  const steps = Math.max(1, Math.ceil(distance / maxStep))

  let posX = currentX
  let posZ = currentZ
  const stepDx = dx / steps
  const stepDz = dz / steps

  for (let s = 0; s < steps; s++) {
    const targetX = posX + stepDx
    const targetZ = posZ + stepDz

    // Try full diagonal step first
    if (!checkCollision(targetX, targetZ, radius, colliders, bounds)) {
      posX = targetX
      posZ = targetZ
      continue
    }

    // Slide along X if Z is blocked
    const canMoveX = !checkCollision(targetX, posZ, radius, colliders, bounds)
    // Slide along Z if X is blocked
    const canMoveZ = !checkCollision(posX, targetZ, radius, colliders, bounds)

    if (canMoveX && !canMoveZ) {
      posX = targetX
    } else if (canMoveZ && !canMoveX) {
      posZ = targetZ
    } else if (canMoveX && canMoveZ) {
      // Both single-axis steps are clear individually: prefer the axis with the larger movement delta
      if (Math.abs(stepDx) >= Math.abs(stepDz)) {
        posX = targetX
        if (!checkCollision(posX, targetZ, radius, colliders, bounds)) {
          posZ = targetZ
        }
      } else {
        posZ = targetZ
        if (!checkCollision(targetX, posZ, radius, colliders, bounds)) {
          posX = targetX
        }
      }
    }
  }

  return [posX, posZ]
}

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
  entrance: [0, EYE_HEIGHT, 11.2] as [number, number, number],
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
