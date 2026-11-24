import { useMemo } from 'react'
import * as THREE from 'three'
import { RED_CARPET } from './layout'
import { createRedCarpetTexture } from './textures'

/**
 * Ceremonial Red Carpet Runner
 * Underneath the central axis, leading past the miniature map of Undip straight to the podium.
 * Rich crimson velvet with ornate gold patterned borders.
 */
export function RedCarpet() {
  const carpetTexture = useMemo(() => {
    const tex = createRedCarpetTexture()
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    // Repeat along the long carpet length
    const length = RED_CARPET.zStart - RED_CARPET.zEnd
    tex.repeat.set(1, Math.round(length / 2.8))
    return tex
  }, [])

  const length = RED_CARPET.zStart - RED_CARPET.zEnd
  const centerZ = (RED_CARPET.zStart + RED_CARPET.zEnd) / 2
  const width = RED_CARPET.width

  return (
    <group position={[0, RED_CARPET.y, centerZ]}>
      {/* Main Velvet Carpet Runner Mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          map={carpetTexture}
          roughness={0.85}
          metalness={0.08}
        />
      </mesh>

      {/* Raised Carpet Edge Bevels (Gold/Brass trim along floor boundary) */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (width / 2 + 0.02), 0.01, 0]}>
          <boxGeometry args={[0.04, 0.02, length]} />
          <meshStandardMaterial color="#d4af37" roughness={0.35} metalness={0.8} />
        </mesh>
      ))}

      {/* Front Entrance Carpet Threshold / Brass Tread */}
      <mesh position={[0, 0.015, length / 2]}>
        <boxGeometry args={[width + 0.08, 0.025, 0.08]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Back Podium Threshold Brass Tread */}
      <mesh position={[0, 0.015, -length / 2]}>
        <boxGeometry args={[width + 0.08, 0.025, 0.08]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.85} />
      </mesh>
    </group>
  )
}
