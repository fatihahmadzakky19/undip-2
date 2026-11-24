import { useRef, useState } from 'react'
import type { MobileControlsProps } from './types'

const JOYSTICK_RADIUS = 48

/**
 * Enhanced Touch Controls for Mobile:
 * - 2D Virtual joystick for walking & strafing
 * - Section navigation shortcuts
 * - Reset view button
 */
export function MobileControls({
  moveInputRef,
  visible,
  onReset,
  onTeleport,
}: MobileControlsProps) {
  const padRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(false)
  const [knob, setKnob] = useState({ x: 0, y: 0 })

  const update = (clientX: number, clientY: number) => {
    const pad = padRef.current
    if (!pad) return
    const rect = pad.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    let dx = clientX - centerX
    let dy = clientY - centerY
    const length = Math.hypot(dx, dy)
    if (length > JOYSTICK_RADIUS) {
      dx = (dx / length) * JOYSTICK_RADIUS
      dy = (dy / length) * JOYSTICK_RADIUS
    }
    setKnob({ x: dx, y: dy })
    if (moveInputRef.current) {
      moveInputRef.current.forward = Math.max(-1, Math.min(1, -dy / JOYSTICK_RADIUS))
      moveInputRef.current.strafe = Math.max(-1, Math.min(1, dx / JOYSTICK_RADIUS))
    }
  }

  const end = () => {
    activeRef.current = false
    if (moveInputRef.current) {
      moveInputRef.current.forward = 0
      moveInputRef.current.strafe = 0
    }
    setKnob({ x: 0, y: 0 })
  }

  return (
    <div className="gr-mobile">
      {/* Top Mobile Bar */}
      <div className="gr-mobile-top">
        <div className="gr-mobile-header">
          <strong>Museum Undip</strong>
        </div>
        <button type="button" className="gr-reset" onClick={onReset}>
          Reset Sudut
        </button>
      </div>

      {/* Quick Section Pills Bar */}
      <div className="gr-mobile-sections">
        <button type="button" onClick={() => onTeleport('founders')}>
          👥 Pendiri & Rektorat
        </button>
        <button type="button" onClick={() => onTeleport('podium')}>
          🎙️ Podium
        </button>
        <button type="button" onClick={() => onTeleport('history')}>
          📜 Sejarah
        </button>
        <button type="button" onClick={() => onTeleport('prasasti')}>
          🏛️ Prasasti
        </button>
      </div>

      {/* Touch Movement Joystick */}
      <div
        ref={padRef}
        className={`gr-joystick${visible ? '' : ' gr-hidden'}`}
        aria-label="Joystick Pergerakan"
        onPointerDown={(event) => {
          activeRef.current = true
          event.currentTarget.setPointerCapture(event.pointerId)
          update(event.clientX, event.clientY)
        }}
        onPointerMove={(event) => {
          if (activeRef.current) update(event.clientX, event.clientY)
        }}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <div
          className="gr-knob"
          style={{
            transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))`,
          }}
        />
        <span className="gr-joy-label">Gerak</span>
      </div>

      <p className="gr-mobile-hint">Geser layar untuk melihat · Ketuk objek untuk info</p>
    </div>
  )
}
