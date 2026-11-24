import { useState } from 'react'
import type { SectionType } from './types'

interface WayfindingPromptProps {
  visible: boolean
  onTeleport: (section: SectionType) => void
  onDismiss?: () => void
}

/**
 * Interactive Wayfinding Prompt: "Mau kemana??"
 * Appears when visitor stands near the 3D Directory Board near the entrance.
 */
export function WayfindingPrompt({
  visible,
  onTeleport,
  onDismiss,
}: WayfindingPromptProps) {
  const [dismissed, setDismissed] = useState(false)

  // Reset dismissed state when visitor leaves and re-enters the board area
  if (!visible && dismissed) {
    setDismissed(false)
  }

  if (!visible || dismissed) return null

  const handleSelect = (section: SectionType) => {
    onTeleport(section)
    setDismissed(true)
  }

  return (
    <div className="gr-wayfind-overlay" role="dialog" aria-label="Panduan Petunjuk Arah">
      <div className="gr-wayfind-card">
        <header className="gr-wayfind-head">
          <div className="gr-wayfind-tag">
            <span>📍 Papan Panduan & Direktori Museum</span>
          </div>
          <button
            type="button"
            className="gr-wayfind-close"
            onClick={() => {
              setDismissed(true)
              onDismiss?.()
            }}
            aria-label="Tutup pilihan"
          >
            ×
          </button>
        </header>

        <div className="gr-wayfind-body">
          <h3 className="gr-wayfind-question">Mau kemana??</h3>
          <p className="gr-wayfind-subtitle">
            Pilih area museum yang ingin Anda kunjungi secara langsung:
          </p>

          <div className="gr-wayfind-grid">
            <button
              type="button"
              className="gr-wayfind-btn gr-wayfind-gold"
              onClick={() => handleSelect('founders')}
            >
              <span className="gr-btn-icon">👥</span>
              <div className="gr-btn-text">
                <strong>5 Pendiri & 13 Rektorat</strong>
                <small>Sayap Kiri • 5 Pendiri Utama & Pimpinan dari Masa ke Masa</small>
              </div>
            </button>

            <button
              type="button"
              className="gr-wayfind-btn gr-wayfind-gold"
              onClick={() => handleSelect('history')}
            >
              <span className="gr-btn-icon">📜</span>
              <div className="gr-btn-text">
                <strong>Galeri Sejarah 5 Zona & Arsip</strong>
                <small>Sayap Kanan • Milestones Zona 1 hingga Zona 5</small>
              </div>
            </button>

            <button
              type="button"
              className="gr-wayfind-btn gr-wayfind-gold"
              onClick={() => handleSelect('podium')}
            >
              <span className="gr-btn-icon">🎙️</span>
              <div className="gr-btn-text">
                <strong>Podium Kehormatan Undip</strong>
                <small>Ujung Karpet Merah • Panggung Upacara & Orasi</small>
              </div>
            </button>

            <button
              type="button"
              className="gr-wayfind-btn gr-wayfind-gold"
              onClick={() => handleSelect('prasasti')}
            >
              <span className="gr-btn-icon">🏛️</span>
              <div className="gr-btn-text">
                <strong>Prasasti Peresmian 1957</strong>
                <small>Sisi Kiri Panggung • Marmer Hitam Obsidian Sukarno</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

