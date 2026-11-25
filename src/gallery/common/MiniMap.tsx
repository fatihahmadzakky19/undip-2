import { useState } from 'react'
import { ZONE2_HALL, type Zone2SubzoneKey } from '../Zone2/layout'

interface MiniMapProps {
  playerPos: [number, number, number]
  playerYaw: number
  onTeleport: (key: Zone2SubzoneKey) => void
}

/**
 * 2D Top-Down Interactive Mini-Map for Zone 2: "The Growth of Knowledge"
 * Shows real-time player radar and clickable sub-zone teleport pins.
 */
export function MiniMap({ playerPos, playerYaw, onTeleport }: MiniMapProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Map coordinate conversion:
  // Zone 2 dimensions: Width = 14m (X: -7 to +7), Length = 40m (Z: +18 Entrance to -18 Exit)
  // Map canvas normalized to 160px width x 320px height
  const mapWidth = 150
  const mapHeight = 280

  const toMapX = (worldX: number) => {
    return ((worldX + ZONE2_HALL.halfWidth) / ZONE2_HALL.width) * mapWidth
  }

  // World Z: +18 is Entrance (Top of map, y=10), -18 is Exit (Bottom of map, y=270)
  const toMapY = (worldZ: number) => {
    const norm = (ZONE2_HALL.zEntrance - worldZ) / ZONE2_HALL.length
    return Math.max(10, Math.min(mapHeight - 10, norm * (mapHeight - 20) + 10))
  }

  const pX = toMapX(playerPos[0])
  const pY = toMapY(playerPos[2])

  // Subzone marker definitions
  const markers: { key: Zone2SubzoneKey; label: string; x: number; z: number; color: string }[] = [
    { key: 'entrance', label: 'Pintu Masuk', x: 0, z: 16.0, color: '#d4af37' },
    { key: 'subzoneA', label: 'A: Pohon Fakultas', x: 0, z: 5.5, color: '#ffd700' },
    { key: 'subzoneB', label: 'B: Transformasi Kampus', x: 0, z: 0.0, color: '#4fc3f7' },
    { key: 'subzoneC', label: 'C: Pendidikan & Riset', x: 0, z: -7.5, color: '#81c784' },
    { key: 'subzoneD', label: 'D: Prestasi & Pengabdian', x: 0, z: -14.0, color: '#ba68c8' },
    { key: 'exit', label: 'Pintu Keluar', x: 0, z: -17.0, color: '#d4af37' },
  ]

  return (
    <div className={`undip-minimap-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="undip-minimap-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span className="undip-minimap-title">DENAH 2D ZONA 2</span>
        <button type="button" className="undip-minimap-toggle" aria-label="Toggle Mini Map">
          {isCollapsed ? '+' : '−'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="undip-minimap-body">
          <svg
            width={mapWidth}
            height={mapHeight}
            className="undip-minimap-svg"
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          >
            {/* Background Hall Outline */}
            <rect
              x={6}
              y={6}
              width={mapWidth - 12}
              height={mapHeight - 12}
              fill="#061224"
              stroke="#d4af37"
              strokeWidth="2"
              rx="4"
            />

            {/* Central Maroon Carpet Runner */}
            <rect
              x={mapWidth / 2 - 18}
              y={12}
              width={36}
              height={mapHeight - 24}
              fill="#6b0f1a"
              opacity="0.85"
            />
            {/* Carpet Gold Trim */}
            <line
              x1={mapWidth / 2 - 18}
              y1={12}
              x2={mapWidth / 2 - 18}
              y2={mapHeight - 12}
              stroke="#d4af37"
              strokeWidth="1"
            />
            <line
              x1={mapWidth / 2 + 18}
              y1={12}
              x2={mapWidth / 2 + 18}
              y2={mapHeight - 12}
              stroke="#d4af37"
              strokeWidth="1"
            />

            {/* Centerpiece Icons */}
            {/* Sub-zone A: Tree */}
            <circle cx={mapWidth / 2} cy={toMapY(5.5)} r={10} fill="#3b2412" stroke="#ffd700" strokeWidth="1.5" />
            {/* Sub-zone B: Dual Makets */}
            <rect x={24} y={toMapY(0) - 8} width={24} height={16} fill="#1a2f4c" stroke="#4fc3f7" strokeWidth="1" />
            <rect x={mapWidth - 48} y={toMapY(0) - 8} width={24} height={16} fill="#1a2f4c" stroke="#4fc3f7" strokeWidth="1" />

            {/* Sub-zone Markers */}
            {markers.map((m) => {
              const mx = toMapX(m.x)
              const my = toMapY(m.z)
              return (
                <g
                  key={m.key}
                  className="undip-minimap-marker"
                  onClick={() => onTeleport(m.key)}
                >
                  <circle cx={mx} cy={my} r={6} fill={m.color} stroke="#ffffff" strokeWidth="1.5" />
                  <title>{m.label} (Klik untuk teleport)</title>
                </g>
              )
            })}

            {/* Player Radar Point with Directional Sight Triangle */}
            <g transform={`translate(${pX}, ${pY}) rotate(${(playerYaw * 180) / Math.PI + 180})`}>
              {/* Sight Cone */}
              <polygon points="0,-14 -7,4 7,4" fill="rgba(255, 215, 0, 0.45)" />
              {/* Core Player Circle */}
              <circle cx={0} cy={0} r={5} fill="#ffd700" stroke="#0B1A3A" strokeWidth="2" />
            </g>
          </svg>

          <div className="undip-minimap-legend">
            <span>💡 Klik titik pada peta untuk teleport</span>
          </div>
        </div>
      )}
    </div>
  )
}
