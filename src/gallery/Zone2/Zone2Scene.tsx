import { memo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { FacultyTree } from './FacultyTree'
import { CampusTransformationExhibit } from './CampusTransformationExhibit'
import { EducationResearchExhibit } from './EducationResearchExhibit'
import { AchievementsExhibit } from './AchievementsExhibit'
import { Zone2Walls } from './Zone2Walls'
import { ZONE2_START_POSITION } from './layout'
import { PALETTE } from './palette'
import type { FacultyPlaqueData, TimelineMilestone } from './data/zone2Data'

interface Zone2SceneProps {
  selectedId: string | null
  hoveredId: string | null
  onSelectFaculty: (faculty: FacultyPlaqueData) => void
  onSelectExhibit: (exhibit: { id: string; title: string; subtitle: string; description: string; highlights?: string[] }) => void
  onSelectMilestone: (milestone: TimelineMilestone) => void
  onHover: (id: string | null) => void
  onPlayerMove?: (pos: [number, number, number], yaw: number) => void
}

/**
 * Complete 3D Architectural Scene for Zone 2: "The Growth of Knowledge"
 */
export const Zone2Scene = memo(function Zone2Scene({
  selectedId,
  hoveredId,
  onSelectFaculty,
  onSelectExhibit,
  onSelectMilestone,
  onHover,
  onPlayerMove,
}: Zone2SceneProps) {
  const [playerZ, setPlayerZ] = useState(ZONE2_START_POSITION[2])

  return (
    <group>
      {/* Ambient Lighting & Soft Atmosphere */}
      <ambientLight color={PALETTE.warmLight} intensity={0.95} />
      <directionalLight
        position={[4, 12, 10]}
        intensity={1.2}
        color={PALETTE.spotlightBeam}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Main Architectural Shell */}
      <Zone2Walls
        onSelectMilestone={onSelectMilestone}
        onHover={onHover}
      />

      {/* Sub-zone A: Centerpiece Faculty Tree (Z = 5.5) */}
      <FacultyTree
        selectedId={selectedId}
        hoveredId={hoveredId}
        onSelect={onSelectFaculty}
        onHover={onHover}
      />

      {/* Sub-zone B: Campus Transformation (Z = 0) */}
      <CampusTransformationExhibit
        selectedId={selectedId}
        hoveredId={hoveredId}
        onSelect={onSelectExhibit}
        onHover={onHover}
      />

      {/* Sub-zone C: Education & Research (Z = -7.5) */}
      <EducationResearchExhibit
        playerZ={playerZ}
        onSelect={onSelectExhibit}
        onHover={onHover}
      />

      {/* Sub-zone D: Achievements & Community Outreach (Z = -14.0) */}
      <AchievementsExhibit
        onSelect={onSelectExhibit}
        onHover={onHover}
      />

      {/* Internal tracking loop to pass current player Z for proximity-based effects */}
      <PlayerTracker
        onUpdatePos={(pos, yaw) => {
          setPlayerZ(pos[2])
          onPlayerMove?.(pos, yaw)
        }}
      />
    </group>
  )
})

function PlayerTracker({
  onUpdatePos,
}: {
  onUpdatePos: (pos: [number, number, number], yaw: number) => void
}) {
  const lastEmitRef = useRef(0)

  useFrame(({ camera }) => {
    const now = performance.now()
    if (now - lastEmitRef.current > 50) {
      // 20Hz update
      lastEmitRef.current = now
      onUpdatePos([camera.position.x, camera.position.y, camera.position.z], camera.rotation.y)
    }
  })

  return null
}
