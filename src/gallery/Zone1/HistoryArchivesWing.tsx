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
 * Standardized with generous gaps between frames horizontally and vertically,
 * elevated higher to leave ample space above the wall bookshelf nameplates.
 */
const SALON_LAYOUT: SalonFrameConfig[] = [
  // --- COLUMN 1 (Z = 5.6): Era Prakarsa & Statuta 1956-1957 ---
  { exhibitId: 'archives-notary-1956', z: 5.6, y: 4.65, width: 1.15, height: 1.35, frameColor: '#d4af37' },
  { exhibitId: 'archives-statuta-1957', z: 5.6, y: 2.80, width: 1.15, height: 1.35, frameColor: '#3d2516' },

  // --- COLUMN 2 (Z = 3.3): Foto Patung Pleburan & Upacara Lapangan OR 1957 ---
  { exhibitId: 'early-photo-panti-budaya', z: 3.3, y: 4.65, width: 1.3, height: 0.95, frameColor: '#3d2516' },
  { exhibitId: 'early-photo-students-1957', z: 3.3, y: 2.80, width: 1.3, height: 0.95, frameColor: '#2b1a10' },

  // --- COLUMN 3: MONUMENTAL CENTERPIECE 1 (Z = 1.1): Mahakarya Raden Saleh ---
  { exhibitId: 'artwork-diponegoro-center', z: 1.1, y: 3.70, width: 2.1, height: 1.45, frameColor: '#d4af37' },

  // --- COLUMN 4 (Z = -1.5): Payung Hukum PP No. 7/1961 & Lembaran Negara ---
  { exhibitId: 'decree-sk-1961', z: -1.5, y: 4.65, width: 1.15, height: 1.35, frameColor: '#d4af37' },
  { exhibitId: 'decree-lembaran-negara', z: -1.5, y: 2.80, width: 1.15, height: 1.35, frameColor: '#3d2516' },

  // --- COLUMN 5 (Z = -3.5): DIRECTLY FACING CENTRAL MULADI DOME & CAMPUS MAKET ---
  { exhibitId: 'history-muladi-dome', z: -3.5, y: 4.65, width: 1.35, height: 1.0, frameColor: '#d4af37' },
  { exhibitId: 'history-widya-puraya', z: -3.5, y: 2.80, width: 1.35, height: 1.0, frameColor: '#3d2516' },

  // --- COLUMN 6: MONUMENTAL CENTERPIECE 2 (Z = -5.7): Potret Presiden Sukarno 1960 ---
  { exhibitId: 'archives-soekarno-1960', z: -5.7, y: 3.70, width: 1.35, height: 1.85, frameColor: '#d4af37' },

  // --- COLUMN 7 (Z = -7.9): Auditorium Pleburan & Gedung Pusat Riset ---
  { exhibitId: 'early-photo-soekarno-visit', z: -7.9, y: 4.65, width: 1.3, height: 0.95, frameColor: '#3d2516' },
  { exhibitId: 'early-campus-pleburan', z: -7.9, y: 2.80, width: 1.3, height: 1.0, frameColor: '#2b1a10' },

  // --- COLUMN 8 (Z = -10.1): Monumen Patung Kuda & Kampus Manajemen Tembalang ---
  { exhibitId: 'history-masterplan-tembalang', z: -10.1, y: 4.65, width: 1.15, height: 1.45, frameColor: '#3d2516' },
  { exhibitId: 'history-groundbreaking-tembalang', z: -10.1, y: 2.80, width: 1.3, height: 0.95, frameColor: '#d4af37' },

  // --- COLUMN 9 (Z = -12.3): RSND Tembalang & Waduk Edukasi Undip ---
  { exhibitId: 'history-rsnd', z: -12.3, y: 4.65, width: 1.3, height: 0.95, frameColor: '#3d2516' },
  { exhibitId: 'history-waduk-undip', z: -12.3, y: 2.80, width: 1.3, height: 0.95, frameColor: '#2b1a10' },

  // --- COLUMN 10 (Z = -14.5): Pangeran Diponegoro & Transformasi PTN-BH ---
  { exhibitId: 'history-wisuda-perdana', z: -14.5, y: 4.65, width: 1.15, height: 1.45, frameColor: '#3d2516' },
  { exhibitId: 'history-transformation', z: -14.5, y: 2.80, width: 1.3, height: 1.05, frameColor: '#d4af37' },
]

interface ExhibitPlaqueProps {
  title: string
  period?: string
  width: number
  frameHeight: number
}

function splitBalancedTitle(text: string, maxSingleLineChars = 30): string[] {
  if (text.length <= maxSingleLineChars) return [text]
  const words = text.split(/\s+/)
  if (words.length <= 1) return [text]

  let bestIdx = 1
  let minDiff = Infinity
  for (let i = 1; i < words.length; i++) {
    const l1 = words.slice(0, i).join(' ')
    const l2 = words.slice(i).join(' ')
    const diff = Math.abs(l1.length - l2.length)
    if (diff < minDiff) {
      minDiff = diff
      bestIdx = i
    }
  }
  return [words.slice(0, bestIdx).join(' '), words.slice(bestIdx).join(' ')]
}

const ExhibitPlaque = memo(function ExhibitPlaque({
  title,
  period,
  width,
  frameHeight,
}: ExhibitPlaqueProps) {
  const plaqueW = Math.min(Math.max(width * 0.90, 1.05), 1.65)
  const plaqueH = 0.22

  const texture = useMemo(() => {
    const aspect = plaqueW / plaqueH
    const canvasWidth = 2048
    const canvasHeight = Math.max(320, Math.round(canvasWidth / aspect))

    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d')

    if (ctx) {
      // 1. Prestigious Deep Royal UNDIP Navy Blue Enamel Plaque Background
      const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      grad.addColorStop(0, '#122646')
      grad.addColorStop(0.5, '#0b1b32')
      grad.addColorStop(1, '#06101f')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // Satin Sheen Reflection
      const sheen = ctx.createLinearGradient(0, 0, canvasWidth, 0)
      sheen.addColorStop(0, 'rgba(212, 175, 55, 0.06)')
      sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)')
      sheen.addColorStop(1, 'rgba(212, 175, 55, 0.06)')
      ctx.fillStyle = sheen
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // 2. Antique Gold Double Border
      const border1 = 12
      const border2 = 22
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 6
      ctx.strokeRect(border1, border1, canvasWidth - border1 * 2, canvasHeight - border1 * 2)

      ctx.strokeStyle = '#ffe89c'
      ctx.lineWidth = 2.5
      ctx.strokeRect(border2, border2, canvasWidth - border2 * 2, canvasHeight - border2 * 2)

      // Corner gold diamonds
      const drawDiamond = (x: number, y: number) => {
        ctx.fillStyle = '#ffd700'
        ctx.beginPath()
        ctx.moveTo(x, y - 9)
        ctx.lineTo(x + 9, y)
        ctx.lineTo(x, y + 9)
        ctx.lineTo(x - 9, y)
        ctx.closePath()
        ctx.fill()
      }
      drawDiamond(border2, border2)
      drawDiamond(canvasWidth - border2, border2)
      drawDiamond(border2, canvasHeight - border2)
      drawDiamond(canvasWidth - border2, canvasHeight - border2)

      // 3. Process Title & Subtitle
      const cleanTitle = title.replace(/\([^)]*\)/g, '').trim().toUpperCase()
      const cleanPeriod = period ? period.replace(/^—\s*|\s*—$/g, '').trim().toUpperCase() : ''
      const lines = splitBalancedTitle(cleanTitle, 30)

      const fontStack = '"Cinzel", "Segoe UI", "Arial Black", "Times New Roman", sans-serif'
      const maxTextWidth = canvasWidth - 140

      let fontSize = lines.length === 2 ? 60 : 68
      ctx.font = `bold ${fontSize}px ${fontStack}`

      const exceedsWidth = () =>
        lines.some((line) => ctx.measureText(line).width > maxTextWidth)

      while (exceedsWidth() && fontSize > 28) {
        fontSize -= 2
        ctx.font = `bold ${fontSize}px ${fontStack}`
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const renderTitleText = (text: string, y: number) => {
        // Heavy dark stroke for maximum contrast against navy enamel
        ctx.strokeStyle = '#050c18'
        ctx.lineWidth = 8
        ctx.strokeText(text, canvasWidth / 2, y)

        // Drop shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)'
        ctx.shadowBlur = 8
        ctx.shadowOffsetY = 3
        ctx.fillStyle = '#ffffff'
        ctx.fillText(text, canvasWidth / 2, y)

        // Second crisp fill
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
        ctx.fillStyle = '#ffffff'
        ctx.fillText(text, canvasWidth / 2, y)
      }

      const renderPeriodText = (text: string, y: number) => {
        const periodFontSize = Math.min(38, Math.round(fontSize * 0.65))
        ctx.font = `italic bold ${periodFontSize}px ${fontStack}`

        ctx.strokeStyle = '#050c18'
        ctx.lineWidth = 5
        ctx.strokeText(`—   ${text}   —`, canvasWidth / 2, y)

        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'
        ctx.shadowBlur = 6
        ctx.shadowOffsetY = 2
        ctx.fillStyle = '#ffd700'
        ctx.fillText(`—   ${text}   —`, canvasWidth / 2, y)

        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
        ctx.fillStyle = '#ffe082'
        ctx.fillText(`—   ${text}   —`, canvasWidth / 2, y)
      }

      if (cleanPeriod) {
        if (lines.length === 2) {
          const lineSpacing = fontSize * 1.18
          const titleCenterY = canvasHeight * 0.38
          const line1Y = titleCenterY - lineSpacing * 0.5
          const line2Y = titleCenterY + lineSpacing * 0.5
          const periodY = Math.min(canvasHeight * 0.80, line2Y + fontSize * 0.88)

          renderTitleText(lines[0], line1Y)
          renderTitleText(lines[1], line2Y)
          renderPeriodText(cleanPeriod, periodY)
        } else {
          const titleY = canvasHeight * 0.40
          const periodY = canvasHeight * 0.74
          renderTitleText(lines[0], titleY)
          renderPeriodText(cleanPeriod, periodY)
        }
      } else {
        if (lines.length === 2) {
          const lineSpacing = fontSize * 1.25
          const line1Y = canvasHeight / 2 - lineSpacing * 0.5
          const line2Y = canvasHeight / 2 + lineSpacing * 0.5
          renderTitleText(lines[0], line1Y)
          renderTitleText(lines[1], line2Y)
        } else {
          renderTitleText(lines[0], canvasHeight / 2)
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 16
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = true
    return tex
  }, [title, period, plaqueW, plaqueH])

  return (
    <group position={[0, -frameHeight / 2 - 0.13, 0.02]}>
      {/* Dark Walnut Plaque Base */}
      <mesh position={[0, 0, -0.005]} castShadow>
        <boxGeometry args={[plaqueW, plaqueH, 0.015]} />
        <meshStandardMaterial color="#22150a" roughness={0.6} />
      </mesh>
      {/* Gold Trim Rim */}
      <mesh position={[0, 0, 0.004]}>
        <boxGeometry args={[plaqueW - 0.01, plaqueH - 0.01, 0.008]} />
        <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.88} />
      </mesh>
      {/* Luminous Enamel Plaque Face with Exhibit Title & Period */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[plaqueW - 0.02, plaqueH - 0.02]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.45}
          roughness={0.22}
          metalness={0.06}
        />
      </mesh>
    </group>
  )
})

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

      {/* 6. Museum Plaque Label Below Frame */}
      <ExhibitPlaque
        title={exhibit.title}
        period={exhibit.period}
        width={fw}
        frameHeight={fh}
      />

      {/* 7. Hover Line */}
      {(isHovered || isSelected) && (
        <mesh position={[0, -fh / 2 - 0.26, 0.02]}>
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
    <group position={[HISTORY_WALL_X - 0.8, 5.95, z]}>
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
    <CulledEntity position={[HISTORY_WALL_X, 3.8, -4.5]} radius={13.5} maxDistance={38} name="history-archives-wing">
      {/* Horizontal Museum Track-Lighting Beam running above the history gallery wall */}
      <group position={[HISTORY_WALL_X - 0.8, 6.0, -4.5]}>
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
