import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import type { SelectedExhibit, SectionType } from '../Zone1/types'
import type { Founder, HistoryExhibit } from '../Zone1/data/exhibits'
import type { HeritageBook } from '../data/books'
import {
  HALL,
  PODIUM_POS,
  SECTION_TARGETS,
  START_POSITION,
} from '../Zone1/layout'
import { GalleryEnvironment } from '../Zone1/GalleryEnvironment'
import { GalleryLighting } from '../Zone1/GalleryLighting'
import { FirstPersonControls } from '../Zone1/FirstPersonControls'
import { DesktopHints } from '../Zone1/DesktopHints'
import { MobileControls } from '../Zone1/MobileControls'
import { ExhibitInformationPanel } from '../Zone1/ExhibitInformationPanel'
import { WayfindingPrompt } from '../Zone1/WayfindingPrompt'
import { InteractiveBookModal } from './InteractiveBookModal'

// The Permanent Exhibition Wings across the Single Monumental Room
import { FoundersWing } from '../Zone1/FoundersWing'
import { HistoryArchivesWing } from '../Zone1/HistoryArchivesWing'
import { CeremonialPodium } from '../Zone1/CeremonialPodium'
import { WallBookshelf } from './WallBookshelf'
import { EnhancedBookshelf } from './EnhancedBookshelf'
import { CulledEntity } from './CulledEntity'

import '../Zone1/gallery.css'

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth <= 820 || window.matchMedia('(pointer: coarse)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

/**
 * Universitas Diponegoro Interactive Heritage Library & Historical Museum
 * Single Unified Grand Hall Housing All 5 Historical Zones Simultaneously:
 *
 * 1. UNIFIED SINGLE ROOM: Length 38m, Width 15.2m, Height 8.8m.
 * 2. OPEN CENTRAL AISLE: 3D Miniature maket completely removed. The red carpet runs
 *    straight and grand from the entrance doors to the ceremonial podium.
 * 3. LEFT WALL:
 *    - Section A: 5 Tokoh Pendiri Utama (Pancamitra 1956)
 *    - Section B: 13 Tokoh Direktorat & Rektorat dari Masa ke Masa
 *    - Low-profile WallBookshelves directly under the frames with authentic archival books
 * 4. RIGHT WALL:
 *    - Comprehensive 5-Zone Wall Gallery with 18 framed historical events & photos
 *    - Low-profile WallBookshelves directly under the frames with thematic brass plaques
 * 5. HERITAGE BOOKCASES: 4 Enhanced tall bookcases with warm internal illumination
 * 6. INTERACTIVE BOOK & FRAME SYSTEM: Full editorial modals for both books and photos
 */
export function MuseumGallery() {
  const isMobile = useIsMobile()
  const [selectedExhibit, setSelectedExhibit] = useState<SelectedExhibit | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [resetSignal, setResetSignal] = useState(0)
  const [targetPosition, setTargetPosition] = useState<[number, number, number] | null>(null)
  const [isNearDirectory, setIsNearDirectory] = useState(false)

  const moveInputRef = useRef<{ forward: number; strafe: number }>({ forward: 0, strafe: 0 })
  const hoveredRef = useRef<string | null>(null)
  const panelOpenRef = useRef(false)
  const draggedRef = useRef(false)

  const halfW = HALL.halfWidth

  useEffect(() => {
    hoveredRef.current = hoveredId
    document.body.style.cursor = hoveredId ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hoveredId])

  useEffect(() => {
    panelOpenRef.current = selectedExhibit !== null
  }, [selectedExhibit])

  // Select Handlers
  const handleSelectFounder = useCallback((founder: Founder) => {
    if (draggedRef.current) return
    setSelectedExhibit({ type: 'founder', data: founder })
  }, [])

  const handleSelectExhibit = useCallback((exhibit: HistoryExhibit | { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => {
    if (draggedRef.current) return
    setSelectedExhibit({ type: 'history', data: exhibit as HistoryExhibit })
  }, [])

  const handleSelectBook = useCallback((book: HeritageBook) => {
    if (draggedRef.current) return
    setSelectedExhibit({ type: 'book', data: book })
  }, [])

  const handleSelectPodium = useCallback(() => {
    if (draggedRef.current) return
    setSelectedExhibit({
      type: 'podium',
      data: {
        id: 'ceremonial-podium',
        title: 'Podium Kehormatan Universitas Diponegoro',
        subtitle: 'Simbol Wibawa & Tradisi Dies Natalis',
        description: 'Podium resmi upacara akademik dan orasi ilmiah universitas, berorientasi menghadap hadirin dan pintu masuk utama dengan ukiran jati Jepara dan lambang perisai emas Undip.',
      },
    })
  }, [])

  const handleSelectPrasasti = useCallback(() => {
    if (draggedRef.current) return
    setSelectedExhibit({
      type: 'prasasti',
      data: {
        id: 'prasasti-undip',
        title: 'Prasasti Pendirian & Peresmian Universitas Diponegoro',
        subtitle: 'Batu Marmer Hitam Obsidian • 9 Januari 1957',
        description: 'Prasasti bersejarah peresmian Universitas Diponegoro oleh Presiden Pertama Republik Indonesia Ir. Soekarno.',
      },
    })
  }, [])

  const handleHover = useCallback((id: string | null) => {
    if (hoveredRef.current === id) return
    hoveredRef.current = id
    setHoveredId(id)
  }, [])
  const handleReset = useCallback(() => {
    setResetSignal((signal) => signal + 1)
    setTargetPosition(null)
  }, [])
  const handleClose = useCallback(() => setSelectedExhibit(null), [])

  const handleTeleport = useCallback((section: SectionType) => {
    setTargetPosition(SECTION_TARGETS[section])
  }, [])

  const selectedExhibitId = selectedExhibit ? (selectedExhibit.data as { id: string }).id : null
  const isBookModalOpen = selectedExhibit?.type === 'book'

  return (
    <div className={`gr-root${isMobile ? ' is-mobile' : ''}`}>
      {/* Three.js Monumental Heritage Scene - Optimized High-Performance Pipeline */}
      <Canvas
        shadows={false}
        dpr={[1, isMobile ? 1.25 : 1.75]}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          stencil: false,
          alpha: false,
        }}
        onPointerMissed={() => setSelectedExhibit(null)}
      >
        <color attach="background" args={['#0e1724']} />
        <fog attach="fog" args={['#0e1724', 45, 95]} />

        <PerspectiveCamera
          makeDefault
          position={START_POSITION}
          fov={isMobile ? 66 : 56}
          near={0.1}
          far={65}
        />

        {/* Dynamic Frame Rate & Adaptive Device Scaling */}
        <AdaptiveDpr pixelated={false} />
        <AdaptiveEvents />

        <Suspense fallback={null}>
          {/* Main Architectural Shell - Unified Shadow-Free Ambient Lighting */}
          <GalleryLighting castShadows={false} />
          <GalleryEnvironment isNearDirectory={isNearDirectory} />

          {/* ============================================================
              1. LEFT WALL: 5 TOKOH PENDIRI & 13 REKTORAT DENGAN RAK BUKU
              ============================================================ */}
          <FoundersWing
            selectedFounderId={selectedExhibitId}
            hoveredId={hoveredId}
            onSelectFounder={handleSelectFounder}
            onHover={handleHover}
          />

          {/* Rak Buku di bawah 5 Tokoh Pendiri (Z = 8.5 to 0.5) */}
          <CulledEntity position={[-halfW + 0.18, 0.5, 4.5]} radius={5.2} maxDistance={34} name="wall-bookshelf-pendiri">
            <WallBookshelf
              position={[-halfW + 0.18, 0, 4.5]}
              rotationY={Math.PI / 2}
              length={8.2}
              categoryTitle="ZONA 1 — ARSIP SEJARAH PENDIRIAN & STATUTA 1956–1961"
              interactiveBookIds={['book-akta-notaris-1956', 'book-statuta-perdana-1957', 'book-biografi-imam-bardjo']}
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* Rak Buku di bawah Rektorat Era Pleburan (Z = -2.5 to -12.5) */}
          <CulledEntity position={[-halfW + 0.18, 0.5, -7.5]} radius={6.0} maxDistance={34} name="wall-bookshelf-pleburan">
            <WallBookshelf
              position={[-halfW + 0.18, 0, -7.5]}
              rotationY={Math.PI / 2}
              length={9.6}
              categoryTitle="ZONA 1 & 2 — KEPEMIMPINAN REKTORAT & KRONIKA FAKULTAS"
              interactiveBookIds={['book-sejarah-14-fakultas', 'book-pidato-dies-sukarno-1960']}
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* Rak Buku di bawah Rektorat Era Tembalang (Z = -13.5 to -23.5) */}
          <CulledEntity position={[-halfW + 0.18, 0.5, -18.5]} radius={6.0} maxDistance={34} name="wall-bookshelf-tembalang">
            <WallBookshelf
              position={[-halfW + 0.18, 0, -18.5]}
              rotationY={Math.PI / 2}
              length={9.6}
              categoryTitle="ZONA 3 — DOKUMENTASI REGALIA, FILSAFAH KESATRIA & HUMANIORA"
              interactiveBookIds={['book-falsafah-kesatria-diponegoro', 'book-esai-eko-budiharjo', 'book-regalia-tongkat-rektor']}
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* ============================================================
              2. RIGHT WALL: GALERI SEJARAH 5 ZONA & RAK BUKU
              ============================================================ */}
          <HistoryArchivesWing
            selectedExhibitId={selectedExhibitId}
            hoveredId={hoveredId}
            onSelectExhibit={handleSelectExhibit}
            onHover={handleHover}
          />

          {/* Rak Buku di bawah Dokumen Penegerian & Foto Pleburan (Z = 6.2 to -3.8) */}
          <CulledEntity position={[halfW - 0.18, 0.5, 1.1]} radius={6.0} maxDistance={34} name="wall-bookshelf-penegerian">
            <WallBookshelf
              position={[halfW - 0.18, 0, 1.1]}
              rotationY={-Math.PI / 2}
              length={9.8}
              categoryTitle="ZONA 1 & 2 — DOKUMEN PENEGERIAN PP 7/1961 & MASTERPLAN TEMBALANG"
              interactiveBookIds={['book-pp-no-7-1961', 'book-pidato-dies-sukarno-1960', 'book-masterplan-tembalang-1977']}
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* Rak Buku di bawah Landmark Modern Tembalang & RSND (Z = -4.5 to -14.5) */}
          <CulledEntity position={[halfW - 0.18, 0.5, -9.5]} radius={6.0} maxDistance={34} name="wall-bookshelf-rsnd">
            <WallBookshelf
              position={[halfW - 0.18, 0, -9.5]}
              rotationY={-Math.PI / 2}
              length={9.8}
              categoryTitle="ZONA 4 — DOKUMENTASI KAMPUS MODERN TEMBALANG, MULADI DOME & RSND"
              interactiveBookIds={['book-muladi-dome-monumen', 'book-rsnd-pendidikan-medis', 'book-ptnbh-transformasi-global']}
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* Rak Buku di bawah Masa Depan & Inovasi (Z = -15.0 to -22.5) */}
          <CulledEntity position={[halfW - 0.18, 0.5, -18.5]} radius={4.8} maxDistance={34} name="wall-bookshelf-future">
            <WallBookshelf
              position={[halfW - 0.18, 0, -18.5]}
              rotationY={-Math.PI / 2}
              length={7.6}
              categoryTitle="ZONA 5 — BUKU PUTIH CETRAWISMA 2045, AI & GREEN CAMPUS NET ZERO"
              interactiveBookIds={['book-undip-2045-blueprint', 'book-green-campus-net-zero', 'book-alumni-global-network']}
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* ============================================================
              3. LEMARI BUKU VERTIKAL (TALL HERITAGE BOOKCASES)
              ============================================================ */}
          {/* Pintu Masuk Kiri & Kanan */}
          <CulledEntity position={[halfW - 0.35, 1.8, 10.6]} radius={2.8} maxDistance={30} name="tall-bookcase-front-right">
            <EnhancedBookshelf
              position={[halfW - 0.35, 0, 10.6]}
              rotationY={-Math.PI / 2}
              categoryTitle="ARSIP DOKUMEN PENDIRIAN & STATUTA RESMI"
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          <CulledEntity position={[-halfW + 0.35, 1.8, 10.6]} radius={2.8} maxDistance={30} name="tall-bookcase-front-left">
            <EnhancedBookshelf
              position={[-halfW + 0.35, 0, 10.6]}
              rotationY={Math.PI / 2}
              categoryTitle="KOLEKSI RISET FAKULTAS & SAINS KELAUTAN"
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* Belakang Flanking Panggung Kiri & Kanan */}
          <CulledEntity position={[halfW - 0.35, 1.8, -23.6]} radius={2.8} maxDistance={32} name="tall-bookcase-back-right">
            <EnhancedBookshelf
              position={[halfW - 0.35, 0, -23.6]}
              rotationY={-Math.PI / 2}
              categoryTitle="BUKU PUTIH TRANSFORMASI DIGITAL & AI UNDIP"
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          <CulledEntity position={[-halfW + 0.35, 1.8, -23.6]} radius={2.8} maxDistance={32} name="tall-bookcase-back-left">
            <EnhancedBookshelf
              position={[-halfW + 0.35, 0, -23.6]}
              rotationY={Math.PI / 2}
              categoryTitle="ARSIP JEJARING ALUMNI GLOBAL (IKA UNDIP)"
              onSelectBook={handleSelectBook}
              onHoverBook={handleHover}
              hoveredBookId={hoveredId}
            />
          </CulledEntity>

          {/* ============================================================
              4. PANGGUNG UTAMA & PODIUM KEHORMATAN (TANPA MAKET MINIATUR)
              ============================================================ */}
          <CeremonialPodium
            position={PODIUM_POS}
            isSelected={selectedExhibitId === 'podium'}
            isHovered={hoveredId === 'podium'}
            onSelect={handleSelectPodium}
            onSelectPrasasti={handleSelectPrasasti}
            onHover={handleHover}
          />
        </Suspense>

        <FirstPersonControls
          resetSignal={resetSignal}
          targetPosition={targetPosition}
          moveInputRef={moveInputRef}
          hoveredRef={hoveredRef}
          panelOpenRef={panelOpenRef}
          draggedRef={draggedRef}
          onProximityChange={setIsNearDirectory}
        />
      </Canvas>

      {/* Desktop Hints */}
      {!isMobile && <DesktopHints />}

      {/* Mobile Touch Controls */}
      {isMobile && (
        <MobileControls
          moveInputRef={moveInputRef}
          visible={selectedExhibit === null}
          onReset={handleReset}
          onTeleport={handleTeleport}
        />
      )}

      {/* Papan Direktori Petunjuk Arah */}
      <WayfindingPrompt
        visible={isNearDirectory && selectedExhibit === null}
        onTeleport={handleTeleport}
      />

      {/* Modal Pembaca Buku Interaktif */}
      {isBookModalOpen && (
        <InteractiveBookModal
          book={selectedExhibit?.data as HeritageBook}
          onClose={handleClose}
        />
      )}

      {/* Panel Informasi Pameran Foto & Monumen */}
      {!isBookModalOpen && selectedExhibit && (
        <ExhibitInformationPanel
          selected={selectedExhibit}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
