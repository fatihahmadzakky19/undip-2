import { useMemo } from 'react'
import * as THREE from 'three'
import type { HeritageBook } from '../data/books'
import { WallBookshelf } from '../common/WallBookshelf'
import { EnhancedBookshelf } from '../common/EnhancedBookshelf'
import { HALL, PODIUM_POS } from '../Zone1/layout'
import { CeremonialPodium } from '../Zone1/CeremonialPodium'

interface Zone5ContentProps {
  selectedExhibitId: string | null
  hoveredId: string | null
  onSelectExhibit: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onSelectBook: (book: HeritageBook) => void
  onSelectPodium: () => void
  onSelectPrasasti: () => void
  onHover: (id: string | null) => void
}

interface FutureVisionItem {
  id: string
  title: string
  subtitle: string
  timeline: string
  description: string
  highlights: string[]
}

const FUTURE_VISIONS: FutureVisionItem[] = [
  {
    id: 'fut-cetrawisma-ai',
    title: 'Cetrawisma AI Center of Excellence',
    subtitle: 'Riset Kecerdasan Buatan Terpadu & Superkomputasi Mandiri Undip',
    timeline: '2025 – 2035',
    description: 'Pusat riset kecerdasan buatan terapan di bidang kesehatan, kelautan cerdas, optimasi energi hijau, dan robotika industri yang berlandaskan etika luhur kesatria.',
    highlights: [
      'Infrastruktur: Fasilitas komputasi AI berkecepatan tinggi terintegrasi',
      'Fokus: Analitika data maritim, diagnostik medis otonom, smart farming',
      'Etika: Tata kelola kecerdasan buatan berlandaskan kemanusiaan',
    ],
  },
  {
    id: 'fut-green-campus-2045',
    title: 'Inisiatif Net Zero Carbon & Kampus Ekologis 2045',
    subtitle: 'Transisi Menuju 100% Energi Terbarukan & Perlindungan Keanekaragaman Hayati',
    timeline: '2025 – 2045',
    description: 'Transformasi fisik kampus Tembalang menuju kawasan emisi nol-bersih dengan PLTS terapung di Waduk Undip, mobilitas kendaraan listrik ramah lingkungan, dan cagar hutan edukasi.',
    highlights: [
      'Energi: PLTS Terpadu dan bioenergi limbah biomassa',
      'Konservasi: Pemulihan 1 juta pohon mangrove pesisir Pantura',
      'Sertifikasi: UI GreenMetric peringkat teratas dunia',
    ],
  },
  {
    id: 'fut-smart-university',
    title: 'Sistem Pembelajaran Digital & Smart Campus',
    subtitle: 'Platform Digital Twin Kampus & Pendidikan Fleksibel Lintas Benua',
    timeline: '2024 – 2030',
    description: 'Modernisasi sistem perkuliahan adaptif dengan teknologi immersive visual, digital twin fasilitas riset, dan micro-credential internasional bekerjasama dengan universitas top dunia.',
    highlights: [
      'Digital Twin: Simulasi 3D real-time fasilitas laboratorium dan energi',
      'Kurikulum Adaptif: Pembelajaran berbasis AI yang dipersonalisasi',
      'Akses Terbuka: Digital heritage library dapat diakses jutaan pembelajar',
    ],
  },
  {
    id: 'fut-ika-global',
    title: 'Jejaring Kepemimpinan Global Ikatan Alumni (IKA Undip)',
    subtitle: 'Dana Abadi Diponegoro & Kolaborasi Pemimpin Industri Dunia',
    timeline: 'Abadi',
    description: 'Sinergi lebih dari 300.000 alumni Undip yang tersebar di 5 benua dalam mengawal kemajuan bangsa melalui Dana Abadi Pendidikan, inkubasi teknologi ventura, dan beasiswa unggulan.',
    highlights: [
      'Endowment Fund: Penguatan beasiswa riset dan dana abadi universitas',
      'Jejaring: Chapter alumni di Amerika, Eropa, Asia Pasifik, dan Timur Tengah',
      'Visi: Menjaga kejayaan almamater: "Pernah Jaya, Tetap Jaya, Makin Jaya"',
    ],
  },
]

/**
 * ZONE 5: UNDIP FUTURE (MENUJU 2045)
 * Theme: Smart University, Artificial Intelligence, Green Campus & Global Alumni Leadership.
 * Retains authentic classical heritage woodwork while showcasing future foresight.
 */
export function Zone5Content({
  selectedExhibitId,
  hoveredId,
  onSelectExhibit,
  onSelectBook,
  onSelectPodium,
  onSelectPrasasti,
  onHover,
}: Zone5ContentProps) {
  const halfW = HALL.halfWidth

  const materials = useMemo(() => {
    return {
      darkTeak: new THREE.MeshStandardMaterial({ color: '#2c1a0e', roughness: 0.5 }),
      goldTrim: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.28, metalness: 0.88 }),
      goldBright: new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.2, metalness: 0.9 }),
      bannerTeal: new THREE.MeshStandardMaterial({ color: '#0a4254', roughness: 0.35, metalness: 0.25 }),
      plaqueIvory: new THREE.MeshStandardMaterial({ color: '#f7f4ec', roughness: 0.4 }),
      globeBrass: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.25, metalness: 0.85 }),
      globeSphere: new THREE.MeshStandardMaterial({ color: '#103554', roughness: 0.3, metalness: 0.35 }),
    }
  }, [])

  return (
    <group>
      {/* Upper Architectural Banner */}
      <group position={[-halfW + 0.1, 4.45, -5.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[26.0, 0.52, 0.08]} />
          <primitive object={materials.bannerTeal} attach="material" />
        </mesh>
        <mesh position={[0, -0.23, 0.04]}>
          <boxGeometry args={[26.0, 0.04, 0.02]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>
        <mesh position={[0, 0.23, 0.04]}>
          <boxGeometry args={[26.0, 0.04, 0.02]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>
      </group>

      {/* ============================================================
          1. LEFT WALL: KECERDASAN BUATAN & SMART CAMPUS DENGAN RAK BUKU
          ============================================================ */}
      {FUTURE_VISIONS.slice(0, 2).map((fut, idx) => {
        const z = 4.0 - idx * 5.0
        const isSelected = selectedExhibitId === fut.id
        const isHovered = hoveredId === fut.id

        return (
          <group
            key={fut.id}
            position={[-halfW + 0.14, 2.75, z]}
            rotation={[0, Math.PI / 2, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(fut.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit(fut)
            }}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.5, 1.6, 0.09]} />
              <primitive
                object={isSelected ? materials.goldBright : isHovered ? materials.goldTrim : materials.darkTeak}
                attach="material"
              />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <boxGeometry args={[2.3, 1.4, 0.01]} />
              <primitive object={materials.plaqueIvory} attach="material" />
            </mesh>
            <pointLight position={[0, 1.0, 0.4]} color="#ffe7ba" intensity={6} distance={3.5} decay={2} />
          </group>
        )
      })}

      {/* --- RAK BUKU VISI MASA DEPAN & AI (SISI KIRI) --- */}
      <WallBookshelf
        position={[-halfW + 0.18, 0, 1.0]}
        rotationY={Math.PI / 2}
        length={12.0}
        categoryTitle="BUKU PUTIH CETRAWISMA 2045 & KECERDASAN BUATAN"
        interactiveBookIds={['book-undip-2045-blueprint']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[-halfW + 0.18, 0, -13.0]}
        rotationY={Math.PI / 2}
        length={11.0}
        categoryTitle="GREEN ENERGY & INOVASI TEKNOLOGI MARITIM"
        interactiveBookIds={['book-green-campus-net-zero']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* ============================================================
          2. RIGHT WALL: GREEN CAMPUS & ALUMNI DENGAN RAK BUKU
          ============================================================ */}
      {FUTURE_VISIONS.slice(2).map((fut, idx) => {
        const z = 2.0 - idx * 5.0
        const isSelected = selectedExhibitId === fut.id
        const isHovered = hoveredId === fut.id

        return (
          <group
            key={fut.id}
            position={[halfW - 0.14, 2.75, z]}
            rotation={[0, -Math.PI / 2, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(fut.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit(fut)
            }}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.5, 1.6, 0.09]} />
              <primitive
                object={isSelected ? materials.goldBright : isHovered ? materials.goldTrim : materials.darkTeak}
                attach="material"
              />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <boxGeometry args={[2.3, 1.4, 0.01]} />
              <primitive object={materials.plaqueIvory} attach="material" />
            </mesh>
            <pointLight position={[0, 1.0, 0.4]} color="#ffe7ba" intensity={6} distance={3.5} decay={2} />
          </group>
        )
      })}

      {/* --- RAK BUKU KEBERLANJUTAN & JEJARING GLOBAL (SISI KANAN) --- */}
      <WallBookshelf
        position={[halfW - 0.18, 0, 1.0]}
        rotationY={-Math.PI / 2}
        length={12.0}
        categoryTitle="NET ZERO CARBON & EKOLOGI KAMPUS TEMBALANG"
        interactiveBookIds={['book-green-campus-net-zero']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[halfW - 0.18, 0, -13.0]}
        rotationY={-Math.PI / 2}
        length={11.0}
        categoryTitle="ARSIP JEJARING ALUMNI GLOBAL (IKA UNDIP)"
        interactiveBookIds={['book-alumni-global-network', 'book-undip-2045-blueprint']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Preserved & Enhanced Vertical Bookcases */}
      <EnhancedBookshelf
        position={[halfW - 0.35, 0, 10.6]}
        rotationY={-Math.PI / 2}
        categoryTitle="FUTURE FORESIGHT WHITEPAPERS"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <EnhancedBookshelf
        position={[-halfW + 0.35, 0, 10.6]}
        rotationY={Math.PI / 2}
        categoryTitle="GLOBAL COLLABORATION ARCHIVES"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Centerpiece 1: Classical Brass Armillary Celestial Globe of Global Vision */}
      <group position={[0, 0, -3.5]}>
        {/* Tiered Octagonal Dark Teak Pedestal */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.3, 0.7, 8]} />
          <primitive object={materials.darkTeak} attach="material" />
        </mesh>
        <mesh position={[0, 0.71, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.02, 8]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Polished Brass Ring Gimbal */}
        <group position={[0, 1.35, 0]}>
          <mesh rotation={[0.4, 0, 0]} castShadow>
            <torusGeometry args={[0.55, 0.025, 16, 48]} />
            <primitive object={materials.globeBrass} attach="material" />
          </mesh>
          <mesh rotation={[0, 0.4, 0]} castShadow>
            <torusGeometry args={[0.52, 0.02, 16, 48]} />
            <primitive object={materials.globeBrass} attach="material" />
          </mesh>
          {/* Inner Deep Blue Planet Earth Sphere */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.42, 32, 32]} />
            <primitive object={materials.globeSphere} attach="material" />
          </mesh>
          {/* Subtle Glow */}
          <pointLight color="#7dd3fc" intensity={4} distance={2.5} decay={2} />
        </group>
      </group>

      {/* Ceremonial Podium & Dais at the focal end */}
      <CeremonialPodium
        position={PODIUM_POS}
        isSelected={selectedExhibitId === 'podium'}
        isHovered={hoveredId === 'podium'}
        onSelect={onSelectPodium}
        onSelectPrasasti={onSelectPrasasti}
        onHover={onHover}
      />
    </group>
  )
}
