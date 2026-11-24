import { useMemo } from 'react'
import * as THREE from 'three'
import type { HeritageBook } from '../data/books'
import { WallBookshelf } from '../common/WallBookshelf'
import { EnhancedBookshelf } from '../common/EnhancedBookshelf'
import { HALL, PODIUM_POS } from '../Zone1/layout'
import { CeremonialPodium } from '../Zone1/CeremonialPodium'
import { DiponegoroStatue } from '../Zone1/DiponegoroStatue'

interface Zone3ContentProps {
  selectedExhibitId: string | null
  hoveredId: string | null
  onSelectExhibit: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onSelectBook: (book: HeritageBook) => void
  onSelectPodium: () => void
  onSelectPrasasti: () => void
  onHover: (id: string | null) => void
}

interface HeritageArtifact {
  id: string
  title: string
  subtitle: string
  year: string
  description: string
  highlights: string[]
}

const HERITAGE_ARTIFACTS: HeritageArtifact[] = [
  {
    id: 'art-tongkat-pedel',
    title: 'Tongkat Pedel & Regalia Rektorat Undip',
    subtitle: 'Kayu Jati Berukir & Kuningan Emas • Simbol Kewibawaan Akademik',
    year: '1960',
    description: 'Tongkat kehormatan yang dibawa oleh Pedel memimpin prosesi Sidang Senat Terbuka Guru Besar dan Upacara Dies Natalis. Ujung tongkat dihiasi patung perunggu Pangeran Diponegoro menunggang kuda tempur.',
    highlights: [
      'Material: Kayu Jati Perhutani Pilihan dengan Sepuh Emas 24 Karat',
      'Pahatan: Flora Jawa Tradisional & Lambang Bunga Teratai',
      'Makna Filosofis: Kepemimpinan akademis yang berani dan berpijak pada kebenaran',
    ],
  },
  {
    id: 'art-kalung-rektor',
    title: 'Kalung Emas Jabatan Rektor (Samir Kehormatan)',
    subtitle: 'Mata Rantai Berlambang 14 Fakultas & Perisai Diponegoro',
    year: '1961',
    description: 'Insignia resmi jabatan yang dikalungkan pada leher Rektor saat pelantikan dan memimpin upacara wisuda sarjana. Setiap mata rantai melambangkan sinergi seluruh cabang keilmuan almamater.',
    highlights: [
      'Ornamen Utama: Lambang Perisai Segi Lima Universitas Diponegoro',
      'Mata Rantai: Pelat Emas Simbolik Ragam Fakultas',
      'Tradisi: Dikenakan saat pengukuhan Guru Besar dan Wisuda',
    ],
  },
  {
    id: 'art-mahakarya-raden-saleh',
    title: 'Mahakarya Seni Visual: Penangkapan Pangeran Diponegoro',
    subtitle: 'Reproduksi Kanvas Agung Koleksi Bersejarah Undip',
    year: '1857 / Koleksi Undip',
    description: 'Lukisan legendaris karya perintis seni modern Indonesia Raden Saleh Syarif Bustaman yang merekam detik-detik penangkapan Pangeran Diponegoro oleh Jenderal De Kock di Magelang pada 28 Maret 1830.',
    highlights: [
      'Pelukis: Raden Saleh Syarif Bustaman',
      'Makna: Simbol perlawanan moral dan martabat bangsa terjajah',
      'Koleksi: Dipajang sebagai inspirasi kepahlawanan utama sivitas akademika',
    ],
  },
]

/**
 * ZONE 3: THE HERITAGE OF UNDIP (1990–2010)
 * Focus: Academic Regalia, Rectoral Artifacts, Diponegoro Heroic Legacy, and Cultural Philosophy.
 */
export function Zone3Content({
  selectedExhibitId,
  hoveredId,
  onSelectExhibit,
  onSelectBook,
  onSelectPodium,
  onSelectPrasasti,
  onHover,
}: Zone3ContentProps) {
  const halfW = HALL.halfWidth

  const materials = useMemo(() => {
    return {
      darkTeak: new THREE.MeshStandardMaterial({ color: '#2c1a0e', roughness: 0.5 }),
      goldTrim: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.28, metalness: 0.88 }),
      goldBright: new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.2, metalness: 0.9 }),
      glass: new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.35, roughness: 0.05 }),
      bannerPlum: new THREE.MeshStandardMaterial({ color: '#4a154b', roughness: 0.35, metalness: 0.25 }),
    }
  }, [])

  return (
    <group>
      {/* Upper Architectural Banner */}
      <group position={[-halfW + 0.1, 4.45, -5.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[26.0, 0.52, 0.08]} />
          <primitive object={materials.bannerPlum} attach="material" />
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
          1. LEFT WALL: ARTEFAK & REGALIA AKADEMIK DENGAN RAK BUKU
          ============================================================ */}
      {HERITAGE_ARTIFACTS.map((art, idx) => {
        const z = 4.0 - idx * 4.5
        const isSelected = selectedExhibitId === art.id
        const isHovered = hoveredId === art.id

        return (
          <group
            key={art.id}
            position={[-halfW + 0.14, 2.75, z]}
            rotation={[0, Math.PI / 2, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(art.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit(art)
            }}
          >
            {/* Framed Exhibit Display */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.4, 1.6, 0.09]} />
              <primitive
                object={isSelected ? materials.goldBright : isHovered ? materials.goldTrim : materials.darkTeak}
                attach="material"
              />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <boxGeometry args={[2.2, 1.4, 0.01]} />
              <meshStandardMaterial color="#f7f4ec" roughness={0.4} />
            </mesh>
            <pointLight position={[0, 1.0, 0.4]} color="#ffe7ba" intensity={6} distance={3.5} decay={2} />
          </group>
        )
      })}

      {/* --- RAK BUKU WARISAN & FILSAFAT DIPONEGORO (SISI KIRI) --- */}
      <WallBookshelf
        position={[-halfW + 0.18, 0, 0.0]}
        rotationY={Math.PI / 2}
        length={12.0}
        categoryTitle="FILSAFAH KESATRIA & KAJIAN HUMANIORA DIPONEGORO"
        interactiveBookIds={['book-falsafah-kesatria-diponegoro', 'book-esai-eko-budiharjo']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[-halfW + 0.18, 0, -13.5]}
        rotationY={Math.PI / 2}
        length={11.0}
        categoryTitle="KATALOG REGALIA & PIDATO RESMI DIES NATALIS"
        interactiveBookIds={['book-regalia-tongkat-rektor']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* ============================================================
          2. RIGHT WALL: KARYA SENI & DOKUMENTASI SEJARAH DENGAN RAK BUKU
          ============================================================ */}
      <WallBookshelf
        position={[halfW - 0.18, 0, 1.0]}
        rotationY={-Math.PI / 2}
        length={12.0}
        categoryTitle="HISTORIOGRAFI PERJUANGAN & WARISAN BUDAYA JAWA TENGAH"
        interactiveBookIds={['book-falsafah-kesatria-diponegoro']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[halfW - 0.18, 0, -13.0]}
        rotationY={-Math.PI / 2}
        length={11.0}
        categoryTitle="ANTOLOGI ARSITEKTUR & KEBUDAYAAN ALMAMATER"
        interactiveBookIds={['book-esai-eko-budiharjo', 'book-regalia-tongkat-rektor']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Preserved & Enhanced Vertical Bookcases */}
      <EnhancedBookshelf
        position={[halfW - 0.35, 0, 10.6]}
        rotationY={-Math.PI / 2}
        categoryTitle="SPECIAL HERITAGE COLLECTION"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <EnhancedBookshelf
        position={[-halfW + 0.35, 0, 10.6]}
        rotationY={Math.PI / 2}
        categoryTitle="UNIVERSITY DOCUMENTATION"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Centerpiece: Monumental Diponegoro Statue & Ceremonial Dais Podium */}
      <DiponegoroStatue
        position={[0, 0, -4.5]}
        isSelected={selectedExhibitId === 'statue-diponegoro'}
        isHovered={hoveredId === 'statue-diponegoro'}
        onSelect={() =>
          onSelectExhibit({
            id: 'statue-diponegoro',
            title: 'Monumen Pangeran Diponegoro & Kuda Tempur',
            subtitle: 'Patung Perunggu Bersejarah • Simbol Keteguhan Hati & Integritas',
            description: 'Monumen patung pahlawan nasional Pangeran Diponegoro menunggang kuda perang dengan jubah berkibar, menggambarkan gelora perjuangan Perang Jawa (1825–1830) membela kedaulatan rakyat.',
            highlights: [
              'Simbolisme: Kesatria tangguh, rendah hati, dan berjiwa merdeka',
              'Material: Perunggu Tempa Klasik dengan Tatakan Granit Hitam',
              'Penempatan: Pusat Kehormatan Sayap Warisan Budaya Universitas',
            ],
          })
        }
        onHover={onHover}
      />

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
