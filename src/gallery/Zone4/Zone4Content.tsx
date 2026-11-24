import { useMemo } from 'react'
import * as THREE from 'three'
import type { HeritageBook } from '../data/books'
import { WallBookshelf } from '../common/WallBookshelf'
import { EnhancedBookshelf } from '../common/EnhancedBookshelf'
import { HALL, MINIATURE_MAP_POS } from '../Zone1/layout'
import { MiniatureMap } from '../Zone1/MiniatureMap'

interface Zone4ContentProps {
  selectedExhibitId: string | null
  hoveredId: string | null
  onSelectExhibit: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onSelectBook: (book: HeritageBook) => void
  onSelectMap: () => void
  onHover: (id: string | null) => void
}

interface ModernLandmark {
  id: string
  title: string
  subtitle: string
  year: string
  description: string
  highlights: string[]
}

const MODERN_LANDMARKS: ModernLandmark[] = [
  {
    id: 'lnd-muladi-dome',
    title: 'Gedung Muladi Dome Tembalang',
    subtitle: 'Landmark Kubah Emas Multifungsi Terbesar di Jawa Tengah (Kapasitas 5.000)',
    year: '2023',
    description: 'Pusat konvensi akbar dan pertunjukan bertaraf internasional yang dinamai untuk mengenang jasa mantan Rektor Undip dan Menteri Kehakiman RI Prof. Dr. Muladi, S.H. Gedung ini dilengkapi tata akustik canggih dan kubah emas ikonik.',
    highlights: [
      'Kapasitas: 5.000 kursi amfiteater bertingkat',
      'Fasilitas: Hall konvensi utama, ruang seminar paralel, museum dan ballroom',
      'Ikon Arsitektur: Menjadi gerbang selamat datang kemegahan kampus Tembalang',
    ],
  },
  {
    id: 'lnd-rsnd',
    title: 'Rumah Sakit Nasional Diponegoro (RSND)',
    subtitle: 'RSPTN Rujukan Unggulan dengan Fasilitas Kedokteran Terpadu',
    year: '2014 – Sekarang',
    description: 'Rumah sakit pendidikan tipe B terakreditasi paripurna yang mengintegrasikan layanan medis spesialis, bedah modern, riset klinis biomedis, dan pelayanan kesehatan masyarakat Jawa Tengah.',
    highlights: [
      'Layanan Unggulan: Pusat Onkologi, Kardiologi, dan Bedah Terpadu',
      'Pendidikan Medis: Wahana pelatihan klinis dokter spesialis dan peneliti',
      'Kerjasama: Kolaborasi riset internasional dengan universitas terkemuka dunia',
    ],
  },
  {
    id: 'lnd-widya-puraya',
    title: 'Gedung Rektorat & Senat Widya Puraya',
    subtitle: 'Simbol Piramida Monumental Episentrum Tata Kelola Universitas',
    year: '1995 – Sekarang',
    description: 'Bangunan monumental berundak khas arsitektur vernakular modern tropis yang menaungi Kantor Rektorat, Sidang Senat Akademik, dan Dewan Guru Besar Universitas Diponegoro.',
    highlights: [
      'Gaya Arsitektur: Piramida berundak dengan atap perisai berlapis',
      'Fungsi: Episentrum tata kelola PTN-BH dan sidang penganugerahan gelar',
      'Ruang Publik: Dikelilingi plaza upacara bendera dan kolam air mancur',
    ],
  },
  {
    id: 'lnd-qs-rankings',
    title: 'Capaian Prestasi Global & Peringkat Dunia Undip',
    subtitle: 'Top 100 Asia QS Asia University Rankings & Peringkat 1 Kesiapan Kerja Lulusan',
    year: '2024',
    description: 'Pengakuan internasional atas mutu akademik, reputasi lulusan, dan dampak riset Undip di tingkat global. Undip secara konsisten menempati peringkat teratas nasional dalam QS Graduate Employability Rankings.',
    highlights: [
      'QS World University Rankings: Jajaran 700 Besar Dunia',
      'Employability: Peringkat #1 di Indonesia dalam kecepatan serapan lulusan kerja',
      'Akreditasi Internasional: Lebih dari 50 program studi terakreditasi ASIIN, FIBAA, ABET & IABEE',
    ],
  },
]

/**
 * ZONE 4: UNDIP TODAY (2010–SEKARANG)
 * Theme: Modern Campus Landmarks, Muladi Dome, RSND, World-Class University Achievements.
 */
export function Zone4Content({
  selectedExhibitId,
  hoveredId,
  onSelectExhibit,
  onSelectBook,
  onSelectMap,
  onHover,
}: Zone4ContentProps) {
  const halfW = HALL.halfWidth

  const materials = useMemo(() => {
    return {
      darkTeak: new THREE.MeshStandardMaterial({ color: '#2c1a0e', roughness: 0.5 }),
      goldTrim: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.28, metalness: 0.88 }),
      goldBright: new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.2, metalness: 0.9 }),
      bannerBlue: new THREE.MeshStandardMaterial({ color: '#003b70', roughness: 0.35, metalness: 0.25 }),
      plaqueIvory: new THREE.MeshStandardMaterial({ color: '#f7f4ec', roughness: 0.4 }),
    }
  }, [])

  return (
    <group>
      {/* Upper Architectural Banner */}
      <group position={[-halfW + 0.1, 4.45, -5.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[26.0, 0.52, 0.08]} />
          <primitive object={materials.bannerBlue} attach="material" />
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
          1. LEFT WALL: LANDMARK MODERN & PRESTASI DENGAN RAK BUKU
          ============================================================ */}
      {MODERN_LANDMARKS.slice(0, 2).map((lnd, idx) => {
        const z = 4.0 - idx * 5.0
        const isSelected = selectedExhibitId === lnd.id
        const isHovered = hoveredId === lnd.id

        return (
          <group
            key={lnd.id}
            position={[-halfW + 0.14, 2.75, z]}
            rotation={[0, Math.PI / 2, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(lnd.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit(lnd)
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

      {/* --- RAK BUKU KAMPUS MODERN & RSND (SISI KIRI) --- */}
      <WallBookshelf
        position={[-halfW + 0.18, 0, 1.0]}
        rotationY={Math.PI / 2}
        length={12.0}
        categoryTitle="MONOGRAF FASILITAS MODERN & MULADI DOME"
        interactiveBookIds={['book-muladi-dome-monumen', 'book-rsnd-pendidikan-medis']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[-halfW + 0.18, 0, -13.0]}
        rotationY={Math.PI / 2}
        length={11.0}
        categoryTitle="DOKUMENTASI RISET MEDIS & KESEHATAN RSND"
        interactiveBookIds={['book-rsnd-pendidikan-medis']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* ============================================================
          2. RIGHT WALL: REKOGNISI GLOBAL & PTN-BH DENGAN RAK BUKU
          ============================================================ */}
      {MODERN_LANDMARKS.slice(2).map((lnd, idx) => {
        const z = 2.0 - idx * 5.0
        const isSelected = selectedExhibitId === lnd.id
        const isHovered = hoveredId === lnd.id

        return (
          <group
            key={lnd.id}
            position={[halfW - 0.14, 2.75, z]}
            rotation={[0, -Math.PI / 2, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(lnd.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit(lnd)
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

      {/* --- RAK BUKU PTN-BH & REKOGNISI GLOBAL (SISI KANAN) --- */}
      <WallBookshelf
        position={[halfW - 0.18, 0, 1.0]}
        rotationY={-Math.PI / 2}
        length={12.0}
        categoryTitle="LAPORAN PTN-BH & REKOGNISI PERINGKAT DUNIA"
        interactiveBookIds={['book-ptnbh-transformasi-global']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[halfW - 0.18, 0, -13.0]}
        rotationY={-Math.PI / 2}
        length={11.0}
        categoryTitle="PUBLIKASI ILMIAH INTERNASIONAL & HILIRISASI RISET"
        interactiveBookIds={['book-ptnbh-transformasi-global', 'book-muladi-dome-monumen']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Preserved & Enhanced Vertical Bookcases */}
      <EnhancedBookshelf
        position={[halfW - 0.35, 0, 10.6]}
        rotationY={-Math.PI / 2}
        categoryTitle="WORLD CLASS UNIVERSITY PAPERS"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <EnhancedBookshelf
        position={[-halfW + 0.35, 0, 10.6]}
        rotationY={Math.PI / 2}
        categoryTitle="CAMPUS DEVELOPMENT RECORDS"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Centerpiece: Maket 3D Kawasan Kampus Tembalang & Muladi Dome */}
      <MiniatureMap
        position={MINIATURE_MAP_POS}
        isSelected={selectedExhibitId === 'miniature-map'}
        isHovered={hoveredId === 'miniature-map'}
        onSelect={onSelectMap}
        onHover={onHover}
      />
    </group>
  )
}
