import { memo, useMemo } from 'react'
import * as THREE from 'three'
import {
  DIRECTORY_BOARD_POS,
  HALL,
  HALL_CENTER_Z,
  HALL_LENGTH,
} from './layout'
import { createFloorTexture } from './textures'
import { CeilingRoof } from './CeilingRoof'
import { RedCarpet } from './RedCarpet'
import { VisitorLounge } from './MuseumFurniture'
import { DirectoryBoard } from './DirectoryBoard'
import { CulledEntity } from '../common/CulledEntity'

interface GalleryEnvironmentProps {
  isNearDirectory?: boolean
  hoveredId?: string | null
  onHover?: (id: string | null) => void
}

/**
 * Museum Virtual Undip - Master Architectural Environment
 * Clean minimalist architectural space dividing left and right sides into sections:
 * - Left Side: Founders Wing (5 Main Founders & 13 Leadership)
 * - Right Side: History & Archives Wing (Dense Masonry Gallery)
 * - Center: Red Carpet, Miniature Map, and Ceremonial Podium
 * - Back Wall: Royal Navy Blue Wall with high contrast
 */
export const GalleryEnvironment = memo(function GalleryEnvironment({
  isNearDirectory = false,
}: GalleryEnvironmentProps) {
  const floorTexture = useMemo(() => {
    const tex = createFloorTexture()
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(6, 16)
    return tex
  }, [])

  const halfW = HALL.halfWidth
  const height = HALL.height
  const length = HALL_LENGTH
  const centerZ = HALL_CENTER_Z

  return (
    <group>
      {/* 1. Master Marble Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, centerZ]}
      >
        <planeGeometry args={[halfW * 2, length]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.28}
          metalness={0.12}
        />
      </mesh>

      {/* 2. Left Wall (Founders Side) */}
      <mesh
        position={[-halfW, height / 2, centerZ]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color="#f7f4ec" roughness={0.92} />
      </mesh>

      {/* 3. Right Wall (History & Archives Side) */}
      <mesh
        position={[halfW, height / 2, centerZ]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color="#f7f4ec" roughness={0.92} />
      </mesh>

      {/* 4. Front Entrance Wall (Behind Visitor) */}
      <mesh
        position={[0, height / 2, HALL.zFront]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[halfW * 2, height]} />
        <meshStandardMaterial color="#f7f4ec" roughness={0.92} />
      </mesh>

      {/* 5. Back Focal Wall (Behind the Ceremonial Dais) - Royal Navy Blue */}
      <mesh
        position={[0, height / 2, HALL.zBack]}
      >
        <planeGeometry args={[halfW * 2, height]} />
        <meshStandardMaterial color="#142e56" roughness={0.7} />
      </mesh>

      {/* 6. Grand Architectural Wainscoting & Baseboards along Left & Right Walls */}
      {[-1, 1].map((side) => (
        <group key={side}>
          {/* Baseboard (Dark Walnut Teak) */}
          <mesh position={[side * (halfW - 0.05), 0.1, centerZ]}>
            <boxGeometry args={[0.1, 0.2, length]} />
            <meshStandardMaterial color="#63391e" roughness={0.46} />
          </mesh>
          {/* Gold Inlay line on baseboard */}
          <mesh position={[side * (halfW - 0.09), 0.2, centerZ]}>
            <boxGeometry args={[0.02, 0.03, length]} />
            <meshStandardMaterial color="#dfba45" roughness={0.25} metalness={0.88} />
          </mesh>

          {/* Heritage Brown Wainscot Panel */}
          <mesh position={[side * (halfW - 0.04), 0.55, centerZ]}>
            <boxGeometry args={[0.08, 0.7, length]} />
            <meshStandardMaterial color="#7d4a29" roughness={0.46} metalness={0.08} />
          </mesh>

          {/* Gold Chair Rail Molding */}
          <mesh position={[side * (halfW - 0.06), 0.92, centerZ]}>
            <boxGeometry args={[0.12, 0.06, length]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.85} />
          </mesh>

          {/* Upper Cove Emissive Strip */}
          <mesh position={[side * (halfW - 0.04), height - 0.6, centerZ]}>
            <boxGeometry args={[0.04, 0.04, length * 0.9]} />
            <meshStandardMaterial
              color="#fff3db"
              emissive="#ffd999"
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* 7. Grand Classical Entrance Double Doors & Archway (Facing Inward to Visitor) */}
      <group position={[0, 0, HALL.zFront - 0.05]} rotation={[0, Math.PI, 0]}>
        {/* Outer Fluted Door Casing (Dark Teak) */}
        <mesh position={[0, 2.2, 0.04]}>
          <boxGeometry args={[3.8, 4.4, 0.14]} />
          <meshStandardMaterial color="#2c1a0e" roughness={0.45} metalness={0.15} />
        </mesh>

        {/* Gilded Architrave / Pediment Header */}
        <mesh position={[0, 4.45, 0.08]}>
          <boxGeometry args={[4.1, 0.35, 0.18]} />
          <meshStandardMaterial color="#142e56" roughness={0.35} metalness={0.25} />
        </mesh>
        <mesh position={[0, 4.65, 0.1]}>
          <boxGeometry args={[4.2, 0.06, 0.22]} />
          <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
        </mesh>
        <mesh position={[0, 4.25, 0.08]}>
          <boxGeometry args={[3.9, 0.04, 0.16]} />
          <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
        </mesh>

        {/* Symmetrical Left & Right Door Leaves (Dark Teak with Royal Navy & Gold Insets) */}
        {[-0.9, 0.9].map((dx, di) => (
          <group key={di} position={[dx, 2.1, 0.08]}>
            {/* Door Leaf Body */}
            <mesh>
              <boxGeometry args={[1.7, 4.0, 0.08]} />
              <meshStandardMaterial color="#24150b" roughness={0.5} metalness={0.12} />
            </mesh>

            {/* Perimeter Gold Molding on Door Leaf */}
            <mesh position={[0, 0, 0.042]}>
              <boxGeometry args={[1.5, 3.8, 0.01]} />
              <meshStandardMaterial color="#d4af37" roughness={0.28} metalness={0.85} />
            </mesh>

            {/* Upper Navy Inset Panel */}
            <mesh position={[0, 0.7, 0.048]}>
              <boxGeometry args={[1.34, 2.0, 0.015]} />
              <meshStandardMaterial color="#142e56" roughness={0.4} metalness={0.2} />
            </mesh>

            {/* Lower Navy Inset Panel */}
            <mesh position={[0, -0.9, 0.048]}>
              <boxGeometry args={[1.34, 1.4, 0.015]} />
              <meshStandardMaterial color="#142e56" roughness={0.4} metalness={0.2} />
            </mesh>

            {/* Polished Brass Vertical Bar Pull Handle (Centered near meeting stile) */}
            <group position={[di === 0 ? 0.68 : -0.68, 0, 0.08]}>
              <mesh>
                <cylinderGeometry args={[0.02, 0.02, 0.65, 16]} />
                <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.92} />
              </mesh>
              {[-0.26, 0.26].map((hy, hi) => (
                <mesh key={hi} position={[0, hy, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.06, 12]} />
                  <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
                </mesh>
              ))}
            </group>
          </group>
        ))}
      </group>

      {/* 8. Alternating Rectangular Gap Roof */}
      <CeilingRoof />

      {/* 10. Central Red Carpet */}
      <RedCarpet />

      {/* 12. EXTRA ASSETS: Visitor Lounge (Adjusted slightly inward to provide spacious walkable aisle near wall bookshelves) */}
      <CulledEntity position={[4.2, 0.8, 3.8]} radius={3.2} maxDistance={28} name="lounge-right">
        <VisitorLounge position={[4.2, 0, 3.8]} rotationY={-Math.PI / 6} />
      </CulledEntity>
      <CulledEntity position={[-4.2, 0.8, 3.8]} radius={3.2} maxDistance={28} name="lounge-left">
        <VisitorLounge position={[-4.2, 0, 3.8]} rotationY={Math.PI / 6} />
      </CulledEntity>

      {/* 13. EXTRA ASSET: Standing Wayfinding Directory Board */}
      <CulledEntity position={DIRECTORY_BOARD_POS} radius={2.5} maxDistance={28} name="directory-board">
        <DirectoryBoard
          position={DIRECTORY_BOARD_POS}
          rotationY={-Math.PI / 4}
          isNear={isNearDirectory}
        />
      </CulledEntity>
    </group>
  )
})
