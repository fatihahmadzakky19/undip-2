import { useMemo } from 'react'
import type { PortraitLabelProps } from './types'
import { createLabelTexture } from './textures'

/** Ivory information label under a portrait: name, years, position. */
export function PortraitLabel({ portrait }: PortraitLabelProps) {
  const texture = useMemo(() => createLabelTexture(portrait), [portrait])

  return (
    <mesh position={[0, -1.32, -0.05]}>
      <planeGeometry args={[1.5, 0.52]} />
      <meshStandardMaterial map={texture} roughness={0.85} />
    </mesh>
  )
}
