import { useMemo } from 'react'
import * as THREE from 'three'
import type { MiniatureMapProps } from './types'
import { createCampusMiniatureTexture } from './textures'
import { assetCache } from './cache'

/**
 * 3D Miniature Map of Universitas Diponegoro (Tembalang & Pleburan Campus)
 * Situated on an ivory & heritage brown pedestal with a gold-trimmed glass vitrine.
 */
export function MiniatureMap({
  position,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: MiniatureMapProps) {
  const mapTexture = useMemo(() => createCampusMiniatureTexture(), [])

  const baseMaterials = useMemo(() => {
    return {
      heritageBase: assetCache.getMaterial(
        'mini-heritage-base',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#3d2516',
            roughness: 0.5,
            metalness: 0.15,
          }),
      ),
      ivoryBody: assetCache.getMaterial(
        'mini-ivory-body',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#f7f4eb',
            roughness: 0.85,
            metalness: 0.05,
          }),
      ),
      navyInset: assetCache.getMaterial(
        'mini-navy-inset',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#0b1d3a',
            roughness: 0.45,
            metalness: 0.2,
          }),
      ),
      goldBrass: assetCache.getMaterial(
        'mini-gold-brass',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.28,
            metalness: 0.88,
          }),
      ),
      glass: assetCache.getMaterial(
        'mini-glass-vitrine',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.32,
            roughness: 0.05,
            metalness: 0.1,
          }),
      ),
      buildingWhite: assetCache.getMaterial(
        'mini-building-white',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#e8e4dc',
            roughness: 0.6,
          }),
      ),
      widyaRoofGold: assetCache.getMaterial(
        'mini-widya-gold',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#c59f48',
            roughness: 0.35,
            metalness: 0.65,
          }),
      ),
      // Muladi Dome metallic champagne gold & glass curtain
      domeMetallic: assetCache.getMaterial(
        'mini-muladi-dome-gold',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d6be7a',
            roughness: 0.25,
            metalness: 0.85,
          }),
      ),
      domeGlass: assetCache.getMaterial(
        'mini-muladi-dome-glass',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#8ab4d6',
            roughness: 0.1,
            metalness: 0.4,
            transparent: true,
            opacity: 0.7,
          }),
      ),
      waterBlue: assetCache.getMaterial(
        'mini-water-blue',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#1a5276',
            roughness: 0.1,
            metalness: 0.4,
          }),
      ),
      terracottaTrack: assetCache.getMaterial(
        'mini-terracotta-track',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#b3472d',
            roughness: 0.8,
          }),
      ),
      treeGreen: assetCache.getMaterial(
        'mini-tree-green',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#2d5a27',
            roughness: 0.9,
          }),
      ),
    }
  }, [])

  const goldAccentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isSelected ? '#ffdf73' : isHovered ? '#f5cf65' : '#d4af37',
      emissive: isSelected ? '#d4af37' : isHovered ? '#a88020' : '#000000',
      emissiveIntensity: isSelected ? 0.35 : isHovered ? 0.2 : 0,
      roughness: 0.25,
      metalness: 0.85,
    })
  }, [isSelected, isHovered])

  const materials = {
    ...baseMaterials,
    goldAccent: goldAccentMaterial,
  }

  // Pedestal dimensions
  const pw = 2.6  // width
  const pl = 3.2  // length
  const ph = 0.82 // height

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover('miniature-map')
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
      {/* 1. Pedestal Base Floor Ring (Heritage Brown Teak) */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[pw + 0.3, 0.08, pl + 0.3]} />
        <primitive object={materials.heritageBase} attach="material" />
      </mesh>

      {/* Gold Trim above floor ring */}
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[pw + 0.26, 0.02, pl + 0.26]} />
        <primitive object={materials.goldBrass} attach="material" />
      </mesh>

      {/* 2. Main Pedestal Body (Museum Ivory) */}
      <mesh position={[0, ph / 2 + 0.09, 0]}>
        <boxGeometry args={[pw, ph, pl]} />
        <primitive object={materials.ivoryBody} attach="material" />
      </mesh>

      {/* Navy Blue Inset Decorative Panels on 4 sides */}
      {/* Front & Back Navy insets */}
      {[-1, 1].map((s) => (
        <mesh key={`fb-${s}`} position={[0, ph / 2 + 0.09, s * (pl / 2 + 0.005)]}>
          <planeGeometry args={[pw - 0.4, ph - 0.2]} />
          <primitive object={materials.navyInset} attach="material" />
        </mesh>
      ))}
      {/* Left & Right Navy insets */}
      {[-1, 1].map((s) => (
        <mesh
          key={`lr-${s}`}
          position={[s * (pw / 2 + 0.005), ph / 2 + 0.09, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry args={[pl - 0.4, ph - 0.2]} />
          <primitive object={materials.navyInset} attach="material" />
        </mesh>
      ))}

      {/* 3. Front Informative Brass Plaque */}
      <group position={[0, ph * 0.65, pl / 2 + 0.02]}>
        <mesh>
          <boxGeometry args={[1.5, 0.22, 0.02]} />
          <primitive object={materials.goldAccent} attach="material" />
        </mesh>
      </group>

      {/* 4. Pedestal Top Table Lip (Heritage Brown with Gold Rim) */}
      <mesh position={[0, ph + 0.1, 0]}>
        <boxGeometry args={[pw + 0.15, 0.05, pl + 0.15]} />
        <primitive object={materials.heritageBase} attach="material" />
      </mesh>
      <mesh position={[0, ph + 0.128, 0]}>
        <boxGeometry args={[pw + 0.18, 0.015, pl + 0.18]} />
        <primitive object={materials.goldBrass} attach="material" />
      </mesh>

      {/* 5. 3D Miniature Model Surface (Inside Vitrine) */}
      {/* Base Campus Terrain Board */}
      <mesh
        position={[0, ph + 0.14, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[pw - 0.1, pl - 0.1]} />
        <meshStandardMaterial map={mapTexture} roughness={0.7} />
      </mesh>

      {/* Miniature Campus Features in 3D */}
      <group position={[0, ph + 0.14, 0]}>
        {/* ============================================================
            1. PUSAT UTAMA: GEDUNG MULADI DOME (ICONIC MULTIPURPOSE DOME)
            Grand monumental rotunda with sweeping metallic champagne-gold dome
            ============================================================ */}
        <group position={[0, 0, 0.04]}>
          {/* Circular Terraced Entrance Plaza */}
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.38, 0.40, 0.03, 36]} />
            <primitive object={materials.ivoryBody} attach="material" />
          </mesh>
          <mesh position={[0, 0.032, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.005, 36]} />
            <primitive object={materials.goldBrass} attach="material" />
          </mesh>

          {/* Lower Drum / Glass Rotunda Facade */}
          <mesh position={[0, 0.055, 0]}>
            <cylinderGeometry args={[0.30, 0.32, 0.05, 36]} />
            <primitive object={materials.domeGlass} attach="material" />
          </mesh>

          {/* Architectural Colonnade Fins around Rotunda */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 16
            return (
              <mesh
                key={`fin-${i}`}
                position={[Math.cos(angle) * 0.31, 0.055, Math.sin(angle) * 0.31]}
              >
                <boxGeometry args={[0.012, 0.05, 0.018]} />
                <primitive object={materials.domeMetallic} attach="material" />
              </mesh>
            )
          })}

          {/* Mid-Tier Cornice Ring */}
          <mesh position={[0, 0.082, 0]}>
            <cylinderGeometry args={[0.28, 0.30, 0.012, 36]} />
            <primitive object={materials.domeMetallic} attach="material" />
          </mesh>

          {/* THE ICONIC MULADI DOME ROOF (Sweeping Champagne Gold Hemisphere) */}
          <mesh position={[0, 0.088, 0]}>
            <sphereGeometry args={[0.25, 36, 18, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <primitive object={materials.domeMetallic} attach="material" />
          </mesh>

          {/* Concentric Ribbing along the Dome */}
          <mesh position={[0, 0.16, 0]}>
            <torusGeometry args={[0.18, 0.008, 8, 36]} />
            <primitive object={materials.goldBrass} attach="material" />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <torusGeometry args={[0.11, 0.007, 8, 36]} />
            <primitive object={materials.goldBrass} attach="material" />
          </mesh>

          {/* Lantern Oculus / Spire Crown at Top of Muladi Dome */}
          <mesh position={[0, 0.34, 0]}>
            <cylinderGeometry args={[0.038, 0.045, 0.025, 16]} />
            <primitive object={materials.ivoryBody} attach="material" />
          </mesh>
          <mesh position={[0, 0.36, 0]}>
            <coneGeometry args={[0.018, 0.04, 12]} />
            <primitive object={materials.goldBrass} attach="material" />
          </mesh>

          {/* Grand Curved Entrance Canopy Portico facing South Boulevard */}
          <group position={[0, 0.035, 0.32]}>
            <mesh>
              <boxGeometry args={[0.22, 0.025, 0.12]} />
              <primitive object={materials.domeMetallic} attach="material" />
            </mesh>
            {/* Entrance Colonnade Pillars */}
            {[-0.08, -0.03, 0.03, 0.08].map((cx, ci) => (
              <mesh key={ci} position={[cx, -0.015, 0.04]}>
                <cylinderGeometry args={[0.007, 0.007, 0.03, 8]} />
                <primitive object={materials.goldBrass} attach="material" />
              </mesh>
            ))}
          </group>

          {/* Golden Lettering Plaque: "MULADI DOME" */}
          <mesh position={[0, 0.01, 0.42]}>
            <boxGeometry args={[0.24, 0.012, 0.04]} />
            <primitive object={materials.goldBrass} attach="material" />
          </mesh>
        </group>

        {/* ============================================================
            2. GEDUNG REKTORAT WIDYA PURAYA (NORTH OF MULADI DOME)
            Iconic Stepped Pyramid Pagoda / Cultural Landmark
            ============================================================ */}
        <group position={[0, 0, -0.6]}>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.42, 0.03, 0.42]} />
            <primitive object={materials.ivoryBody} attach="material" />
          </mesh>
          {/* Widya Puraya Lower Pyramid Tier */}
          <mesh position={[0, 0.065, 0]}>
            <boxGeometry args={[0.34, 0.05, 0.34]} />
            <primitive object={materials.buildingWhite} attach="material" />
          </mesh>
          {/* Mid Stepped Tier */}
          <mesh position={[0, 0.105, 0]}>
            <boxGeometry args={[0.24, 0.04, 0.24]} />
            <primitive object={materials.widyaRoofGold} attach="material" />
          </mesh>
          {/* Crown Pinnacle */}
          <mesh position={[0, 0.15, 0]}>
            <coneGeometry args={[0.11, 0.11, 4]} />
            <primitive object={materials.widyaRoofGold} attach="material" />
          </mesh>
        </group>

        {/* ============================================================
            3. GEDUNG KULIAH BERSAMA (GKB) & ICT CENTER
            ============================================================ */}
        <group position={[-0.42, 0, -0.25]}>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.22, 0.12, 0.18]} />
            <primitive object={materials.buildingWhite} attach="material" />
          </mesh>
          <mesh position={[0, 0.125, 0]}>
            <boxGeometry args={[0.2, 0.015, 0.16]} />
            <primitive object={materials.navyInset} attach="material" />
          </mesh>
        </group>

        {/* ============================================================
            4. GEDUNG SA-MWA (SENAT AKADEMIK & MAJELIS WALI AMANAT)
            ============================================================ */}
        <group position={[0.42, 0, -0.25]}>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.22, 0.1, 0.18]} />
            <primitive object={materials.buildingWhite} attach="material" />
          </mesh>
          <mesh position={[0, 0.105, 0]}>
            <boxGeometry args={[0.24, 0.015, 0.2]} />
            <primitive object={materials.widyaRoofGold} attach="material" />
          </mesh>
        </group>

        {/* ============================================================
            5. WADUK UNDIP (DIPONEGORO RESERVOIR & BRIDGE)
            ============================================================ */}
        <group position={[-0.45, 0, 0.18]}>
          <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0.3]}>
            <circleGeometry args={[0.25, 24]} />
            <primitive object={materials.waterBlue} attach="material" />
          </mesh>
          {/* Curved Bridge */}
          <mesh position={[0, 0.015, 0]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.04, 0.012, 0.35]} />
            <primitive object={materials.ivoryBody} attach="material" />
          </mesh>
        </group>

        {/* ============================================================
            6. KOMPLEKS FAKULTAS-FAKULTAS (CAMPUS HUBS)
            ============================================================ */}
        {/* Fakultas Teknik (FT) - Blue Pavilion Wings */}
        <group position={[-0.72, 0, -0.65]}>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.34, 0.08, 0.22]} />
            <primitive object={materials.buildingWhite} attach="material" />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.32, 0.015, 0.2]} />
            <primitive object={materials.navyInset} attach="material" />
          </mesh>
        </group>

        {/* Fakultas Hukum (FH) - Heritage Brown Courts */}
        <group position={[0.72, 0, -0.65]}>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.32, 0.08, 0.22]} />
            <primitive object={materials.heritageBase} attach="material" />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.3, 0.015, 0.2]} />
            <primitive object={materials.widyaRoofGold} attach="material" />
          </mesh>
        </group>

        {/* Fakultas Ekonomika dan Bisnis (FEB) */}
        <group position={[-0.72, 0, 0.62]}>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.32, 0.08, 0.24]} />
            <primitive object={materials.buildingWhite} attach="material" />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.3, 0.015, 0.22]} />
            <primitive object={materials.heritageBase} attach="material" />
          </mesh>
        </group>

        {/* Fakultas Kedokteran (FK) & RSND (Rumah Sakit Nasional Diponegoro) */}
        <group position={[0.72, 0, 0.62]}>
          <mesh position={[0, 0.065, 0]}>
            <boxGeometry args={[0.36, 0.12, 0.26]} />
            <primitive object={materials.buildingWhite} attach="material" />
          </mesh>
          {/* Hospital Emergency Cross / Heliport */}
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.01, 16]} />
            <primitive object={materials.ivoryBody} attach="material" />
          </mesh>
        </group>

        {/* FSM & FPIK */}
        <mesh position={[-0.85, 0.035, 0.05]}>
          <boxGeometry args={[0.18, 0.065, 0.28]} />
          <primitive object={materials.navyInset} attach="material" />
        </mesh>

        {/* FISIP & FIB */}
        <mesh position={[0.85, 0.035, 0.05]}>
          <boxGeometry args={[0.18, 0.065, 0.28]} />
          <primitive object={materials.heritageBase} attach="material" />
        </mesh>

        {/* Stadion Diponegoro (Athletics Track & Field) */}
        <group position={[0, 0, 0.92]}>
          {/* Running Track */}
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.22, 0.25, 0.02, 24]} />
            <primitive object={materials.terracottaTrack} attach="material" />
          </mesh>
          {/* Grass Field */}
          <mesh position={[0, 0.026, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.01, 24]} />
            <primitive object={materials.treeGreen} attach="material" />
          </mesh>
        </group>

        {/* Micro Campus Trees & Greenery */}
        {[
          [-0.24, -0.45],
          [0.24, -0.45],
          [-0.24, 0.48],
          [0.24, 0.48],
          [-0.75, 0.28],
          [0.75, 0.28],
          [-0.45, -0.75],
          [0.45, -0.75],
          [-0.2, 0.18],
          [0.2, 0.18],
        ].map(([tx, tz], ti) => (
          <mesh key={`tree-${ti}`} position={[tx, 0.038, tz]}>
            <sphereGeometry args={[0.036, 10, 10]} />
            <primitive object={materials.treeGreen} attach="material" />
          </mesh>
        ))}

        {/* Miniature Accent Spotlights Illuminating Muladi Dome & Campus */}
        <pointLight position={[0, 0.55, 0.04]} color="#fff8e6" intensity={18} distance={3.0} />
      </group>

      {/* 6. High-Clarity Glass Vitrine Case */}
      <group position={[0, ph + 0.14 + 0.35, 0]}>
        {/* Glass cube */}
        <mesh>
          <boxGeometry args={[pw - 0.08, 0.7, pl - 0.08]} />
          <primitive object={materials.glass} attach="material" />
        </mesh>

        {/* Brass Frame Ribs on Glass Corners */}
        {[-1, 1].map((sx) =>
          [-1, 1].map((sz) => (
            <mesh
              key={`post-${sx}-${sz}`}
              position={[sx * ((pw - 0.08) / 2), 0, sz * ((pl - 0.08) / 2)]}
            >
              <boxGeometry args={[0.02, 0.7, 0.02]} />
              <primitive object={materials.goldBrass} attach="material" />
            </mesh>
          )),
        )}

        {/* Top Brass Perimeter Rim */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[pw - 0.06, 0.025, pl - 0.06]} />
          <primitive object={materials.goldBrass} attach="material" />
        </mesh>
      </group>

      {/* 7. Hover / Selection Glow Indicator */}
      {(isHovered || isSelected) && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.7, 1.82, 32]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}
