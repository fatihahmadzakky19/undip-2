import { useMemo } from 'react'
import * as THREE from 'three'

interface DirectoryBoardProps {
  position: [number, number, number]
  rotationY?: number
  isNear: boolean
}

function createDirectoryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 1000
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  // Dark Navy Blue board
  ctx.fillStyle = '#0b1d3a'
  ctx.fillRect(0, 0, 800, 1000)

  // Gold Double Borders
  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 6
  ctx.strokeRect(20, 20, 760, 960)
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
  ctx.lineWidth = 2
  ctx.strokeRect(32, 32, 736, 936)

  // Header Title
  ctx.textAlign = 'center'
  ctx.fillStyle = '#d4af37'
  ctx.font = 'bold 26px sans-serif'
  ctx.fillText('PANDUAN & DIREKTORI MUSEUM', 400, 90)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 36px Georgia, serif'
  ctx.fillText('UNIVERSITAS DIPONEGORO', 400, 145)

  ctx.fillStyle = '#dcd6c8'
  ctx.font = 'italic 18px Georgia, serif'
  ctx.fillText('Peta Tata Letak & Sayap Pameran', 400, 185)

  // Gold separator
  ctx.fillStyle = '#d4af37'
  ctx.fillRect(80, 215, 640, 3)

  // Illustrated Mini Floorplan of the Museum
  ctx.fillStyle = '#142744'
  ctx.fillRect(100, 250, 600, 320)
  ctx.strokeStyle = '#c5a059'
  ctx.lineWidth = 2
  ctx.strokeRect(100, 250, 600, 320)

  // Floorplan Left Wing
  ctx.fillStyle = '#0d325e'
  ctx.fillRect(120, 270, 140, 280)
  ctx.fillStyle = '#ffd966'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('SAYAP KIRI', 190, 390)
  ctx.font = '14px sans-serif'
  ctx.fillText('13 Tokoh Pendiri', 190, 420)

  // Floorplan Right Wing
  ctx.fillStyle = '#0d325e'
  ctx.fillRect(540, 270, 140, 280)
  ctx.fillStyle = '#ffd966'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('SAYAP KANAN', 610, 390)
  ctx.font = '14px sans-serif'
  ctx.fillText('Sejarah & Arsip', 610, 420)

  // Floorplan Red Carpet & Center
  ctx.fillStyle = '#8b0000'
  ctx.fillRect(360, 270, 80, 280)
  ctx.fillStyle = '#ffd966'
  ctx.font = 'bold 13px sans-serif'
  ctx.fillText('Karpet Merah', 400, 430)

  // Podium box
  ctx.fillStyle = '#d4af37'
  ctx.fillRect(365, 285, 70, 35)
  ctx.fillStyle = '#000'
  ctx.font = 'bold 11px sans-serif'
  ctx.fillText('Podium', 400, 307)

  // Directory List
  ctx.textAlign = 'left'
  ctx.fillStyle = '#d4af37'
  ctx.font = 'bold 22px Georgia, serif'
  ctx.fillText('Destinasi Utama Galeri:', 100, 620)

  const items = [
    '✦ Sayap Kiri: 13 Potret Pendiri Undip (Mr. Soedarto, Mr. Imam Bardjo, dll)',
    '✦ Area Tengah: Karpet Merah Megah Menuju Panggung & Podium Kehormatan',
    '✦ Sayap Kanan: Arsip Pendirian 1956, SK Penegerian 1961, Foto Awal Kampus',
    '✦ Atap Arsitektur: Pola Ritmik Celah Persegi Panjang Emas & Pencahayaan Estetik',
  ]

  ctx.fillStyle = '#f0ece1'
  ctx.font = '16px system-ui, sans-serif'
  items.forEach((item, idx) => {
    ctx.fillText(item, 100, 665 + idx * 46)
  })

  // Bottom prompt callout
  ctx.fillStyle = 'rgba(212, 175, 55, 0.18)'
  ctx.fillRect(80, 870, 640, 75)
  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 1.5
  ctx.strokeRect(80, 870, 640, 75)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffe699'
  ctx.font = 'bold 20px sans-serif'
  ctx.fillText('📍 Berdiri di sini untuk memilih menu "Mau kemana??"', 400, 915)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/**
 * 3D Standing Directory Board (Papan Petunjuk Arah)
 * Triggers the "Mau kemana??" navigation tab popup when the visitor walks close to it.
 */
export function DirectoryBoard({
  position,
  rotationY = 0,
  isNear,
}: DirectoryBoardProps) {
  const texture = useMemo(() => createDirectoryTexture(), [])

  const materials = useMemo(() => {
    return {
      heritageWood: new THREE.MeshStandardMaterial({
        color: '#3d2516',
        roughness: 0.48,
        metalness: 0.12,
      }),
      goldTrim: new THREE.MeshStandardMaterial({
        color: isNear ? '#ffe07b' : '#d4af37',
        emissive: isNear ? '#d4af37' : '#000000',
        emissiveIntensity: isNear ? 0.35 : 0,
        roughness: 0.28,
        metalness: 0.88,
      }),
      navyBacking: new THREE.MeshStandardMaterial({
        color: '#0b1d3a',
        roughness: 0.5,
      }),
      lampWarm: new THREE.MeshStandardMaterial({
        color: '#fff5e0',
        emissive: '#ffd9a0',
        emissiveIntensity: 2.0,
      }),
    }
  }, [isNear])

  const bw = 1.4 // board width
  const bh = 1.7 // board height

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Base Stand Plinth (Heritage Brown & Gold) */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.1, 0.7]} />
        <primitive object={materials.heritageWood} attach="material" />
      </mesh>
      <mesh position={[0, 0.105, 0]}>
        <boxGeometry args={[1.06, 0.02, 0.66]} />
        <primitive object={materials.goldTrim} attach="material" />
      </mesh>

      {/* 2. Dual Supporting Posts */}
      {[-0.32, 0.32].map((px, pi) => (
        <mesh key={pi} position={[px, 0.68, 0]} castShadow>
          <boxGeometry args={[0.07, 1.15, 0.07]} />
          <primitive object={materials.heritageWood} attach="material" />
        </mesh>
      ))}

      {/* 3. Angled Display Board Enclosure */}
      <group position={[0, 1.48, 0.06]} rotation={[-0.22, 0, 0]}>
        {/* Rear enclosure */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[bw + 0.08, bh + 0.08, 0.08]} />
          <primitive object={materials.heritageWood} attach="material" />
        </mesh>

        {/* Gold Border Rim */}
        <mesh position={[0, 0, 0.035]}>
          <boxGeometry args={[bw + 0.02, bh + 0.02, 0.03]} />
          <primitive object={materials.goldTrim} attach="material" />
        </mesh>

        {/* Printed Directory Canvas */}
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[bw - 0.04, bh - 0.04]} />
          <meshStandardMaterial map={texture} roughness={0.6} />
        </mesh>

        {/* Overhead Spot Sconce on Board */}
        <group position={[0, bh / 2 + 0.18, 0.12]}>
          <mesh rotation={[0.5, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.22, 12]} />
            <primitive object={materials.goldTrim} attach="material" />
          </mesh>
          <mesh position={[0, -0.06, 0.08]} rotation={[-0.8, 0, 0]}>
            <boxGeometry args={[0.34, 0.06, 0.1]} />
            <primitive object={materials.heritageWood} attach="material" />
          </mesh>
          <mesh position={[0, -0.08, 0.08]} rotation={[-0.8, 0, 0]}>
            <planeGeometry args={[0.3, 0.06]} />
            <primitive object={materials.lampWarm} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Proximity Halo Glow on floor when visitor is near */}
      {isNear && (
        <mesh position={[0, 0.015, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.96, 32]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  )
}
