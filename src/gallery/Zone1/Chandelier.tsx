import { useMemo } from 'react'
import * as THREE from 'three'
import { assetCache } from './cache'

interface ChandelierProps {
  position: [number, number, number]
  scale?: number
}

/**
 * 3D Grand Multi-Tiered Luxury Crystal Chandelier (Lampu Gantung Mewah)
 * Matches the reference image: circular tiered crystal prisms, gold brass framework,
 * and warm interior candle/filament glow.
 */
export function Chandelier({ position, scale = 1 }: ChandelierProps) {
  const materials = useMemo(() => {
    return {
      goldBrass: assetCache.getMaterial(
        'chand-gold-brass',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.22,
            metalness: 0.9,
          }),
      ),
      crystalPrism: assetCache.getMaterial(
        'chand-crystal-prism',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.75,
            roughness: 0.05,
            metalness: 0.2,
          }),
      ),
      lightGlow: assetCache.getMaterial(
        'chand-light-glow',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#fff3db',
            emissive: '#ffd899',
            emissiveIntensity: 2.2,
          }),
      ),
    }
  }, [])

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* 1. Ceiling Canopy Rosette (Gold mount attached to the ceiling) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 0.08, 24]} />
        <primitive object={materials.goldBrass} attach="material" />
      </mesh>

      {/* 2. Central Suspension Rod & Decorative Baluster */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.2, 16]} />
        <primitive object={materials.goldBrass} attach="material" />
      </mesh>
      <mesh position={[0, -1.25, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <primitive object={materials.goldBrass} attach="material" />
      </mesh>

      {/* 3. Tier 1 (Top Tier - Diameter ~1.4m) */}
      <group position={[0, -1.45, 0]}>
        {/* Gold Circular Support Ring */}
        <mesh>
          <torusGeometry args={[0.7, 0.03, 12, 36]} />
          <primitive object={materials.goldBrass} attach="material" />
        </mesh>
        {/* Crystal Prisms hanging around Tier 1 */}
        {Array.from({ length: 32 }).map((_, i) => {
          const angle = (i / 32) * Math.PI * 2
          const cx = Math.cos(angle) * 0.7
          const cz = Math.sin(angle) * 0.7
          return (
            <mesh
              key={i}
              position={[cx, -0.22, cz]}
              rotation={[0, angle, 0]}
            >
              <cylinderGeometry args={[0.02, 0.025, 0.44, 4]} />
              <primitive object={materials.crystalPrism} attach="material" />
            </mesh>
          )
        })}
      </group>

      {/* 4. Tier 2 (Middle Tier - Diameter ~1.0m) */}
      <group position={[0, -1.75, 0]}>
        <mesh>
          <torusGeometry args={[0.5, 0.028, 12, 32]} />
          <primitive object={materials.goldBrass} attach="material" />
        </mesh>
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2
          const cx = Math.cos(angle) * 0.5
          const cz = Math.sin(angle) * 0.5
          return (
            <mesh
              key={i}
              position={[cx, -0.2, cz]}
              rotation={[0, angle, 0]}
            >
              <cylinderGeometry args={[0.02, 0.025, 0.38, 4]} />
              <primitive object={materials.crystalPrism} attach="material" />
            </mesh>
          )
        })}
      </group>

      {/* 5. Tier 3 (Bottom Tier - Diameter ~0.6m) */}
      <group position={[0, -2.0, 0]}>
        <mesh>
          <torusGeometry args={[0.3, 0.025, 12, 24]} />
          <primitive object={materials.goldBrass} attach="material" />
        </mesh>
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          const cx = Math.cos(angle) * 0.3
          const cz = Math.sin(angle) * 0.3
          return (
            <mesh
              key={i}
              position={[cx, -0.16, cz]}
              rotation={[0, angle, 0]}
            >
              <cylinderGeometry args={[0.018, 0.022, 0.3, 4]} />
              <primitive object={materials.crystalPrism} attach="material" />
            </mesh>
          )
        })}
        {/* Bottom Crystal Pendant Finial */}
        <mesh position={[0, -0.32, 0]}>
          <octahedronGeometry args={[0.09, 0]} />
          <primitive object={materials.crystalPrism} attach="material" />
        </mesh>
      </group>

      {/* 6. Internal Glowing Bulbs Core */}
      <group position={[0, -1.7, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <primitive object={materials.lightGlow} attach="material" />
        </mesh>
      </group>
    </group>
  )
}
