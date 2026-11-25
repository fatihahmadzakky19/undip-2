import { useState } from 'react'

export interface ZoneItem {
  id: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5'
  number: number
  title: string
  subtitle: string
  period: string
  status: 'active' | 'available' | 'coming_soon'
  icon: string
}

export const ZONES_LIST: ZoneItem[] = [
  {
    id: 'zone1',
    number: 1,
    title: 'The Origin of Undip',
    subtitle: 'Sejarah Pendirian & Pancamitra Pendiri',
    period: '1956 – 1961',
    status: 'available',
    icon: '🏛️',
  },
  {
    id: 'zone2',
    number: 2,
    title: 'The Growth of Knowledge',
    subtitle: 'Perkembangan 14 Fakultas & Transformasi Kampus',
    period: '1961 – 1990',
    status: 'available',
    icon: '🌳',
  },
  {
    id: 'zone3',
    number: 3,
    title: 'The Heritage of Undip',
    subtitle: 'Warisan Sejarah, Artefak Akademik & Nilai Kesatria',
    period: '1990 – 2010',
    status: 'coming_soon',
    icon: '⚔️',
  },
  {
    id: 'zone4',
    number: 4,
    title: 'Undip Today',
    subtitle: 'Kampus Modern Tembalang & World Class University',
    period: '2010 – Sekarang',
    status: 'coming_soon',
    icon: '🎓',
  },
  {
    id: 'zone5',
    number: 5,
    title: 'Undip Future',
    subtitle: 'Visi Indonesia Emas & Inovasi 2045',
    period: 'Menuju 2045',
    status: 'coming_soon',
    icon: '🚀',
  },
]

interface SidebarNavProps {
  currentZone: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5'
  onSelectZone: (zoneId: 'zone1' | 'zone2') => void
  disabled?: boolean
}

export function SidebarNav({ currentZone, onSelectZone, disabled }: SidebarNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Toggle Button in Top Left */}
      <button
        type="button"
        className={`undip-sidebar-toggle ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Buka / Tutup Daftar Zona Museum"
        aria-label="Toggle Daftar Zona"
      >
        <span className="undip-toggle-icon">{isOpen ? '✕' : '☰'}</span>
        <span className="undip-toggle-text">5 ZONA MUSEUM</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="undip-sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside className={`undip-sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="undip-sidebar-header">
          <div className="undip-header-badge">MUSEUM VIRTUAL 3D</div>
          <h2 className="undip-header-title">UNIVERSITAS DIPONEGORO</h2>
          <p className="undip-header-sub">Navigasi Ruangan Pameran Bersejarah</p>
        </div>

        <nav className="undip-sidebar-list">
          {ZONES_LIST.map((zone) => {
            const isCurrent = zone.id === currentZone
            const isAvailable = zone.status !== 'coming_soon'

            return (
              <div
                key={zone.id}
                className={`undip-zone-card ${isCurrent ? 'is-current' : ''} ${!isAvailable ? 'is-disabled' : ''}`}
                onClick={() => {
                  if (disabled || !isAvailable || isCurrent) return
                  onSelectZone(zone.id as 'zone1' | 'zone2')
                  setIsOpen(false)
                }}
              >
                <div className="undip-card-top">
                  <span className="undip-card-num">ZONA {zone.number}</span>
                  <span className="undip-card-badge">
                    {isCurrent ? 'SEDANG DILIHAT' : isAvailable ? 'BUKA RUANGAN' : 'SEGERA HADIR'}
                  </span>
                </div>

                <div className="undip-card-main">
                  <span className="undip-card-icon">{zone.icon}</span>
                  <div className="undip-card-info">
                    <h3 className="undip-card-title">{zone.title}</h3>
                    <p className="undip-card-subtitle">{zone.subtitle}</p>
                    <span className="undip-card-period">{zone.period}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="undip-sidebar-footer">
          <p>Undip Bermartabat, Undip Bermanfaat</p>
          <small>© 2026 Universitas Diponegoro</small>
        </div>
      </aside>
    </>
  )
}
