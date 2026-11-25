import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { CAMPUS_EXHIBITS } from './data/zone2Data'
import { PALETTE } from './palette'

interface CampusTransformationExhibitProps {
  selectedId?: string | null
  hoveredId: string | null
  onSelect: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onHover: (id: string | null) => void
}

/**
 * Sub-zone B Exhibit: "Transformasi Kampus (Pleburan ke Tembalang)"
 * Features:
 * 1. Isometric Table 1: Historic Pleburan Campus (1957–1980s)
 * 2. Isometric Table 2: Modern Tembalang Campus (1980s–Present)
 * 3. Before/After Archival Comparison Display on Right Wall with interactive slider
 */
export const CampusTransformationExhibit = memo(function CampusTransformationExhibit({
  hoveredId,
  onSelect,
  onHover,
}: CampusTransformationExhibitProps) {

  // Before / After Screen Texture
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Split display: Left = Pleburan 1957 (Vintage Sepia/Grayscale), Right = Tembalang Modern (Vibrant)
      // Left side: Pleburan
      ctx.fillStyle = '#26221d'
      ctx.fillRect(0, 0, 512, 512)

      ctx.fillStyle = '#efe6d5'
      ctx.font = 'bold 32px "Cinzel", serif'
      ctx.textAlign = 'center'
      ctx.fillText('KAMPUS AWAL PLEBURAN', 256, 70)
      ctx.font = 'italic 20px "Segoe UI", sans-serif'
      ctx.fillStyle = PALETTE.goldLight
      ctx.fillText('— Gedung Panti Budaya & Hayam Wuruk (1957) —', 256, 110)

      // Vintage grid lines & architectural sketch
      ctx.strokeStyle = '#5a5044'
      ctx.lineWidth = 2
      ctx.strokeRect(40, 140, 432, 310)
      ctx.fillStyle = '#1c1813'
      ctx.fillRect(44, 144, 424, 302)

      ctx.fillStyle = '#b5a995'
      ctx.font = 'bold 22px "Segoe UI", sans-serif'
      ctx.fillText('Gedung Kolonial Belanda & Ruang Kuliah Asri', 256, 260)
      ctx.font = '16px "Segoe UI", sans-serif'
      ctx.fillStyle = '#8f8370'
      ctx.fillText('Kawasan Jalan Mr. Imam Bardjo, Kota Semarang', 256, 300)
      ctx.fillText('Pusat awal pergerakan mahasiswa dan akademisi Undip', 256, 330)

      // Right side: Tembalang
      ctx.fillStyle = '#08172c'
      ctx.fillRect(512, 0, 512, 512)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 32px "Cinzel", serif'
      ctx.fillText('KAMPUS MODERN TEMBALANG', 768, 70)
      ctx.font = 'italic 20px "Segoe UI", sans-serif'
      ctx.fillStyle = PALETTE.goldBright
      ctx.fillText('— Kawasan Rektorat Widya Puraya & Muladi Dome —', 768, 110)

      // Modern blueprint sketch
      ctx.strokeStyle = '#1b3b68'
      ctx.lineWidth = 2
      ctx.strokeRect(552, 140, 432, 310)
      ctx.fillStyle = '#05101f'
      ctx.fillRect(556, 144, 424, 302)

      ctx.fillStyle = '#8ec3ff'
      ctx.font = 'bold 22px "Segoe UI", sans-serif'
      ctx.fillText('Kawasan Pendidikan Tinggi Hijau Terpadu 180+ Ha', 768, 260)
      ctx.font = '16px "Segoe UI", sans-serif'
      ctx.fillStyle = '#6597d5'
      ctx.fillText('Muladi Dome, RSND, Laboratorium Terpadu, Waduk Edukasi', 768, 300)
      ctx.fillText('Peringkat GreenMetric & Smart Campus Terkemuka', 768, 330)

      // Central Divider Line with Gold Trim
      ctx.strokeStyle = PALETTE.goldTrim
      ctx.lineWidth = 6
      ctx.beginPath()
      ctx.moveTo(512, 0)
      ctx.lineTo(512, 512)
      ctx.stroke()
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  return (
    <group position={[0, 0, 0]}>
      {/* ============================================================
          MAKET 1: KAMPUS AWAL PLEBURAN (LEFT AISLE: X = -3.5, Z = 0)
          ============================================================ */}
      <group
        position={[-3.5, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover('maket-pleburan')
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          const exhibit = CAMPUS_EXHIBITS.pleburan
          onSelect({
            id: exhibit.id,
            title: exhibit.title,
            subtitle: `${exhibit.period} • ${exhibit.area}`,
            description: exhibit.description,
            highlights: exhibit.features,
          })
        }}
      >
        {/* Dark Walnut Display Pedestal Table */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.9, 1.8]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        {/* Gilded Edge Molding */}
        <mesh position={[0, 0.91, 0]}>
          <boxGeometry args={[2.44, 0.03, 1.84]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>

        {/* Illuminated Glass Vitrine Display Top */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[2.3, 0.65, 1.7]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.25}
            roughness={0.05}
            transmission={0.88}
            thickness={0.1}
          />
        </mesh>

        {/* Miniature Isometric Terrain of Pleburan */}
        <mesh position={[0, 0.93, 0]} receiveShadow>
          <boxGeometry args={[2.2, 0.04, 1.6]} />
          <meshStandardMaterial color="#3a4435" roughness={0.8} />
        </mesh>

        {/* Miniature Panti Budaya Heritage Building */}
        <mesh position={[-0.3, 1.08, 0]} castShadow>
          <boxGeometry args={[0.7, 0.25, 0.5]} />
          <meshStandardMaterial color="#e5dec9" roughness={0.4} />
        </mesh>
        {/* Pitched Roof (Dutch Heritage Style) */}
        <mesh position={[-0.3, 1.26, 0]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.5, 0.2, 4]} />
          <meshStandardMaterial color="#8b3a2b" roughness={0.6} />
        </mesh>

        {/* Miniature Hayam Wuruk Hall & Classrooms */}
        <mesh position={[0.45, 1.04, -0.2]} castShadow>
          <boxGeometry args={[0.6, 0.18, 0.4]} />
          <meshStandardMaterial color="#dcd3ba" roughness={0.5} />
        </mesh>
        <mesh position={[0.45, 1.04, 0.35]} castShadow>
          <boxGeometry args={[0.5, 0.18, 0.35]} />
          <meshStandardMaterial color="#dcd3ba" roughness={0.5} />
        </mesh>

        {/* Vintage Trees & Greenery */}
        {[-0.8, -0.7, 0.8, 0.75].map((tx, ti) => (
          <mesh key={`tree-pl-${ti}`} position={[tx, 1.02, (ti % 2) * 0.5 - 0.25]} castShadow>
            <coneGeometry args={[0.08, 0.18, 8]} />
            <meshStandardMaterial color="#2d5a27" roughness={0.7} />
          </mesh>
        ))}

        {/* Front Brass Plaque */}
        <mesh position={[0, 0.6, 0.91]}>
          <boxGeometry args={[1.2, 0.16, 0.02]} />
          <meshStandardMaterial
            color={hoveredId === 'maket-pleburan' ? PALETTE.goldBright : PALETTE.goldTrim}
            roughness={0.25}
            metalness={0.88}
          />
        </mesh>
      </group>

      {/* ============================================================
          MAKET 2: KAMPUS MODERN TEMBALANG (RIGHT AISLE: X = 3.5, Z = 0)
          ============================================================ */}
      <group
        position={[3.5, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover('maket-tembalang')
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          const exhibit = CAMPUS_EXHIBITS.tembalang
          onSelect({
            id: exhibit.id,
            title: exhibit.title,
            subtitle: `${exhibit.period} • ${exhibit.area}`,
            description: exhibit.description,
            highlights: exhibit.features,
          })
        }}
      >
        {/* Dark Walnut Display Pedestal Table */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.9, 1.8]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.91, 0]}>
          <boxGeometry args={[2.44, 0.03, 1.84]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>

        {/* Glass Vitrine */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[2.3, 0.65, 1.7]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.25}
            roughness={0.05}
            transmission={0.88}
            thickness={0.1}
          />
        </mesh>

        {/* Green Hills Terrain of Tembalang */}
        <mesh position={[0, 0.93, 0]} receiveShadow>
          <boxGeometry args={[2.2, 0.04, 1.6]} />
          <meshStandardMaterial color="#2d5225" roughness={0.7} />
        </mesh>

        {/* Miniature Iconic Muladi Dome */}
        <group position={[-0.45, 0.95, -0.2]}>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.3, 0.32, 0.14, 24]} />
            <meshStandardMaterial color="#f0ede6" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.19, 0]}>
            <sphereGeometry args={[0.28, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1a3b68" roughness={0.25} metalness={0.65} />
          </mesh>
        </group>

        {/* Miniature Rektorat Widya Puraya */}
        <mesh position={[0.4, 1.08, -0.15]} castShadow>
          <boxGeometry args={[0.6, 0.28, 0.35]} />
          <meshStandardMaterial color="#f5f0e1" roughness={0.35} />
        </mesh>

        {/* Miniature Diponegoro Reservoir (Waduk Undip) */}
        <mesh position={[0.25, 0.955, 0.45]}>
          <cylinderGeometry args={[0.35, 0.38, 0.02, 16]} />
          <meshStandardMaterial color="#1f6587" roughness={0.1} metalness={0.4} />
        </mesh>

        {/* Miniature RSND Hospital Block */}
        <mesh position={[-0.55, 1.04, 0.4]} castShadow>
          <boxGeometry args={[0.45, 0.2, 0.35]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Front Brass Plaque */}
        <mesh position={[0, 0.6, 0.91]}>
          <boxGeometry args={[1.2, 0.16, 0.02]} />
          <meshStandardMaterial
            color={hoveredId === 'maket-tembalang' ? PALETTE.goldBright : PALETTE.goldTrim}
            roughness={0.25}
            metalness={0.88}
          />
        </mesh>
      </group>

      {/* ============================================================
          BEFORE / AFTER GRAND COMPARISON SCREEN (RIGHT WALL: X = 6.85, Z = 0)
          ============================================================ */}
      <group position={[6.85, 2.9, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Dark Walnut Master Frame */}
        <mesh castShadow>
          <boxGeometry args={[4.8, 2.5, 0.08]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        {/* Gold Border Trim */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[4.64, 2.34, 0.02]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>
        {/* High-Resolution Screen Canvas */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[4.5, 2.2]} />
          <meshStandardMaterial
            map={screenTexture}
            emissiveMap={screenTexture}
            emissive="#ffffff"
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>

        {/* Title Header Plaque Above Screen */}
        <group position={[0, 1.42, 0.04]}>
          <mesh>
            <boxGeometry args={[3.2, 0.24, 0.04]} />
            <meshStandardMaterial color={PALETTE.navyDark} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <boxGeometry args={[3.14, 0.2, 0.01]} />
            <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
          </mesh>
        </group>
      </group>
    </group>
  )
})
