import type { GalleryWallsProps, Portrait } from './types'
import { FIRST_Z, FRAME_Y, SPACING, WALL_X } from './layout'
import { PortraitFrame } from './PortraitFrame'

/** Places portraits evenly along the left and right corridor walls. */
export function GalleryWalls({
  portraits,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: GalleryWallsProps) {
  const half = Math.ceil(portraits.length / 2)
  const left = portraits.slice(0, half)
  const right = portraits.slice(half)

  const place = (index: number, side: 'left' | 'right'): [number, number, number] => [
    side === 'left' ? -WALL_X : WALL_X,
    FRAME_Y,
    FIRST_Z - index * SPACING,
  ]

  const frameProps = (id: string) => ({
    isSelected: selectedId === id,
    isHovered: hoveredId === id,
    onSelect,
    onHover,
  })

  return (
    <group>
      {left.map((portrait: Portrait, index: number) => (
        <PortraitFrame
          key={portrait.id}
          portrait={portrait}
          position={place(index, 'left')}
          rotationY={Math.PI / 2}
          {...frameProps(portrait.id)}
        />
      ))}
      {right.map((portrait: Portrait, index: number) => (
        <PortraitFrame
          key={portrait.id}
          portrait={portrait}
          position={place(index, 'right')}
          rotationY={-Math.PI / 2}
          {...frameProps(portrait.id)}
        />
      ))}
    </group>
  )
}
