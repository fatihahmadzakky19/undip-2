import { MUSEUM_ZONES } from '../data/zones'

interface ZoneNavigatorProps {
  activeZoneId: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5'
  onSelectZone: (zoneId: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5') => void
}

/**
 * Floating 5-Zone Navigation Bar
 * Allows instant, elegant switching between the 5 museum zones within the single room:
 * - Zone 1: The Origin of Undip
 * - Zone 2: The Growth of Knowledge
 * - Zone 3: The Heritage of Undip
 * - Zone 4: Undip Today
 * - Zone 5: Undip Future
 */
export function ZoneNavigator({ activeZoneId, onSelectZone }: ZoneNavigatorProps) {
  return (
    <nav className="gr-zones-nav" aria-label="Navigasi 5 Zona Museum">
      {MUSEUM_ZONES.map((zone) => {
        const isActive = zone.id === activeZoneId
        return (
          <button
            key={zone.id}
            type="button"
            className={`gr-zone-btn ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelectZone(zone.id)}
            title={`${zone.title}: ${zone.subtitle}`}
          >
            <span className="gr-zone-pill">{zone.number}</span>
            <span className="gr-zone-title">{zone.title}</span>
          </button>
        )
      })}
    </nav>
  )
}
