import { memo, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { HistoryExhibit } from './data/exhibits'
import { HISTORY_EXHIBITS } from './data/exhibits'
import { HISTORY_WALL_X } from './layout'
import { createHistoryPanelTexture } from './textures'
import { assetCache } from './cache'
import { CulledEntity } from '../common/CulledEntity'

interface SalonFrameConfig {
  exhibitId: string
  z: number
  y: number
  width: number
  height: number
  frameColor?: string
}

/**
 * Spacious Museum Gallery Wall Layout for History & Archives Wing:
 * Situated along the right wall directly flanking and spanning the 3D Miniature Map.
 * Standardized with generous gaps of at least 55cm–100cm (>50cm) between frames horizontally
 * and 60cm (>50cm) between upper and lower rows for an airy, elegant aesthetic.
 */
const SALON_LAYOUT: SalonFrameConfig[] = [
  // --- COLUMN 1 (Z = 5.6): Era Prakarsa & Statuta 1956-1957 ---
  { exhibitId: 'archives-notary-1956', z: 5.6, y: 3.9, width: 1.15, height: 1.35, frameColor: '#d4af37' },
  { exhibitId: 'archives-statuta-1957', z: 5.6, y: 2.05, width: 1.15, height: 1.35, frameColor: '#3d2516' },

  // --- COLUMN 2 (Z = 3.3): Foto Patung Pleburan & Upacara Lapangan OR 1957 ---
  { exhibitId: 'early-photo-panti-budaya', z: 3.3, y: 3.9, width: 1.3, height: 0.95, frameColor: '#3d2516' },
  { exhibitId: 'early-photo-students-1957', z: 3.3, y: 2.05, width: 1.3, height: 0.95, frameColor: '#2b1a10' },

  // --- COLUMN 3: MONUMENTAL CENTERPIECE 1 (Z = 1.1): Mahakarya Raden Saleh ---
  { exhibitId: 'artwork-diponegoro-center', z: 1.1, y: 2.95, width: 2.1, height: 1.45, frameColor: '#d4af37' },

  // --- COLUMN 4 (Z = -1.5): Payung Hukum PP No. 7/1961 & Lembaran Negara ---
  { exhibitId: 'decree-sk-1961', z: -1.5, y: 3.9, width: 1.15, height: 1.35, frameColor: '#d4af37' },
  { exhibitId: 'decree-lembaran-negara', z: -1.5, y: 2.05, width: 1.15, height: 1.35, frameColor: '#3d2516' },

  // --- COLUMN 5 (Z = -3.5): DIRECTLY FACING CENTRAL MULADI DOME & CAMPUS MAKET ---
  { exhibitId: 'history-muladi-dome', z: -3.5, y: 3.9, width: 1.35, height: 1.0, frameColor: '#d4af37' },
  { exhibitId: 'history-widya-puraya', z: -3.5, y: 2.05, width: 1.35, height: 1.0, frameColor: '#3d2516' },

  // --- COLUMN 6: MONUMENTAL CENTERPIECE 2 (Z = -5.7): Potret Presiden Sukarno 1960 ---
  { exhibitId: 'archives-soekarno-1960', z: -5.7, y: 2.95, width: 1.35, height: 1.85, frameColor: '#d4af37' },

  // --- COLUMN 7 (Z = -7.9): Auditorium Pleburan & Gedung Pusat Riset ---
  { exhibitId: 'early-photo-soekarno-visit', z: -7.9, y: 3.9, width: 1.3, height: 0.95, frameColor: '#3d2516' },
  { exhibitId: 'early-campus-pleburan', z: -7.9, y: 2.05, width: 1.3, height: 1.0, frameColor: '#2b1a10' },

  // --- COLUMN 8 (Z = -10.1): Monumen Patung Kuda & Kampus Manajemen Tembalang ---
  { exhibitId: 'history-masterplan-tembalang', z: -10.1, y: 3.9, width: 1.15, height: 1.45, frameColor: '#3d2516' },
  { exhibitId: 'history-groundbreaking-tembalang', z: -10.1, y: 2.05, width: 1.3, height: 0.95, frameColor: '#d4af37' },

  // --- COLUMN 9 (Z = -12.3): RSND Tembalang & Waduk Edukasi Undip ---
  { exhibitId: 'history-rsnd', z: -12.3, y: 3.9, width: 1.3, height: 0.95, frameColor: '#3d2516' },
  { exhibitId: 'history-waduk-undip', z: -12.3, y: 2.05, width: 1.3, height: 0.95, frameColor: '#2b1a10' },

  // --- COLUMN 10 (Z = -14.5): Pangeran Diponegoro & Transformasi PTN-BH ---
  { exhibitId: 'history-wisuda-perdana', z: -14.5, y: 3.9, width: 1.15, height: 1.45, frameColor: '#3d2516' },
  { exhibitId: 'history-transformation', z: -14.5, y: 2.05, width: 1.3, height: 1.05, frameColor: '#d4af37' },
]

interface SalonItemProps {
  config: SalonFrameConfig
  exhibit: HistoryExhibit
  isSelected: boolean
  isHovered: boolean
  onSelect: (exhibit: HistoryExhibit) => void
  onHover: (id: string | null) => void
}

const SalonItem = memo(function SalonItem({
  config,
  exhibit,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: SalonItemProps) {
  const generatedTexture = useMemo(() => createHistoryPanelTexture(exhibit), [exhibit])
  const [loadedTexture, setLoadedTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    if (!exhibit.imagePath) return
    let active = true
    const cached = assetCache.loadExternalTexture(exhibit.imagePath, (tex) => {
      if (active) setLoadedTexture(tex)
    })
    if (cached) setLoadedTexture(cached)
    return () => {
      active = false
    }
  }, [exhibit.imagePath])

  const texture = loadedTexture ?? generatedTexture
  const { width: fw, height: fh, frameColor = '#d4af37' } = config

  return (
    <group
      position={[HISTORY_WALL_X, config.y, config.z]}
      rotation={[0, -Math.PI / 2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(exhibit.id)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(exhibit)
      }}
    >
      {/* 1. Dark Wood Backboard */}
      <mesh position={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[fw + 0.08, fh + 0.08, 0.04]} />
        <meshStandardMaterial color="#1a110a" roughness={0.7} />
      </mesh>

      {/* 2. Outer Moulded Frame (Gold or Heritage Teak) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[fw, fh, 0.09]} />
        <meshStandardMaterial
          color={isSelected ? '#ffd966' : isHovered ? '#f5cf65' : frameColor}
          emissive={isSelected ? 0xd4af37 : isHovered ? 0xb58a22 : 0x000000}
          emissiveIntensity={isSelected ? 0.45 : isHovered ? 0.22 : 0}
          roughness={0.32}
          metalness={frameColor === '#d4af37' ? 0.85 : 0.2}
        />
      </mesh>

      {/* 3. Passe-Partout Matboard (Ivory/White museum matboard) */}
      <mesh position={[0, 0, 0.035]} receiveShadow>
        <boxGeometry args={[fw - 0.12, fh - 0.12, 0.04]} />
        <meshStandardMaterial color="#f8f5ee" roughness={0.9} />
      </mesh>

      {/* 4. Fine Inset Gold Foil Trim */}
      <mesh position={[0, 0, 0.048]}>
        <boxGeometry args={[fw - 0.2, fh - 0.2, 0.015]} />
        <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* 5. Exhibition Canvas */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[fw - 0.26, fh - 0.26]} />
        <meshStandardMaterial map={texture} roughness={0.65} />
      </mesh>

      {/* 6. Subtle Plaque Label Below Frame */}
      <group position={[0, -fh / 2 - 0.08, 0.02]}>
        <mesh>
          <boxGeometry args={[Math.min(fw * 0.75, 1.2), 0.08, 0.015]} />
          <meshStandardMaterial color="#f7f4eb" roughness={0.8} />
        </mesh>
      </group>

      {/* 7. Hover Line */}
      {(isHovered || isSelected) && (
        <mesh position={[0, -fh / 2 - 0.15, 0.02]}>
          <boxGeometry args={[fw * 0.9, 0.03, 0.01]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      )}
    </group>
  )
})

interface HistoryArchivesWingProps {
  selectedExhibitId: string | null
  hoveredId: string | null
  onSelectExhibit: (exhibit: HistoryExhibit) => void
  onHover: (id: string | null) => void
}

/**
 * Sayap Sejarah & Arsip Resmi Undip (Generously Spaced Museum Gallery Wall)
 * Spans smoothly with >= 55cm horizontal and vertical gaps alongside the 3D Miniature Map.
 */
interface ActiveTrackSpotlightProps {
  z: number
}

function ActiveTrackSpotlight({ z }: ActiveTrackSpotlightProps) {
  return (
    <group position={[HISTORY_WALL_X - 0.8, 5.15, z]}>
      {/* Track Stem Connector attaching canister to horizontal pole */}
      <mesh position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
        <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Swivel Elbow */}
      <mesh position={[0, 0.01, 0]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Spotlight Fixture Canister (Angled towards the wall) */}
      <mesh position={[0.03, -0.04, 0]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.05, 0.07, 0.16, 16]} />
        <meshStandardMaterial color="#1f1d19" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Luminous Glowing Warm LED Lens / Bulb (VISIBLY ON & SHINING) */}
      <mesh position={[0.075, -0.09, 0]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.048, 0.048, 0.018, 16]} />
        <meshStandardMaterial
          color="#fffdf5"
          emissive="#ffcc44"
          emissiveIntensity={4.8}
          roughness={0.12}
        />
      </mesh>

      {/* Inner Gold Reflector Bezel */}
      <mesh position={[0.065, -0.08, 0]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.055, 0.055, 0.01, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

export const HistoryArchivesWing = memo(function HistoryArchivesWing({
  selectedExhibitId,
  hoveredId,
  onSelectExhibit,
  onHover,
}: HistoryArchivesWingProps) {
  const exhibitMap = useMemo(() => {
    const map = new Map<string, HistoryExhibit>()
    HISTORY_EXHIBITS.forEach((ex) => map.set(ex.id, ex))
    return map
  }, [])

  return (
    <CulledEntity position={[HISTORY_WALL_X, 3.0, -4.5]} radius={13.0} maxDistance={38} name="history-archives-wing">
      {/* Horizontal Museum Track-Lighting Beam running above the history gallery wall */}
      <group position={[HISTORY_WALL_X - 0.8, 5.2, -4.5]}>
        {/* Main Track Rail */}
        <mesh>
          <boxGeometry args={[0.07, 0.07, 23.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Brass Accent Trim along bottom of rail */}
        <mesh position={[0, -0.036, 0]}>
          <boxGeometry args={[0.03, 0.008, 22.9]} />
          <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Wall Mounting Strut Brackets connecting beam to the right wall */}
        {[9.5, 4.5, -0.5, -5.5, -9.5].map((bz, bi) => (
          <mesh key={`bracket-${bi}`} position={[0.4, 0, bz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.8, 12]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Rhythmic Focused Track Spotlights on the Clusters (Turned ON with Luminous Emitters) */}
      {[5.6, 3.3, 1.1, -1.5, -3.5, -5.7, -7.9, -10.1, -12.3, -14.5].map((spotZ, sIdx) => (
        <ActiveTrackSpotlight key={`active-track-spot-${sIdx}`} z={spotZ} />
      ))}

      {/* Museum Gallery Wall Items */}
      {SALON_LAYOUT.map((config) => {
        const exhibit = exhibitMap.get(config.exhibitId)
        if (!exhibit) return null
        return (
          <SalonItem
            key={config.exhibitId}
            config={config}
            exhibit={exhibit}
            isSelected={selectedExhibitId === exhibit.id}
            isHovered={hoveredId === exhibit.id}
            onSelect={onSelectExhibit}
            onHover={onHover}
          />
        )
      })}
    </CulledEntity>
  )
})
