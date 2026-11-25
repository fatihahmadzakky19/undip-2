import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  resolveZone2Collisions,
  ZONE2_START_POSITION,
  ZONE2_EYE_HEIGHT,
  ZONE2_PLAYER_RADIUS,
} from './layout'

const FORWARD_KEYS = ['KeyW', 'ArrowUp']
const BACKWARD_KEYS = ['KeyS', 'ArrowDown']
const LEFT_KEYS = ['KeyA', 'ArrowLeft']
const RIGHT_KEYS = ['KeyD', 'ArrowRight']

const BASE_WALK_SPEED = 3.6
const RUN_SPEED = 7.2
const MOUSE_SENSITIVITY = 0.0022

interface FirstPersonControlsZone2Props {
  targetPosition: [number, number, number] | null
  panelOpen: boolean
  moveInputRef?: React.MutableRefObject<{ forward: number; strafe: number }>
}

export function FirstPersonControlsZone2({
  targetPosition,
  panelOpen,
  moveInputRef,
}: FirstPersonControlsZone2Props) {
  const { camera, gl } = useThree()

  const pos = useRef<[number, number, number]>([...ZONE2_START_POSITION])
  const yaw = useRef(Math.PI) // Face towards -Z (along the gallery hall)
  const pitch = useRef(0)

  const keys = useRef<Set<string>>(new Set())
  const isLocked = useRef(false)
  const isMouseDown = useRef(false)
  const prevMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Initialize camera position
  useEffect(() => {
    camera.position.set(pos.current[0], ZONE2_EYE_HEIGHT, pos.current[2])
    camera.rotation.set(0, yaw.current, 0, 'YXZ')
  }, [camera])

  // Handle Teleport / Glide
  useEffect(() => {
    if (!targetPosition) return
    const [safeX, safeZ] = resolveZone2Collisions(targetPosition[0], targetPosition[2], ZONE2_PLAYER_RADIUS)
    pos.current = [safeX, ZONE2_EYE_HEIGHT, safeZ]
    pitch.current = 0
  }, [targetPosition])

  // Mouse & Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (panelOpen) return

      // Toggle Pointer Lock with 'N'
      if (e.code === 'KeyN') {
        if (document.pointerLockElement === gl.domElement) {
          document.exitPointerLock()
        } else {
          gl.domElement.requestPointerLock()
        }
        return
      }

      keys.current.add(e.code)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current.delete(e.code)
    }

    const handlePointerLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (panelOpen) return

      if (isLocked.current) {
        yaw.current -= e.movementX * MOUSE_SENSITIVITY
        pitch.current -= e.movementY * MOUSE_SENSITIVITY
        pitch.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch.current))
      } else if (isMouseDown.current) {
        const dx = e.clientX - prevMouse.current.x
        const dy = e.clientY - prevMouse.current.y
        prevMouse.current = { x: e.clientX, y: e.clientY }

        yaw.current -= dx * MOUSE_SENSITIVITY
        pitch.current -= dy * MOUSE_SENSITIVITY
        pitch.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch.current))
      }
    }

    const handleMouseDownEvt = (e: MouseEvent) => {
      if (panelOpen) return
      if (e.button === 0 && !isLocked.current) {
        isMouseDown.current = true
        prevMouse.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUpEvt = () => {
      isMouseDown.current = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDownEvt)
    window.addEventListener('mouseup', handleMouseUpEvt)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDownEvt)
      window.removeEventListener('mouseup', handleMouseUpEvt)
    }
  }, [gl, panelOpen])

  // Movement Frame Loop
  useFrame((_, delta) => {
    if (panelOpen) return
    const dt = Math.min(delta, 0.05)

    let forward = 0
    let strafe = 0

    if (FORWARD_KEYS.some((k) => keys.current.has(k))) forward += 1
    if (BACKWARD_KEYS.some((k) => keys.current.has(k))) forward -= 1
    if (RIGHT_KEYS.some((k) => keys.current.has(k))) strafe += 1
    if (LEFT_KEYS.some((k) => keys.current.has(k))) strafe -= 1

    if (moveInputRef?.current) {
      forward += moveInputRef.current.forward
      strafe += moveInputRef.current.strafe
    }

    forward = Math.max(-1, Math.min(1, forward))
    strafe = Math.max(-1, Math.min(1, strafe))

    const isSprinting = keys.current.has('ShiftLeft') || keys.current.has('ShiftRight')
    const speed = isSprinting ? RUN_SPEED : BASE_WALK_SPEED

    if (forward !== 0 || strafe !== 0) {
      const cosY = Math.cos(yaw.current)
      const sinY = Math.sin(yaw.current)

      // Forward is along -Z in local camera orientation
      const dx = (strafe * cosY - forward * sinY) * speed * dt
      const dz = (-forward * cosY - strafe * sinY) * speed * dt

      const targetX = pos.current[0] + dx
      const targetZ = pos.current[2] + dz

      // Slide collision resolution
      const [slideX] = resolveZone2Collisions(targetX, pos.current[2], ZONE2_PLAYER_RADIUS)
      const [, slideZ] = resolveZone2Collisions(pos.current[0], targetZ, ZONE2_PLAYER_RADIUS)
      const [finalX, finalZ] = resolveZone2Collisions(slideX, slideZ, ZONE2_PLAYER_RADIUS)

      pos.current[0] = finalX
      pos.current[2] = finalZ
    }

    camera.position.set(pos.current[0], ZONE2_EYE_HEIGHT, pos.current[2])
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')
  })

  return null
}
