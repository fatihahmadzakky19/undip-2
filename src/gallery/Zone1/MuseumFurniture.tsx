import { useMemo } from 'react'
import * as THREE from 'three'
import { assetCache } from './cache'

interface FurnitureProps {
  position: [number, number, number]
  rotationY?: number
}

/**
 * 3D Museum Bookshelf filled with leather-bound legal & academic volumes
 */
export function Bookshelf({ position, rotationY = 0 }: FurnitureProps) {
  const materials = useMemo(() => {
    return {
      woodFrame: assetCache.getMaterial(
        'furn-wood-frame',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#3d2516',
            roughness: 0.48,
            metalness: 0.12,
          }),
      ),
      woodBack: assetCache.getMaterial(
        'furn-wood-back',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#26160b',
            roughness: 0.6,
          }),
      ),
      goldTrim: assetCache.getMaterial(
        'furn-gold-trim',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.3,
            metalness: 0.85,
          }),
      ),
      bookSpines: [
        assetCache.getMaterial('furn-book-0', () => new THREE.MeshStandardMaterial({ color: '#59161a', roughness: 0.6 })),
        assetCache.getMaterial('furn-book-1', () => new THREE.MeshStandardMaterial({ color: '#0d2744', roughness: 0.6 })),
        assetCache.getMaterial('furn-book-2', () => new THREE.MeshStandardMaterial({ color: '#1a3d24', roughness: 0.6 })),
        assetCache.getMaterial('furn-book-3', () => new THREE.MeshStandardMaterial({ color: '#4a3319', roughness: 0.6 })),
        assetCache.getMaterial('furn-book-4', () => new THREE.MeshStandardMaterial({ color: '#2a1e36', roughness: 0.6 })),
      ],
      goldGilt: assetCache.getMaterial(
        'furn-gold-gilt',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.25,
            metalness: 0.8,
          }),
      ),
    }
  }, [])

  const bw = 1.9 // width
  const bh = 3.6 // height
  const bd = 0.5 // depth
  const shelves = 5

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Main Outer Timber Frame */}
      {/* Left side panel */}
      <mesh position={[-bw / 2 + 0.04, bh / 2, 0]}>
        <boxGeometry args={[0.08, bh, bd]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>
      {/* Right side panel */}
      <mesh position={[bw / 2 - 0.04, bh / 2, 0]}>
        <boxGeometry args={[0.08, bh, bd]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>
      {/* Top crown cornice */}
      <mesh position={[0, bh + 0.05, 0]}>
        <boxGeometry args={[bw + 0.12, 0.12, bd + 0.1]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>
      {/* Gold crown strip */}
      <mesh position={[0, bh + 0.11, bd / 2 + 0.05]}>
        <boxGeometry args={[bw + 0.14, 0.02, 0.02]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>
      {/* Bottom base plinth */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[bw + 0.08, 0.2, bd + 0.06]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>
      {/* Backboard */}
      <mesh position={[0, bh / 2, -bd / 2 + 0.02]}>
        <boxGeometry args={[bw - 0.08, bh, 0.04]} />
        <primitive object={materials.woodBack} attach="material" />
      </mesh>

      {/* 2. Horizontal Shelves & Books */}
      {Array.from({ length: shelves }).map((_, i) => {
        const shelfY = 0.35 + i * ((bh - 0.6) / (shelves - 1))
        return (
          <group key={i}>
            {/* Shelf board */}
            <mesh position={[0, shelfY, 0]}>
              <boxGeometry args={[bw - 0.08, 0.05, bd - 0.04]} />
              <primitive object={materials.woodFrame} attach="material" />
            </mesh>
            {/* Front gold edge on each shelf */}
            <mesh position={[0, shelfY, bd / 2 - 0.02]}>
              <boxGeometry args={[bw - 0.08, 0.012, 0.01]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>

            {/* Books clustered on this shelf */}
            {i < shelves - 1 && (
              <group position={[-bw / 2 + 0.22, shelfY + 0.025, 0]}>
                {Array.from({ length: 14 }).map((_, bIdx) => {
                  const bWidth = 0.045 + (bIdx % 3) * 0.015
                  const bHeight = 0.32 + ((bIdx * 7) % 5) * 0.025
                  const bDepth = 0.34
                  const mat = materials.bookSpines[(bIdx + i * 2) % materials.bookSpines.length]
                  return (
                    <group key={bIdx} position={[bIdx * 0.09, bHeight / 2, 0]}>
                      {/* Book spine/body */}
                      <mesh>
                        <boxGeometry args={[bWidth, bHeight, bDepth]} />
                        <primitive object={mat} attach="material" />
                      </mesh>
                      {/* Gold embossed title line on spine */}
                      <mesh position={[0, 0, bDepth / 2 + 0.002]}>
                        <boxGeometry args={[bWidth * 0.7, 0.01, 0.002]} />
                        <primitive object={materials.goldGilt} attach="material" />
                      </mesh>
                    </group>
                  )
                })}
              </group>
            )}
          </group>
        )
      })}
    </group>
  )
}

/**
 * 3D Glass Coffee Table with Gold/Brass Frame & Archival Book
 */
export function GlassTable({ position, rotationY = 0 }: FurnitureProps) {
  const materials = useMemo(() => {
    return {
      glass: assetCache.getMaterial(
        'furn-glass-top',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.35,
            roughness: 0.05,
            metalness: 0.1,
          }),
      ),
      goldLegs: assetCache.getMaterial(
        'furn-table-gold',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.28,
            metalness: 0.88,
          }),
      ),
      woodUnderShelf: assetCache.getMaterial(
        'furn-table-shelf',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#3d2516',
            roughness: 0.5,
            metalness: 0.1,
          }),
      ),
      bookCover: assetCache.getMaterial(
        'furn-table-book-cover',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#0d2744',
            roughness: 0.6,
          }),
      ),
      bookGold: assetCache.getMaterial(
        'furn-table-book-gold',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.3,
            metalness: 0.8,
          }),
      ),
    }
  }, [])

  const tw = 1.6
  const tl = 1.0
  const th = 0.52

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Tempered Glass Top Plate */}
      <mesh position={[0, th, 0]}>
        <boxGeometry args={[tw, 0.02, tl]} />
        <primitive object={materials.glass} attach="material" />
      </mesh>

      {/* Gold Rim around Glass Top */}
      <mesh position={[0, th, 0]}>
        <boxGeometry args={[tw + 0.02, 0.022, tl + 0.02]} />
        <primitive object={materials.goldLegs} attach="material" />
      </mesh>

      {/* 2. Lower Wooden Magazine / Journal Shelf */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[tw - 0.2, 0.025, tl - 0.2]} />
        <primitive object={materials.woodUnderShelf} attach="material" />
      </mesh>

      {/* 3. Gold Legs (4 corners) */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`leg-${sx}-${sz}`}
            position={[sx * (tw / 2 - 0.08), th / 2, sz * (tl / 2 - 0.08)]}
          >
            <cylinderGeometry args={[0.022, 0.018, th, 16]} />
            <primitive object={materials.goldLegs} attach="material" />
          </mesh>
        )),
      )}

      {/* 4. Cross Stretcher Rails at bottom */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[tw - 0.16, 0.015, 0.015]} />
        <primitive object={materials.goldLegs} attach="material" />
      </mesh>

      {/* 5. University Memorial Volume on top of table */}
      <group position={[0, th + 0.03, 0]} rotation={[0, 0.1, 0]}>
        <mesh>
          <boxGeometry args={[0.42, 0.04, 0.32]} />
          <primitive object={materials.bookCover} attach="material" />
        </mesh>
        <mesh position={[0, 0.022, 0]}>
          <planeGeometry args={[0.26, 0.18]} />
          <primitive object={materials.bookGold} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

/**
 * 3D Classic Museum Armchair in Deep Navy Velvet with Polished Wood Legs
 */
export function Armchair({ position, rotationY = 0 }: FurnitureProps) {
  const materials = useMemo(() => {
    return {
      navyVelvet: assetCache.getMaterial(
        'furn-chair-velvet',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#0e2a47',
            roughness: 0.75,
            metalness: 0.15,
          }),
      ),
      woodFrame: assetCache.getMaterial(
        'furn-chair-wood',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#3d2516',
            roughness: 0.45,
            metalness: 0.12,
          }),
      ),
      goldStuds: assetCache.getMaterial(
        'furn-chair-studs',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.25,
            metalness: 0.9,
          }),
      ),
    }
  }, [])

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Plush Seat Cushion */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.74, 0.14, 0.72]} />
        <primitive object={materials.navyVelvet} attach="material" />
      </mesh>

      {/* 2. Seat Base Frame */}
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.76, 0.06, 0.74]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>

      {/* 3. Curved Backrest */}
      <mesh position={[0, 0.78, -0.32]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.72, 0.65, 0.14]} />
        <primitive object={materials.navyVelvet} attach="material" />
      </mesh>

      {/* 4. Left & Right Armrests */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.4, 0.58, 0.02]}>
          <mesh>
            <boxGeometry args={[0.1, 0.32, 0.68]} />
            <primitive object={materials.navyVelvet} attach="material" />
          </mesh>
          {/* Wood Armrest Cap */}
          <mesh position={[0, 0.17, 0]}>
            <boxGeometry args={[0.12, 0.025, 0.7]} />
            <primitive object={materials.woodFrame} attach="material" />
          </mesh>
        </group>
      ))}

      {/* 5. Four Wood Legs */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`aleg-${sx}-${sz}`}
            position={[sx * 0.32, 0.15, sz * 0.3]}
            rotation={[sz * 0.08, 0, sx * 0.08]}
          >
            <cylinderGeometry args={[0.025, 0.016, 0.32, 12]} />
            <primitive object={materials.woodFrame} attach="material" />
          </mesh>
        )),
      )}

      {/* Gold Trim Studs on Front Lower Skirt */}
      {[-0.26, -0.13, 0, 0.13, 0.26].map((x, i) => (
        <mesh key={i} position={[x, 0.33, 0.375]}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <primitive object={materials.goldStuds} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Museum Visitor Lounge & Study Alcove
 * Pairs of armchairs, glass table with lamp, and tall bookcases.
 */
export function VisitorLounge({ position, rotationY = 0 }: FurnitureProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Central Glass Table */}
      <GlassTable position={[0, 0, 0]} />

      {/* Two Comfortable Armchairs Facing the Table */}
      <Armchair position={[-0.95, 0, 0]} rotationY={Math.PI / 2} />
      <Armchair position={[0.95, 0, 0]} rotationY={-Math.PI / 2} />
    </group>
  )
}
