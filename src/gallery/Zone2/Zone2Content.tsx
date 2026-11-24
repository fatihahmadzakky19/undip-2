import { useMemo } from 'react'
import * as THREE from 'three'
import type { HeritageBook } from '../data/books'
import { WallBookshelf } from '../common/WallBookshelf'
import { EnhancedBookshelf } from '../common/EnhancedBookshelf'
import { HALL, MINIATURE_MAP_POS } from '../Zone1/layout'
import { MiniatureMap } from '../Zone1/MiniatureMap'

interface Zone2ContentProps {
  selectedExhibitId: string | null
  hoveredId: string | null
  onSelectExhibit: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onSelectBook: (book: HeritageBook) => void
  onSelectMap: () => void
  onHover: (id: string | null) => void
}

interface FacultyInfo {
  id: string
  code: string
  name: string
  founded: string
  color: string
  deans: string
  focus: string
}

const UNDIP_FACULTIES: FacultyInfo[] = [
  { id: 'fac-fh', code: 'FH', name: 'Fakultas Hukum', founded: '1957', color: '#c41e3a', deans: 'Mr. Soedarto, S.H.', focus: 'Hukum Progresif, Pidana & Tata Negara' },
  { id: 'fac-feb', code: 'FEB', name: 'Fakultas Ekonomika dan Bisnis', founded: '1960', color: '#808080', deans: 'Drs. Moelyo', focus: 'Akuntansi, Manajemen & Ekonomi Pembangunan' },
  { id: 'fac-ft', code: 'FT', name: 'Fakultas Teknik', founded: '1958', color: '#002366', deans: 'Ir. Jacob Rais', focus: 'Teknik Sipil, Mesin, Elektro, Perkapalan, Kimia & Arsitektur' },
  { id: 'fac-fk', code: 'FK', name: 'Fakultas Kedokteran', founded: '1961', color: '#2e8b57', deans: 'dr. Heyder bin Heyder', focus: 'Kedokteran Umum, Keperawatan, Gizi & Riset Biomedis' },
  { id: 'fac-fpp', code: 'FPP', name: 'Fakultas Peternakan dan Pertanian', founded: '1964', color: '#355e3b', deans: 'Prof. R. Soeratno', focus: 'Agrokompleks Berkelanjutan & Peternakan Tropis' },
  { id: 'fac-fpik', code: 'FPIK', name: 'Fakultas Perikanan dan Ilmu Kelautan', founded: '1968', color: '#0077be', deans: 'Prof. Johannes', focus: 'Oseanografi, Akuakultur & Konservasi Pesisir' },
  { id: 'fac-fib', code: 'FIB', name: 'Fakultas Ilmu Budaya', founded: '1965', color: '#ffffff', deans: 'Prof. Soeharto', focus: 'Sastra, Sejarah, Linguistik & Kearsipan' },
  { id: 'fac-fisip', code: 'FISIP', name: 'Fakultas Ilmu Sosial dan Ilmu Politik', founded: '1968', color: '#ffbf00', deans: 'Drs. Soedjito', focus: 'Komunikasi, Hubungan Internasional & Administrasi Publik' },
  { id: 'fac-fsm', code: 'FSM', name: 'Fakultas Sains dan Matematika', founded: '1988', color: '#800080', deans: 'Prof. Supartono', focus: 'Matematika, Fisika, Kimia, Biologi & Ilmu Komputer' },
  { id: 'fac-fkm', code: 'FKM', name: 'Fakultas Kesehatan Masyarakat', founded: '1993', color: '#8fbc8f', deans: 'dr. Budioro', focus: 'Epidemiologi, K3 & Promosi Kesehatan' },
  { id: 'fac-fpsi', code: 'FPSI', name: 'Fakultas Psikologi', founded: '2007', color: '#4682b4', deans: 'Dra. Karyono', focus: 'Psikologi Klinis, Perkembangan & Industri' },
  { id: 'fac-sv', code: 'SV', name: 'Sekolah Vokasi', founded: '2016', color: '#ff7f50', deans: 'Prof. Budiyono', focus: 'Pendidikan Terapan & Kemitraan Industri Nasional' },
  { id: 'fac-sps', code: 'SPs', name: 'Sekolah Pascasarjana', founded: '2003', color: '#8b0000', deans: 'Prof. Sudharto P. Hadi', focus: 'Studi Multidisiplin Ilmu Lingkungan & Energi' },
]

/**
 * ZONE 2: THE GROWTH OF KNOWLEDGE (1961–1990)
 * Master Exhibition of the 14 Faculties, Campus Migration, and Research Curricula.
 */
export function Zone2Content({
  selectedExhibitId,
  hoveredId,
  onSelectExhibit,
  onSelectBook,
  onSelectMap,
  onHover,
}: Zone2ContentProps) {
  const halfW = HALL.halfWidth

  const materials = useMemo(() => {
    return {
      darkTeak: new THREE.MeshStandardMaterial({ color: '#2c1a0e', roughness: 0.5 }),
      goldTrim: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.28, metalness: 0.85 }),
      goldBright: new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.2, metalness: 0.9 }),
      bannerNavy: new THREE.MeshStandardMaterial({ color: '#18453b', roughness: 0.35, metalness: 0.25 }),
      plaqueMatte: new THREE.MeshStandardMaterial({ color: '#f7f4ec', roughness: 0.4 }),
    }
  }, [])

  return (
    <group>
      {/* ============================================================
          1. LEFT WALL: ENSIKLOPEDIA 14 FAKULTAS UNDIP & RAK BUKU
          ============================================================ */}
      <group position={[-halfW + 0.1, 4.45, -5.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[26.0, 0.52, 0.08]} />
          <primitive object={materials.bannerNavy} attach="material" />
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

      {/* Row of Faculty Heritage Frames along Left Wall */}
      {UNDIP_FACULTIES.slice(0, 7).map((fac, idx) => {
        const z = 7.0 - idx * 3.4
        const isSelected = selectedExhibitId === fac.id
        const isHovered = hoveredId === fac.id

        return (
          <group
            key={fac.id}
            position={[-halfW + 0.14, 2.75, z]}
            rotation={[0, Math.PI / 2, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(fac.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit({
                id: fac.id,
                title: fac.name,
                subtitle: `Didirikan Tahun ${fac.founded} • Dekan Perintis: ${fac.deans}`,
                description: `Fakultas ${fac.name} merupakan pilar keilmuan penting di lingkungan Universitas Diponegoro yang berfokus pada ${fac.focus}. Didirikan sebagai respon atas kebutuhan pembangunan nasional dan menghasilkan puluhan ribu alumni berintegritas.`,
                highlights: [
                  `Tahun Berdiri: ${fac.founded}`,
                  `Tokoh Perintis: ${fac.deans}`,
                  `Fokus Keunggulan: ${fac.focus}`,
                  `Akreditasi: Unggul / Internasional (ASIIN / FIBAA / ABET / AUN-QA)`,
                ],
              })
            }}
          >
            {/* Outer Frame */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.75, 1.45, 0.08]} />
              <primitive
                object={isSelected ? materials.goldBright : isHovered ? materials.goldTrim : materials.darkTeak}
                attach="material"
              />
            </mesh>
            {/* Inner Insignia Plate */}
            <mesh position={[0, 0, 0.042]}>
              <boxGeometry args={[1.55, 1.25, 0.01]} />
              <primitive object={materials.plaqueMatte} attach="material" />
            </mesh>
            {/* Color Accent Stripe */}
            <mesh position={[0, 0.42, 0.048]}>
              <boxGeometry args={[1.5, 0.16, 0.01]} />
              <meshStandardMaterial color={fac.color} roughness={0.4} />
            </mesh>
            {/* Spotlight */}
            <pointLight position={[0, 0.9, 0.4]} color="#ffe7ba" intensity={6} distance={3.2} decay={2} />
          </group>
        )
      })}

      {/* --- RAK BUKU DI BAWAH FAKULTAS (SISI KIRI) --- */}
      <WallBookshelf
        position={[-halfW + 0.18, 0, 1.0]}
        rotationY={Math.PI / 2}
        length={12.0}
        categoryTitle="MONOGRAF & ARSIP ILMIAH FAKULTAS (FASE AWAL)"
        interactiveBookIds={['book-sejarah-14-fakultas', 'book-orasi-prof-sudarto']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[-halfW + 0.18, 0, -13.0]}
        rotationY={Math.PI / 2}
        length={12.0}
        categoryTitle="PENGEMBANGAN RISET SAINS, TEKNOLOGI & VOKASI"
        interactiveBookIds={['book-pionir-riset-kelautan']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* ============================================================
          2. RIGHT WALL: SEJARAH PEMBANGUNAN TEMBALANG & RAK BUKU
          ============================================================ */}
      {UNDIP_FACULTIES.slice(7).map((fac, idx) => {
        const z = 5.0 - idx * 3.4
        const isSelected = selectedExhibitId === fac.id
        const isHovered = hoveredId === fac.id

        return (
          <group
            key={fac.id}
            position={[halfW - 0.14, 2.75, z]}
            rotation={[0, -Math.PI / 2, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(fac.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHover(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectExhibit({
                id: fac.id,
                title: fac.name,
                subtitle: `Didirikan Tahun ${fac.founded} • Dekan Perintis: ${fac.deans}`,
                description: `Fakultas ${fac.name} berkembang pesat di kawasan kampus Tembalang dengan fokus ${fac.focus}, membina riset mutakhir dan pelayanan publik.`,
                highlights: [
                  `Tahun Berdiri: ${fac.founded}`,
                  `Tokoh Perintis: ${fac.deans}`,
                  `Fokus Keunggulan: ${fac.focus}`,
                  `Akreditasi: Unggul / Internasional`,
                ],
              })
            }}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.75, 1.45, 0.08]} />
              <primitive
                object={isSelected ? materials.goldBright : isHovered ? materials.goldTrim : materials.darkTeak}
                attach="material"
              />
            </mesh>
            <mesh position={[0, 0, 0.042]}>
              <boxGeometry args={[1.55, 1.25, 0.01]} />
              <primitive object={materials.plaqueMatte} attach="material" />
            </mesh>
            <mesh position={[0, 0.42, 0.048]}>
              <boxGeometry args={[1.5, 0.16, 0.01]} />
              <meshStandardMaterial color={fac.color} roughness={0.4} />
            </mesh>
            <pointLight position={[0, 0.9, 0.4]} color="#ffe7ba" intensity={6} distance={3.2} decay={2} />
          </group>
        )
      })}

      {/* --- RAK BUKU DI BAWAH FAKULTAS (SISI KANAN) --- */}
      <WallBookshelf
        position={[halfW - 0.18, 0, 0.5]}
        rotationY={-Math.PI / 2}
        length={11.0}
        categoryTitle="MASTERPLAN & DOKUMENTASI MIGRASI TEMBALANG 1977"
        interactiveBookIds={['book-masterplan-tembalang-1977', 'book-sejarah-14-fakultas']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <WallBookshelf
        position={[halfW - 0.18, 0, -12.5]}
        rotationY={-Math.PI / 2}
        length={11.0}
        categoryTitle="RISET KELAUTAN & PENGABDIAN MASYARAKAT"
        interactiveBookIds={['book-pionir-riset-kelautan']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Preserved & Enhanced Vertical Bookcases */}
      <EnhancedBookshelf
        position={[halfW - 0.35, 0, 10.6]}
        rotationY={-Math.PI / 2}
        categoryTitle="FACULTY CURRICULUM ARCHIVES"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <EnhancedBookshelf
        position={[-halfW + 0.35, 0, 10.6]}
        rotationY={Math.PI / 2}
        categoryTitle="TEMBALANG DEVELOPMENT RECORDS"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Centerpiece: Maket Kawasan Kampus */}
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
