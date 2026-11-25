import { Suspense, useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

// Zone 1
import { MuseumGallery as Zone1Scene } from './MuseumGallery'

// Zone 2
import { Zone2Scene } from '../Zone2/Zone2Scene'
import { FirstPersonControlsZone2 } from '../Zone2/FirstPersonControlsZone2'
import {
  ZONE2_START_POSITION,
  ZONE2_TARGETS,
  type Zone2SubzoneKey,
} from '../Zone2/layout'
import {
  QUALITY_PRESETS,
  type QualityLevel,
  getSavedQualityLevel,
  getSavedFpsCounter,
} from '../Zone2/quality'
import type { FacultyPlaqueData, TimelineMilestone } from '../Zone2/data/zone2Data'

// Navigation, Audio, UI Components
import { SidebarNav } from './SidebarNav'
import { MiniMap } from './MiniMap'
import { GraphicsSettingsModal } from './GraphicsSettingsModal'
import { AudioPlayer } from './AudioPlayer'
import { DetailModal, type DetailModalData } from './DetailModal'

import './museumTheme.css'

export function MuseumApp() {
  const [activeZone, setActiveZone] = useState<'zone1' | 'zone2'>('zone2')
  const [isFading, setIsFading] = useState(false)
  const [qualityLevel, setQualityLevel] = useState<QualityLevel>(getSavedQualityLevel)
  const [showSettings, setShowSettings] = useState(false)
  const [showFps, setShowFps] = useState(getSavedFpsCounter)
  const [fps, setFps] = useState(60)

  // Selected Detail Modal Data
  const [modalData, setModalData] = useState<DetailModalData | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Zone 2 Player Tracking & Teleportation
  const [playerPos, setPlayerPos] = useState<[number, number, number]>(ZONE2_START_POSITION)
  const [playerYaw, setPlayerYaw] = useState(Math.PI)
  const [targetPosition, setTargetPosition] = useState<[number, number, number] | null>(null)

  const currentPreset = QUALITY_PRESETS[qualityLevel]

  // FPS Counter measurement
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animId: number

    const measure = (now: number) => {
      frameCount++
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
      animId = requestAnimationFrame(measure)
    }

    animId = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Auto-Performance check in first 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (fps > 0 && fps < 30 && qualityLevel !== 'standar') {
        // Automatically switch to standard for smooth performance
        setQualityLevel('standar')
      }
    }, 4000)
    return () => clearTimeout(timer)
  }, [fps, qualityLevel])

  // Cinematic 0.8s Zone Transition Handler
  const handleSwitchZone = useCallback((newZone: 'zone1' | 'zone2') => {
    if (newZone === activeZone || isFading) return

    setIsFading(true)
    setTimeout(() => {
      setActiveZone(newZone)
      setModalData(null)
      setTargetPosition(null)

      // Fade in
      setTimeout(() => {
        setIsFading(false)
      }, 300)
    }, 800)
  }, [activeZone, isFading])

  // Mini-map teleport handler
  const handleTeleportZone2 = useCallback((key: Zone2SubzoneKey) => {
    const target = ZONE2_TARGETS[key]
    if (target) {
      setTargetPosition(target.position)
    }
  }, [])

  // Exhibit Selection Handlers
  const handleSelectFaculty = useCallback((fac: FacultyPlaqueData) => {
    setModalData({
      id: fac.id,
      title: fac.name,
      subtitle: `EST. ${fac.founded} • Dekan Perintis: ${fac.deans}`,
      badge: '14 FAKULTAS UNDIP',
      description: fac.description,
      highlights: fac.highlights,
    })
  }, [])

  const handleSelectExhibit = useCallback((exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => {
    setModalData({
      id: exhibit.id,
      title: exhibit.title,
      subtitle: exhibit.subtitle,
      badge: 'PAMERAN SEJARAH',
      description: exhibit.description,
      highlights: exhibit.highlights,
    })
  }, [])

  const handleSelectMilestone = useCallback((ms: TimelineMilestone) => {
    setModalData({
      id: `milestone-${ms.year}`,
      title: `${ms.year} — ${ms.title}`,
      subtitle: `${ms.subtitle} • Lokasi: ${ms.location}`,
      badge: 'GARIS WAKTU EMAS',
      description: ms.description,
    })
  }, [])

  return (
    <div className="undip-app-root">
      {/* Top Action Header Bar */}
      <div className="undip-top-bar">
        <AudioPlayer />
        <button
          type="button"
          className="undip-action-btn"
          onClick={() => setShowSettings(true)}
          title="Pengaturan Grafik & Resolusi"
        >
          <span>⚙️</span>
          <span>GRAFIK ({qualityLevel.toUpperCase()})</span>
        </button>
      </div>

      {/* Real-time FPS Counter */}
      {showFps && (
        <div className="undip-fps-counter">
          {fps} FPS
        </div>
      )}

      {/* Left Collapsible Sidebar Navigation */}
      <SidebarNav
        currentZone={activeZone}
        onSelectZone={handleSwitchZone}
        disabled={isFading}
      />

      {/* 2D Mini-Map (Active during Zone 2) */}
      {activeZone === 'zone2' && (
        <MiniMap
          playerPos={playerPos}
          playerYaw={playerYaw}
          onTeleport={handleTeleportZone2}
        />
      )}

      {/* Active 3D Room Rendered in Canvas */}
      {activeZone === 'zone1' ? (
        <Zone1Scene />
      ) : (
        <div className="undip-canvas-container" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          <Canvas
            shadows={currentPreset.shadows}
            dpr={currentPreset.dpr}
            gl={{
              antialias: currentPreset.antialias,
              powerPreference: 'high-performance',
              alpha: false,
            }}
          >
            <color attach="background" args={['#071228']} />
            <fog attach="fog" args={['#071228', currentPreset.cullThreshold, currentPreset.maxDistance]} />

            <PerspectiveCamera
              makeDefault
              position={ZONE2_START_POSITION}
              fov={58}
              near={0.1}
              far={currentPreset.maxDistance}
            />

            <AdaptiveDpr pixelated={false} />
            <AdaptiveEvents />

            <Suspense fallback={null}>
              <Zone2Scene
                selectedId={modalData?.id || null}
                hoveredId={hoveredId}
                onSelectFaculty={handleSelectFaculty}
                onSelectExhibit={handleSelectExhibit}
                onSelectMilestone={handleSelectMilestone}
                onHover={setHoveredId}
                onPlayerMove={(pos, yaw) => {
                  setPlayerPos(pos)
                  setPlayerYaw(yaw)
                }}
              />
            </Suspense>

            <FirstPersonControlsZone2
              targetPosition={targetPosition}
              panelOpen={modalData !== null}
            />
          </Canvas>

          {/* Desktop Navigation Hints Bar at Bottom */}
          <div className="gr-hints" style={{ pointerEvents: 'none' }}>
            <div className="gr-hint-row">
              <span className="gr-hint-key">W</span>
              <span className="gr-hint-key">A</span>
              <span className="gr-hint-key">S</span>
              <span className="gr-hint-key">D</span>
              <span className="gr-hint-text">atau Panah</span>
              <span className="gr-hint-desc">jalan & geser</span>
              <span className="gr-hint-divider">•</span>
              <span className="gr-hint-key">Shift</span>
              <span className="gr-hint-desc">lari</span>
              <span className="gr-hint-divider">•</span>
              <span className="gr-hint-desc">klik & geser mouse untuk melihat</span>
              <span className="gr-hint-divider">•</span>
              <span className="gr-hint-desc">klik plakat/maket untuk detail</span>
              <span className="gr-hint-divider">•</span>
              <span className="gr-hint-key">N</span>
              <span className="gr-hint-desc">kunci / lepas pandangan</span>
              <span className="gr-hint-divider">•</span>
              <span className="gr-hint-key">ESC</span>
              <span className="gr-hint-desc">lepas kursor</span>
            </div>
          </div>
        </div>
      )}

      {/* Detail Information Modal */}
      <DetailModal
        data={modalData}
        onClose={() => setModalData(null)}
      />

      {/* Graphics Settings Modal */}
      {showSettings && (
        <GraphicsSettingsModal
          currentLevel={qualityLevel}
          showFps={showFps}
          onChangeLevel={(lvl) => setQualityLevel(lvl)}
          onToggleFps={setShowFps}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Cinematic Black Fade Screen */}
      <div className={`undip-fade-screen ${isFading ? 'is-active' : ''}`} />
    </div>
  )
}
