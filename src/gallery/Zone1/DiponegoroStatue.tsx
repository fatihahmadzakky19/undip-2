import { useMemo } from 'react'
import * as THREE from 'three'
import type { StatueProps } from './types'
import { assetCache } from './cache'

/**
 * 3D Monumental Statue: Pangeran Diponegoro on White Horse (Kuda Putih)
 * Arranged neatly in the back corner of the grand hall with an expanded, spacious plaza,
 * polished brass stanchion posts, and royal velvet cords.
 */
export function DiponegoroStatue({
  position,
  rotationY = 0,
  isSelected = false,
  isHovered = false,
  onSelect,
  onHover,
}: StatueProps) {
  const materials = useMemo(() => {
    return {
      // 1. Pure White Horse Material (Alabaster / White Marble with smooth pearlescent sheen)
      whiteHorse: assetCache.getMaterial(
        'statue-white-horse',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#f8fafc',
            roughness: 0.3,
            metalness: 0.08,
          }),
      ),
      whiteMane: assetCache.getMaterial(
        'statue-white-mane',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            roughness: 0.42,
            metalness: 0.04,
          }),
      ),
      // 2. Diponegoro White Royal Robe & White Sorban
      heroWhiteRobe: assetCache.getMaterial(
        'statue-hero-white-robe',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#f7f6f2',
            roughness: 0.45,
            metalness: 0.06,
          }),
      ),
      heroSorban: assetCache.getMaterial(
        'statue-hero-sorban',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            roughness: 0.4,
          }),
      ),
      // 3. Gold Trims & Keris Pusaka
      goldAccent: assetCache.getMaterial(
        'statue-gold',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#d4af37',
            roughness: 0.25,
            metalness: 0.88,
          }),
      ),
      goldBright: assetCache.getMaterial(
        'statue-gold-bright',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffd700',
            roughness: 0.2,
            metalness: 0.92,
          }),
      ),
      // 4. White Marble Plinth & Teakwood Base
      marblePlinth: assetCache.getMaterial(
        'statue-marble-white',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#f4f0e8',
            roughness: 0.38,
            metalness: 0.08,
          }),
      ),
      teakBase: assetCache.getMaterial(
        'statue-teak',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#3d2516',
            roughness: 0.5,
          }),
      ),
      darkTeak: assetCache.getMaterial(
        'statue-dark-teak',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#24150c',
            roughness: 0.52,
          }),
      ),
      navyPlate: assetCache.getMaterial(
        'statue-navy-vibrant',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#142e56',
            roughness: 0.35,
            metalness: 0.2,
          }),
      ),
      navyVelvet: assetCache.getMaterial(
        'statue-navy-velvet',
        () =>
          new THREE.MeshStandardMaterial({
            color: '#122a4d',
            roughness: 0.85,
          }),
      ),
    }
  }, [])

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover?.('statue')
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHover?.(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect?.()
      }}
    >
      {/* ============================================================
          1. EXPANDED CORNER PLAZA SANCTUARY (LEBAR & TERTATA RAPI DI POJOKAN)
          Widened multi-tier plaza platform (3.4m x 3.8m)
          ============================================================ */}
      {/* Tier 1 Ground Foundation (Carved Dark Teak with Gold Edge) */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.16, 3.8]} />
        <primitive object={materials.teakBase} attach="material" />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[3.34, 0.02, 3.74]} />
        <primitive object={materials.goldAccent} attach="material" />
      </mesh>

      {/* Tier 2 Polished Crema Marfil Marble Plaza Deck */}
      <mesh position={[0, 0.27, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.1, 0.18, 3.5]} />
        <primitive object={materials.marblePlinth} attach="material" />
      </mesh>
      <mesh position={[0, 0.365, 0]}>
        <boxGeometry args={[3.04, 0.015, 3.44]} />
        <primitive object={materials.goldAccent} attach="material" />
      </mesh>

      {/* Polished Brass Stanchion Barrier Posts & Royal Velvet Ropes Around the Corner Plaza */}
      {[
        [-1.45, -1.6],
        [1.45, -1.6],
        [-1.45, 1.6],
        [1.45, 1.6],
        [-1.45, 0],
        [1.45, 0],
      ].map(([sx, sz], si) => (
        <group key={`post-${si}`} position={[sx, 0.36, sz]}>
          {/* Heavy Brass Base */}
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.11, 0.04, 16]} />
            <primitive object={materials.goldAccent} attach="material" />
          </mesh>
          {/* Polished Brass Stem */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <cylinderGeometry args={[0.022, 0.022, 0.8, 14]} />
            <primitive object={materials.goldAccent} attach="material" />
          </mesh>
          {/* Crown Spherical Finial */}
          <mesh position={[0, 0.84, 0]} castShadow>
            <sphereGeometry args={[0.045, 16, 16]} />
            <primitive object={materials.goldBright} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Velvet Cordon Ropes between posts */}
      {/* Front cross cordon */}
      <mesh position={[0, 1.05, 1.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 2.8, 12]} />
        <primitive object={materials.navyVelvet} attach="material" />
      </mesh>
      {/* Left side cordon */}
      <mesh position={[-1.45, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 3.1, 12]} />
        <primitive object={materials.navyVelvet} attach="material" />
      </mesh>
      {/* Right side cordon */}
      <mesh position={[1.45, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 3.1, 12]} />
        <primitive object={materials.navyVelvet} attach="material" />
      </mesh>

      {/* ============================================================
          2. WIDE MARBLE & TEAK MONUMENT PEDESTAL BODY
          ============================================================ */}
      {/* Pedestal Plinth Base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.22, 2.9]} />
        <primitive object={materials.darkTeak} attach="material" />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[2.24, 0.02, 2.84]} />
        <primitive object={materials.goldAccent} attach="material" />
      </mesh>

      {/* Main Pedestal White Marble Shaft */}
      <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 1.02, 2.6]} />
        <primitive object={materials.marblePlinth} attach="material" />
      </mesh>

      {/* Royal Navy & Gold Inscription Plaque on Pedestal Front */}
      <group position={[0, 1.15, 1.32]}>
        {/* Navy Blue Inset Board */}
        <mesh castShadow>
          <boxGeometry args={[1.65, 0.54, 0.03]} />
          <primitive object={materials.navyPlate} attach="material" />
        </mesh>
        {/* Gold Outer Molding Frame */}
        <mesh position={[0, 0, 0.018]}>
          <boxGeometry args={[1.7, 0.58, 0.01]} />
          <primitive object={materials.goldAccent} attach="material" />
        </mesh>
        {/* Gold Emblem Crest */}
        <mesh position={[0, 0.12, 0.025]}>
          <circleGeometry args={[0.08, 24]} />
          <primitive object={materials.goldBright} attach="material" />
        </mesh>
        {/* Inscription Accent Bars */}
        <mesh position={[0, -0.06, 0.025]}>
          <boxGeometry args={[1.35, 0.03, 0.01]} />
          <primitive object={materials.goldBright} attach="material" />
        </mesh>
        <mesh position={[0, -0.15, 0.025]}>
          <boxGeometry args={[1.05, 0.02, 0.01]} />
          <primitive object={materials.goldAccent} attach="material" />
        </mesh>
      </group>

      {/* Pedestal Top Lip with Gold Cornice */}
      <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.15, 0.08, 2.75]} />
        <primitive object={materials.darkTeak} attach="material" />
      </mesh>
      <mesh position={[0, 1.745, 0]}>
        <boxGeometry args={[2.2, 0.018, 2.8]} />
        <primitive object={materials.goldAccent} attach="material" />
      </mesh>

      {/* ============================================================
          3. SCULPTURE: PANGERAN DIPONEGORO DENGAN KUDA PUTIH
          (The Heroic Prince Diponegoro on His Iconic White Rearing Steed)
          ============================================================ */}
      <group position={[0, 1.76, 0]}>
        {/* Sculpture Base Plinth Plate in Polished White Marble & Gold */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[1.5, 0.09, 2.2]} />
          <primitive object={materials.marblePlinth} attach="material" />
        </mesh>
        <mesh position={[0, 0.105, 0]}>
          <boxGeometry args={[1.54, 0.02, 2.24]} />
          <primitive object={materials.goldAccent} attach="material" />
        </mesh>

        {/* --- 3A. THE MAJESTIC WHITE HORSE (KUDA PUTIH) --- */}
        {/* Main Torso (Angled upward in rearing stance) */}
        <mesh position={[0, 0.95, -0.1]} rotation={[-0.55, 0, 0]} castShadow>
          <boxGeometry args={[0.56, 0.68, 1.25]} />
          <primitive object={materials.whiteHorse} attach="material" />
        </mesh>

        {/* Horse Chest & Neck (Rising high into the air) */}
        <mesh position={[0, 1.48, 0.38]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.46, 0.78, 0.52]} />
          <primitive object={materials.whiteHorse} attach="material" />
        </mesh>

        {/* Pure White Flowing Mane on Neck */}
        <mesh position={[0, 1.62, 0.22]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.12, 0.75, 0.18]} />
          <primitive object={materials.whiteMane} attach="material" />
        </mesh>

        {/* White Horse Head with alert ears */}
        <group position={[0, 1.95, 0.56]} rotation={[0.2, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.34, 0.55]} />
            <primitive object={materials.whiteHorse} attach="material" />
          </mesh>
          {/* Muzzle */}
          <mesh position={[0, -0.09, 0.3]} castShadow>
            <boxGeometry args={[0.23, 0.22, 0.26]} />
            <primitive object={materials.whiteHorse} attach="material" />
          </mesh>
          {/* White Alert Ears */}
          {[-0.1, 0.1].map((ex, ei) => (
            <mesh
              key={ei}
              position={[ex, 0.24, -0.1]}
              rotation={[-0.2, 0, ei === 0 ? -0.2 : 0.2]}
              castShadow
            >
              <coneGeometry args={[0.045, 0.15, 8]} />
              <primitive object={materials.whiteMane} attach="material" />
            </mesh>
          ))}

          {/* Royal Golden Bridle & Bit */}
          <mesh position={[0, -0.02, 0.16]}>
            <torusGeometry args={[0.16, 0.016, 8, 20]} />
            <primitive object={materials.goldBright} attach="material" />
          </mesh>
        </group>

        {/* Front Legs (Rearing into the air with Gold Horseshoes) */}
        {/* Left Front Leg (Raised high) */}
        <group position={[-0.24, 1.38, 0.32]} rotation={[0.7, 0, -0.15]}>
          <mesh position={[0, -0.26, 0]} castShadow>
            <cylinderGeometry args={[0.075, 0.065, 0.52, 12]} />
            <primitive object={materials.whiteHorse} attach="material" />
          </mesh>
          <mesh position={[0, -0.64, 0.14]} rotation={[-0.8, 0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.048, 0.48, 12]} />
            <primitive object={materials.whiteHorse} attach="material" />
          </mesh>
          {/* Gleaming Gold Horseshoe */}
          <mesh position={[0, -0.9, 0.28]} castShadow>
            <cylinderGeometry args={[0.058, 0.07, 0.09, 12]} />
            <primitive object={materials.goldBright} attach="material" />
          </mesh>
        </group>

        {/* Right Front Leg (Bent in gallop) */}
        <group position={[0.24, 1.48, 0.22]} rotation={[0.9, 0, 0.15]}>
          <mesh position={[0, -0.24, 0]} castShadow>
            <cylinderGeometry args={[0.075, 0.065, 0.48, 12]} />
            <primitive object={materials.whiteHorse} attach="material" />
          </mesh>
          <mesh position={[0, -0.54, 0.18]} rotation={[-1.1, 0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.048, 0.45, 12]} />
            <primitive object={materials.whiteHorse} attach="material" />
          </mesh>
          {/* Gleaming Gold Horseshoe */}
          <mesh position={[0, -0.78, 0.32]} castShadow>
            <cylinderGeometry args={[0.058, 0.07, 0.09, 12]} />
            <primitive object={materials.goldBright} attach="material" />
          </mesh>
        </group>

        {/* Hind Legs (Firmly planted on the marble plinth) */}
        {[-0.24, 0.24].map((hx, hi) => (
          <group key={hi} position={[hx, 0.6, -0.6]}>
            <mesh position={[0, -0.06, 0]} rotation={[-0.3, 0, 0]} castShadow>
              <cylinderGeometry args={[0.11, 0.085, 0.58, 12]} />
              <primitive object={materials.whiteHorse} attach="material" />
            </mesh>
            <mesh position={[0, -0.42, 0]} rotation={[0.2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.075, 0.065, 0.52, 12]} />
              <primitive object={materials.whiteHorse} attach="material" />
            </mesh>
            <mesh position={[0, -0.64, 0]} castShadow>
              <cylinderGeometry args={[0.075, 0.088, 0.11, 12]} />
              <primitive object={materials.goldAccent} attach="material" />
            </mesh>
          </group>
        ))}

        {/* Flowing Pure White Horse Tail */}
        <mesh position={[0, 0.72, -0.92]} rotation={[0.42, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.035, 0.85, 12]} />
          <primitive object={materials.whiteMane} attach="material" />
        </mesh>

        {/* --- 3B. PANGERAN DIPONEGORO IN NOBLE WHITE WARRIOR ROBE --- */}
        <group position={[0, 1.36, -0.08]}>
          {/* Royal Navy Blue Saddlecloth with Gold Embroidered Border */}
          <mesh position={[0, -0.08, 0]} castShadow>
            <boxGeometry args={[0.62, 0.15, 0.68]} />
            <primitive object={materials.navyVelvet} attach="material" />
          </mesh>
          <mesh position={[0, -0.075, 0]}>
            <boxGeometry args={[0.64, 0.03, 0.7]} />
            <primitive object={materials.goldAccent} attach="material" />
          </mesh>

          {/* Torso & Flowing White Javanese Warrior Robe (Jubah Putih) */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[0.5, 0.66, 0.36]} />
            <primitive object={materials.heroWhiteRobe} attach="material" />
          </mesh>

          {/* Royal Golden Sash across the Chest */}
          <mesh position={[0, 0.44, 0.19]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.08, 0.62, 0.02]} />
            <primitive object={materials.goldBright} attach="material" />
          </mesh>

          {/* White Legs astride the White Horse */}
          {[-0.3, 0.3].map((lx, li) => (
            <mesh
              key={li}
              position={[lx, 0.05, 0.05]}
              rotation={[0.5, 0, li === 0 ? -0.2 : 0.2]}
              castShadow
            >
              <boxGeometry args={[0.16, 0.58, 0.24]} />
              <primitive object={materials.heroWhiteRobe} attach="material" />
            </mesh>
          ))}

          {/* Head & Iconic White Sorban Diponegoro */}
          <group position={[0, 0.88, 0.04]}>
            <mesh castShadow>
              <sphereGeometry args={[0.15, 16, 16]} />
              <primitive object={materials.heroWhiteRobe} attach="material" />
            </mesh>
            {/* White Turban Wrap (Sorban Putih Diponegoro) */}
            <mesh position={[0, 0.07, 0]} castShadow>
              <torusGeometry args={[0.16, 0.07, 14, 28]} />
              <primitive object={materials.heroSorban} attach="material" />
            </mesh>
            {/* Gold Turban Pinnacle Crest */}
            <mesh position={[0, 0.18, -0.03]} castShadow>
              <coneGeometry args={[0.075, 0.14, 12]} />
              <primitive object={materials.goldBright} attach="material" />
            </mesh>
          </group>

          {/* Right Arm: Raised Forward Brandishing the Sacred Golden Keris */}
          <group position={[0.28, 0.56, 0.09]} rotation={[0.82, 0.32, 0.38]}>
            <mesh position={[0, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.048, 0.45, 10]} />
              <primitive object={materials.heroWhiteRobe} attach="material" />
            </mesh>

            {/* Sacred Keris Pusaka Diponegoro in Gleaming Gold */}
            <group position={[0, 0.48, 0]} rotation={[0.2, 0, 0]}>
              {/* Keris Hilt (Hulu Keris Ukir) */}
              <mesh castShadow>
                <cylinderGeometry args={[0.022, 0.022, 0.14, 10]} />
                <primitive object={materials.goldBright} attach="material" />
              </mesh>
              {/* Wavy Luk Blade of Keris Diponegoro */}
              <mesh position={[0, 0.24, 0]} castShadow>
                <boxGeometry args={[0.028, 0.38, 0.06]} />
                <primitive object={materials.goldBright} attach="material" />
              </mesh>
            </group>
          </group>

          {/* Left Arm: Holding Gold Reins Firmly */}
          <group position={[-0.28, 0.48, 0.12]} rotation={[0.5, -0.2, -0.3]}>
            <mesh position={[0, 0.18, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.048, 0.38, 10]} />
              <primitive object={materials.heroWhiteRobe} attach="material" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Interactive Selection Highlight Ring */}
      {(isHovered || isSelected) && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.0, 2.18, 36]} />
          <meshBasicMaterial color="#f9d342" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}

/**
 * 3D Monumental "UNDIP" Acronym Typography Sculpture
 * Featuring deep Navy Blue letter bodies with Gold beveled front faces on an ivory plinth.
 */
export function UndipLogoMonument({ position, rotationY = 0 }: StatueProps) {
  const materials = useMemo(() => {
    return {
      plinthIvory: new THREE.MeshStandardMaterial({
        color: '#f7f4eb',
        roughness: 0.85,
      }),
      teakBorder: new THREE.MeshStandardMaterial({
        color: '#3d2516',
        roughness: 0.5,
      }),
      navyBlueLetters: new THREE.MeshStandardMaterial({
        color: '#0b1d3a',
        roughness: 0.35,
        metalness: 0.25,
      }),
      goldBevel: new THREE.MeshStandardMaterial({
        color: '#d4af37',
        roughness: 0.25,
        metalness: 0.88,
      }),
    }
  }, [])

  // Letter width and spacing
  const letterDepth = 0.22
  const letterHeight = 0.72

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Plinth Base */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.2, 0.9]} />
        <primitive object={materials.teakBorder} attach="material" />
      </mesh>
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[3.74, 0.02, 0.84]} />
        <primitive object={materials.goldBevel} attach="material" />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.2, 0.76]} />
        <primitive object={materials.plinthIvory} attach="material" />
      </mesh>

      {/* 3D "U N D I P" Block Letters */}
      <group position={[0, 0.42 + letterHeight / 2, 0]}>
        {/* Letter 'U' */}
        <group position={[-1.35, 0, 0]}>
          {/* Left upright */}
          <mesh position={[-0.18, 0.06, 0]} castShadow>
            <boxGeometry args={[0.13, letterHeight - 0.12, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Right upright */}
          <mesh position={[0.18, 0.06, 0]} castShadow>
            <boxGeometry args={[0.13, letterHeight - 0.12, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Bottom curve */}
          <mesh position={[0, -letterHeight / 2 + 0.09, 0]} castShadow>
            <boxGeometry args={[0.49, 0.14, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Gold Front Trim */}
          <mesh position={[0, 0, letterDepth / 2 + 0.005]}>
            <boxGeometry args={[0.49, letterHeight, 0.01]} />
            <primitive object={materials.goldBevel} attach="material" />
          </mesh>
        </group>

        {/* Letter 'N' */}
        <group position={[-0.68, 0, 0]}>
          {/* Left upright */}
          <mesh position={[-0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.13, letterHeight, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Right upright */}
          <mesh position={[0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.13, letterHeight, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Diagonal bar */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, -0.44]} castShadow>
            <boxGeometry args={[0.12, letterHeight * 1.1, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Gold Front Trim */}
          <mesh position={[0, 0, letterDepth / 2 + 0.005]}>
            <boxGeometry args={[0.49, letterHeight, 0.01]} />
            <primitive object={materials.goldBevel} attach="material" />
          </mesh>
        </group>

        {/* Letter 'D' */}
        <group position={[0, 0, 0]}>
          {/* Left vertical */}
          <mesh position={[-0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.13, letterHeight, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Top horizontal */}
          <mesh position={[0.02, letterHeight / 2 - 0.07, 0]} castShadow>
            <boxGeometry args={[0.34, 0.14, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Bottom horizontal */}
          <mesh position={[0.02, -letterHeight / 2 + 0.07, 0]} castShadow>
            <boxGeometry args={[0.34, 0.14, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Curved right vertical */}
          <mesh position={[0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.13, letterHeight - 0.22, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Gold Front Trim */}
          <mesh position={[0, 0, letterDepth / 2 + 0.005]}>
            <boxGeometry args={[0.49, letterHeight, 0.01]} />
            <primitive object={materials.goldBevel} attach="material" />
          </mesh>
        </group>

        {/* Letter 'I' */}
        <group position={[0.62, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.16, letterHeight, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Top/bottom crossbar */}
          <mesh position={[0, letterHeight / 2 - 0.05, 0]} castShadow>
            <boxGeometry args={[0.32, 0.1, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          <mesh position={[0, -letterHeight / 2 + 0.05, 0]} castShadow>
            <boxGeometry args={[0.32, 0.1, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Gold Front Trim */}
          <mesh position={[0, 0, letterDepth / 2 + 0.005]}>
            <boxGeometry args={[0.32, letterHeight, 0.01]} />
            <primitive object={materials.goldBevel} attach="material" />
          </mesh>
        </group>

        {/* Letter 'P' */}
        <group position={[1.28, 0, 0]}>
          {/* Left upright */}
          <mesh position={[-0.16, 0, 0]} castShadow>
            <boxGeometry args={[0.13, letterHeight, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Upper loop top */}
          <mesh position={[0.04, letterHeight / 2 - 0.07, 0]} castShadow>
            <boxGeometry args={[0.32, 0.14, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Upper loop mid */}
          <mesh position={[0.04, 0.05, 0]} castShadow>
            <boxGeometry args={[0.32, 0.14, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Upper loop right */}
          <mesh position={[0.18, letterHeight / 4, 0]} castShadow>
            <boxGeometry args={[0.12, letterHeight / 2, letterDepth]} />
            <primitive object={materials.navyBlueLetters} attach="material" />
          </mesh>
          {/* Gold Front Trim */}
          <mesh position={[0, 0, letterDepth / 2 + 0.005]}>
            <boxGeometry args={[0.49, letterHeight, 0.01]} />
            <primitive object={materials.goldBevel} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  )
}
