import * as THREE from 'three'
import type { Founder, HistoryExhibit } from './data/exhibits'
import { assetCache } from './cache'

function makeCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return [canvas, canvas.getContext('2d') as CanvasRenderingContext2D]
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function fitFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  family: string,
  weight: string,
  style: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
): number {
  let size = startSize
  while (size > minSize) {
    ctx.font = `${style} ${weight} ${size}px ${family}`
    if (ctx.measureText(text).width <= maxWidth) break
    size -= 2
  }
  ctx.font = `${style} ${weight} ${size}px ${family}`
  return size
}

/** Polished museum floor: Warm Italian Crema Marfil / Ivory marble with subtle veins */
export function createFloorTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('floor-texture', () => {
    const [canvas, ctx] = makeCanvas(1024, 1024)

    // Base warm marble tone
    ctx.fillStyle = '#f2ede4'
    ctx.fillRect(0, 0, 1024, 1024)

    // Large tiles 512x512
    const tileSize = 256
    for (let x = 0; x < 1024; x += tileSize) {
      for (let y = 0; y < 1024; y += tileSize) {
        const tileHue = ((x + y) % 512 === 0) ? '#ede6da' : '#f5f0e7'
        ctx.fillStyle = tileHue
        ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4)

        // Fine marble veins
        ctx.strokeStyle = 'rgba(168, 148, 126, 0.22)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(x + 10, y + 20)
        ctx.bezierCurveTo(x + 60, y + 80, x + 180, y + 140, x + tileSize - 20, y + tileSize - 10)
        ctx.stroke()

        // Subtle diagonal veins
        ctx.strokeStyle = 'rgba(195, 178, 158, 0.15)'
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(x + tileSize - 30, y + 10)
        ctx.bezierCurveTo(x + 180, y + 100, x + 90, y + 190, x + 15, y + tileSize - 30)
        ctx.stroke()

        // Tile joint line
        ctx.strokeStyle = 'rgba(120, 105, 90, 0.45)'
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, tileSize, tileSize)
      }
    }

    // Specular sheen
    const sheen = ctx.createRadialGradient(512, 512, 100, 512, 512, 600)
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.12)')
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = sheen
    ctx.fillRect(0, 0, 1024, 1024)

    return toTexture(canvas)
  })
}

/** Ceremonial Red Carpet Runner with Ornate Gold Geometric Border */
export function createRedCarpetTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('carpet-texture', () => {
    const [canvas, ctx] = makeCanvas(512, 1024)

    // Velvet deep crimson red
    const redGrad = ctx.createLinearGradient(0, 0, 512, 0)
    redGrad.addColorStop(0, '#580c14')
    redGrad.addColorStop(0.12, '#821622')
    redGrad.addColorStop(0.5, '#9e1b28')
    redGrad.addColorStop(0.88, '#821622')
    redGrad.addColorStop(1, '#580c14')
    ctx.fillStyle = redGrad
    ctx.fillRect(0, 0, 512, 1024)

    // Subtle velvet noise / fabric grain
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
    for (let y = 0; y < 1024; y += 4) {
      ctx.fillRect(0, y, 512, 1.5)
    }

    // Gold outer piping
    ctx.fillStyle = '#d4af37'
    ctx.fillRect(12, 0, 8, 1024)
    ctx.fillRect(512 - 20, 0, 8, 1024)

    // Gold patterned inner borders
    ctx.fillStyle = '#f3cf65'
    ctx.fillRect(28, 0, 4, 1024)
    ctx.fillRect(512 - 32, 0, 4, 1024)

    // Repeating geometric gold diamond motifs along borders
    ctx.fillStyle = '#e6be44'
    for (let y = 16; y < 1024; y += 32) {
      // Left border motifs
      ctx.beginPath()
      ctx.moveTo(22, y)
      ctx.lineTo(26, y + 8)
      ctx.lineTo(22, y + 16)
      ctx.lineTo(18, y + 8)
      ctx.closePath()
      ctx.fill()

      // Right border motifs
      ctx.beginPath()
      ctx.moveTo(512 - 22, y)
      ctx.lineTo(512 - 18, y + 8)
      ctx.lineTo(512 - 22, y + 16)
      ctx.lineTo(512 - 26, y + 8)
      ctx.closePath()
      ctx.fill()
    }

    return toTexture(canvas)
  })
}

/** Portrait Canvas Texture for the 13 UNDIP Founders */
export function createFounderPortraitCanvas(founder: Founder, index: number): HTMLCanvasElement {
  const [canvas, ctx] = makeCanvas(600, 750)

  // Rich studio backdrop with heritage deep navy & sepia vignette
  const bg = ctx.createRadialGradient(300, 260, 50, 300, 375, 450)
  bg.addColorStop(0, '#2d3b4e')
  bg.addColorStop(0.6, '#182435')
  bg.addColorStop(1, '#0e1724')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 600, 750)

  // Decorative inner gold filigree frame line
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
  ctx.lineWidth = 2
  ctx.strokeRect(20, 20, 560, 710)

  // Dignified Sepia Silhouette & Historic Attire
  // Coat / suit shoulders
  ctx.fillStyle = '#1c1b18'
  ctx.beginPath()
  ctx.ellipse(300, 680, 210, 180, 0, 0, Math.PI * 2)
  ctx.fill()

  // White collared shirt & tie
  ctx.fillStyle = '#ebe6dc'
  ctx.beginPath()
  ctx.moveTo(300, 390)
  ctx.lineTo(265, 480)
  ctx.lineTo(335, 480)
  ctx.closePath()
  ctx.fill()

  // Tie (Navy / Burgundy)
  ctx.fillStyle = index % 2 === 0 ? '#102238' : '#4a151b'
  ctx.beginPath()
  ctx.moveTo(295, 430)
  ctx.lineTo(305, 430)
  ctx.lineTo(312, 540)
  ctx.lineTo(300, 570)
  ctx.lineTo(288, 540)
  ctx.closePath()
  ctx.fill()

  // Head and face silhouette with warm lighting
  const faceGrad = ctx.createRadialGradient(285, 275, 20, 300, 290, 100)
  faceGrad.addColorStop(0, '#e8cbb0')
  faceGrad.addColorStop(0.7, '#c99f7a')
  faceGrad.addColorStop(1, '#8b6443')
  ctx.fillStyle = faceGrad
  ctx.beginPath()
  ctx.ellipse(300, 290, 85, 110, 0, 0, Math.PI * 2)
  ctx.fill()

  // Hair style variation
  ctx.fillStyle = '#261b12'
  ctx.beginPath()
  ctx.arc(300, 240, 90, Math.PI * 0.9, Math.PI * 2.1)
  ctx.fill()

  // Intellectual spectacles or distinctive feature
  if (index % 3 === 0 || founder.id.includes('soedarto') || founder.id.includes('sunario')) {
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(265, 285, 22, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(335, 285, 22, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(287, 285)
    ctx.lineTo(313, 285)
    ctx.stroke()
  }

  // Historic Seal Stamp of Yayasan Universitas Semarang 1956
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)'
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.arc(490, 100, 48, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(490, 100, 42, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = 'rgba(212, 175, 55, 0.65)'
  ctx.font = 'bold 9px serif'
  ctx.textAlign = 'center'
  ctx.fillText('YAYASAN UNDIP', 490, 95)
  ctx.fillText('EST. 1956', 490, 110)

  // Vignette overlay
  const vig = ctx.createRadialGradient(300, 375, 200, 300, 375, 480)
  vig.addColorStop(0, 'rgba(0,0,0,0)')
  vig.addColorStop(1, 'rgba(0,0,0,0.65)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, 600, 750)

  // Bottom Nameplate integrated on the canvas
  ctx.fillStyle = 'rgba(11, 29, 58, 0.92)'
  ctx.fillRect(30, 610, 540, 105)
  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 2
  ctx.strokeRect(34, 614, 532, 97)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#f8f4eb'
  fitFont(ctx, founder.name, 'Georgia, serif', 'bold', 'normal', 500, 28, 18)
  ctx.fillText(founder.name, 300, 650)

  ctx.fillStyle = '#d4af37'
  fitFont(ctx, founder.title, 'Georgia, serif', 'normal', 'italic', 500, 17, 12)
  ctx.fillText(founder.title, 300, 678)

  ctx.fillStyle = '#baa788'
  ctx.font = '13px sans-serif'
  ctx.fillText(founder.years, 300, 700)

  return canvas
}

export function createFounderPortraitTexture(founder: Founder, index: number): THREE.CanvasTexture {
  return assetCache.getTexture(`founder-portrait-${founder.id}`, () => {
    return toTexture(createFounderPortraitCanvas(founder, index))
  })
}

export function createFounderDataURL(founder: Founder, index: number): string {
  return createFounderPortraitCanvas(founder, index).toDataURL('image/jpeg', 0.88)
}

/** History & Archives Museum Exhibition Panel Texture */
export function createHistoryPanelCanvas(exhibit: HistoryExhibit): HTMLCanvasElement {
  const [canvas, ctx] = makeCanvas(800, 1000)

  // Elegant archival background: aged warm parchment with deep navy header
  ctx.fillStyle = '#fcf8ee'
  ctx.fillRect(0, 0, 800, 1000)

  // Subtle paper grain & vintage aging
  ctx.fillStyle = 'rgba(180, 150, 110, 0.1)'
  for (let i = 0; i < 40; i++) {
    const rx = Math.random() * 800
    const ry = Math.random() * 1000
    const rw = 40 + Math.random() * 120
    ctx.fillRect(rx, ry, rw, 2)
  }

  // Top Grand Header: Deep Navy Blue
  const headGrad = ctx.createLinearGradient(0, 0, 800, 0)
  headGrad.addColorStop(0, '#0a1a33')
  headGrad.addColorStop(0.5, '#122b52')
  headGrad.addColorStop(1, '#0a1a33')
  ctx.fillStyle = headGrad
  ctx.fillRect(0, 0, 800, 160)

  // Gold separator line
  ctx.fillStyle = '#d4af37'
  ctx.fillRect(0, 156, 800, 4)

  // Header Text
  ctx.textAlign = 'center'
  ctx.fillStyle = '#d4af37'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText(`ARSIP SEJARAH UNIVERSITAS DIPONEGORO • ${exhibit.period.toUpperCase()}`, 400, 52)

  ctx.fillStyle = '#ffffff'
  fitFont(ctx, exhibit.title, 'Georgia, serif', 'bold', 'normal', 740, 32, 20)
  ctx.fillText(exhibit.title, 400, 104)

  ctx.fillStyle = '#dcd6c8'
  ctx.font = 'italic 16px Georgia, serif'
  ctx.fillText(exhibit.shortLabel, 400, 138)

  // Central Visual Document Box (Represents historic document/decree/photo)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(60, 190, 680, 420)
  ctx.strokeStyle = '#c5a059'
  ctx.lineWidth = 3
  ctx.strokeRect(60, 190, 680, 420)

  // Visual content inside document box based on category and exhibit ID
  if (exhibit.id === 'archives-notary-1956') {
    // Official Notary Deed 1956
    ctx.fillStyle = '#1c1b18'
    ctx.font = 'bold 20px "Times New Roman", serif'
    ctx.fillText('NOTARIS R.M. SOEPRAPTO - SEMARANG', 400, 235)
    ctx.font = 'italic 16px "Times New Roman", serif'
    ctx.fillText('AKTE PENDIRIAN JAJASAN UNIVERSITAS SEMARANG NOMOR 59', 400, 260)

    ctx.strokeStyle = '#8a7967'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(90, 275)
    ctx.lineTo(710, 275)
    ctx.stroke()

    ctx.textAlign = 'left'
    ctx.fillStyle = '#2d2a24'
    ctx.font = '14px "Courier New", monospace'
    const notaryLines = [
      'Pada hari ini, Selasa tanggal 4 Desember 1956,',
      'Menghadap kepada saja, Raden Mas Soeprapto, Notaris di Semarang:',
      '1. Mr. Soedarto (Djaksa Tinggi Djawa Tengah)',
      '2. Mr. Dan Sulaiman (Pedjabat Kehakiman)',
      '3. Mr. Imam Bardjo (Ketua Pengadilan Tinggi Djawa Tengah)',
      '4. Mr. Goenawan Goetomo & Mr. Tan Tjing Hak',
      '5. dr. Heyder bin Heyder (Direktur R.S. Semarang)',
      'Sepakat mendirikan "JAJASAN UNIVERSITAS SEMARANG"',
      'Guna mendidik putera bangsa berkarakter dan berdjiwa patriotik.',
    ]
    notaryLines.forEach((l, idx) => {
      ctx.fillText(l, 85, 310 + idx * 26)
    })

    // Red Official Notary Wax Seal
    ctx.fillStyle = '#8b181b'
    ctx.beginPath()
    ctx.arc(630, 520, 48, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('NOTARIS', 630, 510)
    ctx.fillText('R.M. SOEPRAPTO', 630, 524)
    ctx.fillText('SEMARANG 1956', 630, 538)

  } else if (exhibit.id === 'archives-statuta-1957') {
    // Statuta & Pembukaan 1957
    ctx.fillStyle = '#1a1815'
    ctx.font = 'bold 20px "Times New Roman", serif'
    ctx.fillText('UNIVERSITAS SEMARANG (EST. 1957)', 400, 235)
    ctx.font = 'italic 16px "Times New Roman", serif'
    ctx.fillText('Naskah Peresmian Pembukaan Perkuliahan & Statuta Perdana', 400, 260)

    ctx.strokeStyle = '#8a7967'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(90, 275)
    ctx.lineTo(710, 275)
    ctx.stroke()

    ctx.textAlign = 'left'
    ctx.fillStyle = '#2d2a24'
    ctx.font = '14px "Courier New", monospace'
    const statutaLines = [
      'Peresmian Pembukaan : Rabu, 9 Djanuari 1957 di Semarang',
      'Presiden Universitas: Mr. Imam Bardjo',
      'Susunan Fakultas Perdana:',
      '  • Fakultas Hukum dan Masjarakat (Dekan: Mr. Soedarto)',
      '  • Akademi Administrasi Negara (Dekan: Mr. Goenawan Goetomo)',
      'Pedoman Pengadjaran berlandaskan Pantjasila & UUD 1945.',
      'Sumpah Akademik: Mengabdi untuk ketjerdasan dan martabat bangsa.',
      'Terbuka bagi seluruh putera-puteri Indonesia tanpa diskriminasi.',
    ]
    statutaLines.forEach((l, idx) => {
      ctx.fillText(l, 85, 312 + idx * 27)
    })

    // Green/Gold Academic Seal
    ctx.fillStyle = '#0f4c3a'
    ctx.beginPath()
    ctx.arc(630, 520, 48, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('SENAT MAHASISWA', 630, 512)
    ctx.fillText('UNIVERSITAS SEMARANG', 630, 526)
    ctx.fillText('9 JANUARI 1957', 630, 540)

  } else if (exhibit.id === 'decree-sk-1961') {
    // PP No. 7 Tahun 1961
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 20px "Times New Roman", serif'
    ctx.fillText('PERATURAN PEMERINTAH REPUBLIK INDONESIA', 400, 232)
    ctx.font = 'bold 17px "Times New Roman", serif'
    ctx.fillText('NOMOR 7 TAHUN 1961', 400, 255)
    ctx.font = 'italic 15px "Times New Roman", serif'
    ctx.fillText('Tentang Pendirian / Penegerian Universitas Diponegoro', 400, 276)

    ctx.strokeStyle = '#8a7967'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(90, 288)
    ctx.lineTo(710, 288)
    ctx.stroke()

    ctx.textAlign = 'left'
    ctx.fillStyle = '#222'
    ctx.font = '14px "Courier New", monospace'
    const ppLines = [
      'Menimbang  : Pembinaan dan pengembangan pendidikan tinggi di Djawa Tengah',
      'Mengingat  : Penetapan Presiden RI tanggal 9 Djanuari 1960',
      'MEMUTUSKAN :',
      'Pasal 1    : Mendirikan UNIVERSITAS DIPONEGORO di Semarang sebagai PTN.',
      'Pasal 2    : Peraturan Pemerintah ini berlaku surut sedjak 15 Oktober 1957,',
      '             ditetapkan sebagai HARI DIES NATALIS UNIVERSITAS DIPONEGORO',
      '             mengenang Pertempuran Lima Hari di Kota Semarang.',
      'Ditetapkan : Djakarta, 15 Oktober 1960. Presiden RI IR. SOEKARNO.',
    ]
    ppLines.forEach((l, idx) => {
      ctx.fillText(l, 85, 318 + idx * 26)
    })

    // Red Republic of Indonesia State Seal
    ctx.fillStyle = '#b91c1c'
    ctx.beginPath()
    ctx.arc(630, 520, 50, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 2.5
    ctx.stroke()
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('REPUBLIK INDONESIA', 630, 514)
    ctx.fillStyle = '#ffd700'
    ctx.fillText('PP NO. 7 / 1961', 630, 532)

  } else if (exhibit.id === 'decree-lembaran-negara') {
    // Lembaran Negara 1961 No. 21
    ctx.fillStyle = '#0f172a'
    ctx.font = 'bold 22px "Times New Roman", serif'
    ctx.fillText('LEMBARAN NEGARA REPUBLIK INDONESIA', 400, 235)
    ctx.font = 'bold 16px "Times New Roman", serif'
    ctx.fillText('TAHUN 1961 NOMOR 21', 400, 260)

    ctx.strokeStyle = '#8a7967'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(90, 275)
    ctx.lineTo(710, 275)
    ctx.stroke()

    ctx.textAlign = 'left'
    ctx.fillStyle = '#222'
    ctx.font = '14px "Courier New", monospace'
    const lnLines = [
      'PERGURUAN TINGGI. UNIVERSITAS DIPONEGORO.',
      'Pengesahan dan Penjelasaan Pendirian Universitas Negeri di Semarang.',
      '1. Pengalihan seluruh hak, kewadjiban, dan kekaja-an Jajasan',
      '   Universitas Semarang kepada Pemerintah Republik Indonesia.',
      '2. Pembinaan di bawah Departemen Perguruan Tinggi & Ilmu Pengetahuan.',
      '3. Wewenang penuh pemberian gelar kesardjanaan negara.',
      'Disahkan di Djakarta dan diundangkan dalam Lembaran Negara.',
      'Sekretaris Negara : Mr. A.W. Surjoadiningrat',
    ]
    lnLines.forEach((l, idx) => {
      ctx.fillText(l, 85, 315 + idx * 27)
    })

    // Government Black/Gold Emblem
    ctx.fillStyle = '#1e293b'
    ctx.beginPath()
    ctx.arc(630, 520, 48, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 10px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('LEMBARAN NEGARA', 630, 512)
    ctx.fillText('NO. 21 TH 1961', 630, 528)
    ctx.fillText('DIUNDANGKAN', 630, 542)

  } else if (exhibit.id === 'history-waduk-undip') {
    // Waduk Undip & Sabuk Hijau Konservasi Painting / Landscape
    const sky = ctx.createLinearGradient(65, 195, 65, 420)
    sky.addColorStop(0, '#5ea3de')
    sky.addColorStop(0.6, '#99cbf0')
    sky.addColorStop(1, '#d5e9f8')
    ctx.fillStyle = sky
    ctx.fillRect(65, 195, 670, 410)

    // Tembalang lush rolling green hills in background
    ctx.fillStyle = '#3c7a3e'
    ctx.beginPath()
    ctx.moveTo(65, 380)
    ctx.bezierCurveTo(200, 310, 360, 360, 500, 320)
    ctx.bezierCurveTo(600, 300, 680, 340, 735, 350)
    ctx.lineTo(735, 605)
    ctx.lineTo(65, 605)
    ctx.closePath()
    ctx.fill()

    // Closer emerald trees and shoreline
    ctx.fillStyle = '#27582b'
    ctx.beginPath()
    ctx.moveTo(65, 400)
    ctx.bezierCurveTo(220, 360, 400, 410, 580, 370)
    ctx.lineTo(735, 390)
    ctx.lineTo(735, 605)
    ctx.lineTo(65, 605)
    ctx.closePath()
    ctx.fill()

    // Serene Blue Lake Water (Waduk Diponegoro) with light ripple reflections
    const water = ctx.createLinearGradient(65, 420, 65, 605)
    water.addColorStop(0, '#3182ce')
    water.addColorStop(0.5, '#2b6cb0')
    water.addColorStop(1, '#1a4971')
    ctx.fillStyle = water
    ctx.beginPath()
    ctx.moveTo(65, 430)
    ctx.bezierCurveTo(250, 415, 450, 440, 735, 425)
    ctx.lineTo(735, 605)
    ctx.lineTo(65, 605)
    ctx.closePath()
    ctx.fill()

    // Floating water lilies and reflection highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
    ctx.lineWidth = 2
    for (let wy = 450; wy < 590; wy += 22) {
      ctx.beginPath()
      ctx.moveTo(120 + (wy % 40) * 5, wy)
      ctx.lineTo(260 + (wy % 30) * 8, wy)
      ctx.moveTo(380 + (wy % 25) * 6, wy + 8)
      ctx.lineTo(540 + (wy % 35) * 5, wy + 8)
      ctx.stroke()
    }

    // Title banner
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)'
    ctx.fillRect(65, 565, 670, 40)
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 15px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('WADUK PENDIDIKAN & SABUK HIJAU KONSERVASI ECO-CAMPUS UNDIP', 400, 590)

  } else if (exhibit.id === 'history-transformation') {
    // Transformasi PTN-BH Visual Grand Certificate
    const certBg = ctx.createLinearGradient(65, 195, 735, 605)
    certBg.addColorStop(0, '#0c1e38')
    certBg.addColorStop(0.5, '#132d56')
    certBg.addColorStop(1, '#091527')
    ctx.fillStyle = certBg
    ctx.fillRect(65, 195, 670, 410)

    // Inner gold border
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.strokeRect(80, 210, 640, 380)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 22px Georgia, serif'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 400, 250)

    ctx.fillStyle = '#ffffff'
    ctx.font = '16px sans-serif'
    ctx.fillText('PERJALANAN TRANSFORMASI KELEMBAGAAN REVOLUSIONER', 400, 280)

    // 3 Step Badges: PTN -> BLU -> PTN-BH
    const milestones = [
      { step: '1961', title: 'PTN', desc: 'PP No. 7 / 1961', col: '#3b82f6' },
      { step: '2008', title: 'BLU', desc: 'KMK 259 / 2008', col: '#10b981' },
      { step: '2015', title: 'PTN-BH', desc: 'PP 81/2014 & 52/2015', col: '#d4af37' },
    ]
    milestones.forEach((m, idx) => {
      const bx = 160 + idx * 180
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.fillRect(bx - 70, 310, 140, 140)
      ctx.strokeStyle = m.col
      ctx.lineWidth = 2
      ctx.strokeRect(bx - 70, 310, 140, 140)

      ctx.fillStyle = m.col
      ctx.font = 'bold 15px sans-serif'
      ctx.fillText(m.step, bx, 340)
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px Georgia, serif'
      ctx.fillText(m.title, bx, 375)
      ctx.fillStyle = '#cbd5e1'
      ctx.font = '11px sans-serif'
      ctx.fillText(m.desc, bx, 410)
    })

    // QS Employability No. 1 banner
    ctx.fillStyle = '#f59e0b'
    ctx.font = 'bold 16px Georgia, serif'
    ctx.fillText('★ PERINGKAT #1 INDONESIA: LULUSAN TERCEPAT MENDAPAT KERJA ★', 400, 490)
    ctx.fillStyle = '#94a3b8'
    ctx.font = 'italic 13px sans-serif'
    ctx.fillText('QS Graduate Employability Rankings & World Class University', 400, 515)

    // Title banner
    ctx.fillStyle = 'rgba(11, 29, 58, 0.95)'
    ctx.fillRect(65, 565, 670, 40)
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 15px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('DOKUMENTASI RESMI STATUS PTN-BH UNIVERSITAS DIPONEGORO', 400, 590)

  } else if (exhibit.category === 'decree' || exhibit.category === 'archive') {
    // Generic Government / Notary Document Layout
    ctx.fillStyle = '#222'
    ctx.font = 'bold 22px "Times New Roman", serif'
    ctx.fillText('LEMBARAN NEGARA REPUBLIK INDONESIA', 400, 240)
    ctx.font = '16px "Times New Roman", serif'
    ctx.fillText('SALINAN RESMI ARSIP NEGARA & STATUTA YAYASAN', 400, 268)

    ctx.strokeStyle = '#888'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(100, 285)
    ctx.lineTo(700, 285)
    ctx.stroke()

    // Document lines simulation
    ctx.textAlign = 'left'
    ctx.fillStyle = '#444'
    ctx.font = '15px "Courier New", monospace'
    const docLines = [
      'Menimbang  : Bahwa perlu didirikan perguruan tinggi di Semarang',
      'Mengingat  : Aspirasi masjarakat Djawa Tengah dan para tjendekiawan',
      'MEMUTUSKAN : Mengesahkan berdirinja Universitas Diponegoro',
      'Pasal 1    : Terhitung sedjak 15 Oktober 1957 diresmikan sebagai PTN',
      'Pasal 2    : Membina insan akademis berkarakter patriotik & mandiri',
      'Ditetapkan : Djakarta, ditandatangani oleh Presiden Republik Indonesia',
    ]
    docLines.forEach((line, idx) => {
      ctx.fillText(line, 90, 330 + idx * 34)
    })

    // Red Official Wax Seal
    ctx.fillStyle = '#a61c1c'
    ctx.beginPath()
    ctx.arc(630, 510, 48, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('SEGEL RESMI', 630, 506)
    ctx.fillText('REPUBLIK INDONESIA', 630, 520)

  } else if (exhibit.id === 'artwork-diponegoro-center') {
    // Monumental Painting: Pangeran Diponegoro on White Horse
    const skyGrad = ctx.createLinearGradient(60, 190, 60, 610)
    skyGrad.addColorStop(0, '#1c2840')
    skyGrad.addColorStop(0.5, '#9e5a32')
    skyGrad.addColorStop(1, '#e39d48')
    ctx.fillStyle = skyGrad
    ctx.fillRect(65, 195, 670, 410)

    // Rising golden sun
    ctx.fillStyle = '#fff4bd'
    ctx.beginPath()
    ctx.arc(400, 390, 85, 0, Math.PI * 2)
    ctx.fill()

    // Heroic White Horse (Kuda Putih) silhouette & hero
    ctx.fillStyle = '#f8fafc'
    // Horse body
    ctx.beginPath()
    ctx.ellipse(380, 420, 105, 65, -0.3, 0, Math.PI * 2)
    ctx.fill()
    // Horse rearing neck & head
    ctx.beginPath()
    ctx.moveTo(330, 410)
    ctx.lineTo(290, 310)
    ctx.lineTo(270, 305)
    ctx.lineTo(260, 325)
    ctx.lineTo(310, 430)
    ctx.closePath()
    ctx.fill()
    // Flowing white mane
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(290, 310)
    ctx.quadraticCurveTo(320, 330, 335, 390)
    ctx.quadraticCurveTo(315, 360, 290, 310)
    ctx.fill()

    // Pangeran Diponegoro with White Robe & White Sorban
    ctx.fillStyle = '#f1efe8'
    ctx.beginPath()
    ctx.arc(365, 315, 26, 0, Math.PI * 2) // Sorban
    ctx.fill()
    ctx.fillRect(350, 335, 45, 65) // Robe body

    // Golden Keris Pusaka raised high
    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(385, 330)
    ctx.lineTo(440, 260)
    ctx.stroke()
    // Keris flame aura
    ctx.fillStyle = '#ffcc00'
    ctx.beginPath()
    ctx.arc(445, 255, 10, 0, Math.PI * 2)
    ctx.fill()

    // Painting Plaque
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
    ctx.fillRect(65, 565, 670, 40)
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 15px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('LUKISAN INDUK SEJARAH • API PERJUANGAN PANGERAN DIPONEGORO', 400, 590)

  } else if (exhibit.id === 'history-muladi-dome') {
    // Gedung Muladi Dome Architectural Illustration
    const sky = ctx.createLinearGradient(60, 190, 60, 610)
    sky.addColorStop(0, '#10294d')
    sky.addColorStop(1, '#2c5d96')
    ctx.fillStyle = sky
    ctx.fillRect(65, 195, 670, 410)

    // Rotunda Lower Glass Cylinder
    ctx.fillStyle = 'rgba(180, 215, 245, 0.75)'
    ctx.fillRect(160, 380, 480, 150)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.strokeRect(160, 380, 480, 150)

    // Colonnade Fins
    ctx.fillStyle = '#ffffff'
    for (let x = 180; x <= 620; x += 40) {
      ctx.fillRect(x, 380, 10, 150)
    }

    // Monumental Champagne Gold Dome
    const domeGrad = ctx.createRadialGradient(400, 310, 20, 400, 350, 190)
    domeGrad.addColorStop(0, '#fff2c6')
    domeGrad.addColorStop(0.5, '#d4af37')
    domeGrad.addColorStop(1, '#8f6e1b')
    ctx.fillStyle = domeGrad
    ctx.beginPath()
    ctx.arc(400, 380, 185, Math.PI, 0)
    ctx.fill()
    ctx.strokeStyle = '#ffeaa7'
    ctx.lineWidth = 4
    ctx.stroke()

    // Oculus Lantern
    ctx.fillStyle = '#ffeaa7'
    ctx.fillRect(375, 180, 50, 25)
    ctx.beginPath()
    ctx.arc(400, 180, 25, Math.PI, 0)
    ctx.fill()

    // Title banner
    ctx.fillStyle = 'rgba(11, 29, 58, 0.9)'
    ctx.fillRect(65, 565, 670, 40)
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 16px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('GEDUNG MULADI DOME • CONVENTION & EXPO HALL TERBESAR UNDIP', 400, 590)

  } else if (exhibit.id === 'history-widya-puraya') {
    // Widya Puraya Menara & Rektorat
    const bg = ctx.createLinearGradient(60, 190, 60, 610)
    bg.addColorStop(0, '#2d3748')
    bg.addColorStop(1, '#4a5568')
    ctx.fillStyle = bg
    ctx.fillRect(65, 195, 670, 410)

    // Central Tower
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(350, 240, 100, 300)
    // Tower Clock
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(400, 290, 28, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.stroke()
    // Golden Pyramid Roof
    ctx.fillStyle = '#d4af37'
    ctx.beginPath()
    ctx.moveTo(330, 240)
    ctx.lineTo(400, 180)
    ctx.lineTo(470, 240)
    ctx.closePath()
    ctx.fill()

    // Flanking Administrative Wings
    ctx.fillStyle = '#cbd5e1'
    ctx.fillRect(180, 360, 440, 180)
    ctx.fillStyle = '#94a3b8'
    for (let r = 200; r < 600; r += 32) {
      ctx.fillRect(r, 380, 18, 140)
    }

    ctx.fillStyle = 'rgba(11, 29, 58, 0.9)'
    ctx.fillRect(65, 565, 670, 40)
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 15px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('GEDUNG WIDYA PURAYA • PUSAT ADMINISTRASI & SEREMONIAL TEMBALANG', 400, 590)

  } else {
    // Vintage Campus Photo Layout
    const photoGrad = ctx.createLinearGradient(60, 190, 740, 610)
    photoGrad.addColorStop(0, '#534538')
    photoGrad.addColorStop(0.5, '#7d6954')
    photoGrad.addColorStop(1, '#44372c')
    ctx.fillStyle = photoGrad
    ctx.fillRect(65, 195, 670, 410)

    // Sepia architectural silhouette of early campus buildings (Pleburan / Panti Budaya)
    ctx.fillStyle = '#2d241c'
    // Building columns and roof
    ctx.fillRect(100, 360, 590, 200)
    for (let c = 120; c < 680; c += 55) {
      ctx.fillStyle = '#c5b49d'
      ctx.fillRect(c, 380, 24, 180)
    }
    // Classical pediment triangle roof
    ctx.fillStyle = '#3a2e24'
    ctx.beginPath()
    ctx.moveTo(80, 360)
    ctx.lineTo(395, 250)
    ctx.lineTo(710, 360)
    ctx.closePath()
    ctx.fill()

    // Photo caption
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(65, 565, 670, 40)
    ctx.fillStyle = '#f5eedb'
    ctx.font = 'italic 16px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText(exhibit.title, 400, 590)
  }

  // Summary Text Section below the document box
  ctx.textAlign = 'left'
  ctx.fillStyle = '#1a1815'
  ctx.font = 'bold 22px Georgia, serif'
  ctx.fillText('Keterangan Dokumen & Catatan Sejarah:', 65, 660)

  ctx.fillStyle = '#3d372e'
  ctx.font = '17px system-ui, sans-serif'
  const descWords = exhibit.description.split(' ')
  let line = ''
  let curY = 695
  for (let w of descWords) {
    const testLine = line + w + ' '
    if (ctx.measureText(testLine).width > 670) {
      ctx.fillText(line, 65, curY)
      line = w + ' '
      curY += 26
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, 65, curY)

  // Bullet highlights
  if (exhibit.highlights) {
    curY += 20
    ctx.fillStyle = '#0b1d3a'
    ctx.font = 'bold 18px Georgia, serif'
    ctx.fillText('Poin Penting Sejarah:', 65, curY)
    curY += 28

    ctx.fillStyle = '#2d251d'
    ctx.font = '15px system-ui, sans-serif'
    exhibit.highlights.forEach((hl) => {
      ctx.fillStyle = '#d4af37'
      ctx.fillText('✦', 65, curY)
      ctx.fillStyle = '#2d251d'
      ctx.fillText(hl, 85, curY)
      curY += 26
    })
  }

  // Bottom Footer Gold Bar
  ctx.fillStyle = '#d4af37'
  ctx.fillRect(60, 930, 680, 2)
  ctx.fillStyle = '#8c7d67'
  ctx.font = 'italic 14px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('Koleksi Arsip & Dokumentasi Sejarah Universitas Diponegoro', 400, 960)

  return canvas
}

export function createHistoryPanelTexture(exhibit: HistoryExhibit): THREE.CanvasTexture {
  return assetCache.getTexture(`history-panel-${exhibit.id}`, () => {
    return toTexture(createHistoryPanelCanvas(exhibit))
  })
}

export function createHistoryDataURL(exhibit: HistoryExhibit): string {
  return createHistoryPanelCanvas(exhibit).toDataURL('image/jpeg', 0.88)
}

/** Universitas Diponegoro Emblem / Seal Texture for the Ceremonial Podium */
export function createPodiumSealTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('podium-seal', () => {
    const [canvas, ctx] = makeCanvas(512, 512)

    // Transparent / circular gold brass medallion
    ctx.clearRect(0, 0, 512, 512)

    // Outer medallion ring
    ctx.fillStyle = '#d4af37'
    ctx.beginPath()
    ctx.arc(256, 256, 240, 0, Math.PI * 2)
    ctx.fill()

    // Inner navy blue inlay
    ctx.fillStyle = '#0b1d3a'
    ctx.beginPath()
    ctx.arc(256, 256, 215, 0, Math.PI * 2)
    ctx.fill()

    // Fine gold trim
    ctx.strokeStyle = '#f5da77'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(256, 256, 200, 0, Math.PI * 2)
    ctx.stroke()

    // Iconic Diponegoro Silhouette on Horseback / Crest
    ctx.fillStyle = '#d4af37'
    ctx.beginPath()
    // Rearing steed and hero figure
    ctx.arc(256, 230, 70, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.font = 'bold 24px "Times New Roman", Georgia, serif'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 256, 120)

    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 18px "Times New Roman", Georgia, serif'
    ctx.fillText('SEMARANG • 1957', 256, 390)

    ctx.fillStyle = '#f8f4eb'
    ctx.font = 'italic 16px Georgia, serif'
    ctx.fillText('"Tetap Jaya, Makin Jaya"', 256, 420)

    return toTexture(canvas)
  })
}

/** 3D Miniature Campus Map Layout Texture for Undip Tembalang */
export function createCampusMiniatureTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('campus-miniature', () => {
    const [canvas, ctx] = makeCanvas(1024, 1024)

    // Lush green campus lawns & topography
    const terrain = ctx.createLinearGradient(0, 0, 1024, 1024)
    terrain.addColorStop(0, '#2c4728')
    terrain.addColorStop(0.5, '#355330')
    terrain.addColorStop(1, '#273f24')
    ctx.fillStyle = terrain
    ctx.fillRect(0, 0, 1024, 1024)

    // Campus Reservoir / Lake (Waduk Undip)
    ctx.fillStyle = '#1f4863'
    ctx.beginPath()
    ctx.ellipse(340, 480, 130, 85, 0.4, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#32719c'
    ctx.lineWidth = 3
    ctx.stroke()

    // Ring Roads & Boulevard (Jl. Prof. Soedarto)
    ctx.strokeStyle = '#4a4843'
    ctx.lineWidth = 24
    ctx.beginPath()
    ctx.arc(512, 512, 360, 0, Math.PI * 2)
    ctx.stroke()

    // Cross boulevard
    ctx.beginPath()
    ctx.moveTo(512, 80)
    ctx.lineTo(512, 944)
    ctx.moveTo(80, 512)
    ctx.lineTo(944, 512)
    ctx.stroke()

    // Road lane markings
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.setLineDash([8, 8])
    ctx.beginPath()
    ctx.arc(512, 512, 360, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Central Landmark: GEDUNG MULADI DOME (Primary Campus Centerpiece)
    ctx.fillStyle = '#223d63'
    ctx.beginPath()
    ctx.arc(512, 530, 95, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 5
    ctx.stroke()

    // Inner concentric ring of Muladi Dome rotunda
    ctx.fillStyle = '#c59f48'
    ctx.beginPath()
    ctx.arc(512, 530, 68, 0, Math.PI * 2)
    ctx.fill()

    // Center Dome skylight
    ctx.fillStyle = '#f8f4eb'
    ctx.beginPath()
    ctx.arc(512, 530, 24, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#1b3b5a'
    ctx.lineWidth = 2
    ctx.stroke()

    // Radial structural ribs
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(512 + Math.cos(a) * 24, 530 + Math.sin(a) * 24)
      ctx.lineTo(512 + Math.cos(a) * 68, 530 + Math.sin(a) * 68)
      ctx.stroke()
    }

    // Label for Muladi Dome
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 16px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('MULADI DOME', 512, 650)

    // Widya Puraya Quadrangle (North of Muladi Dome)
    ctx.fillStyle = '#9e8971'
    ctx.fillRect(452, 310, 120, 110)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.strokeRect(452, 310, 120, 110)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 13px Georgia, serif'
    ctx.fillText('WIDYA PURAYA', 512, 370)

    // Miniature Building Plots (Faculties)
    const faculties = [
      { name: 'Teknik', x: 180, y: 220, w: 120, h: 90, color: '#133966' },
      { name: 'Hukum', x: 720, y: 220, w: 110, h: 80, color: '#591820' },
      { name: 'FEB', x: 200, y: 720, w: 110, h: 80, color: '#4a3b22' },
      { name: 'Kedokteran / RSND', x: 670, y: 700, w: 150, h: 90, color: '#18593e' },
      { name: 'FSM', x: 140, y: 460, w: 90, h: 70, color: '#1f466d' },
      { name: 'FISIP', x: 790, y: 460, w: 90, h: 70, color: '#63311c' },
      { name: 'FPIK / FPP', x: 170, y: 340, w: 100, h: 75, color: '#25523b' },
      { name: 'FIB / Psikologi', x: 750, y: 330, w: 105, h: 75, color: '#4e284a' },
      { name: 'Stadium Undip', x: 490, y: 790, w: 150, h: 80, color: '#526649' },
    ]

    faculties.forEach((f) => {
      ctx.fillStyle = f.color
      ctx.fillRect(f.x, f.y, f.w, f.h)
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 2
      ctx.strokeRect(f.x, f.y, f.w, f.h)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 15px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(f.name, f.x + f.w / 2, f.y + f.h / 2 + 5)
    })

    // Center Widya Puraya Label
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 16px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('WIDYA PURAYA', 512, 520)

    // Compass Rose
    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 20px serif'
    ctx.fillText('U', 920, 120)
    ctx.beginPath()
    ctx.moveTo(920, 130)
    ctx.lineTo(928, 160)
    ctx.lineTo(920, 150)
    ctx.lineTo(912, 160)
    ctx.closePath()
    ctx.fill()

    // Title on Map Corner
    ctx.fillStyle = 'rgba(11, 29, 58, 0.9)'
    ctx.fillRect(50, 50, 360, 65)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.strokeRect(50, 50, 360, 65)

    ctx.fillStyle = '#f8f4eb'
    ctx.font = 'bold 16px Georgia, serif'
    ctx.textAlign = 'left'
    ctx.fillText('MAKET KAWASAN KAMPUS UNDIP', 65, 80)
    ctx.fillStyle = '#d4af37'
    ctx.font = '13px sans-serif'
    ctx.fillText('Tembalang & Pleburan • Skala Model Arsitektural', 65, 100)

    return toTexture(canvas)
  })
}

/** Grand Back-Wall Plaque Texture with Golden Inscription */
export function createGrandPlaqueTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('grand-plaque', () => {
    const [canvas, ctx] = makeCanvas(1200, 700)

    // Heritage dark teak background
    ctx.fillStyle = '#1f130b'
    ctx.fillRect(0, 0, 1200, 700)

    // Ornate double gold borders
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 8
    ctx.strokeRect(24, 24, 1152, 652)
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)'
    ctx.lineWidth = 2
    ctx.strokeRect(40, 40, 1120, 620)

    // Corner decorative flourishes
    const corners = [
      [40, 40],
      [1160, 40],
      [40, 660],
      [1160, 660],
    ]
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#d4af37'
      ctx.beginPath()
      ctx.arc(cx, cy, 14, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.textAlign = 'center'
    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillText('MEMORIAL HALL & ARCHIVES', 600, 160)

    ctx.fillStyle = '#f8f4eb'
    fitFont(ctx, 'MUSEUM VIRTUAL UNIVERSITAS DIPONEGORO', 'Georgia, serif', 'bold', 'normal', 1050, 52, 30)
    ctx.fillText('MUSEUM VIRTUAL UNIVERSITAS DIPONEGORO', 600, 240)

    ctx.fillStyle = '#d4af37'
    ctx.font = 'italic 28px Georgia, serif'
    ctx.fillText('Sayap Tokoh Pendiri • Sayap Sejarah & Arsip Resmi', 600, 310)

    ctx.fillStyle = '#dcd4c3'
    ctx.font = '18px system-ui, sans-serif'
    ctx.fillText('Diresmikan sebagai bentuk penghormatan atas dedikasi para pendiri sejak 1956', 600, 400)
    ctx.fillText('serta pelestarian warisan nilai patriotik Pangeran Diponegoro.', 600, 435)

    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 22px Georgia, serif'
    ctx.fillText('"Pernah Jaya, Tetap Jaya, Makin Jaya"', 600, 520)

    ctx.fillStyle = '#a6906d'
    ctx.font = '15px sans-serif'
    ctx.fillText('Semarang, Jawa Tengah • Dies Natalis 15 Oktober 1957', 600, 570)

    return toTexture(canvas)
  })
}

/** Official Portrait Canvas for President of the Republic of Indonesia */
export function createPresidentTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('pres-texture', () => {
    const [canvas, ctx] = makeCanvas(500, 650)
    ctx.fillStyle = '#b71c1c'
    ctx.fillRect(0, 0, 250, 650)
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(250, 0, 250, 650)

    const vig = ctx.createRadialGradient(250, 325, 100, 250, 325, 420)
    vig.addColorStop(0, 'rgba(0,0,0,0.15)')
    vig.addColorStop(1, 'rgba(0,0,0,0.65)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, 500, 650)

    ctx.fillStyle = '#111111'
    ctx.beginPath()
    ctx.ellipse(250, 600, 180, 160, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(250, 330)
    ctx.lineTo(215, 430)
    ctx.lineTo(285, 430)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#c62828'
    ctx.beginPath()
    ctx.moveTo(242, 380)
    ctx.lineTo(258, 380)
    ctx.lineTo(265, 520)
    ctx.lineTo(250, 550)
    ctx.lineTo(235, 520)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 14
    ctx.beginPath()
    ctx.moveTo(140, 620)
    ctx.lineTo(340, 360)
    ctx.stroke()

    ctx.fillStyle = '#d7a77d'
    ctx.beginPath()
    ctx.ellipse(250, 240, 75, 95, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#111111'
    ctx.fillRect(175, 130, 150, 65)

    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 6
    ctx.strokeRect(16, 16, 468, 618)

    ctx.fillStyle = 'rgba(11, 29, 58, 0.92)'
    ctx.fillRect(30, 550, 440, 70)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.strokeRect(32, 552, 436, 66)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 20px Georgia, serif'
    ctx.fillText('PRESIDEN', 250, 580)
    ctx.fillStyle = '#ffd700'
    ctx.font = '14px sans-serif'
    ctx.fillText('REPUBLIK INDONESIA', 250, 604)

    return toTexture(canvas)
  })
}

/** Official Portrait Canvas for Vice-President of the Republic of Indonesia */
export function createVicePresidentTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('vp-texture', () => {
    const [canvas, ctx] = makeCanvas(500, 650)
    ctx.fillStyle = '#b71c1c'
    ctx.fillRect(0, 0, 250, 650)
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(250, 0, 250, 650)

    const vig = ctx.createRadialGradient(250, 325, 100, 250, 325, 420)
    vig.addColorStop(0, 'rgba(0,0,0,0.15)')
    vig.addColorStop(1, 'rgba(0,0,0,0.65)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, 500, 650)

    ctx.fillStyle = '#111111'
    ctx.beginPath()
    ctx.ellipse(250, 600, 180, 160, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(250, 330)
    ctx.lineTo(215, 430)
    ctx.lineTo(285, 430)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#1565c0'
    ctx.beginPath()
    ctx.moveTo(242, 380)
    ctx.lineTo(258, 380)
    ctx.lineTo(265, 520)
    ctx.lineTo(250, 550)
    ctx.lineTo(235, 520)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = '#d7a77d'
    ctx.beginPath()
    ctx.ellipse(250, 240, 75, 95, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#111111'
    ctx.fillRect(175, 130, 150, 65)

    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 6
    ctx.strokeRect(16, 16, 468, 618)

    ctx.fillStyle = 'rgba(11, 29, 58, 0.92)'
    ctx.fillRect(30, 550, 440, 70)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.strokeRect(32, 552, 436, 66)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 20px Georgia, serif'
    ctx.fillText('WAKIL PRESIDEN', 250, 580)
    ctx.fillStyle = '#ffd700'
    ctx.font = '14px sans-serif'
    ctx.fillText('REPUBLIK INDONESIA', 250, 604)

    return toTexture(canvas)
  })
}

/** Quilted PVC Diamond Lattice Texture for the Coffered Ceiling */
export function createPvcDiamondLatticeTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('pvc-diamond-lattice', () => {
    const [canvas, ctx] = makeCanvas(1024, 1024)

    ctx.fillStyle = '#faf8f2'
    ctx.fillRect(0, 0, 1024, 1024)

    const gridStep = 64
    ctx.strokeStyle = '#e2dac8'
    ctx.lineWidth = 3

    for (let d = -1024; d <= 2048; d += gridStep) {
      ctx.beginPath()
      ctx.moveTo(d, 0)
      ctx.lineTo(d + 1024, 1024)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(d, 1024)
      ctx.lineTo(d + 1024, 0)
      ctx.stroke()
    }

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)'
    ctx.lineWidth = 1.5
    for (let d = -1024; d <= 2048; d += gridStep) {
      ctx.beginPath()
      ctx.moveTo(d, 0)
      ctx.lineTo(d + 1024, 1024)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(d, 1024)
      ctx.lineTo(d + 1024, 0)
      ctx.stroke()
    }

    const sheen = ctx.createRadialGradient(512, 512, 120, 512, 512, 600)
    sheen.addColorStop(0, 'rgba(255, 245, 220, 0.22)')
    sheen.addColorStop(1, 'rgba(230, 220, 200, 0)')
    ctx.fillStyle = sheen
    ctx.fillRect(0, 0, 1024, 1024)

    return toTexture(canvas)
  })
}

/** Legacy Compatibility helpers */
export function createPortraitTexture(portrait: { id: string; name: string; years: string }): THREE.CanvasTexture {
  return createFounderPortraitTexture({
    id: portrait.id,
    name: portrait.name,
    title: 'Tokoh Universitas Diponegoro',
    years: portrait.years,
    role: '',
    description: '',
  }, 0)
}

export function createPortraitDataURL(portrait: { id: string; name: string; years: string }): string {
  return createFounderDataURL({
    id: portrait.id,
    name: portrait.name,
    title: 'Tokoh Universitas Diponegoro',
    years: portrait.years,
    role: '',
    description: '',
  }, 0)
}

export function createLabelTexture(portrait: { name: string; years: string }): THREE.CanvasTexture {
  const [canvas, ctx] = makeCanvas(640, 220)
  ctx.fillStyle = '#efe6d5'
  ctx.fillRect(0, 0, 640, 220)
  ctx.strokeStyle = '#a9803f'
  ctx.lineWidth = 5
  ctx.strokeRect(10, 10, 620, 200)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#2a2018'
  fitFont(ctx, portrait.name, 'Georgia, serif', 'bold', 'normal', 560, 48, 26)
  ctx.fillText(portrait.name, 320, 95)
  ctx.fillStyle = '#7c5c2c'
  fitFont(ctx, portrait.years, 'Georgia, serif', 'normal', 'italic', 560, 32, 20)
  ctx.fillText(portrait.years, 320, 158)
  return toTexture(canvas)
}

/** Official Prasasti Pendirian & Peresmian Universitas Diponegoro (Polished Black Marble & Gilded Gold) */
export function createPrasastiTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('undip-prasasti-texture', () => {
    const [canvas, ctx] = makeCanvas(1024, 1360)

    // 1. Polished Nero Marquina / Black Obsidian Granite Slab
    const grad = ctx.createLinearGradient(0, 0, 1024, 1360)
    grad.addColorStop(0, '#101318')
    grad.addColorStop(0.5, '#161a22')
    grad.addColorStop(1, '#0e1116')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 1024, 1360)

    // Subtle dark marble crystalline flecks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
    for (let i = 0; i < 400; i++) {
      const rx = (i * 97) % 1024
      const ry = (i * 131) % 1360
      ctx.fillRect(rx, ry, 2, 2)
    }

    // 2. Ornate Gilded Gold Outer & Inner Frame
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 8
    ctx.strokeRect(36, 36, 952, 1288)

    ctx.strokeStyle = 'rgba(245, 218, 119, 0.6)'
    ctx.lineWidth = 2.5
    ctx.strokeRect(52, 52, 920, 1256)

    // Corner rosettes
    const corners = [
      [52, 52],
      [972, 52],
      [52, 1308],
      [972, 1308],
    ]
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#f5da77'
      ctx.beginPath()
      ctx.arc(cx, cy, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 3
      ctx.stroke()
    })

    // 3. Top Header: Golden Emblem & Inscription
    ctx.textAlign = 'center'

    ctx.fillStyle = '#d4af37'
    ctx.beginPath()
    ctx.arc(512, 160, 48, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#122644'
    ctx.beginPath()
    ctx.arc(512, 160, 42, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffd966'
    ctx.font = 'bold 36px Georgia, serif'
    ctx.fillText('🏛️', 512, 172)

    // Sub-heading
    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 24px Georgia, serif'
    ctx.letterSpacing = '0.08em'
    ctx.fillText('PRASASTI PENDIRIAN & PERESMIAN', 512, 255)

    // Main University Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 44px "Times New Roman", Georgia, serif'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 512, 315)

    ctx.fillStyle = '#ffd966'
    ctx.font = 'italic 20px Georgia, serif'
    ctx.fillText('Semarang, Jawa Tengah • Berdiri 9 Januari 1957', 512, 355)

    // Decorative Gold Horizontal Inlay Divider
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(180, 390)
    ctx.lineTo(844, 390)
    ctx.stroke()
    ctx.fillStyle = '#f5da77'
    ctx.beginPath()
    ctx.arc(512, 390, 8, 0, Math.PI * 2)
    ctx.fill()

    // 4. Inscription Body Text (Gilded Serif Engraved Script)
    const textLines = [
      'DENGAN RAHMAT TUHAN YANG MAHA ESA',
      '',
      'Universitas Diponegoro dirintis pada tanggal 9 Januari 1957',
      'oleh para tokoh pejuang dan cendekiawan Jawa Tengah',
      'sebagai wujud tekad mencerdaskan kehidupan bangsa.',
      '',
      'Pada tanggal 9 Januari 1960, Presiden Republik Indonesia Pertama,',
      'Ir. SOEKARNO, secara resmi menganugerahkan nama luhur',
      '"UNIVERSITAS DIPONEGORO"',
      'sebagai perlambang keberanian, kejujuran, dan jiwa patriotik.',
      '',
      'Ditegaskan sebagai Perguruan Tinggi Negeri melalui',
      'Peraturan Pemerintah Republik Indonesia No. 7 Tahun 1961,',
      'bermartabat sebagai pusat keunggulan riset, kebudayaan luhur,',
      'serta pengabdian bagi kemandirian dan martabat bangsa.',
    ]

    let curY = 445
    ctx.fillStyle = '#f3eedd'
    textLines.forEach((line) => {
      if (line === '') {
        curY += 18
      } else if (line.startsWith('"UNIVERSITAS') || line === 'DENGAN RAHMAT TUHAN YANG MAHA ESA') {
        ctx.fillStyle = '#ffd966'
        ctx.font = 'bold 23px "Times New Roman", Georgia, serif'
        ctx.fillText(line, 512, curY)
        curY += 34
      } else {
        ctx.fillStyle = '#ede3ce'
        ctx.font = '20px Georgia, serif'
        ctx.fillText(line, 512, curY)
        curY += 32
      }
    })

    // Motto Section
    curY += 24
    ctx.fillStyle = '#223d6a'
    ctx.fillRect(220, curY, 584, 62)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2.5
    ctx.strokeRect(220, curY, 584, 62)

    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold italic 27px Georgia, serif'
    ctx.fillText('"Pernah Jaya, Tetap Jaya, Makin Jaya"', 512, curY + 41)

    // Signatures / Presidium Footer
    curY += 125
    ctx.fillStyle = '#f5da77'
    ctx.font = 'bold 18px Georgia, serif'
    ctx.fillText('DEWAN PRESIDIUM PENDIRI & PIMPINAN UNIVERSITAS', 512, curY)

    curY += 35
    ctx.fillStyle = '#ffffff'
    ctx.font = '17px Georgia, serif'
    ctx.fillText('Mr. Soedarto  •  Mr. Imam Bardjo  •  Mr. Dan Sulaiman', 512, curY)

    curY += 30
    ctx.fillStyle = '#d4af37'
    ctx.font = 'italic 16px Georgia, serif'
    ctx.fillText('Dies Natalis Diperingati Setiap Tanggal 15 Oktober', 512, curY)

    return toTexture(canvas)
  })
}

/** Official Undip Emblem with High Contrast Gilded Medallion & Laurel Wreath for Back Wall */
export function createUndipEmblemFullTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('undip-emblem-full', () => {
    const [canvas, ctx] = makeCanvas(1024, 1024)

    // Transparent clear background
    ctx.clearRect(0, 0, 1024, 1024)

    // Radiant Golden Sunburst back-glow
    const sunGrad = ctx.createRadialGradient(512, 512, 200, 512, 512, 500)
    sunGrad.addColorStop(0, 'rgba(255, 220, 100, 0.45)')
    sunGrad.addColorStop(0.7, 'rgba(212, 175, 55, 0.25)')
    sunGrad.addColorStop(1, 'rgba(212, 175, 55, 0)')
    ctx.fillStyle = sunGrad
    ctx.fillRect(0, 0, 1024, 1024)

    // Outer Gilded Lotus Rim
    ctx.fillStyle = '#d4af37'
    ctx.beginPath()
    ctx.arc(512, 512, 470, 0, Math.PI * 2)
    ctx.fill()

    // Outer Gold Step Bevel
    ctx.strokeStyle = '#fff0a6'
    ctx.lineWidth = 10
    ctx.stroke()

    // Royal Blue Deep Enamel Core
    ctx.fillStyle = '#122f5d'
    ctx.beginPath()
    ctx.arc(512, 512, 420, 0, Math.PI * 2)
    ctx.fill()

    // Inner Gold Accent Ring
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(512, 512, 380, 0, Math.PI * 2)
    ctx.stroke()

    // Laurel Wreath Leaves (Left & Right)
    ctx.fillStyle = '#f5da77'
    for (let angle = 0.5; angle < 2.65; angle += 0.2) {
      const lx = 512 - Math.sin(angle) * 330
      const ly = 512 + Math.cos(angle) * 330
      ctx.beginPath()
      ctx.ellipse(lx, ly, 22, 11, -angle, 0, Math.PI * 2)
      ctx.fill()

      const rx = 512 + Math.sin(angle) * 330
      const ry = 512 + Math.cos(angle) * 330
      ctx.beginPath()
      ctx.ellipse(rx, ry, 22, 11, angle, 0, Math.PI * 2)
      ctx.fill()
    }

    // Diponegoro Heroic Steed & Rider Golden Silhouette (Center Crest)
    ctx.fillStyle = '#ffd966'
    ctx.beginPath()
    ctx.arc(512, 490, 120, 0, Math.PI * 2)
    ctx.fill()

    // Gilded Undip Pentagonal Star
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(512, 340, 28, 0, Math.PI * 2)
    ctx.fill()

    // Circular Typography around Upper Rim
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.font = 'bold 36px "Times New Roman", Georgia, serif'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 512, 200)

    ctx.fillStyle = '#ffd966'
    ctx.font = 'bold 26px "Times New Roman", Georgia, serif'
    ctx.fillText('SEMARANG • 1957', 512, 750)

    // Motto Banner
    ctx.fillStyle = '#10223d'
    ctx.fillRect(280, 790, 464, 52)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.strokeRect(280, 790, 464, 52)

    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold italic 22px Georgia, serif'
    ctx.fillText('TETAP JAYA, MAKIN JAYA', 512, 825)

    return toTexture(canvas)
  })
}

/** Data URL generator for Prasasti preview in the information panel */
export function createPrasastiDataURL(): string {
  const [canvas, ctx] = makeCanvas(800, 1060)

  const grad = ctx.createLinearGradient(0, 0, 800, 1060)
  grad.addColorStop(0, '#101318')
  grad.addColorStop(0.5, '#161a22')
  grad.addColorStop(1, '#0e1116')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 800, 1060)

  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 6
  ctx.strokeRect(28, 28, 744, 1004)

  ctx.strokeStyle = 'rgba(245, 218, 119, 0.6)'
  ctx.lineWidth = 2
  ctx.strokeRect(40, 40, 720, 980)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#d4af37'
  ctx.font = 'bold 20px Georgia, serif'
  ctx.fillText('PRASASTI PENDIRIAN & PERESMIAN', 400, 140)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 34px "Times New Roman", Georgia, serif'
  ctx.fillText('UNIVERSITAS DIPONEGORO', 400, 190)

  ctx.fillStyle = '#ffd966'
  ctx.font = 'italic 16px Georgia, serif'
  ctx.fillText('Semarang, Jawa Tengah • 9 Januari 1957', 400, 225)

  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.moveTo(120, 255)
  ctx.lineTo(680, 255)
  ctx.stroke()

  const lines = [
    'DENGAN RAHMAT TUHAN YANG MAHA ESA',
    '',
    'Pada tanggal 9 Januari 1957 diresmikan berdirinya Universitas Semarang,',
    'yang kemudian dianugerahi nama kehormatan',
    '"UNIVERSITAS DIPONEGORO"',
    'oleh Presiden Republik Indonesia Pertama, Ir. SOEKARNO.',
    '',
    'Ditegaskan sebagai Perguruan Tinggi Negeri',
    'berdasarkan Peraturan Pemerintah No. 7 Tahun 1961.',
  ]

  let curY = 320
  lines.forEach((line) => {
    if (line === '') curY += 16
    else if (line.startsWith('"UNIVERSITAS') || line === 'DENGAN RAHMAT TUHAN YANG MAHA ESA') {
      ctx.fillStyle = '#ffd966'
      ctx.font = 'bold 18px "Times New Roman", Georgia, serif'
      ctx.fillText(line, 400, curY)
      curY += 32
    } else {
      ctx.fillStyle = '#f3eedd'
      ctx.font = '16px Georgia, serif'
      ctx.fillText(line, 400, curY)
      curY += 28
    }
  })

  curY += 35
  ctx.fillStyle = '#1e3860'
  ctx.fillRect(160, curY, 480, 56)
  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 2
  ctx.strokeRect(160, curY, 480, 56)

  ctx.fillStyle = '#ffd700'
  ctx.font = 'bold italic 22px Georgia, serif'
  ctx.fillText('"Pernah Jaya, Tetap Jaya, Makin Jaya"', 400, curY + 36)

  curY += 120
  ctx.fillStyle = '#d4af37'
  ctx.font = 'bold 15px Georgia, serif'
  ctx.fillText('DEWAN PRESIDIUM PENDIRI', 400, curY)
  curY += 28
  ctx.fillStyle = '#ffffff'
  ctx.font = '14px Georgia, serif'
  ctx.fillText('Mr. Soedarto  •  Mr. Imam Bardjo  •  Mr. Dan Sulaiman', 400, curY)

  return canvas.toDataURL('image/jpeg', 0.9)
}

/** Data URL generator for Monumen Kuda Putih Diponegoro preview */
export function createStatueDataURL(): string {
  const [canvas, ctx] = makeCanvas(800, 1000)

  const grad = ctx.createLinearGradient(0, 0, 800, 1000)
  grad.addColorStop(0, '#10284c')
  grad.addColorStop(0.5, '#163868')
  grad.addColorStop(1, '#0e2240')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 800, 1000)

  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 6
  ctx.strokeRect(30, 30, 740, 940)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffd966'
  ctx.font = 'bold 18px Georgia, serif'
  ctx.fillText('MONUMEN BERSEJARAH', 400, 110)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 32px "Times New Roman", Georgia, serif'
  ctx.fillText('PANGERAN DIPONEGORO', 400, 160)

  ctx.fillStyle = '#ffd700'
  ctx.font = 'italic 22px Georgia, serif'
  ctx.fillText('Sang Ksatria Kuda Putih (Kyai Gitayu)', 400, 200)

  ctx.fillStyle = '#1c447a'
  ctx.beginPath()
  ctx.arc(400, 420, 160, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#d4af37'
  ctx.lineWidth = 4
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.font = '72px sans-serif'
  ctx.fillText('🐎', 400, 445)

  ctx.fillStyle = '#f3f4f6'
  ctx.font = '16px Georgia, serif'
  ctx.fillText('Patung Pangeran Diponegoro menunggangi kuda putih perkasa', 400, 660)
  ctx.fillText('dengan jubah dan sorban putih serta keris pusaka terhunus.', 400, 695)
  ctx.fillText('Simbol keberanian membela kebenaran dan kejujuran ilmiah.', 400, 730)

  ctx.fillStyle = '#ffd966'
  ctx.font = 'bold italic 20px Georgia, serif'
  ctx.fillText('"Tetap Jaya, Makin Jaya"', 400, 820)

  ctx.fillStyle = '#94a3b8'
  ctx.font = '13px sans-serif'
  ctx.fillText('Sudut Monumen Kehormatan • Universitas Diponegoro', 400, 890)

  return canvas.toDataURL('image/jpeg', 0.9)
}

/** High-Resolution Indonesian Flag Texture */
export function createIndonesianFlagTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('flag-indonesia-texture', () => {
    const [canvas, ctx] = makeCanvas(1024, 680)
    // Top Red
    ctx.fillStyle = '#dc2626'
    ctx.fillRect(0, 0, 1024, 340)
    // Bottom White
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 340, 1024, 340)
    // Fine fabric texture simulation
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
    for (let x = 0; x < 1024; x += 4) {
      ctx.fillRect(x, 0, 2, 680)
    }
    return toTexture(canvas)
  })
}

// Shared cached canvas for the official Undip shield logo with 100% background removal
let cachedCleanLogoCanvas: HTMLCanvasElement | null = null
const logoCleanListeners: Array<(canvas: HTMLCanvasElement) => void> = []
let isLogoCleanerLoading = false

export function getCleanOfficialUndipLogo(onReady: (cleanCanvas: HTMLCanvasElement) => void): void {
  if (cachedCleanLogoCanvas) {
    onReady(cachedCleanLogoCanvas)
    return
  }

  logoCleanListeners.push(onReady)
  if (isLogoCleanerLoading) return
  isLogoCleanerLoading = true

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = '/textures/undip-emblem.webp'
  img.onload = () => {
    const w = img.naturalWidth || 800
    const h = img.naturalHeight || 800

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = w
    tempCanvas.height = h
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCtx.clearRect(0, 0, w, h)
    tempCtx.drawImage(img, 0, 0)

    try {
      const imgData = tempCtx.getImageData(0, 0, w, h)
      const d = imgData.data

      // BFS flood-fill from border pixels to erase fake checkerboard / white / gray background
      const visited = new Uint8Array(w * h)
      const queue: number[] = []

      const pushIfBg = (x: number, y: number) => {
        if (x < 0 || x >= w || y < 0 || y >= h) return
        const idx = y * w + x
        if (visited[idx]) return
        visited[idx] = 1

        const pi = idx * 4
        const r = d[pi]
        const g = d[pi + 1]
        const b = d[pi + 2]
        const a = d[pi + 3]

        if (a === 0) {
          queue.push(idx)
          return
        }

        // Checkerboard squares in the uploaded webp are shades of light gray / white:
        const isLightNeutral =
          r > 150 && g > 150 && b > 150 &&
          Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25

        if (isLightNeutral) {
          d[pi + 3] = 0 // transparent
          queue.push(idx)
        }
      }

      // Add 4 outer edges
      for (let x = 0; x < w; x++) {
        pushIfBg(x, 0)
        pushIfBg(x, h - 1)
      }
      for (let y = 0; y < h; y++) {
        pushIfBg(0, y)
        pushIfBg(w - 1, y)
      }

      // Process BFS queue to clear background contiguous to edges
      let qHead = 0
      while (qHead < queue.length) {
        const curr = queue[qHead++]
        const cx = curr % w
        const cy = Math.floor(curr / w)

        const dirs = [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ]
        for (let i = 0; i < 4; i++) {
          const [nx, ny] = dirs[i]
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nidx = ny * w + nx
            if (!visited[nidx]) {
              visited[nidx] = 1
              const npi = nidx * 4
              const r = d[npi]
              const g = d[npi + 1]
              const b = d[npi + 2]
              const a = d[npi + 3]

              if (
                a === 0 ||
                (r > 150 && g > 150 && b > 150 &&
                 Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25)
              ) {
                d[npi + 3] = 0
                queue.push(nidx)
              }
            }
          }
        }
      }

      tempCtx.putImageData(imgData, 0, 0)

      // Find bounding box of remaining non-transparent shield pixels
      let minX = w
      let maxX = 0
      let minY = h
      let maxY = 0
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const a = d[(y * w + x) * 4 + 3]
          if (a > 30) {
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }

      const cleanCanvas = document.createElement('canvas')
      cleanCanvas.width = 1024
      cleanCanvas.height = 1024
      const cleanCtx = cleanCanvas.getContext('2d')
      if (cleanCtx) {
        cleanCtx.clearRect(0, 0, 1024, 1024)
        if (maxX > minX && maxY > minY) {
          const sw = maxX - minX
          const sh = maxY - minY
          const scale = Math.min((1024 - 48) / sw, (1024 - 48) / sh)
          const dw = sw * scale
          const dh = sh * scale
          const dx = (1024 - dw) / 2
          const dy = (1024 - dh) / 2
          cleanCtx.drawImage(tempCanvas, minX, minY, sw, sh, dx, dy, dw, dh)
        } else {
          cleanCtx.drawImage(tempCanvas, 0, 0, 1024, 1024)
        }
      }

      cachedCleanLogoCanvas = cleanCanvas
      while (logoCleanListeners.length > 0) {
        const fn = logoCleanListeners.shift()
        fn?.(cleanCanvas)
      }
    } catch (e) {
      console.warn('Logo cleaner warning:', e)
      cachedCleanLogoCanvas = tempCanvas
      while (logoCleanListeners.length > 0) {
        const fn = logoCleanListeners.shift()
        fn?.(tempCanvas)
      }
    }
  }
}

/** High-Resolution Undip Pataka Flag Texture featuring Official Undip Shield Logo (Zero background / Completely seamless) */
export function createUndipFlagTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('flag-undip-official-logo-clean-v4', () => {
    const [canvas, ctx] = makeCanvas(1024, 680)
    const texture = toTexture(canvas)

    const drawFlagBase = () => {
      // 1. Rich Deep Royal Navy Blue Field
      ctx.fillStyle = '#0e2444'
      ctx.fillRect(0, 0, 1024, 680)

      // 2. Gold Fringe Border (Authentic ceremonial pataka flag fringe)
      ctx.strokeStyle = '#ffd700'
      ctx.lineWidth = 14
      ctx.strokeRect(10, 10, 1004, 660)

      // 3. Inner Gold Accent Pin-Stripe
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 3
      ctx.strokeRect(26, 26, 972, 628)
    }

    drawFlagBase()

    // Draw the transparent-cleaned official Undip logo seamlessly onto the flag
    getCleanOfficialUndipLogo((cleanLogoCanvas) => {
      drawFlagBase()
      const logoW = 300
      const logoH = 360
      const logoX = (1024 - logoW) / 2
      const logoY = (680 - logoH) / 2
      ctx.drawImage(cleanLogoCanvas, logoX, logoY, logoW, logoH)
      texture.needsUpdate = true
    })

    return texture
  })
}

/** Grand 3D Wall Typography Texture: "UNIVERSITAS DIPONEGORO" (Royal Blue Navy, Transparent Background) */
export function createUndipWallTypographyTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('undip-wall-typography-navy-v2', () => {
    const [canvas, ctx] = makeCanvas(3072, 768)
    ctx.clearRect(0, 0, 3072, 768)

    // Deep Authoritative Royal Blue Navy
    const navyGrad = ctx.createLinearGradient(0, 100, 0, 500)
    navyGrad.addColorStop(0, '#103060')
    navyGrad.addColorStop(0.5, '#0a2148')
    navyGrad.addColorStop(1, '#061733')

    ctx.fillStyle = navyGrad
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(6, 23, 51, 0.28)'
    ctx.shadowBlur = 14
    ctx.shadowOffsetY = 6

    // Carefully fit font within 2650px width so text is NEVER cropped
    fitFont(ctx, 'UNIVERSITAS DIPONEGORO', '"Times New Roman", Georgia, serif', 'bold', 'normal', 2650, 160, 90)
    ctx.fillText('UNIVERSITAS DIPONEGORO', 1536, 330)

    // Subtitle: SEMARANG
    ctx.shadowColor = 'transparent'
    ctx.font = '600 68px "Times New Roman", Georgia, serif'
    ctx.fillStyle = '#122c54'
    ctx.fillText('SEMARANG', 1536, 490)

    return toTexture(canvas)
  })
}

/**
 * Official Shield Logo of Universitas Diponegoro
 * Reuses the cleaned official emblem with 100% transparent background.
 */
export function createOfficialUndipLogoTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('undip-official-logo-shield-centered', () => {
    const [canvas, ctx] = makeCanvas(1024, 1024)
    const texture = toTexture(canvas)

    getCleanOfficialUndipLogo((cleanLogoCanvas) => {
      ctx.clearRect(0, 0, 1024, 1024)
      ctx.drawImage(cleanLogoCanvas, 0, 0, 1024, 1024)
      texture.needsUpdate = true
    })

    return texture
  })
}

/**
 * Pure Luxury Ivory Granite Slab (Granit Ivory Alami Tanpa Corak Blue Navy)
 * High-end architectural polished ivory stone texture:
 * - Natural warm cream / alabaster / pearl mineral foundation
 * - Delicate crystalline calcite stippling and subtle mica quartz flakes
 * - Soft organic warm-sand stone marbling (Zero blue navy veins)
 * - Pure diffuse satin finish without baked specular hotspots or glare
 */
export function createIvoryGraniteTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('pure-ivory-granite-texture-v4', () => {
    const [canvas, ctx] = makeCanvas(1024, 1024)

    // Base warm ivory/pearl natural stone tone
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024)
    bgGrad.addColorStop(0, '#fcfaf5')
    bgGrad.addColorStop(0.3, '#f7f2e8')
    bgGrad.addColorStop(0.65, '#eee7da')
    bgGrad.addColorStop(1, '#e8e0d0')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, 1024, 1024)

    // Micro-granite mineral crystalline stippling (subtle natural stone grain)
    for (let i = 0; i < 24000; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 1024
      const r = Math.random() * 2.2 + 0.3
      const alpha = Math.random() * 0.16 + 0.02
      const choice = Math.random()
      if (choice < 0.45) {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.3})` // Calcite pearl crystal
      } else if (choice < 0.78) {
        ctx.fillStyle = `rgba(195, 180, 160, ${alpha * 0.9})` // Warm limestone / feldspar grain
      } else if (choice < 0.93) {
        ctx.fillStyle = `rgba(165, 150, 132, ${alpha * 0.7})` // Neutral quartz mineral grain
      } else {
        ctx.fillStyle = `rgba(215, 195, 155, ${alpha * 0.5})` // Subtle champagne mica fleck
      }
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Helper for subtle natural stone marbling fissures (warm ivory & sand tones ONLY, no blue)
    const drawStoneVein = (
      points: [number, number, number, number, number, number, number, number],
      width: number,
      color: string,
      alpha: number,
    ) => {
      ctx.save()
      ctx.strokeStyle = color
      ctx.globalAlpha = alpha
      ctx.lineWidth = width
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(points[0], points[1])
      ctx.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7])
      ctx.stroke()
      ctx.restore()
    }

    // Gentle, whisper-soft natural ivory stone flow (no harsh contrasting stripes)
    drawStoneVein([0, 180, 320, 290, 640, 520, 1024, 690], 35, '#e4dbc9', 0.25)
    drawStoneVein([0, 180, 320, 290, 640, 520, 1024, 690], 14, '#d8cdb7', 0.35)
    drawStoneVein([0, 180, 320, 290, 640, 520, 1024, 690], 4, '#c9bea7', 0.45)

    drawStoneVein([180, 0, 420, 220, 710, 440, 1024, 490], 28, '#e7decb', 0.22)
    drawStoneVein([180, 0, 420, 220, 710, 440, 1024, 490], 10, '#ded3bf', 0.32)

    drawStoneVein([0, 620, 360, 670, 680, 810, 940, 1024], 32, '#e2d8c4', 0.24)
    drawStoneVein([0, 620, 360, 670, 680, 810, 940, 1024], 12, '#d6cab3', 0.32)

    // Very fine delicate natural marble wisps
    drawStoneVein([90, 380, 240, 340, 360, 460, 480, 520], 6, '#dfd4be', 0.35)
    drawStoneVein([520, 640, 660, 610, 780, 710, 910, 780], 8, '#d9ceb8', 0.3)

    return toTexture(canvas)
  })
}

/** Architectural Header Banner for Section A: 5 Tokoh Pendiri Utama */
export function createSectionABannerTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('section-a-banner-texture', () => {
    const [canvas, ctx] = makeCanvas(2048, 128)
    ctx.fillStyle = '#0f2240'
    ctx.fillRect(0, 0, 2048, 128)

    // Inner gold border
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 4
    ctx.strokeRect(12, 12, 2048 - 24, 128 - 24)

    // Text: PENDIRI UTAMA UNIVERSITAS DIPONEGORO (1956)
    ctx.fillStyle = '#f8df95'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 44px "Times New Roman", Georgia, serif'
    ctx.fillText('★  PENDIRI UTAMA UNIVERSITAS DIPONEGORO (EST. 1956)  ★', 1024, 64)

    return toTexture(canvas)
  })
}

/** Architectural Header Banner for Section B: Rektor Universitas Diponegoro */
export function createSectionBBannerTexture(): THREE.CanvasTexture {
  return assetCache.getTexture('section-b-banner-texture', () => {
    const [canvas, ctx] = makeCanvas(4096, 128)
    ctx.fillStyle = '#0a1a33'
    ctx.fillRect(0, 0, 4096, 128)

    // Inner gold border
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 4
    ctx.strokeRect(16, 12, 4096 - 32, 128 - 24)

    // Text: REKTOR UNIVERSITAS DIPONEGORO DARI MASA KE MASA
    ctx.fillStyle = '#f8df95'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 46px "Times New Roman", Georgia, serif'
    ctx.fillText('★  REKTOR UNIVERSITAS DIPONEGORO DARI MASA KE MASA  ★', 2048, 64)

    return toTexture(canvas)
  })
}
