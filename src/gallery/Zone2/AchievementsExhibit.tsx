import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { ACHIEVEMENTS_DATA } from './data/zone2Data'
import { PALETTE } from './palette'

interface AchievementsExhibitProps {
  onSelect: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onHover: (id: string | null) => void
}

/**
 * Sub-zone D Exhibit: "Prestasi Akademik dan Kontribusi Masyarakat"
 * Features:
 * 1. Glass Trophy & Medals Display Cabinet (Right Aisle: X = 3.4)
 * 2. Wall of Fame: International Accreditations & Recognitions (Right Wall: X = 6.85)
 * 3. Community Outreach & Societal Innovations Master Panel (Left Wall: X = -6.85)
 */
export const AchievementsExhibit = memo(function AchievementsExhibit({
  onSelect,
  onHover,
}: AchievementsExhibitProps) {
  // Community Outreach Poster Texture on Left Wall
  const outreachTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 512)
      grad.addColorStop(0, PALETTE.navyPrimary)
      grad.addColorStop(1, PALETTE.navyDark)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 1024, 512)

      // Gold Double Border
      ctx.strokeStyle = PALETTE.goldTrim
      ctx.lineWidth = 6
      ctx.strokeRect(8, 8, 1008, 496)
      ctx.strokeStyle = PALETTE.goldLight
      ctx.lineWidth = 2
      ctx.strokeRect(16, 16, 992, 480)

      // Title
      ctx.fillStyle = PALETTE.goldBright
      ctx.font = 'bold 30px "Cinzel", serif'
      ctx.textAlign = 'center'
      ctx.fillText('KONTRIBUSI NYATA UNIVERSITAS DIPONEGORO UNTUK NEGERI', 512, 60)

      ctx.fillStyle = '#b8c7db'
      ctx.font = 'italic 18px "Segoe UI", sans-serif'
      ctx.fillText('— Pengabdian Masyarakat, Hilirisasi Inovasi, & Pelayanan Bangsa —', 512, 95)

      // 4 Initiative Columns
      const initiatives = [
        { title: 'KKN TEMATIK KEBANGSAAN', tag: 'Pemberdayaan Desa', desc: 'Pengerahan ribuan mahasiswa membangun sanitasi, stunting & ekonomi desa 3T' },
        { title: 'TANGAN BIONIK CBIOM3S', tag: 'Teknologi Medis Murah', desc: 'Inovasi prostetik robotik karya Undip untuk ratusan disabilitas di seluruh Indonesia' },
        { title: 'LAYANAN KESEHATAN RSND', tag: 'Rumah Sakit Pendidikan', desc: 'Layanan medis paripurna, pencegahan penyakit tropis & riset kanker di Jateng' },
        { title: 'TEKNOLOGI GARAM INDUSTRI', tag: 'Kedaulatan Maritim', desc: 'Pabrik garam farmasi dan pangan modern hasil riset kimia perkapalan Undip' },
      ]

      initiatives.forEach((ini, idx) => {
        const x = 50 + idx * 235
        ctx.fillStyle = '#061325'
        ctx.fillRect(x, 130, 220, 330)
        ctx.strokeStyle = '#1b3b68'
        ctx.lineWidth = 2
        ctx.strokeRect(x, 130, 220, 330)

        // Golden header pill
        ctx.fillStyle = PALETTE.maroonCarpet
        ctx.fillRect(x, 130, 220, 42)
        ctx.fillStyle = PALETTE.goldLight
        ctx.font = 'bold 12px "Segoe UI", sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(ini.tag.toUpperCase(), x + 110, 156)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 16px "Segoe UI", sans-serif'
        const words = ini.title.split(' ')
        ctx.fillText(words.slice(0, 2).join(' '), x + 110, 210)
        if (words.length > 2) {
          ctx.fillText(words.slice(2).join(' '), x + 110, 235)
        }

        ctx.fillStyle = '#9cb1c9'
        ctx.font = '13px "Segoe UI", sans-serif'
        ctx.fillText(ini.desc.slice(0, 30), x + 110, 290)
        ctx.fillText(ini.desc.slice(30, 60), x + 110, 312)
        ctx.fillText(ini.desc.slice(60), x + 110, 334)
      })
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  return (
    <group position={[0, 0, -14.0]}>
      {/* ============================================================
          1. GLASS TROPHY & MEDALS CABINET (RIGHT AISLE: X = 3.4)
          ============================================================ */}
      <group
        position={[3.4, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover('trophy-cabinet')
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect({
            id: 'trophy-cabinet',
            title: 'Koleksi Prestasi & Medali Emas Kejuaraan Undip',
            subtitle: 'Rekor MURI, Juara PIMNAS Kemendikbud & Kompetisi Inovasi Dunia',
            description:
              'Etalase kaca kehormatan ini memajang piala bergilir, medali emas riset teknologi, piagam rekor inovasi, dan penghargaan debat internasional yang diraih para mahasiswa serta dosen Universitas Diponegoro dari berbagai ajang bergengsi nasional maupun internasional.',
            highlights: [
              'Juara Umum & Perolehan Medali Emas PIMNAS',
              'Rekor MURI Inovasi Tangan Palsu Bionik & Pangan Laut',
              'Medali Emas World Invention & Innovation Forum (WIIF)',
              'Juara Nasional Debat Konstitusi Mahkamah Konstitusi RI',
            ],
          })
        }}
      >
        {/* Dark Walnut Plinth Base */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 1.2]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.71, 0]}>
          <boxGeometry args={[2.24, 0.03, 1.24]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>

        {/* Tall Illuminated Glass Cabinet */}
        <mesh position={[0, 1.55, 0]}>
          <boxGeometry args={[2.1, 1.6, 1.1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.25}
            roughness={0.05}
            transmission={0.88}
            thickness={0.1}
          />
        </mesh>

        {/* Interior Velvet Display Shelves */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[2.0, 0.04, 1.0]} />
          <meshStandardMaterial color={PALETTE.maroonCarpet} roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[2.0, 0.04, 1.0]} />
          <meshStandardMaterial color={PALETTE.maroonCarpet} roughness={0.7} />
        </mesh>

        {/* 3D Modelled Trophies on Shelf 1 */}
        {[-0.6, -0.2, 0.2, 0.6].map((tx, ti) => (
          <group key={`trophy-low-${ti}`} position={[tx, 1.12, 0]}>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.07, 0.09, 0.1, 12]} />
              <meshStandardMaterial color={PALETTE.darkWood} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.18, 0]} castShadow>
              <cylinderGeometry args={[0.09, 0.03, 0.16, 16]} />
              <meshStandardMaterial color={PALETTE.goldBright} metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color={PALETTE.goldBright} metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* 3D Modelled Crystal Cups & Medals on Shelf 2 */}
        {[-0.5, 0, 0.5].map((tx, ti) => (
          <group key={`trophy-top-${ti}`} position={[tx, 1.62, 0]}>
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[0.16, 0.12, 0.16]} />
              <meshStandardMaterial color={PALETTE.goldTrim} metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.25, 0]} castShadow>
              <coneGeometry args={[0.12, 0.26, 16]} />
              <meshPhysicalMaterial color="#ffffff" transparent opacity={0.65} transmission={0.9} roughness={0.08} />
            </mesh>
          </group>
        ))}

        {/* Internal Soft Showcase Glow */}
        <pointLight position={[0, 1.9, 0]} color={PALETTE.warmLight} intensity={15} distance={3.5} decay={2} />
      </group>

      {/* ============================================================
          2. WALL OF FAME / AKREDITASI INTERNASIONAL (RIGHT WALL: X = 6.85)
          ============================================================ */}
      <group position={[6.85, 2.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* 4 Gold Framed Certificates */}
        {[-1.8, -0.6, 0.6, 1.8].map((fx, fi) => (
          <group
            key={`cert-${fi}`}
            position={[fx, 0, 0]}
            onClick={(e) => {
              e.stopPropagation()
              const ach = ACHIEVEMENTS_DATA[fi]
              onSelect({
                id: ach.id,
                title: ach.title,
                subtitle: `${ach.category} • ${ach.year}`,
                description: ach.description,
              })
            }}
          >
            {/* Gilded Frame */}
            <mesh castShadow>
              <boxGeometry args={[1.0, 1.4, 0.04]} />
              <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
            </mesh>
            {/* Certificate Parchment Face */}
            <mesh position={[0, 0, 0.025]}>
              <planeGeometry args={[0.88, 1.28]} />
              <meshStandardMaterial color={PALETTE.ivoryLight} roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================
          3. KONTRIBUSI UNTUK MASYARAKAT (LEFT WALL: X = -6.85)
          ============================================================ */}
      <group position={[-6.85, 2.9, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[4.8, 2.5, 0.08]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[4.64, 2.34, 0.02]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[4.5, 2.2]} />
          <meshStandardMaterial
            map={outreachTexture}
            emissiveMap={outreachTexture}
            emissive="#ffffff"
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  )
})
