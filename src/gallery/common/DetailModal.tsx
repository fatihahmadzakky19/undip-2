import { useEffect } from 'react'

export interface DetailModalData {
  id: string
  title: string
  subtitle?: string
  badge?: string
  description: string
  highlights?: string[]
}

interface DetailModalProps {
  data: DetailModalData | null
  onClose: () => void
}

export function DetailModal({ data, onClose }: DetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!data) return null

  return (
    <div className="undip-modal-overlay" onClick={onClose}>
      <div className="undip-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="undip-modal-header">
          {data.badge && <span className="undip-modal-badge">{data.badge}</span>}
          <h2 className="undip-modal-title">{data.title}</h2>
          {data.subtitle && <p className="undip-modal-subtitle">{data.subtitle}</p>}
          <button type="button" className="undip-modal-close" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>

        <div className="undip-modal-content">
          <p className="undip-modal-desc">{data.description}</p>

          {data.highlights && data.highlights.length > 0 && (
            <div className="undip-modal-highlights">
              <h4 className="undip-highlights-title">POIN PENTING & INFORMASI KUNCI:</h4>
              <ul className="undip-highlights-list">
                {data.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="undip-modal-footer">
          <button type="button" className="undip-btn-gold" onClick={onClose}>
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  )
}
