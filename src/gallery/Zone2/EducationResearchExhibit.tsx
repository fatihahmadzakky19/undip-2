import { memo, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { STATS_DATA } from './data/zone2Data'
import { PALETTE } from './palette'

interface EducationResearchExhibitProps {
  playerZ: number
  onSelect: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onHover: (id: string | null) => void
}

/**
 * Sub-zone C Exhibit: "Perkembangan Pendidikan dan Riset"
 * Features:
 * 1. Animated Count-Up Data Panel on the Right Wall (active when playerZ is near Z = -7.5)
 * 2. Miniature Oceanography & Science Laboratory Table on the Left
 * 3. Historical Curriculum Bookshelf & Research Manuscripts
 */
export const EducationResearchExhibit = memo(function EducationResearchExhibit({
  playerZ,
  onSelect,
  onHover,
}: EducationResearchExhibitProps) {
  // Check proximity to trigger number count-up animation
  const isNear = Math.abs(playerZ - (-7.5)) < 6.0
  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {
    if (!isNear) {
      setCounts([0, 0, 0, 0])
      return
    }

    const duration = 1800 // 1.8 seconds count-up
    const startTime = performance.now()

    let animationFrameId: number

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)

      setCounts(STATS_DATA.map((s) => Math.round(s.value * ease)))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isNear])

  // Canvas texture for the 4 animated stat counters
  const statPanelTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Deep Royal Navy Enamel Panel Background
      const grad = ctx.createLinearGradient(0, 0, 0, 512)
      grad.addColorStop(0, PALETTE.navyPrimary)
      grad.addColorStop(1, PALETTE.navyDark)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 1024, 512)

      // Antique Gold Double Border
      ctx.strokeStyle = PALETTE.goldTrim
      ctx.lineWidth = 6
      ctx.strokeRect(8, 8, 1008, 496)
      ctx.strokeStyle = PALETTE.goldLight
      ctx.lineWidth = 2
      ctx.strokeRect(16, 16, 992, 480)

      // Header Banner
      ctx.fillStyle = PALETTE.goldBright
      ctx.font = 'bold 30px "Cinzel", serif'
      ctx.textAlign = 'center'
      ctx.fillText('STATISTIK PERTUMBUHAN AKADEMIK & RISET UNDIP', 512, 65)

      ctx.fillStyle = '#b8c7db'
      ctx.font = 'italic 18px "Segoe UI", sans-serif'
      ctx.fillText('— Data Resmi Transformasi Menuju World Class University —', 512, 95)

      // 4 Stat Cards Grid (2x2)
      const positions = [
        { x: 260, y: 150 }, // Card 1: Mahasiswa
        { x: 760, y: 150 }, // Card 2: Program Studi
        { x: 260, y: 320 }, // Card 3: Publikasi Scopus
        { x: 760, y: 320 }, // Card 4: Guru Besar
      ]

      positions.forEach((pos, idx) => {
        const item = STATS_DATA[idx]
        const currentCount = counts[idx] || 0

        // Card box background
        ctx.fillStyle = '#061325'
        ctx.fillRect(pos.x - 220, pos.y, 440, 140)
        ctx.strokeStyle = '#1b3b68'
        ctx.lineWidth = 2
        ctx.strokeRect(pos.x - 220, pos.y, 440, 140)

        // Accent gold corner
        ctx.fillStyle = PALETTE.goldTrim
        ctx.fillRect(pos.x - 220, pos.y, 8, 140)

        // Big Animated Number
        ctx.fillStyle = PALETTE.goldBright
        ctx.font = 'bold 44px "Cinzel", "Segoe UI", sans-serif'
        ctx.textAlign = 'left'
        const formattedNum = currentCount.toLocaleString('id-ID')
        ctx.fillText(`${formattedNum}${item.suffix}`, pos.x - 195, pos.y + 60)

        // Label
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 20px "Segoe UI", sans-serif'
        ctx.fillText(item.label, pos.x - 195, pos.y + 95)

        // Subtext
        ctx.fillStyle = '#8ea1b8'
        ctx.font = '13px "Segoe UI", sans-serif'
        ctx.fillText(item.detail.slice(0, 52) + '...', pos.x - 195, pos.y + 120)
      })
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [counts])

  return (
    <group position={[0, 0, -7.5]}>
      {/* ============================================================
          1. STATISTIK PERTUMBUHAN INTERAKTIF (RIGHT WALL: X = 6.85)
          ============================================================ */}
      <group position={[6.85, 2.9, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Frame Outer */}
        <mesh castShadow>
          <boxGeometry args={[4.8, 2.5, 0.08]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[4.64, 2.34, 0.02]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>
        {/* Dynamic Canvas Face */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[4.5, 2.2]} />
          <meshStandardMaterial
            map={statPanelTexture}
            emissiveMap={statPanelTexture}
            emissive="#ffffff"
            emissiveIntensity={0.4}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ============================================================
          2. MEJA LABORATORIUM RISET MINIATUR (LEFT AISLE: X = -3.4)
          ============================================================ */}
      <group
        position={[-3.4, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover('lab-oceanography')
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect({
            id: 'lab-oceanography',
            title: 'Pola Ilmiah Pokok (PIP): Riset Kelautan & Wilayah Tropis',
            subtitle: 'Stasiun Riset Teluk Awur Jepara & Kapal Latih Oseanografi Undip',
            description:
              'Sejak tahun 1968, Universitas Diponegoro telah dikukuhkan oleh pemerintah sebagai pusat keunggulan nasional dalam bidang Pola Ilmiah Pokok (PIP): Pengembangan Wilayah Pesisir dan Lautan Tropis. Menghasilkan ratusan paten konservasi pesisir, budidaya perikanan, serta energi arus laut.',
            highlights: [
              'Pusat Riset Unggulan: Marine Science Techno Park (MSTP) Teluk Awur, Jepara',
              'Armada: Kapal Riset Kelautan KM Surya Diponegoro',
              'Riset Kunci: Bioteknologi Alga, Konservasi Mangrove, Energi Gelombang Laut',
              'Mitra Riset: Konsorsium Universitas Maritim Dunia & Industri Maritim Nasional',
            ],
          })
        }}
      >
        {/* Walnut Lab Table Body */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.9, 1.4]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        {/* Polished Ivory Ceramic Table Top */}
        <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.26, 0.04, 1.46]} />
          <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.2} />
        </mesh>

        {/* Vintage Brass Microscope Miniature Model */}
        <group position={[-0.45, 0.94, 0]}>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
            <meshStandardMaterial color={PALETTE.goldTrim} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.22, -0.04]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.32, 12]} />
            <meshStandardMaterial color={PALETTE.goldTrim} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.38, 0.04]} rotation={[-0.3, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.03, 0.2, 12]} />
            <meshStandardMaterial color={PALETTE.goldBright} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Ocean Bathymetry Map Scroll on Table */}
        <mesh position={[0.35, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0.15]}>
          <planeGeometry args={[0.7, 0.5]} />
          <meshStandardMaterial color="#c2d8e8" roughness={0.8} />
        </mesh>

        {/* Test Tube Rack & Vials */}
        <group position={[0.4, 0.94, -0.35]}>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color={PALETTE.darkWood} roughness={0.5} />
          </mesh>
          {[-0.1, 0, 0.1].map((vx, vi) => (
            <mesh key={`vial-${vi}`} position={[vx, 0.16, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.14, 12]} />
              <meshPhysicalMaterial color="#38b6ff" transparent opacity={0.65} roughness={0.1} transmission={0.9} />
            </mesh>
          ))}
        </group>

        {/* Front Table Brass Label */}
        <mesh position={[0, 0.6, 0.71]}>
          <boxGeometry args={[1.1, 0.15, 0.02]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>
      </group>

      {/* ============================================================
          3. RAK BUKU & ARSIP RISET DINDING KIRI (LEFT WALL: X = -6.85)
          ============================================================ */}
      <group position={[-6.85, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Walnut Cabinet Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.8, 0.35]} />
          <meshStandardMaterial color={PALETTE.darkWood} roughness={0.5} />
        </mesh>
        {/* 3 Shelves with Leather-Bound Books */}
        {[-0.8, -0.1, 0.6].map((sy, si) => (
          <group key={`shelf-${si}`} position={[0, sy, 0.08]}>
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[4.0, 0.04, 0.28]} />
              <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.4} />
            </mesh>
            {/* Colorful Archival Book Rows */}
            {Array.from({ length: 24 }).map((_, bi) => {
              const bx = -1.8 + bi * 0.155
              const bColor = ['#6b0f1a', '#0b1a3a', '#18453b', '#3b2412', '#4a154b'][bi % 5]
              return (
                <mesh key={`book-${si}-${bi}`} position={[bx, 0.06, 0]} castShadow>
                  <boxGeometry args={[0.08, 0.3 + (bi % 3) * 0.04, 0.22]} />
                  <meshStandardMaterial color={bColor} roughness={0.6} />
                </mesh>
              )
            })}
          </group>
        ))}

        {/* Top Header Plate */}
        <group position={[0, 1.55, 0.1]}>
          <mesh>
            <boxGeometry args={[3.2, 0.22, 0.04]} />
            <meshStandardMaterial color={PALETTE.navyDark} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <boxGeometry args={[3.14, 0.18, 0.01]} />
            <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
          </mesh>
        </group>
      </group>
    </group>
  )
})
