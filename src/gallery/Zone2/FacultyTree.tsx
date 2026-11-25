import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { FACULTIES_DATA, type FacultyPlaqueData } from './data/zone2Data'
import { PALETTE } from './palette'

interface FacultyTreeProps {
  selectedId: string | null
  hoveredId: string | null
  onSelect: (faculty: FacultyPlaqueData) => void
  onHover: (id: string | null) => void
}

/**
 * Sub-zone A Centerpiece: "The Faculty Tree of Growth" (Pohon Pertumbuhan Ilmu)
 * Sculptural architectural tree with 14 spiral golden branches holding interactive faculty plaques.
 */
export const FacultyTree = memo(function FacultyTree({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: FacultyTreeProps) {
  // Pre-generate plaque textures for each faculty
  const plaqueTextures = useMemo(() => {
    return FACULTIES_DATA.map((fac) => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Enamel Background
        const grad = ctx.createLinearGradient(0, 0, 0, 256)
        grad.addColorStop(0, PALETTE.navyPrimary)
        grad.addColorStop(1, PALETTE.navyDark)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 512, 256)

        // Accent Faculty Color Strip
        ctx.fillStyle = fac.color
        ctx.fillRect(0, 0, 24, 256)

        // Gold border
        ctx.strokeStyle = PALETTE.goldTrim
        ctx.lineWidth = 6
        ctx.strokeRect(6, 6, 500, 244)

        ctx.strokeStyle = PALETTE.goldLight
        ctx.lineWidth = 2
        ctx.strokeRect(14, 14, 484, 228)

        // Faculty Code Monogram
        ctx.fillStyle = PALETTE.goldBright
        ctx.font = 'bold 44px "Cinzel", "Times New Roman", serif'
        ctx.textAlign = 'left'
        ctx.fillText(fac.code, 44, 70)

        // Foundation Year Pill
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 24px "Segoe UI", sans-serif'
        ctx.fillText(`EST. ${fac.founded}`, 44, 110)

        // Full Faculty Name
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 26px "Segoe UI", sans-serif'
        const words = fac.name.split(' ')
        if (words.length > 3) {
          ctx.fillText(words.slice(0, 2).join(' '), 44, 160)
          ctx.fillText(words.slice(2).join(' '), 44, 200)
        } else {
          ctx.fillText(fac.name, 44, 180)
        }
      }

      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      return { id: fac.id, texture: tex }
    })
  }, [])

  return (
    <group position={[0, 0, 5.5]}>
      {/* 1. Octagonal Marble & Gold Base Pedestal */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.75, 0.24, 8]} />
        <meshStandardMaterial color={PALETTE.floorMarble} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.03, 8]} />
        <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.38, 0]} receiveShadow>
        <cylinderGeometry args={[1.35, 1.5, 0.24, 8]} />
        <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
      </mesh>

      {/* 2. Sculpted Dark Teak Tree Trunk */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.55, 2.6, 16]} />
        <meshStandardMaterial color={PALETTE.darkWood} roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.32, 1.2, 12]} />
        <meshStandardMaterial color={PALETTE.darkWood} roughness={0.6} />
      </mesh>

      {/* Decorative Gold Rings on Trunk */}
      {[0.8, 1.6, 2.4, 3.1].map((ry, ri) => (
        <mesh key={`ring-${ri}`} position={[0, ry, 0]}>
          <torusGeometry args={[0.48 - ri * 0.08, 0.025, 12, 24]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>
      ))}

      {/* Top Radiant Golden Blossom Finial */}
      <group position={[0, 3.9, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color={PALETTE.goldBright}
            emissive={PALETTE.goldAccent}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <pointLight color={PALETTE.coveGlow} intensity={18} distance={8} decay={2} />
      </group>

      {/* 3. 14 Spiral Golden Branches with Interactive Faculty Plaques */}
      {FACULTIES_DATA.map((fac, idx) => {
        // Distribute in a spiral ascending arrangement
        const angle = (idx * (Math.PI * 2 / 7)) + (idx > 6 ? Math.PI / 7 : 0)
        const radius = 1.35 + (idx % 2) * 0.35
        const y = 1.1 + idx * 0.18
        const px = Math.cos(angle) * radius
        const pz = Math.sin(angle) * radius

        const isHovered = hoveredId === fac.id
        const isSelected = selectedId === fac.id
        const plaqueTex = plaqueTextures.find((t) => t.id === fac.id)?.texture

        return (
          <group key={fac.id}>
            {/* Curved Golden Branch Rod */}
            <mesh position={[px * 0.5, y - 0.08, pz * 0.5]} rotation={[0, -angle, 0.32]}>
              <cylinderGeometry args={[0.025, 0.035, radius * 0.95, 8]} />
              <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
            </mesh>

            {/* Plaque Unit */}
            <group
              position={[px, y, pz]}
              rotation={[0, -angle + Math.PI / 2, 0]}
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
                onSelect(fac)
              }}
            >
              {/* Plaque Walnut Backing Frame */}
              <mesh castShadow>
                <boxGeometry args={[0.55, 0.28, 0.025]} />
                <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
              </mesh>

              {/* Gold Bevel Trim */}
              <mesh position={[0, 0, 0.014]}>
                <boxGeometry args={[0.53, 0.26, 0.01]} />
                <meshStandardMaterial
                  color={isSelected || isHovered ? PALETTE.goldBright : PALETTE.goldTrim}
                  emissive={isHovered ? PALETTE.goldAccent : '#000000'}
                  emissiveIntensity={isHovered ? 0.4 : 0}
                  roughness={0.2}
                  metalness={0.88}
                />
              </mesh>

              {/* Enamel Canvas Face */}
              <mesh position={[0, 0, 0.022]}>
                <planeGeometry args={[0.51, 0.24]} />
                <meshStandardMaterial
                  map={plaqueTex}
                  emissive={isSelected ? PALETTE.goldLight : '#ffffff'}
                  emissiveMap={plaqueTex}
                  emissiveIntensity={isHovered ? 0.55 : 0.25}
                  roughness={0.3}
                />
              </mesh>

              {/* Faculty Color Accent Ribbon Beneath */}
              <mesh position={[-0.23, 0, 0.025]}>
                <boxGeometry args={[0.025, 0.23, 0.005]} />
                <meshStandardMaterial color={fac.color} roughness={0.4} />
              </mesh>

              {/* Interactive Hover Halo Glow */}
              {(isHovered || isSelected) && (
                <mesh position={[0, -0.17, 0.02]}>
                  <boxGeometry args={[0.48, 0.025, 0.01]} />
                  <meshBasicMaterial color={PALETTE.goldBright} />
                </mesh>
              )}
            </group>
          </group>
        )
      })}
    </group>
  )
})
