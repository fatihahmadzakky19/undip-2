import { memo, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { HeritageBook } from '../data/books'
import { HERITAGE_BOOKS } from '../data/books'

interface WallBookshelfProps {
  position: [number, number, number]
  rotationY?: number
  length?: number // Length along wall (default 4.8m)
  categoryTitle?: string
  interactiveBookIds?: string[]
  onSelectBook?: (book: HeritageBook) => void
  onHoverBook?: (id: string | null) => void
  hoveredBookId?: string | null
}

/**
 * Low-Profile Architectural Wall Bookshelf (Heritage Library Collection)
 * Designed strictly according to the Master Specification:
 * - Positioned cleanly against the wall directly UNDER the photo frames
 * - Height: 1.05m (leaves 0.35m–0.85m clean breathing space below photo frames)
 * - Depth: 0.36m (ultra-slim against wall, keeping the 5.5m wide aisle completely open)
 * - Finish: Dark Walnut wood with Antique Gold inlays & warm shelf illumination
 * - Realistic book arrangements (vertical clusters, leaning books, horizontal stacks)
 * - Clickable interactive books with golden hover aura
 */
export const WallBookshelf = memo(function WallBookshelf({
  position,
  rotationY = 0,
  length = 4.8,
  categoryTitle = 'KOLEKSI HISTORIS PERPUSTAKAAN UNDIP',
  interactiveBookIds = [],
  onSelectBook,
  onHoverBook,
  hoveredBookId,
}: WallBookshelfProps) {
  const [internalHover, setInternalHover] = useState<string | null>(null)
  const activeHoverId = hoveredBookId !== undefined ? hoveredBookId : internalHover

  const bw = length
  const bh = 1.05 // Total height (meters)
  const bd = 0.36 // Total depth from wall (meters)
  const bays = Math.max(2, Math.round(length / 1.2)) // Number of vertical compartments

  // Dimensional parameters for the Category Nameplate
  const plateW = Math.min(bw * 0.88, 4.0)
  const plateH = 0.36 // Significantly taller board for bold, highly legible text
  const plateElevation = 0.14 // Elevated higher above the shelf mantle (raised up)

  // Find book definitions for interactive books
  const interactiveBooks = useMemo(() => {
    return interactiveBookIds
      .map((id) => HERITAGE_BOOKS.find((b) => b.id === id))
      .filter((b): b is HeritageBook => b !== undefined)
  }, [interactiveBookIds])

  // Canvas texture for luxury illuminated category nameplate with razor-sharp clarity
  const nameplateTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const canvasWidth = 4096
    const canvasHeight = Math.round(canvasWidth / (plateW / plateH))
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // 1. Prestigious Deep Royal UNDIP Navy Blue Enamel Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      bgGrad.addColorStop(0, '#0f2f5c')
      bgGrad.addColorStop(0.3, '#0b2042')
      bgGrad.addColorStop(0.7, '#07162e')
      bgGrad.addColorStop(1, '#040d1a')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // Subtle horizontal brushed sheen
      const sheenGrad = ctx.createLinearGradient(0, 0, canvasWidth, 0)
      sheenGrad.addColorStop(0, 'rgba(212, 175, 55, 0.05)')
      sheenGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.10)')
      sheenGrad.addColorStop(0.5, 'rgba(255, 235, 170, 0.20)')
      sheenGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.10)')
      sheenGrad.addColorStop(1, 'rgba(212, 175, 55, 0.05)')
      ctx.fillStyle = sheenGrad
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // 2. Multi-Tiered Gilded Antique Gold Borders
      // Outer Primary Gold Border
      ctx.strokeStyle = '#dfba45'
      ctx.lineWidth = 14
      ctx.strokeRect(16, 16, canvasWidth - 32, canvasHeight - 32)

      // Inner Fine Gold Inlay
      ctx.strokeStyle = '#fff0a8'
      ctx.lineWidth = 4
      ctx.strokeRect(34, 34, canvasWidth - 68, canvasHeight - 68)

      // Corner Ornamental Diamonds
      const drawCornerDiamond = (x: number, y: number) => {
        ctx.fillStyle = '#ffd700'
        ctx.beginPath()
        ctx.moveTo(x, y - 10)
        ctx.lineTo(x + 10, y)
        ctx.lineTo(x, y + 10)
        ctx.lineTo(x - 10, y)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
      }
      drawCornerDiamond(34, 34)
      drawCornerDiamond(canvasWidth - 34, 34)
      drawCornerDiamond(34, canvasHeight - 34)
      drawCornerDiamond(canvasWidth - 34, canvasHeight - 34)

      // Top & Bottom Gold Accent Stripes
      ctx.fillStyle = '#dfba45'
      ctx.fillRect(80, 48, canvasWidth - 160, 3)
      ctx.fillRect(80, canvasHeight - 51, canvasWidth - 160, 3)

      // 3. High-Contrast Ultra-Crisp Luminous Typography
      // Automatically sanitize and strip any "ZONA ... —" or "ZONA ... -" prefix
      const cleanTitle = categoryTitle.replace(/^ZONA\s+[\d\s&–—,-]+\s*[—–-]\s*/i, '').trim()
      const fullTitle = `✦   ${cleanTitle.toUpperCase()}   ✦`
      const maxTextW = canvasWidth - 260
      let fontSize = 140
      ctx.font = `bold ${fontSize}px "Cinzel", "Times New Roman", Georgia, serif`
      let measured = ctx.measureText(fullTitle)
      if (measured.width > maxTextW && measured.width > 0) {
        fontSize = Math.max(70, Math.floor(fontSize * (maxTextW / measured.width)))
        ctx.font = `bold ${fontSize}px "Cinzel", "Times New Roman", Georgia, serif`
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Pass 1: Crisp deep shadow for maximum legibility against background
      ctx.shadowColor = 'rgba(0, 0, 0, 0.98)'
      ctx.shadowBlur = 8
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 4
      ctx.fillStyle = '#ffffff'
      ctx.fillText(fullTitle, canvasWidth / 2, canvasHeight / 2 + 3)

      // Pass 2: Pure sharp luminous white foreground
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.fillStyle = '#ffffff'
      ctx.fillText(fullTitle, canvasWidth / 2, canvasHeight / 2 + 3)
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 16
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = true
    tex.needsUpdate = true
    return tex
  }, [categoryTitle, plateW, plateH])

  // Shared library materials
  const materials = useMemo(() => {
    return {
      darkWalnut: new THREE.MeshStandardMaterial({
        color: '#9c6239', // Coklat Kayu Jati Hangat Terang (Not dark brown) - clearly visible and warm
        roughness: 0.44,
        metalness: 0.06,
      }),
      darkWalnutCarved: new THREE.MeshStandardMaterial({
        color: '#844e2b', // Coklat medium untuk lis profil ukiran dan plinth bawah
        roughness: 0.4,
        metalness: 0.08,
      }),
      goldTrim: new THREE.MeshStandardMaterial({
        color: '#dfba45',
        roughness: 0.25,
        metalness: 0.88,
      }),
      goldAccentBright: new THREE.MeshStandardMaterial({
        color: '#ffdf4a',
        roughness: 0.2,
        metalness: 0.9,
      }),
      warmLedGlow: new THREE.MeshStandardMaterial({
        color: '#ffe7ba',
        emissive: '#d4af37',
        emissiveIntensity: 0.4,
        roughness: 0.4,
      }),
      leatherBlotter: new THREE.MeshStandardMaterial({
        color: '#284770',
        roughness: 0.6,
      }),
      // Palette of authentic, vibrant historical leather & cloth book covers
      bookNavy: new THREE.MeshStandardMaterial({ color: '#2b5d99', roughness: 0.52 }), // Royal Undip Blue
      bookBurgundy: new THREE.MeshStandardMaterial({ color: '#9e323e', roughness: 0.52 }), // Crimson Moroccan Leather
      bookGreen: new THREE.MeshStandardMaterial({ color: '#33784c', roughness: 0.52 }), // Oxford Emerald Green
      bookBrown: new THREE.MeshStandardMaterial({ color: '#8c5632', roughness: 0.55 }), // Warm Cognac Leather
      bookBlack: new THREE.MeshStandardMaterial({ color: '#4d4541', roughness: 0.58 }), // Classic Charcoal Calfskin
      bookGoldFoil: new THREE.MeshStandardMaterial({
        color: '#ffdf4a',
        roughness: 0.2,
        metalness: 0.88,
      }),
      pageEdgeIvory: new THREE.MeshStandardMaterial({
        color: '#faf4e8',
        roughness: 0.85,
      }),
    }
  }, [])

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* ============================================================
          1. MAIN ARCHITECTURAL TIMBER FRAMEWORK
          ============================================================ */}
      {/* Bottom Closed Plinth Base */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[bw, 0.16, bd]} />
        <primitive object={materials.darkWalnutCarved} attach="material" />
      </mesh>
      {/* Gold Baseboard Molding Strip */}
      <mesh position={[0, 0.162, bd / 2 - 0.01]}>
        <boxGeometry args={[bw + 0.02, 0.016, 0.02]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>

      {/* Back Wall Panel (Hugs the museum wainscot) */}
      <mesh position={[0, bh / 2, -bd / 2 + 0.015]} receiveShadow>
        <boxGeometry args={[bw - 0.06, bh, 0.03]} />
        <primitive object={materials.darkWalnut} attach="material" />
      </mesh>

      {/* Left End Column Pilaster */}
      <mesh position={[-bw / 2 + 0.03, bh / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, bh, bd]} />
        <primitive object={materials.darkWalnutCarved} attach="material" />
      </mesh>
      <mesh position={[-bw / 2 + 0.03, bh / 2, bd / 2 - 0.005]}>
        <boxGeometry args={[0.02, bh - 0.1, 0.01]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>

      {/* Right End Column Pilaster */}
      <mesh position={[bw / 2 - 0.03, bh / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, bh, bd]} />
        <primitive object={materials.darkWalnutCarved} attach="material" />
      </mesh>
      <mesh position={[bw / 2 - 0.03, bh / 2, bd / 2 - 0.005]}>
        <boxGeometry args={[0.02, bh - 0.1, 0.01]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>

      {/* Middle Vertical Compartment Dividers */}
      {Array.from({ length: bays - 1 }).map((_, i) => {
        const divX = -bw / 2 + (bw / bays) * (i + 1)
        return (
          <group key={`div-${i}`} position={[divX, bh / 2, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.045, bh - 0.16, bd - 0.04]} />
              <primitive object={materials.darkWalnut} attach="material" />
            </mesh>
            <mesh position={[0, 0, bd / 2 - 0.02]}>
              <boxGeometry args={[0.015, bh - 0.18, 0.008]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>
          </group>
        )
      })}

      {/* ============================================================
          2. HORIZONTAL SHELF TIERS & INTEGRATED LIGHTING
          ============================================================ */}
      {/* Shelf 1 (Lower Shelf Board) */}
      <mesh position={[0, 0.54, 0]} castShadow receiveShadow>
        <boxGeometry args={[bw - 0.06, 0.04, bd - 0.03]} />
        <primitive object={materials.darkWalnut} attach="material" />
      </mesh>
      <mesh position={[0, 0.54, bd / 2 - 0.015]}>
        <boxGeometry args={[bw - 0.04, 0.014, 0.01]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>
      {/* Underside Warm LED Strip for Shelf 1 */}
      <mesh position={[0, 0.518, 0]}>
        <boxGeometry args={[bw - 0.1, 0.008, 0.02]} />
        <primitive object={materials.warmLedGlow} attach="material" />
      </mesh>

      {/* Top Mantle Shelf Board */}
      <mesh position={[0, bh, 0]} castShadow receiveShadow>
        <boxGeometry args={[bw + 0.06, 0.05, bd + 0.04]} />
        <primitive object={materials.darkWalnutCarved} attach="material" />
      </mesh>
      <mesh position={[0, bh, bd / 2 + 0.015]}>
        <boxGeometry args={[bw + 0.08, 0.02, 0.012]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>
      {/* Underside Warm LED Strip for Top Shelf */}
      <mesh position={[0, bh - 0.026, 0]}>
        <boxGeometry args={[bw - 0.1, 0.008, 0.02]} />
        <primitive object={materials.warmLedGlow} attach="material" />
      </mesh>

      {/* ============================================================
          3. ILLUMINATED ROYAL NAVY & GOLD CATEGORY NAMEPLATE
          Enlarged, elevated higher, self-luminous with dedicated gallery spotlight
          ============================================================ */}
      <group position={[0, bh + plateElevation + plateH / 2, bd / 2 - 0.01]}>
        {/* Twin Architectural Brass-Trimmed Walnut Mounting Pillars anchoring to shelf */}
        {[-plateW * 0.32, plateW * 0.32].map((postX, pIdx) => (
          <group key={`nameplate-post-${pIdx}`} position={[postX, -plateH / 2 - plateElevation / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.045, plateElevation + 0.01, 0.025]} />
              <primitive object={materials.darkWalnutCarved} attach="material" />
            </mesh>
            <mesh position={[0, 0, 0.008]}>
              <boxGeometry args={[0.02, plateElevation - 0.02, 0.015]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>
          </group>
        ))}

        {/* Dark Walnut Architectural Backing Plaque */}
        <mesh position={[0, 0, -0.01]} castShadow>
          <boxGeometry args={[plateW + 0.1, plateH + 0.08, 0.025]} />
          <primitive object={materials.darkWalnutCarved} attach="material" />
        </mesh>

        {/* Antique Gold Beveled Frame Trim */}
        <mesh position={[0, 0, -0.002]} castShadow>
          <boxGeometry args={[plateW + 0.06, plateH + 0.04, 0.02]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Category Sign Face (Clear Royal Navy & Bright Gold, self-illuminated) */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[plateW, plateH]} />
          <meshStandardMaterial
            map={nameplateTexture}
            emissiveMap={nameplateTexture}
            emissive="#ffffff"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.06}
          />
        </mesh>

        {/* Dedicated Luminaire Hood / Gallery Picture Light Fixture */}
        <group position={[0, plateH / 2 + 0.09, 0.09]}>
          {/* Horizontal Polished Brass Shade Canopy */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, plateW * 0.74, 16]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>
          {/* Frosted Warm White LED Diffuser Strip */}
          <mesh position={[0, -0.012, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[plateW * 0.72, 0.012, 0.016]} />
            <meshStandardMaterial
              color="#fffcf5"
              emissive="#ffe4b5"
              emissiveIntensity={0.65}
              roughness={0.3}
            />
          </mesh>
          {/* Left & Right Brass Mounting Bracket Arms */}
          {[-plateW * 0.28, plateW * 0.28].map((armX, armIdx) => (
            <mesh key={`arm-${armIdx}`} position={[armX, -0.045, -0.05]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.13, 8]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>
          ))}
        </group>
      </group>

      {/* ============================================================
          4. CURATED BOOK COLLECTIONS (LOWER & UPPER TIERS)
          ============================================================ */}
      {Array.from({ length: bays }).map((_, bayIdx) => {
        const bayW = bw / bays
        const bayCenterX = -bw / 2 + bayW * (bayIdx + 0.5)

        return (
          <group key={`bay-books-${bayIdx}`} position={[bayCenterX, 0, 0]}>
            {/* --- Lower Shelf Books (Y = 0.18 to 0.52) --- */}
            <ShelfCluster
              shelfY={0.16}
              maxWidth={bayW - 0.1}
              bayIndex={bayIdx}
              tier={1}
              materials={materials}
              interactiveBooks={interactiveBooks}
              activeHoverId={activeHoverId}
              onSelectBook={onSelectBook}
              onHoverBook={(id) => {
                setInternalHover(id)
                onHoverBook?.(id)
              }}
            />

            {/* --- Upper Shelf Books (Y = 0.56 to 0.98) --- */}
            <ShelfCluster
              shelfY={0.56}
              maxWidth={bayW - 0.1}
              bayIndex={bayIdx}
              tier={2}
              materials={materials}
              interactiveBooks={interactiveBooks}
              activeHoverId={activeHoverId}
              onSelectBook={onSelectBook}
              onHoverBook={(id) => {
                setInternalHover(id)
                onHoverBook?.(id)
              }}
            />
          </group>
        )
      })}
    </group>
  )
})

interface ShelfClusterProps {
  shelfY: number
  maxWidth: number
  bayIndex: number
  tier: number
  materials: Record<string, THREE.Material>
  interactiveBooks: HeritageBook[]
  activeHoverId: string | null
  onSelectBook?: (book: HeritageBook) => void
  onHoverBook?: (id: string | null) => void
}

/**
 * Cluster of books populated naturally on each shelf section
 */
function ShelfCluster({
  shelfY,
  maxWidth,
  bayIndex,
  tier,
  materials,
  interactiveBooks,
  activeHoverId,
  onSelectBook,
  onHoverBook,
}: ShelfClusterProps) {
  // Generate deterministic variations for realistic shelving
  const books = useMemo(() => {
    const list: Array<{
      width: number
      height: number
      depth: number
      materialKey: string
      tiltAngle: number
      isInteractive: boolean
      interactiveData?: HeritageBook
    }> = []

    const count = Math.floor(maxWidth / 0.065) - (bayIndex % 2 === 0 ? 1 : 0) // Leave natural breathing gap
    const palette = ['bookNavy', 'bookBrown', 'bookBurgundy', 'bookGreen', 'bookBlack']

    // Distribute interactive book if available for this slot
    const assignedBookIndex = (bayIndex * 2 + tier - 1) % Math.max(1, interactiveBooks.length)
    const targetInteractiveBook = interactiveBooks[assignedBookIndex]
    const interactiveSlot = Math.floor(count / 2)

    for (let i = 0; i < count; i++) {
      const isInteractive = Boolean(targetInteractiveBook && i === interactiveSlot)
      const matKey = isInteractive
        ? 'bookNavy'
        : palette[(i + bayIndex * 3 + tier) % palette.length]

      const bWidth = 0.038 + ((i * 13) % 4) * 0.009
      const bHeight = isInteractive
        ? 0.32
        : 0.24 + ((i * 7 + tier * 5) % 5) * 0.018
      const bDepth = 0.24 + ((i * 3) % 3) * 0.015

      // Natural book tilt at end of row
      let tilt = 0
      if (i === count - 1 && bayIndex % 2 === 1) {
        tilt = 0.12 // Lean naturally against divider
      }

      list.push({
        width: bWidth,
        height: bHeight,
        depth: bDepth,
        materialKey: matKey,
        tiltAngle: tilt,
        isInteractive,
        interactiveData: isInteractive ? targetInteractiveBook : undefined,
      })
    }

    return list
  }, [maxWidth, bayIndex, tier, interactiveBooks])

  let currentX = -maxWidth / 2 + 0.04

  return (
    <group position={[0, shelfY, 0]}>
      {books.map((b, idx) => {
        const posX = currentX + b.width / 2
        currentX += b.width + 0.004

        const isHovered = b.isInteractive && b.interactiveData?.id === activeHoverId

        // High-Performance Optimization:
        // Decorative background books do not need raycast listeners or micro-submeshes
        if (!b.isInteractive) {
          return (
            <mesh
              key={`bk-${idx}`}
              position={[posX, b.height / 2, 0]}
              rotation={[0, 0, b.tiltAngle]}
            >
              <boxGeometry args={[b.width, b.height, b.depth]} />
              <primitive
                object={materials[b.materialKey] || materials.bookNavy}
                attach="material"
              />
            </mesh>
          )
        }

        // Interactive Curated Historical Volumes:
        // Full rich tactile leather details, gold spine bands, hover glowing beacon & raycasting
        return (
          <group
            key={`bk-${idx}`}
            position={[posX, b.height / 2, 0]}
            rotation={[0, 0, b.tiltAngle]}
            onPointerOver={(e) => {
              e.stopPropagation()
              if (b.interactiveData) onHoverBook?.(b.interactiveData.id)
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              onHoverBook?.(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (b.interactiveData) onSelectBook?.(b.interactiveData)
            }}
          >
            {/* Book Body */}
            <mesh>
              <boxGeometry args={[b.width, b.height, b.depth]} />
              <primitive
                object={
                  isHovered
                    ? materials.goldAccentBright
                    : materials[b.materialKey] || materials.bookNavy
                }
                attach="material"
              />
            </mesh>

            {/* Gold Foil Spine Bands */}
            {[-0.08, 0, 0.08].map((bandY, bi) => (
              <mesh key={`band-${bi}`} position={[0, bandY, b.depth / 2 + 0.001]}>
                <boxGeometry args={[b.width * 0.85, 0.006, 0.002]} />
                <primitive object={materials.bookGoldFoil} attach="material" />
              </mesh>
            ))}

            {/* Pages Edge (Top & Front edge) */}
            <mesh position={[0, b.height / 2 - 0.008, -0.01]}>
              <boxGeometry args={[b.width * 0.9, 0.004, b.depth * 0.9]} />
              <primitive object={materials.pageEdgeIvory} attach="material" />
            </mesh>

            {/* Interactive Book Glowing Beacon / Hover Indicator */}
            <group position={[0, b.height / 2 + 0.04, b.depth / 2]}>
              <mesh>
                <sphereGeometry args={[0.012, 12, 12]} />
                <meshStandardMaterial
                  color="#ffd700"
                  emissive="#ffcc00"
                  emissiveIntensity={isHovered ? 2.5 : 1.2}
                />
              </mesh>
            </group>
          </group>
        )
      })}
    </group>
  )
}
