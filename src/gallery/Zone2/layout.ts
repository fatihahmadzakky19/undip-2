/**
 * ZONE 2: THE GROWTH OF KNOWLEDGE
 * Spatial Architecture, Room Bounds, Colliders & Navigation Targets.
 *
 * Dimensions:
 * - Width: 14.0m (halfWidth = 7.0m)
 * - Length: 40.0m (Z = +18.0m to -18.0m)
 * - Height: 6.2m
 * - Central Maroon Aisle: 3.2m wide with gold borders
 */

export const ZONE2_HALL = {
  width: 14.0,
  halfWidth: 7.0,
  length: 40.0,
  height: 6.2,
  zEntrance: 18.0, // North entrance portal from Zone 1
  zExit: -18.0,    // South exit portal towards Zone 3
} as const

export const ZONE2_EYE_HEIGHT = 1.65
export const ZONE2_START_POSITION: [number, number, number] = [0, ZONE2_EYE_HEIGHT, 15.8]

export const ZONE2_BOUNDS = {
  minX: -(ZONE2_HALL.halfWidth - 0.55), // -6.45m
  maxX: ZONE2_HALL.halfWidth - 0.55,    // 6.45m
  minZ: ZONE2_HALL.zExit + 0.65,        // -17.35m
  maxZ: ZONE2_HALL.zEntrance - 0.65,    // 17.35m
} as const

export const ZONE2_PLAYER_RADIUS = 0.35

export interface Zone2Collider {
  name: string
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

/**
 * Master List of Physical Wall and Solid Barrier Colliders for Zone 2.
 * Adheres strictly to the user guideline:
 * - Objects flush against walls (display cabinets, wall bookcases, portal frames) have solid collision.
 * - Walkway areas and floor passages remain open and comfortable to navigate.
 */
export const ZONE2_COLLIDERS: readonly Zone2Collider[] = [
  // 1. Entrance Portal Jambs (Z = 17.5 to 18.0)
  { name: 'entrance-jamb-left', minX: -7.0, maxX: -2.6, minZ: 17.2, maxZ: 18.0 },
  { name: 'entrance-jamb-right', minX: 2.6, maxX: 7.0, minZ: 17.2, maxZ: 18.0 },

  // 2. Exit Portal Jambs (Z = -18.0 to -17.2)
  { name: 'exit-jamb-left', minX: -7.0, maxX: -2.6, minZ: -18.0, maxZ: -17.2 },
  { name: 'exit-jamb-right', minX: 2.6, maxX: 7.0, minZ: -18.0, maxZ: -17.2 },

  // 3. Left Wall Bookshelves & Display Cases
  { name: 'wall-shelf-left-1', minX: -7.0, maxX: -6.4, minZ: 5.0, maxZ: 13.0 },
  { name: 'wall-shelf-left-2', minX: -7.0, maxX: -6.4, minZ: -4.0, maxZ: 4.0 },
  { name: 'wall-shelf-left-3', minX: -7.0, maxX: -6.4, minZ: -13.0, maxZ: -5.0 },

  // 4. Right Wall Display Cases & Trophy Cabinets
  { name: 'wall-shelf-right-1', minX: 6.4, maxX: 7.0, minZ: 5.0, maxZ: 13.0 },
  { name: 'wall-shelf-right-2', minX: 6.4, maxX: 7.0, minZ: -4.0, maxZ: 4.0 },
  { name: 'wall-shelf-right-3', minX: 6.4, maxX: 7.0, minZ: -13.0, maxZ: -5.0 },

  // 5. Central Tree of Growth Base Plinth (X = -0.9 to 0.9, Z = 4.6 to 6.4)
  { name: 'tree-base-plinth', minX: -0.9, maxX: 0.9, minZ: 4.6, maxZ: 6.4 },
]

/**
 * 2D Circular Player Collision Resolution against Room Bounds & Obstacles.
 */
export function resolveZone2Collisions(
  x: number,
  z: number,
  radius: number = ZONE2_PLAYER_RADIUS,
): [number, number] {
  let px = x
  let pz = z

  for (let iter = 0; iter < 3; iter++) {
    let hadCollision = false

    for (const c of ZONE2_COLLIDERS) {
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
    px = Math.max(ZONE2_BOUNDS.minX, Math.min(ZONE2_BOUNDS.maxX, px))
    pz = Math.max(ZONE2_BOUNDS.minZ, Math.min(ZONE2_BOUNDS.maxZ, pz))

    if (!hadCollision) break
  }

  return [px, pz]
}

/** Teleport Navigation Points across the 4 Sub-Zones */
export type Zone2SubzoneKey = 'entrance' | 'subzoneA' | 'subzoneB' | 'subzoneC' | 'subzoneD' | 'exit'

export const ZONE2_TARGETS: Record<Zone2SubzoneKey, {
  name: string
  label: string
  position: [number, number, number]
  lookAt: [number, number, number]
}> = {
  entrance: {
    name: 'Pintu Masuk (Zona 1)',
    label: 'Pintu Masuk',
    position: [0, ZONE2_EYE_HEIGHT, 15.5],
    lookAt: [0, ZONE2_EYE_HEIGHT, 10.0],
  },
  subzoneA: {
    name: 'Sub-Zona A: Pohon Pertumbuhan Fakultas',
    label: 'Pohon Fakultas',
    position: [0, ZONE2_EYE_HEIGHT, 9.0],
    lookAt: [0, ZONE2_EYE_HEIGHT, 5.5],
  },
  subzoneB: {
    name: 'Sub-Zona B: Transformasi Kampus Pleburan ke Tembalang',
    label: 'Transformasi Kampus',
    position: [0, ZONE2_EYE_HEIGHT, 2.5],
    lookAt: [0, ZONE2_EYE_HEIGHT, -0.5],
  },
  subzoneC: {
    name: 'Sub-Zona C: Perkembangan Pendidikan & Riset Ilmiah',
    label: 'Pendidikan & Riset',
    position: [0, ZONE2_EYE_HEIGHT, -5.5],
    lookAt: [0, ZONE2_EYE_HEIGHT, -8.0],
  },
  subzoneD: {
    name: 'Sub-Zona D: Prestasi Akademik & Kontribusi Rakyat',
    label: 'Prestasi & Kontribusi',
    position: [0, ZONE2_EYE_HEIGHT, -12.5],
    lookAt: [0, ZONE2_EYE_HEIGHT, -14.5],
  },
  exit: {
    name: 'Pintu Keluar (Menuju Zona 3)',
    label: 'Pintu Keluar',
    position: [0, ZONE2_EYE_HEIGHT, -16.0],
    lookAt: [0, ZONE2_EYE_HEIGHT, -18.0],
  },
}
