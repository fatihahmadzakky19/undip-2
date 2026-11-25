import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { TIMELINE_MILESTONES, type TimelineMilestone } from './data/zone2Data'
import { ZONE2_HALL } from './layout'
import { PALETTE } from './palette'

interface Zone2WallsProps {
  onSelectMilestone?: (milestone: TimelineMilestone) => void
  onHover?: (id: string | null) => void
}

/**
 * Architectural Envelope for Zone 2:
 * 1. Walls, Teak Wainscoting, Gold Cornices, and Entrance / Exit Portals
 * 2. Floor with Subtle Ceramic Reflection & Central Maroon Carpet Runner
 * 3. Coffered Ceiling with Cove Glow & Modern Pendant Chandeliers
 * 4. Master Golden Timeline Wall along the Left Corridor (1956–Present)
 * 5. Zone Guide Board near Entrance
 */
export const Zone2Walls = memo(function Zone2Walls({
  onSelectMilestone,
  onHover,
}: Zone2WallsProps) {
  const halfW = ZONE2_HALL.halfWidth
  const height = ZONE2_HALL.height
  const length = ZONE2_HALL.length

  // Entrance Signboard Texture
  const entranceSignTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 256)
      grad.addColorStop(0, PALETTE.navyPrimary)
      grad.addColorStop(1, PALETTE.navyDark)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 1024, 256)

      ctx.strokeStyle = PALETTE.goldTrim
      ctx.lineWidth = 6
      ctx.strokeRect(8, 8, 1008, 240)
      ctx.strokeStyle = PALETTE.goldLight
      ctx.lineWidth = 2
      ctx.strokeRect(16, 16, 992, 224)

      ctx.fillStyle = PALETTE.goldBright
      ctx.font = 'bold 36px "Cinzel", "Times New Roman", serif'
      ctx.textAlign = 'center'
      ctx.fillText('ZONA 2 — THE GROWTH OF KNOWLEDGE', 512, 105)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px "Segoe UI", sans-serif'
      ctx.fillText('PERKEMBANGAN 14 FAKULTAS & TRANSFORMASI KAMPUS', 512, 160)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  // Exit Signboard Texture
  const exitSignTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 256)
      grad.addColorStop(0, PALETTE.navyPrimary)
      grad.addColorStop(1, PALETTE.navyDark)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 1024, 256)

      ctx.strokeStyle = PALETTE.goldTrim
      ctx.lineWidth = 6
      ctx.strokeRect(8, 8, 1008, 240)

      ctx.fillStyle = PALETTE.goldBright
      ctx.font = 'bold 36px "Cinzel", "Times New Roman", serif'
      ctx.textAlign = 'center'
      ctx.fillText('MENUJU ZONA 3 — THE HERITAGE OF UNDIP', 512, 110)

      ctx.fillStyle = PALETTE.goldLight
      ctx.font = 'italic 20px "Segoe UI", sans-serif'
      ctx.fillText('— Warisan Sejarah, Artefak Akademik & Nilai Kesatria —', 512, 165)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  // Guide Board Texture
  const guideBoardTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 512)
      grad.addColorStop(0, PALETTE.navyPrimary)
      grad.addColorStop(1, PALETTE.navyDark)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 1024, 512)

      ctx.strokeStyle = PALETTE.goldTrim
      ctx.lineWidth = 6
      ctx.strokeRect(8, 8, 1008, 496)

      ctx.fillStyle = PALETTE.goldBright
      ctx.font = 'bold 32px "Cinzel", serif'
      ctx.textAlign = 'center'
      ctx.fillText('PANDUAN EKSPLORASI ZONA 2', 512, 60)
      ctx.font = 'italic 18px "Segoe UI", sans-serif'
      ctx.fillStyle = '#b8c7db'
      ctx.fillText('Jalur Linear Pertumbuhan & Perkembangan Universitas Diponegoro', 512, 95)

      const guides = [
        { code: 'A', name: 'Pohon Pertumbuhan Fakultas', info: '14 Plakat interaktif tonggak kelahiran setiap fakultas Undip' },
        { code: 'B', name: 'Transformasi Kampus', info: 'Dua maket isometrik Pleburan vs Tembalang & layar before/after' },
        { code: 'C', name: 'Pendidikan & Riset Ilmiah', info: 'Laboratorium kelautan tropis & statistik pertumbuhan live count-up' },
        { code: 'D', name: 'Prestasi & Pengabdian', info: 'Etalase piala kejuaraan, medali emas & kontribusi bagi rakyat' },
      ]

      guides.forEach((g, idx) => {
        const y = 140 + idx * 82
        ctx.fillStyle = '#061325'
        ctx.fillRect(40, y, 944, 70)
        ctx.strokeStyle = PALETTE.goldTrim
        ctx.lineWidth = 1.5
        ctx.strokeRect(40, y, 944, 70)

        // Circle Badge
        ctx.fillStyle = PALETTE.maroonCarpet
        ctx.beginPath()
        ctx.arc(85, y + 35, 24, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = PALETTE.goldBright
        ctx.stroke()

        ctx.fillStyle = PALETTE.goldBright
        ctx.font = 'bold 22px "Cinzel", serif'
        ctx.textAlign = 'center'
        ctx.fillText(g.code, 85, y + 43)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 20px "Segoe UI", sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(g.name, 130, y + 32)

        ctx.fillStyle = '#9cb1c9'
        ctx.font = '15px "Segoe UI", sans-serif'
        ctx.fillText(g.info, 130, y + 55)
      })
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  return (
    <group>
      {/* ============================================================
          1. FLOOR WITH CERAMIC MARBLE & MAROON CARPET AISLE
          ============================================================ */}
      {/* White Marble Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[halfW * 2, length]} />
        <meshStandardMaterial
          color={PALETTE.floorMarble}
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Central Maroon Carpet Runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]} receiveShadow>
        <planeGeometry args={[3.2, length - 1.2]} />
        <meshStandardMaterial
          color={PALETTE.maroonCarpet}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      {/* Carpet Gold Trim Strips */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.6, 0.012, 0]}>
        <planeGeometry args={[0.06, length - 1.2]} />
        <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.6, 0.012, 0]}>
        <planeGeometry args={[0.06, length - 1.2]} />
        <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
      </mesh>

      {/* ============================================================
          2. CEILING WITH COFFER RECESSES & LIGHTING COVE
          ============================================================ */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[halfW * 2, length]} />
        <meshStandardMaterial color={PALETTE.ivoryWarm} roughness={0.6} />
      </mesh>

      {/* Perimeter Gold Molding on Ceiling */}
      <mesh position={[0, height - 0.1, 0]}>
        <boxGeometry args={[halfW * 2 - 0.2, 0.12, length - 0.2]} />
        <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.3} metalness={0.85} wireframe={false} />
      </mesh>

      {/* Longitudinal Cove Light Channels */}
      {[-3.0, 3.0].map((cx, ci) => (
        <group key={`cove-${ci}`} position={[cx, height - 0.04, 0]}>
          <mesh>
            <boxGeometry args={[0.25, 0.06, length - 4.0]} />
            <meshStandardMaterial
              color="#fffcf5"
              emissive={PALETTE.coveGlow}
              emissiveIntensity={2.4}
              roughness={0.1}
            />
          </mesh>
          <pointLight color={PALETTE.warmLight} intensity={35} distance={14} decay={2} position={[0, -0.2, 0]} />
        </group>
      ))}

      {/* Modern Ring Chandeliers along the Hall */}
      {[10.0, 3.0, -4.0, -11.0].map((cz, czi) => (
        <group key={`chan-${czi}`} position={[0, height - 1.1, cz]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2, 0.04, 12, 32]} />
            <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
            <torusGeometry args={[1.18, 0.02, 8, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={PALETTE.warmLight}
              emissiveIntensity={3.2}
              roughness={0.1}
            />
          </mesh>
          <pointLight color={PALETTE.warmLight} intensity={40} distance={12} decay={2} position={[0, -0.4, 0]} />
        </group>
      ))}

      {/* ============================================================
          3. MAIN WALLS & TEAK WAINSCOTING
          ============================================================ */}
      {/* Left Wall (X = -halfW) */}
      <mesh position={[-halfW, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
      </mesh>
      {/* Left Wall Lower Teak Wainscoting */}
      <mesh position={[-halfW + 0.04, 0.65, 0]}>
        <boxGeometry args={[0.08, 1.3, length]} />
        <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
      </mesh>
      <mesh position={[-halfW + 0.08, 1.32, 0]}>
        <boxGeometry args={[0.04, 0.04, length]} />
        <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
      </mesh>

      {/* Right Wall (X = halfW) */}
      <mesh position={[halfW, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
      </mesh>
      {/* Right Wall Lower Teak Wainscoting */}
      <mesh position={[halfW - 0.04, 0.65, 0]}>
        <boxGeometry args={[0.08, 1.3, length]} />
        <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
      </mesh>
      <mesh position={[halfW - 0.08, 1.32, 0]}>
        <boxGeometry args={[0.04, 0.04, length]} />
        <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
      </mesh>

      {/* ============================================================
          4. ENTRANCE PORTAL (NORTH WALL: Z = 18.0)
          ============================================================ */}
      <group position={[0, 0, 18.0]}>
        {/* Wall Frame */}
        <mesh position={[-4.8, height / 2, 0]}>
          <boxGeometry args={[4.4, height, 0.4]} />
          <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
        </mesh>
        <mesh position={[4.8, height / 2, 0]}>
          <boxGeometry args={[4.4, height, 0.4]} />
          <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
        </mesh>
        <mesh position={[0, height - 0.8, 0]}>
          <boxGeometry args={[5.2, 1.6, 0.4]} />
          <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
        </mesh>

        {/* Grand Teak Portal Columns */}
        {[-2.6, 2.6].map((px, pi) => (
          <group key={`ent-col-${pi}`} position={[px, height / 2, -0.1]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, height, 0.5]} />
              <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.26]}>
              <boxGeometry args={[0.1, height, 0.04]} />
              <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
            </mesh>
          </group>
        ))}

        {/* Master Gold Inscription Plaque Above Entrance */}
        <group position={[0, 4.8, -0.22]}>
          <mesh castShadow>
            <boxGeometry args={[4.8, 1.2, 0.08]} />
            <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[4.65, 1.05]} />
            <meshStandardMaterial
              map={entranceSignTexture}
              emissiveMap={entranceSignTexture}
              emissive="#ffffff"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>
      </group>

      {/* ============================================================
          5. EXIT PORTAL (SOUTH WALL: Z = -18.0)
          ============================================================ */}
      <group position={[0, 0, -18.0]}>
        <mesh position={[-4.8, height / 2, 0]}>
          <boxGeometry args={[4.4, height, 0.4]} />
          <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
        </mesh>
        <mesh position={[4.8, height / 2, 0]}>
          <boxGeometry args={[4.4, height, 0.4]} />
          <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
        </mesh>
        <mesh position={[0, height - 0.8, 0]}>
          <boxGeometry args={[5.2, 1.6, 0.4]} />
          <meshStandardMaterial color={PALETTE.ivoryMain} roughness={0.7} />
        </mesh>

        {/* Grand Teak Portal Columns */}
        {[-2.6, 2.6].map((px, pi) => (
          <group key={`exit-col-${pi}`} position={[px, height / 2, 0.1]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, height, 0.5]} />
              <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, -0.26]}>
              <boxGeometry args={[0.1, height, 0.04]} />
              <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
            </mesh>
          </group>
        ))}

        {/* Exit Plaque */}
        <group position={[0, 4.8, 0.22]}>
          <mesh castShadow>
            <boxGeometry args={[4.8, 1.2, 0.08]} />
            <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[4.65, 1.05]} />
            <meshStandardMaterial
              map={exitSignTexture}
              emissiveMap={exitSignTexture}
              emissive="#ffffff"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>
      </group>

      {/* ============================================================
          6. STANDING ZONE GUIDE BOARD NEAR ENTRANCE (X = 3.2, Z = 14.5)
          ============================================================ */}
      <group position={[3.2, 0, 14.5]} rotation={[0, -0.4, 0]}>
        {/* Heavy Teak Pedestal Base */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[1.6, 0.12, 0.6]} />
          <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[1.5, 0.02, 0.5]} />
          <meshStandardMaterial color={PALETTE.goldTrim} roughness={0.25} metalness={0.88} />
        </mesh>
        {/* Twin Supporting Pillars */}
        {[-0.45, 0.45].map((px, pi) => (
          <mesh key={`post-${pi}`} position={[px, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.4, 12]} />
            <meshStandardMaterial color={PALETTE.goldTrim} metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Slanted Presentation Board */}
        <group position={[0, 1.6, 0]} rotation={[-0.25, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 1.0, 0.06]} />
            <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.72, 0.92]} />
            <meshStandardMaterial
              map={guideBoardTexture}
              emissiveMap={guideBoardTexture}
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* ============================================================
          7. MASTER GOLDEN TIMELINE WALL ALONG LEFT CORRIDOR (X = -halfW + 0.1)
          Spans chronologically from Z = 14.0 (1956) to Z = -14.0 (2024–Kini)
          ============================================================ */}
      <group position={[-halfW + 0.12, 3.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Continuous Horizontal Golden Timeline Rail */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[28.0, 0.05, 0.03]} />
          <meshStandardMaterial color={PALETTE.goldBright} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Milestone Nodes */}
        {TIMELINE_MILESTONES.map((ms, idx) => {
          // X in local coordinates corresponds to -Z in world coordinates
          // 1956 is at +Z (Entrance), 2024 is at -Z (Exit)
          const posX = -12.5 + idx * 3.1
          return (
            <group
              key={ms.year}
              position={[posX, 0, 0.04]}
              onClick={() => onSelectMilestone?.(ms)}
              onPointerOver={() => onHover?.(`milestone-${ms.year}`)}
              onPointerOut={() => onHover?.(null)}
            >
              {/* Year Pin Diamond */}
              <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
                <boxGeometry args={[0.22, 0.22, 0.05]} />
                <meshStandardMaterial
                  color={PALETTE.goldBright}
                  emissive={PALETTE.goldTrim}
                  emissiveIntensity={0.3}
                  metalness={0.9}
                  roughness={0.2}
                />
              </mesh>

              {/* Framed Milestone Archival Card */}
              <group position={[0, -0.65, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[1.3, 0.85, 0.04]} />
                  <meshStandardMaterial color={PALETTE.teakDeep} roughness={0.4} />
                </mesh>
                <mesh position={[0, 0, 0.025]}>
                  <boxGeometry args={[1.22, 0.77, 0.01]} />
                  <meshStandardMaterial color={PALETTE.navyDark} />
                </mesh>
                <mesh position={[0, 0.26, 0.032]}>
                  <boxGeometry args={[0.65, 0.18, 0.01]} />
                  <meshStandardMaterial color={PALETTE.goldBright} metalness={0.9} roughness={0.2} />
                </mesh>
              </group>
            </group>
          )
        })}
      </group>
    </group>
  )
})
