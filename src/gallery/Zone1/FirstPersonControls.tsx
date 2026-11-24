import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { FirstPersonControlsProps } from './types'
import {
  DIRECTORY_BOARD_POS,
  DIRECTORY_PROXIMITY_RADIUS,
  DRAG_SENSITIVITY,
  DRAG_THRESHOLD,
  EYE_HEIGHT,
  LOOK_SENSITIVITY,
  PITCH_LIMIT,
  PLAYER_RADIUS,
  RUN_SPEED,
  START_POSITION,
  WALK_SPEED,
  resolveMovement,
} from './layout'

const FORWARD_KEYS = new Set(['KeyW', 'ArrowUp'])
const BACKWARD_KEYS = new Set(['KeyS', 'ArrowDown'])
const LEFT_KEYS = new Set(['KeyA', 'ArrowLeft'])
const RIGHT_KEYS = new Set(['KeyD', 'ArrowRight'])
const SPRINT_KEYS = new Set(['ShiftLeft', 'ShiftRight', 'Shift'])

function hasAnyKey(activeKeys: Set<string>, targetKeys: Set<string>): boolean {
  for (const k of activeKeys) {
    if (targetKeys.has(k)) return true
  }
  return false
}

/**
 * 2D First-Person Museum Controls:
 * - Desktop: Click empty space to lock pointer, look around with mouse,
 *   WASD or arrows to walk freely (forward, backward, left strafe, right strafe), ESC to release.
 * - Touch: Drag to look around; virtual joystick to move.
 * - Quick Section Navigation: Smooth glide when a section target is triggered.
 */
export function FirstPersonControls({
  resetSignal,
  targetPosition,
  moveInputRef,
  hoveredRef,
  panelOpenRef,
  draggedRef,
  onProximityChange,
}: FirstPersonControlsProps) {
  const { camera, gl } = useThree()
  const keys = useRef(new Set<string>())
  const yaw = useRef(0)
  const pitch = useRef(0)
  const pos = useRef<[number, number, number]>([...START_POSITION])
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)
  const isNearDirectoryRef = useRef(false)

  // Keyboard Event Listeners
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Toggle pointer lock on 'KeyN' / 'n'
      if (event.code === 'KeyN' || event.key.toLowerCase() === 'n') {
        event.preventDefault()
        const element = gl.domElement
        if (document.pointerLockElement === element) {
          document.exitPointerLock()
        } else {
          try {
            const res = element.requestPointerLock() as unknown as Promise<void> | undefined
            if (res && typeof res.catch === 'function') res.catch(() => {})
          } catch {
            // pointer lock error handle
          }
        }
        return
      }

      if (
        FORWARD_KEYS.has(event.code) ||
        BACKWARD_KEYS.has(event.code) ||
        LEFT_KEYS.has(event.code) ||
        RIGHT_KEYS.has(event.code) ||
        SPRINT_KEYS.has(event.code) ||
        event.key === 'Shift'
      ) {
        event.preventDefault()
        keys.current.add(event.code)
        if (event.key === 'Shift') keys.current.add('Shift')
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      keys.current.delete(event.code)
      if (event.key === 'Shift') keys.current.delete('Shift')
    }
    const onBlur = () => {
      keys.current.clear()
    }
    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  // Pointer Look (Pointer lock on desktop, drag on touch)
  useEffect(() => {
    const element = gl.domElement

    const onPointerDown = (event: PointerEvent) => {
      draggedRef.current = false
      if (event.button !== 0) return
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
      element.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      const locked = document.pointerLockElement === element
      if (locked) {
        yaw.current -= event.movementX * LOOK_SENSITIVITY
        pitch.current = THREEClamp(pitch.current - event.movementY * LOOK_SENSITIVITY)
        return
      }
      const active = drag.current
      if (!active || active.id !== event.pointerId) return
      const dx = event.clientX - active.x
      const dy = event.clientY - active.y
      if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) draggedRef.current = true
      yaw.current -= dx * DRAG_SENSITIVITY
      pitch.current = THREEClamp(pitch.current - dy * DRAG_SENSITIVITY)
      active.x = event.clientX
      active.y = event.clientY
    }

    const onPointerUp = (event: PointerEvent) => {
      if (drag.current?.id === event.pointerId) {
        drag.current = null
        element.releasePointerCapture?.(event.pointerId)
      }
    }

    const onClick = () => {
      if (panelOpenRef.current || hoveredRef.current) return
      if (document.pointerLockElement === element) return
      if (!window.matchMedia('(pointer: fine)').matches) return
      try {
        const result = element.requestPointerLock() as unknown as Promise<void> | undefined
        if (result && typeof result.catch === 'function') result.catch(() => {})
      } catch {
        // Pointer lock fallback to drag
      }
    }

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerUp)
    element.addEventListener('pointercancel', onPointerUp)
    element.addEventListener('click', onClick)
    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', onPointerUp)
      element.removeEventListener('pointercancel', onPointerUp)
      element.removeEventListener('click', onClick)
    }
  }, [gl, panelOpenRef, hoveredRef, draggedRef])

  // Reset View Signal
  useEffect(() => {
    if (resetSignal === 0) return
    yaw.current = 0
    pitch.current = 0
    pos.current = [...START_POSITION]
    keys.current.clear()
    if (moveInputRef.current) {
      moveInputRef.current.forward = 0
      moveInputRef.current.strafe = 0
    }
    drag.current = null
    if (document.pointerLockElement) document.exitPointerLock()
  }, [resetSignal, moveInputRef])

  // Teleport / Smooth glide to target position
  useEffect(() => {
    if (!targetPosition) return
    pos.current = [targetPosition[0], targetPosition[1], targetPosition[2]]
    // If target is left wing, yaw towards left; if right, yaw towards right
    if (targetPosition[0] < -2) yaw.current = -Math.PI / 2
    else if (targetPosition[0] > 2) yaw.current = Math.PI / 2
    else yaw.current = 0
    pitch.current = 0
  }, [targetPosition])

  // Frame Loop Movement Update
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)

    // Calculate movement vector in camera local space (Zero-allocation check)
    let forward = 0
    let strafe = 0

    if (hasAnyKey(keys.current, FORWARD_KEYS)) forward += 1
    if (hasAnyKey(keys.current, BACKWARD_KEYS)) forward -= 1
    if (hasAnyKey(keys.current, RIGHT_KEYS)) strafe += 1
    if (hasAnyKey(keys.current, LEFT_KEYS)) strafe -= 1

    if (moveInputRef.current) {
      forward += moveInputRef.current.forward
      strafe += moveInputRef.current.strafe
    }

    forward = Math.max(-1, Math.min(1, forward))
    strafe = Math.max(-1, Math.min(1, strafe))

    const isSprinting =
      keys.current.has('ShiftLeft') ||
      keys.current.has('ShiftRight') ||
      keys.current.has('Shift')

    const currentSpeed = isSprinting ? RUN_SPEED : WALK_SPEED

    if (forward !== 0 || strafe !== 0) {
      // Rotate movement vector by camera yaw
      const cosY = Math.cos(yaw.current)
      const sinY = Math.sin(yaw.current)

      // Forward is along -Z in local space, Strafe is along +X in local space
      const dx = (strafe * cosY - forward * sinY) * currentSpeed * dt
      const dz = (-forward * cosY - strafe * sinY) * currentSpeed * dt

      const [newX, newZ] = resolveMovement(
        pos.current[0],
        pos.current[2],
        dx,
        dz,
        PLAYER_RADIUS,
      )
      pos.current[0] = newX
      pos.current[2] = newZ
    }

    camera.position.set(pos.current[0], EYE_HEIGHT, pos.current[2])
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')

    // Proximity check to the Directory Board
    const distToDirectory = Math.hypot(
      pos.current[0] - DIRECTORY_BOARD_POS[0],
      pos.current[2] - DIRECTORY_BOARD_POS[2],
    )
    const isNear = distToDirectory <= DIRECTORY_PROXIMITY_RADIUS
    if (isNear !== isNearDirectoryRef.current) {
      isNearDirectoryRef.current = isNear
      onProximityChange?.(isNear)
    }
  })

  return null
}

function THREEClamp(value: number): number {
  return Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, value))
}
