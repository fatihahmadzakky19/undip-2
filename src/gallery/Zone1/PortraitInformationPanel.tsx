import { useEffect, useMemo, useRef, useState } from 'react'
import type { PortraitInformationPanelProps } from './types'
import { createPortraitDataURL } from './textures'

/**
 * Portrait detail panel. Desktop: side panel. Mobile: bottom sheet.
 * Shows the photo, name, and years of office — everything else lives
 * in the 3D scene. Rendered outside the Canvas as regular HTML.
 */
export function PortraitInformationPanel({
  portrait,
  index,
  total,
  onClose,
}: PortraitInformationPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  // Which image path has already failed (falls back to the placeholder).
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  // Placeholder preview while no (working) image path is available.
  const placeholder = useMemo(
    () => (portrait ? createPortraitDataURL(portrait) : ''),
    [portrait],
  )

  useEffect(() => {
    if (portrait) closeRef.current?.focus()
  }, [portrait])

  useEffect(() => {
    if (!portrait) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [portrait, onClose])

  if (!portrait) return null

  const src =
    portrait.imagePath && failedSrc !== portrait.imagePath ? portrait.imagePath : placeholder

  return (
    <>
      <div className="gr-scrim" onClick={onClose} aria-hidden="true" />
      <aside
        className="gr-panel"
        role="dialog"
        aria-label={`Portrait information: ${portrait.name}`}
      >
        <header className="gr-panel-head">
          <div className="gr-panel-title">
            <h2 className="gr-name">{portrait.name}</h2>
            <p className="gr-years">{portrait.years}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="gr-close"
            onClick={onClose}
            aria-label="Close information panel"
          >
            ×
          </button>
        </header>

        <div className="gr-panel-body">
          <img
            className="gr-portrait"
            src={src}
            alt={portrait.name}
            onError={() => setFailedSrc(portrait.imagePath ?? null)}
          />
          <div className="gr-index">
            Portrait {index + 1} of {total}
          </div>
        </div>

        <footer className="gr-panel-foot">
          <button type="button" className="gr-continue" onClick={onClose}>
            Continue exploring
          </button>
        </footer>
      </aside>
    </>
  )
}
