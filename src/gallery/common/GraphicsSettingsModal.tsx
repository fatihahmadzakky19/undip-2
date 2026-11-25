import {
  QUALITY_PRESETS,
  type QualityLevel,
  saveQualityLevel,
  saveFpsCounter,
  isDevMode,
} from '../Zone2/quality'

interface GraphicsSettingsModalProps {
  currentLevel: QualityLevel
  showFps: boolean
  onChangeLevel: (level: QualityLevel) => void
  onToggleFps: (show: boolean) => void
  onClose: () => void
}

export function GraphicsSettingsModal({
  currentLevel,
  showFps,
  onChangeLevel,
  onToggleFps,
  onClose,
}: GraphicsSettingsModalProps) {
  const dev = isDevMode()

  const handleSelect = (level: QualityLevel) => {
    saveQualityLevel(level)
    onChangeLevel(level)
  }

  const handleToggleFps = (val: boolean) => {
    saveFpsCounter(val)
    onToggleFps(val)
  }

  return (
    <div className="undip-modal-overlay" onClick={onClose}>
      <div className="undip-modal-container undip-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="undip-modal-header">
          <div className="undip-modal-badge">KONFIGURASI PERFORMA 3D</div>
          <h2 className="undip-modal-title">Pengaturan Grafik & Resolusi</h2>
          <button type="button" className="undip-modal-close" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>

        <div className="undip-modal-content">
          <p className="undip-settings-intro">
            Sesuaikan kualitas render sesuai spesifikasi perangkat Anda untuk menjamin pengalaman eksplorasi yang mulus dan nyaman.
          </p>

          <div className="undip-presets-list">
            {(['standar', 'hd', 'fullhd'] as QualityLevel[]).map((key) => {
              const preset = QUALITY_PRESETS[key]
              const isSelected = currentLevel === key

              return (
                <div
                  key={key}
                  className={`undip-preset-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(key)}
                >
                  <div className="undip-preset-radio">
                    <span className={`undip-radio-circle ${isSelected ? 'is-checked' : ''}`} />
                  </div>
                  <div className="undip-preset-body">
                    <div className="undip-preset-title-row">
                      <span className="undip-preset-name">{preset.label}</span>
                      {key === 'hd' && <span className="undip-pill-rec">REKOMENDASI</span>}
                    </div>
                    <p className="undip-preset-sub">{preset.subtitle}</p>
                    <ul className="undip-preset-features">
                      <li>Resolusi Pixel: {preset.dpr}x DPR</li>
                      <li>Bayangan 3D: {preset.shadows ? `Aktif (${preset.shadowMapSize}px)` : 'Nonaktif (Ringan)'}</li>
                      <li>Tekstur Kanvas: {preset.textureResolution}px</li>
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="undip-settings-toggles">
            <label className="undip-toggle-label">
              <input
                type="checkbox"
                checked={showFps}
                onChange={(e) => handleToggleFps(e.target.checked)}
              />
              <span>Tampilkan Counter Frame Rate (FPS) di Layar</span>
            </label>

            {dev && (
              <div className="undip-dev-alert">
                <span>⚡ Mode Developer Aktif (URL parameter ?dev=1)</span>
              </div>
            )}
          </div>
        </div>

        <div className="undip-modal-footer">
          <button type="button" className="undip-btn-gold" onClick={onClose}>
            Simpan & Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
