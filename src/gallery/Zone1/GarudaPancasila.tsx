import { useMemo } from 'react'
import * as THREE from 'three'
import { assetCache } from './cache'

interface GarudaProps {
  position: [number, number, number]
  scale?: number
}

/**
 * 3D Lambang Negara Garuda Pancasila
 * The National Coat of Arms of the Republic of Indonesia.
 * Features golden wings, central perisai/shield, and Bhinneka Tunggal Ika banner.
 */
export function GarudaPancasila({ position, scale = 1 }: GarudaProps) {
  const materials = useMemo(() => {
    return {
      goldEagle: assetCache.getMaterial(
        'garuda-gold-eagle',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.28,
            metalness: 0.88,
          }),
      ),
      shieldRed: assetCache.getMaterial(
        'garuda-shield-red',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#c62828',
            roughness: 0.4,
          }),
      ),
      shieldWhite: assetCache.getMaterial(
        'garuda-shield-white',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#f5f5f5',
            roughness: 0.4,
          }),
      ),
      shieldBlack: assetCache.getMaterial(
        'garuda-shield-black',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#1a1a1a',
            roughness: 0.5,
          }),
      ),
      goldTrim: assetCache.getMaterial(
        'garuda-gold-trim',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffdf73',
            roughness: 0.2,
            metalness: 0.9,
          }),
      ),
      bannerWhite: assetCache.getMaterial(
        'garuda-banner-white',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            roughness: 0.6,
          }),
      ),
    }
  }, [])

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* 1. Golden Eagle Head (Turned to its right / viewer's right) */}
      <group position={[0, 0.48, 0.08]} rotation={[0, 0.25, 0]}>
        {/* Head */}
        <mesh castShadow>
          <sphereGeometry args={[0.13, 14, 14]} />
          <primitive object={materials.goldEagle} attach="material" />
        </mesh>
        {/* Curved Beak */}
        <mesh position={[0.08, -0.04, 0.12]} rotation={[0.4, 0.3, 0]} castShadow>
          <coneGeometry args={[0.045, 0.16, 8]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>
        {/* Head Crest Feathers */}
        <mesh position={[-0.04, 0.12, -0.06]} rotation={[-0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 0.12, 0.12]} />
          <primitive object={materials.goldEagle} attach="material" />
        </mesh>
      </group>

      {/* 2. Outspread Golden Wings (17 primary feathers each) */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.18, 0.25, 0]}>
          {/* Main Upper Wing Arch */}
          <mesh
            position={[side * 0.45, 0.16, 0]}
            rotation={[0, 0, side * -0.32]}
            castShadow
          >
            <boxGeometry args={[0.75, 0.28, 0.05]} />
            <primitive object={materials.goldEagle} attach="material" />
          </mesh>

          {/* Splayed Feather Layers */}
          {[0, 1, 2, 3, 4].map((f) => (
            <mesh
              key={f}
              position={[side * (0.35 + f * 0.14), -0.05 - f * 0.08, 0]}
              rotation={[0, 0, side * (-0.4 - f * 0.18)]}
              castShadow
            >
              <boxGeometry args={[0.12, 0.45, 0.04]} />
              <primitive object={materials.goldEagle} attach="material" />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. Central Perisai / Shield (Pancasila) */}
      <group position={[0, 0.08, 0.08]}>
        {/* Shield Frame Outer Rim */}
        <mesh castShadow>
          <boxGeometry args={[0.48, 0.58, 0.04]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Shield 4 Quarters (Red & White quadrants) */}
        {/* Top-Right: Red (Banteng) */}
        <mesh position={[0.11, 0.13, 0.025]}>
          <planeGeometry args={[0.2, 0.24]} />
          <primitive object={materials.shieldRed} attach="material" />
        </mesh>
        {/* Top-Left: White (Beringin) */}
        <mesh position={[-0.11, 0.13, 0.025]}>
          <planeGeometry args={[0.2, 0.24]} />
          <primitive object={materials.shieldWhite} attach="material" />
        </mesh>
        {/* Bottom-Right: White (Padi & Kapas) */}
        <mesh position={[0.11, -0.13, 0.025]}>
          <planeGeometry args={[0.2, 0.24]} />
          <primitive object={materials.shieldWhite} attach="material" />
        </mesh>
        {/* Bottom-Left: Red (Rantai) */}
        <mesh position={[-0.11, -0.13, 0.025]}>
          <planeGeometry args={[0.2, 0.24]} />
          <primitive object={materials.shieldRed} attach="material" />
        </mesh>

        {/* Center Heart Shield: Black with Golden Star (Bintang Nur) */}
        <mesh position={[0, 0, 0.032]}>
          <boxGeometry args={[0.16, 0.16, 0.015]} />
          <primitive object={materials.shieldBlack} attach="material" />
        </mesh>
        {/* Gold Star */}
        <mesh position={[0, 0, 0.042]}>
          <octahedronGeometry args={[0.05, 0]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Horizontal Black Equator Line */}
        <mesh position={[0, 0, 0.028]}>
          <boxGeometry args={[0.44, 0.025, 0.01]} />
          <primitive object={materials.shieldBlack} attach="material" />
        </mesh>
      </group>

      {/* 4. Tail Feathers (8 feathers) */}
      <group position={[0, -0.32, -0.02]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.38, 0.04]} />
          <primitive object={materials.goldEagle} attach="material" />
        </mesh>
        {[-0.12, -0.04, 0.04, 0.12].map((tx, ti) => (
          <mesh key={ti} position={[tx, -0.18, 0]} rotation={[0, 0, tx * 0.5]} castShadow>
            <cylinderGeometry args={[0.025, 0.015, 0.32, 8]} />
            <primitive object={materials.goldEagle} attach="material" />
          </mesh>
        ))}
      </group>

      {/* 5. Golden Talons gripping the Scroll */}
      {[-0.18, 0.18].map((cx, ci) => (
        <mesh key={ci} position={[cx, -0.24, 0.1]} castShadow>
          <sphereGeometry args={[0.05, 10, 10]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>
      ))}

      {/* 6. White Scroll Banner: "BHINNEKA TUNGGAL IKA" */}
      <group position={[0, -0.28, 0.12]}>
        {/* Curved ribbon banner */}
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.09, 0.02]} />
          <primitive object={materials.bannerWhite} attach="material" />
        </mesh>
        {/* Gold Trim edges on ribbon */}
        <mesh position={[0, 0.042, 0.002]}>
          <boxGeometry args={[0.92, 0.008, 0.02]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>
        <mesh position={[0, -0.042, 0.002]}>
          <boxGeometry args={[0.92, 0.008, 0.02]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>
      </group>
    </group>
  )
}
