import { memo, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { Founder } from './data/exhibits'
import { UNDIP_FOUNDERS_5, UNDIP_LEADERSHIP_13 } from './data/exhibits'
import {
  FOUNDERS_FRAME_Y,
  FOUNDERS_WALL_X,
} from './layout'
import {
  createFounderPortraitTexture,
  createSectionABannerTexture,
  createSectionBBannerTexture,
} from './textures'
import { assetCache } from './cache'
import { CulledEntity } from '../common/CulledEntity'

interface FounderCardProps {
  founder: Founder
  index: number
  position: [number, number, number]
  rotationY: number
  isMainFounder?: boolean
  isSelected: boolean
  isHovered: boolean
  onSelect: (founder: Founder) => void
  onHover: (id: string | null) => void
}

const FounderCard = memo(function FounderCard({
  founder,
  index,
  position,
  rotationY,
  isMainFounder = false,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: FounderCardProps) {
  const generatedTexture = useMemo(
    () => createFounderPortraitTexture(founder, index),
    [founder, index],
  )
  const [loadedTexture, setLoadedTexture] = useState<THREE.Texture | null>(() => {
    return founder.imagePath ? assetCache.getExternalTexture(founder.imagePath) : null
  })

  useEffect(() => {
    if (!founder.imagePath) return
    let active = true
    const cached = assetCache.loadExternalTexture(founder.imagePath, (tex) => {
      if (active) setLoadedTexture(tex)
    })
    if (cached) setLoadedTexture(cached)
    return () => {
      active = false
    }
  }, [founder.imagePath])

  const texture = loadedTexture ?? generatedTexture

  const frameWidth = isMainFounder ? 1.38 : 1.25
  const frameHeight = isMainFounder ? 1.76 : 1.62

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(founder.id)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(founder)
      }}
    >
      {/* 1. Dark Walnut Backing Board */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[frameWidth + 0.08, frameHeight + 0.08, 0.04]} />
        <meshStandardMaterial color="#22150d" roughness={0.7} />
      </mesh>

      {/* 2. Outer Sculpted Frame (Gilded Gold for 5 Main Founders, Teak & Gold for Leadership) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[frameWidth, frameHeight, 0.09]} />
        <meshStandardMaterial
          color={
            isSelected
              ? '#ffd700'
              : isHovered
                ? '#fadb68'
                : isMainFounder
                  ? '#d4af37'
                  : '#3d2516'
          }
          emissive={
            isSelected
              ? 0xd4af37
              : isHovered
                ? 0xb58a22
                : isMainFounder
                  ? 0x221a08
                  : 0x000000
          }
          emissiveIntensity={isSelected ? 0.45 : isHovered ? 0.25 : 0.05}
          roughness={isMainFounder ? 0.28 : 0.45}
          metalness={isMainFounder ? 0.85 : 0.25}
        />
      </mesh>

      {/* 3. Deep Navy Matboard Inset */}
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[frameWidth - 0.12, frameHeight - 0.12, 0.03]} />
        <meshStandardMaterial color="#0e2343" roughness={0.6} metalness={0.25} />
      </mesh>

      {/* 4. Fine Ivory Passe-Partout Inlay */}
      <mesh position={[0, 0, 0.046]}>
        <boxGeometry args={[frameWidth - 0.2, frameHeight - 0.2, 0.012]} />
        <meshStandardMaterial color="#f7f4eb" roughness={0.85} />
      </mesh>

      {/* 5. Portrait Canvas Texture */}
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[frameWidth - 0.26, frameHeight - 0.26]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>

      {/* 6. Gold Plaque Label Beneath */}
      <group position={[0, -frameHeight / 2 - 0.09, 0.02]}>
        <mesh>
          <boxGeometry args={[frameWidth * 0.82, 0.09, 0.015]} />
          <meshStandardMaterial
            color={isMainFounder ? '#d4af37' : '#f7f4eb'}
            roughness={isMainFounder ? 0.3 : 0.75}
            metalness={isMainFounder ? 0.8 : 0.1}
          />
        </mesh>
      </group>

      {/* 7. Gallery Sconce Downlight above the Portrait */}
      <group position={[0, frameHeight / 2 + 0.16, 0.08]}>
        <mesh position={[0, 0, -0.06]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 12]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.04, 0.05]} rotation={[-0.7, 0, 0]}>
          <boxGeometry args={[0.34, 0.08, 0.12]} />
          <meshStandardMaterial color="#2d2217" roughness={0.5} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.07, 0.05]} rotation={[-0.7, 0, 0]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshStandardMaterial
            color="#fff6e5"
            emissive="#ffd9a0"
            emissiveIntensity={2.5}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* 8. Hover Highlight Underneath */}
      {(isHovered || isSelected) && (
        <mesh position={[0, -frameHeight / 2 - 0.16, 0.05]}>
          <boxGeometry args={[frameWidth * 0.95, 0.04, 0.02]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      )}
    </group>
  )
})

interface FoundersWingProps {
  selectedFounderId: string | null
  hoveredId: string | null
  onSelectFounder: (founder: Founder) => void
  onHover: (id: string | null) => void
}

/**
 * Sayap Tokoh Pendiri & Kepemimpinan Undip (Left Side of Gallery)
 * Divided into two distinct curated sections:
 * 1. SECTION A: 5 Tokoh Pendiri Utama Undip (Pancamitra Pendiri 1956)
 * 2. SECTION B: 13 Tokoh Direktorat & Rektorat Undip (Pimpinan dari masa ke masa)
 */
export const FoundersWing = memo(function FoundersWing({
  selectedFounderId,
  hoveredId,
  onSelectFounder,
  onHover,
}: FoundersWingProps) {
  const sectionABannerTexture = useMemo(() => createSectionABannerTexture(), [])
  const sectionBBannerTexture = useMemo(() => createSectionBBannerTexture(), [])

  return (
    <group>
      {/* ============================================================
          SECTION A: 5 TOKOH PENDIRI UTAMA UNDIP (Z = 8.5 to 0.5)
          ============================================================ */}
      <CulledEntity position={[FOUNDERS_WALL_X, 3.2, 4.5]} radius={6.0} maxDistance={36} name="founders-section-a">
        {/* Section A Banner Header */}
        <group position={[FOUNDERS_WALL_X + 0.1, 4.45, 4.5]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[9.5, 0.52, 0.08]} />
            <meshStandardMaterial color="#142e56" roughness={0.35} metalness={0.3} />
          </mesh>
          <mesh position={[0, -0.23, 0.04]}>
            <boxGeometry args={[9.5, 0.04, 0.02]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
          </mesh>
          <mesh position={[0, 0.23, 0.04]}>
            <boxGeometry args={[9.5, 0.04, 0.02]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
          </mesh>
          {/* Banner Title Plate */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[9.3, 0.44]} />
            <meshStandardMaterial map={sectionABannerTexture} roughness={0.3} />
          </mesh>
        </group>

        {/* 5 Tokoh Pendiri Utama */}
        {UNDIP_FOUNDERS_5.map((founder, idx) => {
          const z = 8.5 - idx * 2.0
          return (
            <FounderCard
              key={founder.id}
              founder={founder}
              index={idx}
              position={[FOUNDERS_WALL_X, FOUNDERS_FRAME_Y, z]}
              rotationY={Math.PI / 2}
              isMainFounder={true}
              isSelected={selectedFounderId === founder.id}
              isHovered={hoveredId === founder.id}
              onSelect={onSelectFounder}
              onHover={onHover}
            />
          )
        })}
      </CulledEntity>

      {/* Architectural Fluted Divider Pilaster between Section A and Section B */}
      <group position={[FOUNDERS_WALL_X + 0.08, 2.5, -1.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 5.0, 0.12]} />
          <meshStandardMaterial color="#2d190d" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[0.08, 4.8, 0.02]} />
          <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
        </mesh>
      </group>

      {/* ============================================================
          SECTION B: 13 TOKOH DIREKTORAT & REKTORAT (Z = -2.5 to -21.7)
          ============================================================ */}
      <CulledEntity position={[FOUNDERS_WALL_X, 3.2, -12.1]} radius={11.5} maxDistance={38} name="founders-section-b">
        {/* Section B Banner Header */}
        <group position={[FOUNDERS_WALL_X + 0.1, 4.45, -12.1]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[20.5, 0.52, 0.08]} />
            <meshStandardMaterial color="#102646" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, -0.23, 0.04]}>
            <boxGeometry args={[20.5, 0.04, 0.02]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
          </mesh>
          <mesh position={[0, 0.23, 0.04]}>
            <boxGeometry args={[20.5, 0.04, 0.02]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
          </mesh>
          {/* Banner Title Plate */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[20.3, 0.44]} />
            <meshStandardMaterial map={sectionBBannerTexture} roughness={0.3} />
          </mesh>
        </group>

        {/* 13 Tokoh Direktorat & Rektorat */}
        {UNDIP_LEADERSHIP_13.map((founder, idx) => {
          const z = -2.5 - idx * 1.6
          return (
            <FounderCard
              key={founder.id}
              founder={founder}
              index={idx + 5}
              position={[FOUNDERS_WALL_X, FOUNDERS_FRAME_Y, z]}
              rotationY={Math.PI / 2}
              isMainFounder={false}
              isSelected={selectedFounderId === founder.id}
              isHovered={hoveredId === founder.id}
              onSelect={onSelectFounder}
              onHover={onHover}
            />
          )
        })}
      </CulledEntity>
    </group>
  )
})
