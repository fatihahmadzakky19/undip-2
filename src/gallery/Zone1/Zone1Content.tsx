import type { Founder, HistoryExhibit } from './data/exhibits'
import type { HeritageBook } from '../data/books'
import { FoundersWing } from './FoundersWing'
import { HistoryArchivesWing } from './HistoryArchivesWing'
import { CeremonialPodium } from './CeremonialPodium'
import { MiniatureMap } from './MiniatureMap'
import { WallBookshelf } from '../common/WallBookshelf'
import { EnhancedBookshelf } from '../common/EnhancedBookshelf'
import { HALL, PODIUM_POS, MINIATURE_MAP_POS } from './layout'

interface Zone1ContentProps {
  selectedExhibitId: string | null
  hoveredId: string | null
  onSelectFounder: (founder: Founder) => void
  onSelectExhibit: (exhibit: HistoryExhibit) => void
  onSelectBook: (book: HeritageBook) => void
  onSelectPodium: () => void
  onSelectPrasasti: () => void
  onSelectMap: () => void
  onHover: (id: string | null) => void
}

/**
 * ZONE 1: THE ORIGIN OF UNDIP (1956–1961)
 * Theme: Founding of Universitas Diponegoro, Pancamitra Founders, Early Pleburan Archives
 * Redesign highlights:
 * - 4 Low-Profile Wall Bookshelves placed directly UNDER photo frames on Left & Right walls
 * - 2 Preserved & Enhanced Vertical Tall Bookcases near entrance
 * - 2 Additional Vertical Bookcases flanking rear stage
 * - Rich collection of interactive founding legal volumes & early statutes
 */
export function Zone1Content({
  selectedExhibitId,
  hoveredId,
  onSelectFounder,
  onSelectExhibit,
  onSelectBook,
  onSelectPodium,
  onSelectPrasasti,
  onSelectMap,
  onHover,
}: Zone1ContentProps) {
  const halfW = HALL.halfWidth

  return (
    <group>
      {/* ============================================================
          1. LEFT WALL: 5 TOKOH PENDIRI & 13 REKTORAT DENGAN RAK BUKU
          ============================================================ */}
      <FoundersWing
        selectedFounderId={selectedExhibitId}
        hoveredId={hoveredId}
        onSelectFounder={onSelectFounder}
        onHover={onHover}
      />

      {/* --- RAK BUKU 1A: Tepat di bawah 5 Tokoh Pendiri Utama (Z = 8.5 to 0.5) --- */}
      <WallBookshelf
        position={[-halfW + 0.18, 0, 4.5]}
        rotationY={Math.PI / 2}
        length={8.2}
        categoryTitle="ARSIP NOTARIS & STATUTA PENDIRIAN 1956"
        interactiveBookIds={['book-akta-notaris-1956', 'book-statuta-perdana-1957', 'book-biografi-imam-bardjo']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* --- RAK BUKU 1B: Tepat di bawah Rektorat Era Pleburan (Z = -2.5 to -12.5) --- */}
      <WallBookshelf
        position={[-halfW + 0.18, 0, -7.5]}
        rotationY={Math.PI / 2}
        length={9.6}
        categoryTitle="KOLEKSI BIOGRAFI KEPEMIMPINAN REKTORAT UNDIP"
        interactiveBookIds={['book-pidato-dies-sukarno-1960']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* --- RAK BUKU 1C: Tepat di bawah Rektorat Era Tembalang (Z = -13.5 to -23.5) --- */}
      <WallBookshelf
        position={[-halfW + 0.18, 0, -18.5]}
        rotationY={Math.PI / 2}
        length={9.6}
        categoryTitle="DOKUMENTASI KEPEMIMPINAN & DIES NATALIS"
        interactiveBookIds={['book-pp-no-7-1961']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* ============================================================
          2. RIGHT WALL: SEJARAH & ARSIP UNDIP DENGAN RAK BUKU
          ============================================================ */}
      <HistoryArchivesWing
        selectedExhibitId={selectedExhibitId}
        hoveredId={hoveredId}
        onSelectExhibit={onSelectExhibit}
        onHover={onHover}
      />

      {/* --- RAK BUKU 2A: Tepat di bawah Arsip PP No. 7/1961 & Panti Budaya (Z = 6.0 to -3.8) --- */}
      <WallBookshelf
        position={[halfW - 0.18, 0, 1.1]}
        rotationY={-Math.PI / 2}
        length={9.8}
        categoryTitle="ARSIP NEGARA & DOKUMEN PERESMIAN NAMA"
        interactiveBookIds={['book-pp-no-7-1961', 'book-pidato-dies-sukarno-1960']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* --- RAK BUKU 2B: Tepat di bawah Foto Kampus Pleburan & Masterplan (Z = -5.0 to -15.2) --- */}
      <WallBookshelf
        position={[halfW - 0.18, 0, -10.1]}
        rotationY={-Math.PI / 2}
        length={9.8}
        categoryTitle="HISTORIOGRAFI PEMBANGUNAN KAMPUS PLEBURAN"
        interactiveBookIds={['book-statuta-perdana-1957', 'book-akta-notaris-1956']}
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* ============================================================
          3. LEMARI BUKU VERTIKAL (TALL HERITAGE BOOKCASES)
          - 2 Preserved Bookcases near entrance (as requested)
          - 2 Matching additional Bookcases flanking stage end
          ============================================================ */}
      {/* Front Entrance Bookcases */}
      <EnhancedBookshelf
        position={[halfW - 0.35, 0, 10.6]}
        rotationY={-Math.PI / 2}
        categoryTitle="HISTORICAL BOOK COLLECTION"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <EnhancedBookshelf
        position={[-halfW + 0.35, 0, 10.6]}
        rotationY={Math.PI / 2}
        categoryTitle="SPECIAL HERITAGE COLLECTION"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* Rear Stage Flanking Bookcases */}
      <EnhancedBookshelf
        position={[halfW - 0.35, 0, -23.6]}
        rotationY={-Math.PI / 2}
        categoryTitle="ACADEMIC ARCHIVE COLLECTION"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />
      <EnhancedBookshelf
        position={[-halfW + 0.35, 0, -23.6]}
        rotationY={Math.PI / 2}
        categoryTitle="UNIVERSITY DOCUMENTATION"
        onSelectBook={onSelectBook}
        onHoverBook={onHover}
        hoveredBookId={hoveredId}
      />

      {/* ============================================================
          4. CENTER MONUMENTS: MAKET KAMPUS & CEREMONIAL DAIS PODIUM
          ============================================================ */}
      <MiniatureMap
        position={MINIATURE_MAP_POS}
        isSelected={selectedExhibitId === 'miniature-map'}
        isHovered={hoveredId === 'miniature-map'}
        onSelect={onSelectMap}
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
