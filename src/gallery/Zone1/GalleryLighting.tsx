import { memo } from 'react'

interface GalleryLightingProps {
  castShadows?: boolean
}

/**
 * Museum Virtual Undip - Unified Ambient Exhibition Lighting
 * Designed specifically for:
 * - Unified, shadow-free, crystal-clear ambient illumination across the entire hall.
 * - Perfectly even light distribution without harsh spotlight cones, shadows, or glare circles.
 * - High readability for all framed artwork, texts, and archival bookshelves.
 * - Maximum GPU efficiency with zero shadow pass overhead.
 */
export const GalleryLighting = memo(function GalleryLighting({ castShadows: _castShadows = false }: GalleryLightingProps) {
  return (
    <group>
      {/* 1. Master High-Quality Ambient Fill - Warm Ivory Museum Tone */}
      <ambientLight color="#fff9f0" intensity={0.3} />

      {/* 2. Unified Architectural Hemisphere Light - Natural diffuse bounce from floor to ceiling */}
      <hemisphereLight
        args={['#ffffff', '#eedec7', 1.05]}
      />

      {/* 3. Soft Non-Shadow Directional Illumination from Directly Overhead for Crisp Clarity */}
      <directionalLight
        position={[0, 16.0, -6.0]}
        color="#fffbf5"
        intensity={0.35}
        castShadow={false}
      />
    </group>
  )
})
