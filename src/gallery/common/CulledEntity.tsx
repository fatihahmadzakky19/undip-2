import { useRef, useMemo, memo, type ReactNode } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Reusable static calculation objects to avoid any GC allocations during animation loop
const _frustum = new THREE.Frustum()
const _projScreenMatrix = new THREE.Matrix4()
const _cameraPos = new THREE.Vector3()
const _entitySphere = new THREE.Sphere()
const _entityPos = new THREE.Vector3()

let _lastFrameTime = -1

/**
 * Updates the shared global frustum and camera position cache once per frame.
 */
function updateSharedCullingCache(camera: THREE.Camera, time: number) {
  if (time === _lastFrameTime) return
  _lastFrameTime = time
  _projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
  _frustum.setFromProjectionMatrix(_projScreenMatrix)
  camera.getWorldPosition(_cameraPos)
}

export interface CulledEntityProps {
  children: ReactNode
  /** World space center position of the entity [x, y, z] */
  position?: [number, number, number]
  /** Bounding sphere radius in meters for frustum intersection test */
  radius?: number
  /** Distance threshold in meters. Beyond this, entity is culled */
  maxDistance?: number
  /** Whether to perform frustum culling (defaults to true) */
  frustumCull?: boolean
  /** Force the entity to remain visible (e.g. when hovered or selected) */
  forceVisible?: boolean
  /** Optional name for debugging */
  name?: string
}

/**
 * High-performance Entity Culling wrapper component for React Three Fiber.
 * Evaluates both Distance Culling and Frustum Culling.
 * When culled, sets group.visible = false, completely skipping draw calls,
 * vertex/fragment shaders, and raycasting for all children.
 */
export const CulledEntity = memo(function CulledEntity({
  children,
  position = [0, 0, 0],
  radius = 3.5,
  maxDistance = 35.0,
  frustumCull = true,
  forceVisible = false,
  name,
}: CulledEntityProps) {
  const groupRef = useRef<THREE.Group>(null)

  const posVec = useMemo(() => new THREE.Vector3(...position), [position[0], position[1], position[2]])
  const maxDistSq = useMemo(() => maxDistance * maxDistance, [maxDistance])
  const effectiveRadius = useMemo(() => radius + 0.6, [radius]) // Generous padding to prevent edge popping

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return

    // If externally forced to be visible (e.g. actively selected/hovered), keep it on
    if (forceVisible) {
      if (!groupRef.current.visible) groupRef.current.visible = true
      return
    }

    // Refresh shared frustum once per frame
    updateSharedCullingCache(camera, clock.getElapsedTime())

    // 1. Distance Culling Check
    _entityPos.copy(posVec)
    const distSq = _cameraPos.distanceToSquared(_entityPos)
    if (distSq > maxDistSq) {
      if (groupRef.current.visible) {
        groupRef.current.visible = false
      }
      return
    }

    // 2. Frustum Culling Check
    if (frustumCull) {
      _entitySphere.center.copy(posVec)
      _entitySphere.radius = effectiveRadius
      const inFrustum = _frustum.intersectsSphere(_entitySphere)

      if (groupRef.current.visible !== inFrustum) {
        groupRef.current.visible = inFrustum
      }
    } else {
      if (!groupRef.current.visible) {
        groupRef.current.visible = true
      }
    }
  })

  return (
    <group ref={groupRef} name={name}>
      {children}
    </group>
  )
})
