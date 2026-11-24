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
  minX: -(HALL.halfWidth - 0.55), // -7.05m (allows walking freely into side aisles and browsing books)
  maxX: HALL.halfWidth - 0.55,    // 7.05m
  minZ: HALL.zBack + 1.8,
  maxZ: HALL.zFront - 0.28, // Flush/mepet right at the entrance doors (Z = 11.72)
} as const

export const PLAYER_RADIUS = 0.35

export interface BoxCollider {
  name: string
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

/**
 * Master List of Solid Physical Object Colliders in the Grand Museum Hall:
 * Prevents camera/visitor from walking through stages, podiums, monuments,
 * directory boards, lounge furniture, tall bookcases, and wall shelves.
 */
export const COLLIDERS: readonly BoxCollider[] = [
  // 1. Panggung Utama & Podium Kehormatan (Ceremonial Stage Dais & Podium)
  // Stage Tier 1 (5.6m x 3.6m) + Tier 2 (4.8m x 2.8m) + Teak Podium
  {
    name: 'ceremonial-stage-and-podium',
    minX: -2.85,
    maxX: 2.85,
    minZ: -20.2,
    maxZ: -16.35,
  },

  // 2. Prasasti Pendirian Undip (Sayap Kiri Panggung Utama)
  // Carved Teak Base (1.75m x 1.35m) & Polished Black Granite Inscription Slab
  {
    name: 'monument-prasasti',
    minX: -4.95,
    maxX: -3.05,
    minZ: -20.8,
    maxZ: -19.25,
  },

  // 3. Tiang Bendera Upacara (Sayap Kanan Panggung Utama)
  // Teakwood Flag Stand (1.9m x 0.7m) & Brass Flagpoles
  {
    name: 'flag-stand',
    minX: 3.0,
    maxX: 5.0,
    minZ: -20.5,
    maxZ: -19.5,
  },

  // 4. Struktur Latar Belakang Panggung Utama (Navy Backdrop & Wainscoting)
  // Blocks walking behind the elevated backdrop monolith
  {
    name: 'stage-rear-structure',
    minX: -4.6,
    maxX: 4.6,
    minZ: -26.0,
    maxZ: -20.0,
  },

  // 5. Standing Directory Board (Papan Panduan Navigasi & Peta Museum)
  // Located at X = 3.8, Z = 8.5 with width ~1.4m, depth ~0.7m, rotated -45 deg
  {
    name: 'directory-board',
    minX: 3.05,
    maxX: 4.55,
    minZ: 7.75,
    maxZ: 9.25,
  },

  // 6. Visitor Lounge Kiri (Sofa Velvet & Meja Kaca)
  // Positioned at X = -4.2, Z = 3.8 (allowing generous walkway next to wall bookshelves)
  {
    name: 'visitor-lounge-left',
    minX: -5.45,
    maxX: -2.95,
    minZ: 2.7,
    maxZ: 4.9,
  },

  // 7. Visitor Lounge Kanan (Sofa Velvet & Meja Kaca)
  // Positioned at X = 4.2, Z = 3.8 (allowing generous walkway next to wall bookshelves)
  {
    name: 'visitor-lounge-right',
    minX: 2.95,
    maxX: 5.45,
    minZ: 2.7,
    maxZ: 4.9,
  },

  // 8. Lemari Buku Vertikal (Tall Bookcases) di 4 Sudut Ruangan
  // Depan Kiri (dekat pintu masuk)
  {
    name: 'tall-bookcase-front-left',
    minX: -7.6,
    maxX: -6.7,
    minZ: 9.6,
    maxZ: 11.6,
  },
  // Depan Kanan (dekat pintu masuk)
  {
    name: 'tall-bookcase-front-right',
    minX: 6.7,
    maxX: 7.6,
    minZ: 9.6,
    maxZ: 11.6,
  },
  // Belakang Kiri (mengapit panggung)
  {
    name: 'tall-bookcase-back-left',
    minX: -7.6,
    maxX: -6.7,
    minZ: -24.6,
    maxZ: -22.6,
  },
  // Belakang Kanan (mengapit panggung)
  {
    name: 'tall-bookcase-back-right',
    minX: 6.7,
    maxX: 7.6,
    minZ: -24.6,
    maxZ: -22.6,
  },

  // 9. Rak Buku Dinding Sayap Kiri (Wall Bookshelves under Founders Wing)
  {
    name: 'wall-bookshelf-founders',
    minX: -7.6,
    maxX: -7.05,
    minZ: 0.3,
    maxZ: 8.7,
  },
  {
    name: 'wall-bookshelf-pleburan',
    minX: -7.6,
    maxX: -7.05,
    minZ: -12.4,
    maxZ: -2.6,
  },
  {
    name: 'wall-bookshelf-tembalang',
    minX: -7.6,
    maxX: -7.05,
    minZ: -23.4,
    maxZ: -13.6,
  },

  // 10. Rak Buku Dinding Sayap Kanan (Wall Bookshelves under History Wing)
  {
    name: 'wall-bookshelf-penegerian',
    minX: 7.05,
    maxX: 7.6,
    minZ: -3.9,
    maxZ: 6.1,
  },
  {
    name: 'wall-bookshelf-rsnd',
    minX: 7.05,
    maxX: 7.6,
    minZ: -14.5,
    maxZ: -4.5,
  },
  {
    name: 'wall-bookshelf-future',
    minX: 7.05,
    maxX: 7.6,
    minZ: -22.4,
    maxZ: -14.6,
  },
]

/**
 * Resolves 2D circular player collisions against all museum object colliders and room bounds.
 * Uses exact closest-point circle-vs-AABB intersection tests with iterative relaxation
 * to ensure silky smooth sliding against faces, edges, and corners without penetration.
 */
export function resolveCollisions(
  x: number,
  z: number,
  radius: number = PLAYER_RADIUS,
): [number, number] {
  let px = x
  let pz = z

  for (let iter = 0; iter < 3; iter++) {
    let hadCollision = false

    for (const c of COLLIDERS) {
      // Find closest point on AABB to circle center (px, pz)
      const closestX = Math.max(c.minX, Math.min(c.maxX, px))
      const closestZ = Math.max(c.minZ, Math.min(c.maxZ, pz))

      const diffX = px - closestX
      const diffZ = pz - closestZ
      const distSq = diffX * diffX + diffZ * diffZ

      if (distSq < radius * radius) {
        hadCollision = true

        if (distSq > 0.000001) {
          const dist = Math.sqrt(distSq)
          const push = radius - dist
          px += (diffX / dist) * push
          pz += (diffZ / dist) * push
        } else {
          // Circle center is completely inside the AABB - push to nearest face
          const dLeft = px - c.minX
          const dRight = c.maxX - px
          const dBack = pz - c.minZ
          const dFront = c.maxZ - pz
          const minOverlap = Math.min(dLeft, dRight, dBack, dFront)

          if (minOverlap === dLeft) px = c.minX - radius
          else if (minOverlap === dRight) px = c.maxX + radius
          else if (minOverlap === dBack) pz = c.minZ - radius
          else pz = c.maxZ + radius
        }
      }
    }

    // Re-clamp to room bounds
    px = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, px))
    pz = Math.max(BOUNDS.minZ, Math.min(BOUNDS.maxZ, pz))

    if (!hadCollision) break
  }

  return [px, pz]
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
