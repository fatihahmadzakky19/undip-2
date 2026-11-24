import { memo, useMemo } from 'react'
import * as THREE from 'three'
import type { HeritageBook } from '../data/books'

interface EnhancedBookshelfProps {
  position: [number, number, number]
  rotationY?: number
  categoryTitle?: string
  interactiveBook?: HeritageBook
  onSelectBook?: (book: HeritageBook) => void
  onHoverBook?: (id: string | null) => void
  hoveredBookId?: string | null
}

/**
 * Enhanced Heritage Vertical Bookcase
 * Preserves the original tall dark wood bookcase while adding:
 * - Refined warm white internal shelf downlights (solving the "too dark" issue)
 * - Classical pediment with embossed brass category title plate
 * - Antique gold moulding lines & shelf edges
 * - Realistic leather-bound book varieties with gold foil spines
 */
export const EnhancedBookshelf = memo(function EnhancedBookshelf({
  position,
  rotationY = 0,
  categoryTitle = 'HISTORICAL ARCHIVE COLLECTION',
  interactiveBook,
  onSelectBook,
  onHoverBook,
  hoveredBookId,
}: EnhancedBookshelfProps) {
  const materials = useMemo(() => {
    return {
      woodFrame: new THREE.MeshStandardMaterial({
        color: '#9c6239', // Coklat Kayu Jati Hangat Terang (Not dark brown) - clearly visible and warm
        roughness: 0.44,
        metalness: 0.06,
      }),
      woodBack: new THREE.MeshStandardMaterial({
        color: '#844e2b', // Coklat medium hangat untuk bagian belakang lemari
        roughness: 0.55,
        metalness: 0.05,
      }),
      goldTrim: new THREE.MeshStandardMaterial({
        color: '#dfba45',
        roughness: 0.25,
        metalness: 0.88,
      }),
      goldGilt: new THREE.MeshStandardMaterial({
        color: '#ffdf4a',
        roughness: 0.2,
        metalness: 0.9,
      }),
      shelfWarmGlow: new THREE.MeshStandardMaterial({
        color: '#ffeacc',
        emissive: '#d4af37',
        emissiveIntensity: 0.35,
        roughness: 0.45,
      }),
      bookSpines: [
        new THREE.MeshStandardMaterial({ color: '#9e323e', roughness: 0.52 }), // Crimson Moroccan Leather
        new THREE.MeshStandardMaterial({ color: '#2b5d99', roughness: 0.52 }), // Royal Undip Blue
        new THREE.MeshStandardMaterial({ color: '#33784c', roughness: 0.52 }), // Oxford Emerald Green
        new THREE.MeshStandardMaterial({ color: '#8c5632', roughness: 0.55 }), // Warm Cognac Leather
        new THREE.MeshStandardMaterial({ color: '#445878', roughness: 0.55 }), // Scholar Slate / Indigo
      ],
      pageEdges: new THREE.MeshStandardMaterial({
        color: '#faf4e8',
        roughness: 0.85,
      }),
    }
  }, [])

  // Canvas texture for luxury illuminated pediment plaque
  const pedimentPlateTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 4096
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // 1. Prestigious Deep Royal UNDIP Navy Blue Enamel Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 512)
      bgGrad.addColorStop(0, '#0f2f5c')
      bgGrad.addColorStop(0.3, '#0b2042')
      bgGrad.addColorStop(0.7, '#07162e')
      bgGrad.addColorStop(1, '#040d1a')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, 4096, 512)

      // Horizontal satin sheen
      const sheenGrad = ctx.createLinearGradient(0, 0, 4096, 0)
      sheenGrad.addColorStop(0, 'rgba(212, 175, 55, 0.05)')
      sheenGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.10)')
      sheenGrad.addColorStop(0.5, 'rgba(255, 235, 170, 0.20)')
      sheenGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.10)')
      sheenGrad.addColorStop(1, 'rgba(212, 175, 55, 0.05)')
      ctx.fillStyle = sheenGrad
      ctx.fillRect(0, 0, 4096, 512)

      // 2. Multi-Tiered Gilded Antique Gold Borders
      ctx.strokeStyle = '#dfba45'
      ctx.lineWidth = 14
      ctx.strokeRect(16, 16, 4064, 480)

      ctx.strokeStyle = '#fff0a8'
      ctx.lineWidth = 4
      ctx.strokeRect(34, 34, 4028, 444)

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
      drawCornerDiamond(4062, 34)
      drawCornerDiamond(34, 478)
      drawCornerDiamond(4062, 478)

      // Top & Bottom Gold Accent Stripes
      ctx.fillStyle = '#dfba45'
      ctx.fillRect(80, 52, 3936, 4)
      ctx.fillRect(80, 456, 3936, 4)

      // 3. High-Contrast Ultra-Crisp Luminous Typography
      // Automatically sanitize and strip any "ZONA ... —" or "ZONA ... -" prefix
      const cleanTitle = categoryTitle.replace(/^ZONA\s+[\d\s&–—,-]+\s*[—–-]\s*/i, '').trim()
      const fullText = `✦   ${cleanTitle.toUpperCase()}   ✦`
      const maxTextW = 3800
      let fontSize = 140
      ctx.font = `bold ${fontSize}px "Cinzel", "Times New Roman", Georgia, serif`
      let measured = ctx.measureText(fullText)
      if (measured.width > maxTextW && measured.width > 0) {
        fontSize = Math.max(70, Math.floor(fontSize * (maxTextW / measured.width)))
        ctx.font = `bold ${fontSize}px "Cinzel", "Times New Roman", Georgia, serif`
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Pass 1: Crisp deep drop shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.98)'
      ctx.shadowBlur = 8
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 5
      ctx.fillStyle = '#ffffff'
      ctx.fillText(fullText, 2048, 256 + 3)

      // Pass 2: Pure sharp luminous white foreground
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.fillStyle = '#ffffff'
      ctx.fillText(fullText, 2048, 256 + 3)
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 16
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = true
    tex.needsUpdate = true
    return tex
  }, [categoryTitle])

  const bw = 1.9 // width
  const bh = 3.6 // height
  const bd = 0.5 // depth
  const shelves = 5

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Main Outer Timber Frame */}
      {/* Left side panel */}
      <mesh position={[-bw / 2 + 0.04, bh / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, bh, bd]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>
      {/* Right side panel */}
      <mesh position={[bw / 2 - 0.04, bh / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, bh, bd]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>

      {/* Top crown cornice */}
      <mesh position={[0, bh + 0.05, 0]} castShadow>
        <boxGeometry args={[bw + 0.14, 0.12, bd + 0.1]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>
      {/* Gold crown trim */}
      <mesh position={[0, bh + 0.11, bd / 2 + 0.05]}>
        <boxGeometry args={[bw + 0.16, 0.02, 0.02]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>

      {/* Classical Archival Pediment Header - Enlarged & High-Contrast Self-Luminous Plaque */}
      <group position={[0, bh + 0.26, bd / 2 + 0.03]}>
        {/* Dark Walnut Architectural Pediment Backing */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[bw * 0.96, 0.26, 0.04]} />
          <primitive object={materials.woodFrame} attach="material" />
        </mesh>
        {/* Gilded Frame Molding */}
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[bw * 0.94, 0.24, 0.02]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>
        {/* Luminous Enamel Signboard */}
        <mesh position={[0, 0, 0.024]}>
          <planeGeometry args={[bw * 0.91, 0.21]} />
          <meshStandardMaterial
            map={pedimentPlateTexture}
            emissiveMap={pedimentPlateTexture}
            emissive="#ffffff"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.06}
          />
        </mesh>

        {/* Dedicated Luminaire Hood / Gallery Downlight for Plaque */}
        <group position={[0, 0.17, 0.08]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, bw * 0.7, 16]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>
          <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[bw * 0.68, 0.01, 0.014]} />
            <meshStandardMaterial
              color="#fffcf5"
              emissive="#ffe4b5"
              emissiveIntensity={0.6}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* Bottom base plinth */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[bw + 0.08, 0.2, bd + 0.06]} />
        <primitive object={materials.woodFrame} attach="material" />
      </mesh>
      <mesh position={[0, 0.2, bd / 2 + 0.03]}>
        <boxGeometry args={[bw + 0.1, 0.02, 0.02]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>

      {/* Backboard */}
      <mesh position={[0, bh / 2, -bd / 2 + 0.02]} receiveShadow>
        <boxGeometry args={[bw - 0.08, bh, 0.04]} />
        <primitive object={materials.woodBack} attach="material" />
      </mesh>

      {/* 2. Horizontal Shelves & Books */}
      {Array.from({ length: shelves }).map((_, i) => {
        const shelfY = 0.35 + i * ((bh - 0.6) / (shelves - 1))
        return (
          <group key={i}>
            {/* Shelf board */}
            <mesh position={[0, shelfY, 0]} castShadow receiveShadow>
              <boxGeometry args={[bw - 0.08, 0.05, bd - 0.04]} />
              <primitive object={materials.woodFrame} attach="material" />
            </mesh>
            {/* Front gold edge on each shelf */}
            <mesh position={[0, shelfY, bd / 2 - 0.02]}>
              <boxGeometry args={[bw - 0.08, 0.014, 0.012]} />
              <primitive object={materials.goldTrim} attach="material" />
            </mesh>
            {/* Subtle recessed warm shelf glow strip */}
            <mesh position={[0, shelfY - 0.026, 0]}>
              <boxGeometry args={[bw - 0.14, 0.008, 0.03]} />
              <primitive object={materials.shelfWarmGlow} attach="material" />
            </mesh>

            {/* Books clustered on this shelf */}
            {i < shelves - 1 && (
              <group position={[-bw / 2 + 0.18, shelfY + 0.025, 0]}>
                {Array.from({ length: 15 }).map((_, bIdx) => {
                  const bWidth = 0.042 + (bIdx % 4) * 0.012
                  const bHeight = 0.32 + ((bIdx * 7) % 5) * 0.025
                  const bDepth = 0.34
                  const mat = materials.bookSpines[(bIdx + i * 2) % materials.bookSpines.length]
                  const isSpecial = interactiveBook && i === 2 && bIdx === 7
                  const isHovered = isSpecial && hoveredBookId === interactiveBook.id

                  if (!isSpecial) {
                    return (
                      <mesh
                        key={bIdx}
                        position={[bIdx * 0.088, bHeight / 2, 0]}
                      >
                        <boxGeometry args={[bWidth, bHeight, bDepth]} />
                        <primitive object={mat} attach="material" />
                      </mesh>
                    )
                  }

                  return (
                    <group
                      key={bIdx}
                      position={[bIdx * 0.088, bHeight / 2, 0]}
                      onPointerOver={(e) => {
                        e.stopPropagation()
                        onHoverBook?.(interactiveBook.id)
                      }}
                      onPointerOut={(e) => {
                        e.stopPropagation()
                        onHoverBook?.(null)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectBook?.(interactiveBook)
                      }}
                    >
                      {/* Special Interactive Book spine/body */}
                      <mesh>
                        <boxGeometry args={[bWidth, bHeight, bDepth]} />
                        <primitive
                          object={isHovered ? materials.goldGilt : mat}
                          attach="material"
                        />
                      </mesh>
                      {/* Gold embossed title line on spine */}
                      <mesh position={[0, 0, bDepth / 2 + 0.002]}>
                        <boxGeometry args={[bWidth * 0.75, 0.01, 0.002]} />
                        <primitive object={materials.goldGilt} attach="material" />
                      </mesh>
                      <mesh position={[0, -0.06, bDepth / 2 + 0.002]}>
                        <boxGeometry args={[bWidth * 0.6, 0.006, 0.002]} />
                        <primitive object={materials.goldGilt} attach="material" />
                      </mesh>
                      <mesh position={[0, 0.06, bDepth / 2 + 0.002]}>
                        <boxGeometry args={[bWidth * 0.6, 0.006, 0.002]} />
                        <primitive object={materials.goldGilt} attach="material" />
                      </mesh>
                    </group>
                  )
                })}
              </group>
            )}
          </group>
        )
      })}
    </group>
  )
})
