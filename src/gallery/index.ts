/**
 * Museum Virtual Undip — Master Zone & Library Registry
 * Comprehensive entry point for the Interactive Heritage Library & Historical Museum
 * Single Grand Hall housing 5 Distinct Curated Exhibition Zones:
 * - Zone 1: The Origin of Undip (1956–1961)
 * - Zone 2: The Growth of Knowledge (1961–1990)
 * - Zone 3: The Heritage of Undip (1990–2010)
 * - Zone 4: Undip Today (2010–Sekarang)
 * - Zone 5: Undip Future (Menuju 2045)
 */

export { MuseumGallery, MuseumGallery as default, MuseumGallery as Zone1, MuseumGallery as Zone1Scene, MuseumGallery as GalleryScene } from './common/MuseumGallery'
export { WallBookshelf } from './common/WallBookshelf'
export { EnhancedBookshelf } from './common/EnhancedBookshelf'
export { ZoneNavigator } from './common/ZoneNavigator'
export { InteractiveBookModal } from './common/InteractiveBookModal'

// The 5 Zone Content Components
export { Zone1Content } from './Zone1/Zone1Content'
export { Zone2Content } from './Zone2/Zone2Content'
export { Zone3Content } from './Zone3/Zone3Content'
export { Zone4Content } from './Zone4/Zone4Content'
export { Zone5Content } from './Zone5/Zone5Content'

// Shared Architectural Shell Elements
export { FoundersWing } from './Zone1/FoundersWing'
export { HistoryArchivesWing } from './Zone1/HistoryArchivesWing'
export { CeremonialPodium } from './Zone1/CeremonialPodium'
export { MiniatureMap } from './Zone1/MiniatureMap'
export { RedCarpet } from './Zone1/RedCarpet'
export { CeilingRoof } from './Zone1/CeilingRoof'
export { Chandelier } from './Zone1/Chandelier'
export { GalleryLighting } from './Zone1/GalleryLighting'
export { GalleryEnvironment } from './Zone1/GalleryEnvironment'
export { ExhibitInformationPanel } from './Zone1/ExhibitInformationPanel'
export { DirectoryBoard } from './Zone1/DirectoryBoard'
export { WayfindingPrompt } from './Zone1/WayfindingPrompt'
export { FirstPersonControls } from './Zone1/FirstPersonControls'
export { MobileControls } from './Zone1/MobileControls'
export { DesktopHints } from './Zone1/DesktopHints'

// Data Models
export { HERITAGE_BOOKS } from './data/books'
export type { HeritageBook } from './data/books'
export { MUSEUM_ZONES } from './data/zones'
export type { ZoneConfig } from './data/zones'
export { UNDIP_FOUNDERS, HISTORY_EXHIBITS } from './Zone1/data/exhibits'
export * from './Zone1/types'
export * from './Zone1/layout'
