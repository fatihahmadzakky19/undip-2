import { memo, useMemo } from 'react'
import * as THREE from 'three'
import type { CeremonialPodiumProps } from './types'
import {
  createPrasastiTexture,
  createIndonesianFlagTexture,
  createUndipFlagTexture,
  createUndipWallTypographyTexture,
  createOfficialUndipLogoTexture,
  createIvoryGraniteTexture,
} from './textures'
import { HALL } from './layout'
import { assetCache } from './cache'
import { CulledEntity } from '../common/CulledEntity'

/**
 * Modern Architectural LED Ring Pendant Chandelier
 * Securely anchored to the grand ceiling surface (HALL.height = 8.8m)
 * with continuous brass aircraft suspension cables and architectural ceiling canopy,
 * eliminating any mid-air floating appearance.
 */
function LedRingPendantChandelier({ position }: { position: [number, number, number] }) {
  // Height difference from chandelier ring (y=4.8) to ceiling (y=8.8) is exactly 4.0m
  const ceilingDist = 4.0

  return (
    <group position={position}>
      {/* 4 Continuous Brass Aircraft Suspension Cables reaching the ceiling flush */}
      {[-0.95, 0.95].map((cx, ci) =>
        [-0.75, 0.75].map((cz, czi) => (
          <group key={`wire-${ci}-${czi}`}>
            {/* Cable spanning full 4.0m to ceiling */}
            <mesh position={[cx, ceilingDist / 2, cz]}>
              <cylinderGeometry args={[0.0035, 0.0035, ceilingDist, 8]} />
              <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Ceiling Cable Tensioner / Anchor Stud */}
            <mesh position={[cx, ceilingDist - 0.02, cz]}>
              <cylinderGeometry args={[0.016, 0.016, 0.04, 12]} />
              <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        )),
      )}

      {/* Central Structural Downrod / Power Conduit running to ceiling */}
      <mesh position={[0, ceilingDist / 2, 0]}>
        <cylinderGeometry args={[0.01, 0.01, ceilingDist, 16]} />
        <meshStandardMaterial color="#c5a059" metalness={0.88} roughness={0.25} />
      </mesh>

      {/* Grand Ceiling Mounting Canopy Rose (Anchored flush against the ceiling at y=4.0) */}
      <group position={[0, ceilingDist - 0.02, 0]}>
        {/* Main Architectural Canopy Plate */}
        <mesh>
          <cylinderGeometry args={[0.38, 0.38, 0.05, 32]} />
          <meshStandardMaterial color="#c5a059" metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Ceiling Trim Bezel */}
        <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.36, 0.44, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Center Cable Hub Coupler */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.06, 24]} />
          <meshStandardMaterial color="#c5a059" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Outer Ring Torus (Diameter ~2.6m) */}
      <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Outer Brushed Brass Casing */}
        <mesh castShadow>
          <torusGeometry args={[1.3, 0.026, 16, 48]} />
          <meshStandardMaterial color="#c5a059" metalness={0.88} roughness={0.22} />
        </mesh>
        {/* Outer Warm Cream LED Diffuser Ring */}
        <mesh position={[0, 0, 0.012]}>
          <torusGeometry args={[1.3, 0.016, 16, 48]} />
          <meshStandardMaterial
            color="#fff8ed"
            emissive="#ffdca3"
            emissiveIntensity={3.2}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Inner Ring Torus (Diameter ~1.6m) */}
      <group position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Inner Brushed Brass Casing */}
        <mesh castShadow>
          <torusGeometry args={[0.8, 0.022, 16, 40]} />
          <meshStandardMaterial color="#c5a059" metalness={0.88} roughness={0.22} />
        </mesh>
        {/* Inner Warm Cream LED Diffuser Ring */}
        <mesh position={[0, 0, 0.012]}>
          <torusGeometry args={[0.8, 0.014, 16, 40]} />
          <meshStandardMaterial
            color="#fff8ed"
            emissive="#ffdca3"
            emissiveIntensity={3.2}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  )
}

/**
 * Static Curved Fabric Flag Component (Lightweight, Zero Animation Overhead)
 * Pre-computes smooth draped folds once with useMemo. Zero CPU load during render loop.
 */
interface StaticFlagProps {
  position: [number, number, number]
  width?: number
  height?: number
  texture?: THREE.Texture | null
}

function StaticCurvedFlag({
  position,
  width = 1.08,
  height = 0.72,
  texture,
}: StaticFlagProps) {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, height, 16, 8)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i)
      const v = pos.getY(i)
      const factor = Math.max(0, (u + width / 2) / width)
      const wave =
        Math.sin(factor * Math.PI * 2.2) * 0.065 * factor +
        Math.sin(factor * Math.PI * 1.4 + v * 1.8) * 0.025 * factor
      pos.setZ(i, wave)
    }
    g.computeVertexNormals()
    return g
  }, [width, height])

  return (
    <mesh position={position} geometry={geom} castShadow>
      <meshStandardMaterial
        map={texture}
        roughness={0.45}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * Universitas Diponegoro Ceremonial Dais & Stage Installation
 * Features:
 * 1. Royal Navy Blue architectural wall (#142e56) with gilded wainscoting and pilasters.
 * 2. Golden Garuda Pancasila sculpture at the top center.
 * 3. Official framed portraits of President & Vice-President flanking Garuda.
 * 4. Official Shield Logo of Universitas Diponegoro & "UNIVERSITAS DIPONEGORO" 3D title.
 * 5. Monumental Black & Gold Prasasti Pendirian & Peresmian Universitas Diponegoro.
 * 6. Naturally waving ceremonial flags (Indonesia & Pataka Undip) fluttering in the air.
 * 7. Carved teakwood ceremonial podium (without glitchy blue board) on 2-tier dais.
 */
export const CeremonialPodium = memo(function CeremonialPodium({
  position,
  isSelected: _isSelected,
  isHovered: _isHovered,
  onSelect,
  onHover,
  onSelectPrasasti,
}: CeremonialPodiumProps) {
  const prasastiTexture = useMemo(() => createPrasastiTexture(), [])
  const wallTitleTexture = useMemo(() => createUndipWallTypographyTexture(), [])
  const indoFlagTexture = useMemo(() => createIndonesianFlagTexture(), [])
  const undipFlagTexture = useMemo(() => createUndipFlagTexture(), [])
  const ivoryGraniteTexture = useMemo(() => createIvoryGraniteTexture(), [])

  // Load the official Undip shield logo from the user's reference photo (auto-cleaned background)
  const officialLogoTexture = useMemo(() => createOfficialUndipLogoTexture(), [])

  const baseMaterials = useMemo(() => {
    return {
      ivoryGraniteMaterial: assetCache.getMaterial(
        'pod-pure-ivory-granite-v4',
        () =>
          new THREE.MeshStandardMaterial({
            map: ivoryGraniteTexture,
            color: '#ffffff',
            roughness: 0.95, // Pure honed matte natural stone - zero specular reflection
            metalness: 0.0,
          }),
      ),
      futuristicWood: assetCache.getMaterial(
        'pod-futuristic-wood',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#8c5828',
            roughness: 0.55,
            metalness: 0.05,
          }),
      ),
      woodSlat: assetCache.getMaterial(
        'pod-wood-slat',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#6e401b',
            roughness: 0.58,
            metalness: 0.05,
          }),
      ),
      warmCoveLightGlow: assetCache.getMaterial(
        'pod-warm-cove-glow',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffe082',
            emissive: '#ff9800',
            emissiveIntensity: 2.2,
            roughness: 0.35,
            metalness: 0.05,
          }),
      ),
      teakWood: assetCache.getMaterial(
        'pod-teak-wood',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#3d2516',
            roughness: 0.52,
            metalness: 0.08,
          }),
      ),
      darkTeakCarved: assetCache.getMaterial(
        'pod-dark-teak',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#2a180e',
            roughness: 0.58,
            metalness: 0.08,
          }),
      ),
      navyWallPanel: assetCache.getMaterial(
        'pod-navy-wall-matte-v4',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#122c54',
            roughness: 0.92, // Matte museum architectural paint - zero specular reflection
            metalness: 0.0,
          }),
      ),
      navyPanel: assetCache.getMaterial(
        'pod-navy-panel-matte-v4',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#163666',
            roughness: 0.92,
            metalness: 0.0,
          }),
      ),
      goldTrim: assetCache.getMaterial(
        'pod-gold-trim-satin-v4',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.52, // Satin brushed brass - soft diffuse, no sharp hotspot glare
            metalness: 0.7,
          }),
      ),
      goldBright: assetCache.getMaterial(
        'pod-gold-bright-satin-v4',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#f9d342',
            emissive: '#d4af37',
            emissiveIntensity: 0.05,
            roughness: 0.52,
            metalness: 0.65,
          }),
      ),
      blackGranite: assetCache.getMaterial(
        'pod-black-granite',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#0e1117',
            roughness: 0.2,
            metalness: 0.3,
          }),
      ),
      redVelvet: assetCache.getMaterial(
        'pod-red-velvet',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#8b151b',
            roughness: 0.9,
            metalness: 0.05,
          }),
      ),
      goldBrass: assetCache.getMaterial(
        'pod-gold-brass',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#c59f48',
            roughness: 0.3,
            metalness: 0.85,
          }),
      ),
      leatherBlotter: assetCache.getMaterial(
        'pod-leather-blotter',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#1c140d',
            roughness: 0.7,
            metalness: 0.1,
          }),
      ),
      parchment: assetCache.getMaterial(
        'pod-parchment',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#f4ecd8',
            roughness: 0.8,
          }),
      ),
      microphoneChrome: assetCache.getMaterial(
        'pod-mic-chrome',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#e2e8f0',
            roughness: 0.2,
            metalness: 0.9,
          }),
      ),
    }
  }, [])

  const materials = baseMaterials

  const halfW = HALL.halfWidth
  const height = HALL.height
  const backWallZ = HALL.zBack - position[2] // relative to podium group

  return (
    <CulledEntity
      position={[position[0], 2.5, position[2] - 2.0]}
      radius={9.5}
      maxDistance={48}
      name="ceremonial-podium-stage"
    >
      <group position={position}>
      {/* ============================================================
          1. BACK FOCAL WALL ARCHITECTURE & WAINSCOTING (Royal Navy)
          ============================================================ */}
      <group position={[0, height / 2, backWallZ + 0.05]}>
        {/* Navy Wall Wainscoting Panel Frame */}
        <mesh position={[0, 0, 0.02]} receiveShadow>
          <boxGeometry args={[halfW * 2 - 0.2, height - 0.4, 0.04]} />
          <primitive object={materials.navyWallPanel} attach="material" />
        </mesh>

        {/* Lower Wainscot Dado Rail (Teak & Gold) */}
        <mesh position={[0, -height / 2 + 1.15, 0.05]}>
          <boxGeometry args={[halfW * 2 - 0.1, 0.12, 0.05]} />
          <primitive object={materials.teakWood} attach="material" />
        </mesh>
        <mesh position={[0, -height / 2 + 1.22, 0.07]}>
          <boxGeometry args={[halfW * 2 - 0.1, 0.03, 0.03]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Upper Cornice Gold Molding */}
        <mesh position={[0, height / 2 - 0.25, 0.05]}>
          <boxGeometry args={[halfW * 2 - 0.1, 0.14, 0.06]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* ============================================================
            INDIRECT LINEAR LIGHTING & RECESSED LED DOWNLIGHTS (CEILING CORNICE)
            "pakaikan lampu downlight soft warm cream, Recessed LED Downlight... Indirect Linear Lighting"
            ============================================================ */}
        {/* Top Indirect Linear Lighting Cove Strip (Washing upper wall & ceiling) */}
        <mesh position={[0, height / 2 - 0.18, 0.09]}>
          <boxGeometry args={[halfW * 2 - 0.4, 0.04, 0.04]} />
          <meshStandardMaterial
            color="#fff8ec"
            emissive="#ffeacc"
            emissiveIntensity={2.8}
            roughness={0.2}
          />
        </mesh>

        {/* Recessed Architectural LED Downlight Can Fixtures along the back ceiling */}
        {[-5.0, -3.2, -1.5, 0, 1.5, 3.2, 5.0].map((rx, ri) => (
          <group key={`recessed-can-${ri}`} position={[rx, height / 2 - 0.14, 0.35]}>
            {/* Outer Canister Bezel Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.06, 24]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>
            {/* Frosted Warm Cream LED Diode Lens (Visibly Glowing) */}
            <mesh position={[0, -0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.02, 24]} />
              <meshStandardMaterial
                color="#fffcf5"
                emissive="#ffedd0"
                emissiveIntensity={3.6}
                roughness={0.15}
              />
            </mesh>
          </group>
        ))}

        {/* Left & Right Flanking Gold Pilasters */}
        {[-halfW + 0.06, halfW - 0.06].map((cx, ci) => (
          <mesh key={ci} position={[cx, 0, 0.03]}>
            <boxGeometry args={[0.16, height, 0.08]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>
        ))}

        {/* Interior Gold Pilasters Framing the Center Dais */}
        {[-5.1, 5.1].map((px, pi) => (
          <group key={`pila-${pi}`} position={[px, 0, 0.03]}>
            <mesh>
              <boxGeometry args={[0.14, height - 0.5, 0.04]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>
            <mesh position={[0, height / 2 - 0.4, 0.02]}>
              <boxGeometry args={[0.22, 0.15, 0.06]} />
              <primitive object={materials.goldBright} attach="material" />
            </mesh>
            <mesh position={[0, -height / 2 + 0.35, 0.02]}>
              <boxGeometry args={[0.22, 0.15, 0.06]} />
              <primitive object={materials.goldBright} attach="material" />
            </mesh>
          </group>
        ))}

        {/* ============================================================
            LAYER 1 (BASE BACKGROUND): DEEP ROYAL NAVY BLUE WALL
            (Navy wall paneling spans the entire background at z=0.02)
            ============================================================ */}

        {/* ============================================================
            LAYER 2: FUTURISTIC ARCHITECTURAL TIMBER & WOOD SLAT FEATURE
            (Overlays Layer 1 in the Center, wide horizontal rectangle: 9.0m x 5.2m)
            ============================================================ */}
        <group position={[0, 0.05, 0.07]}>
          {/* Main Architectural Wood Backing Frame (Rectangle: 9.0m x 5.2m) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[9.0, 5.2, 0.06]} />
            <primitive object={materials.futuristicWood} attach="material" />
          </mesh>

          {/* Left Wing Futuristic Vertical Wood Slats */}
          {Array.from({ length: 6 }).map((_, i) => {
            const slatX = -4.25 + i * 0.16
            return (
              <group key={`l-slat-${i}`} position={[slatX, 0, 0.04]}>
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[0.08, 4.8, 0.04]} />
                  <primitive object={materials.woodSlat} attach="material" />
                </mesh>
                <mesh position={[0, 0, 0.022]}>
                  <boxGeometry args={[0.02, 4.7, 0.01]} />
                  <primitive object={materials.goldTrim} attach="material" />
                </mesh>
              </group>
            )
          })}

          {/* Right Wing Futuristic Vertical Wood Slats */}
          {Array.from({ length: 6 }).map((_, i) => {
            const slatX = 3.45 + i * 0.16
            return (
              <group key={`r-slat-${i}`} position={[slatX, 0, 0.04]}>
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[0.08, 4.8, 0.04]} />
                  <primitive object={materials.woodSlat} attach="material" />
                </mesh>
                <mesh position={[0, 0, 0.022]}>
                  <boxGeometry args={[0.02, 4.7, 0.01]} />
                  <primitive object={materials.goldTrim} attach="material" />
                </mesh>
              </group>
            )
          })}

          {/* Modern Architectural Vertical Linear Light Droplets */}
          {[-4.35, -3.4, 3.4, 4.35].map((lx, li) => (
            <mesh key={`v-glow-${li}`} position={[lx, 1.2 - (li % 2) * 0.35, 0.065]}>
              <cylinderGeometry args={[0.014, 0.014, 1.6 + (li % 2) * 0.4, 12]} />
              <primitive object={materials.warmCoveLightGlow} attach="material" />
            </mesh>
          ))}

          {/* ============================================================
              WARM LIGHT KUNING: COVE LIGHTING ON INNER REVEAL OF LAYER 2
              ============================================================ */}
          {/* Top Cove Strip */}
          <mesh position={[0, 2.35, 0.05]}>
            <boxGeometry args={[8.4, 0.035, 0.035]} />
            <primitive object={materials.warmCoveLightGlow} attach="material" />
          </mesh>
          {/* Bottom Cove Strip */}
          <mesh position={[0, -2.35, 0.05]}>
            <boxGeometry args={[8.4, 0.035, 0.035]} />
            <primitive object={materials.warmCoveLightGlow} attach="material" />
          </mesh>
          {/* Left Cove Strip */}
          <mesh position={[-4.1, 0, 0.05]}>
            <boxGeometry args={[0.035, 4.7, 0.035]} />
            <primitive object={materials.warmCoveLightGlow} attach="material" />
          </mesh>
          {/* Right Cove Strip */}
          <mesh position={[4.1, 0, 0.05]}>
            <boxGeometry args={[0.035, 4.7, 0.035]} />
            <primitive object={materials.warmCoveLightGlow} attach="material" />
          </mesh>

          {/* Architectural Cove Lighting is provided softly and uniformly
              by the emissive cove channels and indirect back-glow mesh,
              completely removing harsh localized point-light flare hotspots */}

          {/* ============================================================
              LAYER 3: POLISHED IVORY GRANITE RECTANGULAR MONOLITH
              "kalau layer2 persegi panjang, layer 3 juga dibuat sama, bedanya nanti ada gap diantara mereka"
              Layer 2: 9.0m x 5.2m
              Layer 3: 7.8m x 4.2m (Uniform 60cm lateral reveal & 50cm vertical reveal gap!)
              ============================================================ */}
          <group position={[0, 0, 0.12]}>
            {/* Architectural Indirect Cove Backlight behind Layer 3 */}
            <mesh position={[0, 0, -0.015]}>
              <boxGeometry args={[7.84, 4.24, 0.02]} />
              <meshStandardMaterial
                color="#ffecc7"
                emissive="#ffb74d"
                emissiveIntensity={2.2}
                roughness={0.4}
              />
            </mesh>

            {/* Gilded Bevel Perimeter Trim for Granite Slab */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[7.86, 4.26, 0.055]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>

            {/* Main Pure Ivory Granite Slab (Matte Honed, Zero specular glare) */}
            <mesh position={[0, 0, 0.015]} castShadow receiveShadow>
              <boxGeometry args={[7.8, 4.2, 0.05]} />
              <primitive object={materials.ivoryGraniteMaterial} attach="material" />
            </mesh>

            {/* ============================================================
                ON LAYER 3:
                1. PROMINENT OFFICIAL UNDIP SHIELD LOGO (Perfectly Centered, Clean Shield Face)
                2. PURE BLUE NAVY TYPOGRAPHY: "UNIVERSITAS DIPONEGORO" (Wide, Uncropped, No background boxes!)
                ============================================================ */}

            {/* 1. OFFICIAL UNDIP SHIELD LOGO (CENTERED & MATTE DIFFUSE) */}
            <mesh position={[0, 0.65, 0.045]}>
              <planeGeometry args={[1.65, 1.95]} />
              <meshStandardMaterial
                map={officialLogoTexture}
                transparent
                roughness={0.88}
                metalness={0.0}
              />
            </mesh>

            {/* 2. GRAND ARCHITECTURAL TYPOGRAPHY: "UNIVERSITAS DIPONEGORO" (MATTE NAVY) */}
            <mesh position={[0, -0.92, 0.045]}>
              <planeGeometry args={[6.6, 1.65]} />
              <meshStandardMaterial
                map={wallTitleTexture}
                transparent
                roughness={0.88}
                metalness={0.0}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* ============================================================
          MODERN ARCHITECTURAL LED RING PENDANT CHANDELIER
          Suspended gracefully from the ceiling above the stage dais
          ============================================================ */}
      <LedRingPendantChandelier position={[0, 4.8, 0.4]} />

      {/* ============================================================
          5. STAGE DAIS & CEREMONIAL PODIUM
          ============================================================ */}
      <group
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover('podium')
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(null)
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        {/* Tier 1 Stage Platform */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.6, 0.2, 3.6]} />
          <primitive object={materials.teakWood} attach="material" />
        </mesh>
        <mesh position={[0, 0.19, 1.8]}>
          <boxGeometry args={[5.64, 0.02, 0.04]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Tier 2 Stage Platform (Pure Dark Teak Carved Wood - Clean surface without carpet) */}
        <mesh position={[0, 0.26, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.16, 2.8]} />
          <primitive object={materials.darkTeakCarved} attach="material" />
        </mesh>
        <mesh position={[0, 0.33, 1.2]}>
          <boxGeometry args={[4.84, 0.02, 0.04]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Ceremonial Carved Teakwood Podium Structure
            Meticulously oriented so the front face and speaker lectern console directly face the entrance doors (+Z) */}
        <group position={[0, 0.34, 0.25]}>
          {/* Base Plinth */}
          <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.1, 0.8]} />
            <primitive object={materials.darkTeakCarved} attach="material" />
          </mesh>
          <mesh position={[0, 0.105, 0]}>
            <boxGeometry args={[1.16, 0.015, 0.76]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>

          {/* Podium Column Body */}
          <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.86, 0.65]} />
            <primitive object={materials.teakWood} attach="material" />
          </mesh>

          {/* ============================================================
              FRONT FACADE (Directly facing the Grand Entrance Doors at +Z)
              Features Official UNDIP Shield Emblem, Carved Teak Frame & Gold Brass Plaque
              ============================================================ */}
          <mesh position={[0, 0.58, 0.328]}>
            <boxGeometry args={[0.84, 0.72, 0.015]} />
            <primitive object={materials.darkTeakCarved} attach="material" />
          </mesh>
          <mesh position={[0, 0.58, 0.334]}>
            <boxGeometry args={[0.82, 0.7, 0.008]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>

          {/* Official Undip Shield Emblem on Podium Front (Facing Entrance +Z) */}
          <mesh position={[0, 0.64, 0.342]}>
            <planeGeometry args={[0.38, 0.44]} />
            <meshStandardMaterial
              map={officialLogoTexture}
              transparent
              roughness={0.25}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[0, 0.34, 0.34]}>
            <boxGeometry args={[0.7, 0.07, 0.015]} />
            <primitive object={materials.goldBrass} attach="material" />
          </mesh>

          {/* ============================================================
              REAR FACADE (Facing the Speaker on the Stage Dais at -Z)
              Carved Teakwood Finish with Dual-Sided UNDIP Emblem & Gold Trim
              ============================================================ */}
          <mesh position={[0, 0.58, -0.328]}>
            <boxGeometry args={[0.84, 0.72, 0.015]} />
            <primitive object={materials.darkTeakCarved} attach="material" />
          </mesh>
          <mesh position={[0, 0.58, -0.334]}>
            <boxGeometry args={[0.82, 0.7, 0.008]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>
          <mesh position={[0, 0.64, -0.342]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.38, 0.44]} />
            <meshStandardMaterial
              map={officialLogoTexture}
              transparent
              roughness={0.25}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[0, 0.34, -0.34]}>
            <boxGeometry args={[0.7, 0.07, 0.015]} />
            <primitive object={materials.goldBrass} attach="material" />
          </mesh>

          {/* Left & Right Side Carved Teak Moldings with Gold Borders */}
          {[-0.506, 0.506].map((sx, si) => (
            <group key={`side-frame-${si}`} position={[sx, 0.58, 0]}>
              <mesh>
                <boxGeometry args={[0.012, 0.7, 0.48]} />
                <primitive object={materials.darkTeakCarved} attach="material" />
              </mesh>
              <mesh position={[sx < 0 ? -0.004 : 0.004, 0, 0]}>
                <boxGeometry args={[0.006, 0.68, 0.46]} />
                <primitive object={materials.goldTrim} attach="material" />
              </mesh>
            </group>
          ))}

          {/* ============================================================
              SLANTED READING DESK & SPEAKER LECTERN CONSOLE
              Angled so a speaker standing at -Z looks forward facing the entrance (+Z).
              Slopes down towards the speaker with document rail and microphone curving back.
              Front has an elevated decorative teak baffle shielding speaker notes from audience.
              ============================================================ */}
          <group position={[0, 1.05, 0]} rotation={[-0.22, 0, 0]}>
            {/* Main Carved Teak Desk Slab */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.12, 0.08, 0.75]} />
              <primitive object={materials.darkTeakCarved} attach="material" />
            </mesh>

            {/* Raised Front Baffle / Lip (Elevated at +Z facing audience/entrance) */}
            <mesh position={[0, 0.065, 0.365]}>
              <boxGeometry args={[1.14, 0.06, 0.024]} />
              <primitive object={materials.darkTeakCarved} attach="material" />
            </mesh>
            <mesh position={[0, 0.096, 0.365]}>
              <boxGeometry args={[1.14, 0.01, 0.028]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>

            {/* Inset Leather Desk Blotter */}
            <mesh position={[0, 0.042, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.96, 0.6]} />
              <primitive object={materials.leatherBlotter} attach="material" />
            </mesh>

            {/* Document Retaining Rail (Lower edge at -Z near the speaker) */}
            <mesh position={[0, 0.055, -0.34]}>
              <boxGeometry args={[1.0, 0.03, 0.03]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>

            {/* Diplomatic Address Parchment Scroll (Facing speaker reading position) */}
            <mesh position={[0, 0.045, -0.04]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.38, 0.48]} />
              <primitive object={materials.parchment} attach="material" />
            </mesh>

            {/* Condenser Studio Gooseneck Microphone (Curving towards speaker at -Z) */}
            <group position={[0.26, 0.05, 0.16]}>
              {/* Heavy Gilded Microphone Mount */}
              <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.05, 0.025, 16]} />
                <primitive object={materials.goldTrim} attach="material" />
              </mesh>
              {/* Flexible Chrome Gooseneck Stem (Curving towards speaker at -Z) */}
              <mesh position={[0, 0.16, -0.05]} rotation={[-0.3, 0, 0]} castShadow>
                <cylinderGeometry args={[0.009, 0.009, 0.3, 10]} />
                <primitive object={materials.microphoneChrome} attach="material" />
              </mesh>
              {/* Professional Condenser Capsule & Acoustic Foam Pop Filter */}
              <group position={[0, 0.32, -0.12]} rotation={[-0.4, 0, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.018, 0.018, 0.08, 16]} />
                  <primitive object={materials.microphoneChrome} attach="material" />
                </mesh>
                <mesh position={[0, 0.04, 0]}>
                  <sphereGeometry args={[0.018, 16, 16]} />
                  <primitive object={materials.microphoneChrome} attach="material" />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* ============================================================
            6. MONUMENTAL PRASASTI PENDIRIAN & PERESMIAN UNDIP (LEFT FLANK)
            ============================================================ */}
        <group
          position={[-4.0, 0, -1.8]}
          onPointerOver={(e) => {
            e.stopPropagation()
            onHover('prasasti')
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            onHover(null)
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (onSelectPrasasti) {
              onSelectPrasasti()
            }
          }}
        >
          {/* Carved Teakwood Monument Base */}
          <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.75, 0.28, 1.35]} />
            <primitive object={materials.teakWood} attach="material" />
          </mesh>
          <mesh position={[0, 0.285, 0]}>
            <boxGeometry args={[1.7, 0.02, 1.3]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>

          {/* Stepped Pedestal Tier 2 */}
          <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.3, 1.1]} />
            <primitive object={materials.darkTeakCarved} attach="material" />
          </mesh>

          {/* Slanted Polished Black Granite Inscription Slab */}
          <group position={[0, 0.72, -0.05]} rotation={[-0.42, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.42, 0.12, 1.08]} />
              <primitive object={materials.blackGranite} attach="material" />
            </mesh>

            <mesh position={[0, 0.065, 0]}>
              <boxGeometry args={[1.44, 0.02, 1.1]} />
              <primitive object={materials.goldBright} attach="material" />
            </mesh>

            <mesh position={[0, 0.066, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.36, 1.02]} />
              <meshStandardMaterial
                map={prasastiTexture}
                roughness={0.25}
                metalness={0.65}
              />
            </mesh>

            {/* Corner Gilded Brass Brackets */}
            {[-0.64, 0.64].map((bx, bi) =>
              [-0.48, 0.48].map((bz, bzi) => (
                <mesh key={`brk-${bi}-${bzi}`} position={[bx, 0.075, bz]} castShadow>
                  <boxGeometry args={[0.06, 0.03, 0.06]} />
                  <primitive object={materials.goldBright} attach="material" />
                </mesh>
              )),
            )}
          </group>
        </group>

        {/* ============================================================
            7. NATURALLY WAVING CEREMONIAL FLAGS (RIGHT FLANK)
            Symmetrically placed opposite Prasasti.
            "hapus kuningan di depan palang tiang bendera" -> Clean teakwood base without brass faceplates.
            ============================================================ */}
        <group position={[4.0, 0, -1.8]}>
          {/* Polished Teakwood Stand (Clean architectural timber, no clashing brass front) */}
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.9, 0.16, 0.7]} />
            <primitive object={materials.teakWood} attach="material" />
          </mesh>
          <mesh position={[0, 0.162, 0]} receiveShadow>
            <boxGeometry args={[1.84, 0.015, 0.64]} />
            <primitive object={materials.darkTeakCarved} attach="material" />
          </mesh>

          {/* Recessed Brass Sockets for flagpoles */}
          {[-0.45, 0.45].map((sx, si) => (
            <mesh key={si} position={[sx, 0.18, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.065, 0.06, 16]} />
              <primitive object={materials.goldBrass} attach="material" />
            </mesh>
          ))}

          {/* 7A. BENDERA MERAH PUTIH */}
          <group position={[-0.45, 0.18, 0]}>
            {/* Brass Flagpole */}
            <mesh position={[0, 1.8, 0]} castShadow>
              <cylinderGeometry args={[0.022, 0.022, 3.6, 16]} />
              <primitive object={materials.goldBrass} attach="material" />
            </mesh>
            <mesh position={[0, 3.65, 0]}>
              <coneGeometry args={[0.055, 0.18, 12]} />
              <primitive object={materials.goldBrass} attach="material" />
            </mesh>
            {/* Static Curved Fabric Mesh */}
            <StaticCurvedFlag
              position={[0.54, 2.7, 0]}
              width={1.08}
              height={0.72}
              texture={indoFlagTexture}
            />
          </group>

          {/* 7B. BENDERA PATAKA UNDIP */}
          <group position={[0.45, 0.18, 0]}>
            {/* Brass Flagpole */}
            <mesh position={[0, 1.8, 0]} castShadow>
              <cylinderGeometry args={[0.022, 0.022, 3.6, 16]} />
              <primitive object={materials.goldBrass} attach="material" />
            </mesh>
            <mesh position={[0, 3.65, 0]}>
              <coneGeometry args={[0.055, 0.18, 12]} />
              <primitive object={materials.goldBrass} attach="material" />
            </mesh>
            {/* Static Curved Fabric Mesh */}
            <StaticCurvedFlag
              position={[0.54, 2.7, 0]}
              width={1.08}
              height={0.72}
              texture={undipFlagTexture}
            />
          </group>
        </group>
      </group>
    </group>
  </CulledEntity>
  )
})
