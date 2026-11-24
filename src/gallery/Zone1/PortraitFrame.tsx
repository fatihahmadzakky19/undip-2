import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { PortraitFrameProps } from './types'
import { createPortraitTexture } from './textures'
import { PortraitLabel } from './PortraitLabel'

/**
 * An interactive portrait frame: bronze/gold frame, mat, portrait image,
 * wall sconce, and an information label. Hover highlights, click selects.
 */
export function PortraitFrame({
  portrait,
  position,
  rotationY,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: PortraitFrameProps) {
  // Placeholder first; swap in a real image if the path resolves.
  const placeholder = useMemo(() => createPortraitTexture(portrait), [portrait])
  const [loaded, setLoaded] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    if (!portrait.imagePath) return
    let cancelled = false
    const loader = new THREE.TextureLoader()
    loader.load(
      portrait.imagePath,
      (texture) => {
        if (cancelled) return
        texture.colorSpace = THREE.SRGBColorSpace
        setLoaded(texture)
      },
      undefined,
      () => {
        // Missing or broken image: keep the generated placeholder.
        setLoaded(null)
      },
    )
    return () => {
      cancelled = true
    }
  }, [portrait.imagePath])

  const texture = loaded ?? placeholder
  const gold = (portrait.name.length + portrait.years.length) % 2 === 0
  const frameColor = gold ? '#d4af37' : '#9c6b30'

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={(event) => {
        event.stopPropagation()
        onHover(portrait.id)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        onHover(null)
      }}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(portrait.id)
      }}
    >
      {/* Backboard */}
      <mesh position={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[1.74, 2.14, 0.04]} />
        <meshStandardMaterial color="#241a12" roughness={0.8} />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 2.1, 0.12]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.32}
          metalness={0.8}
          emissive={isSelected ? 0xd4af37 : isHovered ? 0xffffff : 0x000000}
          emissiveIntensity={isSelected ? 0.3 : isHovered ? 0.12 : 0}
        />
      </mesh>

      {/* Ivory mat */}
      <mesh position={[0, 0, 0.03]} receiveShadow>
        <boxGeometry args={[1.48, 1.88, 0.1]} />
        <meshStandardMaterial color="#efe6d5" roughness={0.85} />
      </mesh>

      {/* Portrait image */}
      <mesh position={[0, 0, 0.086]}>
        <planeGeometry args={[1.3, 1.7]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>

      {/* Wall sconce above the frame */}
      <mesh position={[0, 1.42, -0.03]}>
        <boxGeometry args={[0.26, 0.18, 0.1]} />
        <meshStandardMaterial
          color="#f7e7c8"
          emissive="#ffd9a0"
          emissiveIntensity={1.2}
          roughness={0.6}
        />
      </mesh>

      <PortraitLabel portrait={portrait} />
    </group>
  )
}
