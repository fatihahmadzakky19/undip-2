/**
 * Master Zone Metadata Definitions for Universitas Diponegoro Museum
 * All 5 zones reside seamlessly within the Single Monumental Heritage Hall.
 */

export interface ZoneConfig {
  id: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5'
  number: number
  title: string
  subtitle: string
  period: string
  tagline: string
  themeColor: string
  accentColor: string
  cameraTarget: [number, number, number]
  lookAt: [number, number, number]
  description: string
  focusAreas: string[]
}

export const MUSEUM_ZONES: ZoneConfig[] = [
  {
    id: 'zone1',
    number: 1,
    title: 'The Origin of Undip',
    subtitle: 'Sejarah Pendirian & Pancamitra Pendiri (1956–1961)',
    period: '1956 – 1961',
    tagline: 'Fajar Kelahiran Universitas Kebangsaan di Jawa Tengah',
    themeColor: '#142e56',
    accentColor: '#d4af37',
    cameraTarget: [0, 1.65, 7.5],
    lookAt: [0, 1.65, 0],
    description:
      'Menampilkan tonggak awal pembentukan Yayasan Universitas Semarang hingga penganugerahan nama Universitas Diponegoro oleh Presiden Ir. Soekarno pada Dies Natalis III tahun 1960 dan penegerian melalui PP No. 7 Tahun 1961.',
    focusAreas: [
      'Pancamitra 5 Tokoh Pendiri Utama (Mr. Soedarto, Mr. Imam Bardjo, dkk.)',
      'Akta Notaris Pendirian 1956 & Lembaran Negara PP No. 7/1961',
      'Foto Historis Kampus Perdana Pleburan (Panti Budaya)',
      'Kunjungan Bersejarah Presiden Ir. Soekarno 1960',
    ],
  },
  {
    id: 'zone2',
    number: 2,
    title: 'The Growth of Knowledge',
    subtitle: 'Perkembangan 14 Fakultas & Transformasi Kampus',
    period: '1961 – 1990',
    tagline: 'Mekar Megah Cabang Ilmu Pengetahuan Nusantara',
    themeColor: '#18453b',
    accentColor: '#d4af37',
    cameraTarget: [-2.5, 1.65, 1.5],
    lookAt: [-7.44, 1.65, 1.5],
    description:
      'Merekam jejak pendirian dan pertumbuhan 14 Fakultas di lingkungan Undip, evolusi kurikulum akademik, pemekaran departemen, serta migrasi bertahap dari kampus perkotaan Pleburan ke perbukitan hijau Tembalang.',
    focusAreas: [
      'Sejarah Pembentukan 14 Fakultas Undip (FH, FEB, FT, FK, FPP, FPIK, FIB, FISIP, FSM, FKM, Psikologi, SV, Pascasarjana)',
      'Arsip Kurikulum & Naskah Orasi Ilmiah Guru Besar Perdana',
      'Dokumentasi Masterplan Pembangunan Kampus Tembalang',
      'Pionir Riset Kelautan & Wilayah Tropis',
    ],
  },
  {
    id: 'zone3',
    number: 3,
    title: 'The Heritage of Undip',
    subtitle: 'Warisan Sejarah, Artefak Akademik & Nilai Kesatria',
    period: '1990 – 2010',
    tagline: 'Mengabadikan Karakter, Adab & Identitas Diponegoro',
    themeColor: '#4a154b',
    accentColor: '#d4af37',
    cameraTarget: [2.5, 1.65, -4.5],
    lookAt: [7.44, 1.65, -4.5],
    description:
      'Koleksi memorabilia kepemimpinan para rektor, mahakarya seni Raden Saleh, artefak seremonial akademik (toga, medali, tongkat rektor), serta internalisasi etos kepahlawanan Pangeran Diponegoro sebagai falsafah universitas.',
    focusAreas: [
      'Memorabilia Rektorat Bersejarah (Era Prof. Sudarto hingga Prof. Eko Budiharjo)',
      'Mahakarya Seni Visual Penangkapan Pangeran Diponegoro',
      'Regalia Akademik, Tongkat Rektor & Plakat Kehormatan',
      'Koleksi Khusus Buku Filsafat & Humaniora Diponegoro',
    ],
  },
  {
    id: 'zone4',
    number: 4,
    title: 'Undip Today',
    subtitle: 'Kampus Modern Tembalang & World Class University',
    period: '2010 – Sekarang',
    tagline: 'Prestasi Global, Riset Terpadu & Layanan Unggul',
    themeColor: '#003b70',
    accentColor: '#d4af37',
    cameraTarget: [0, 1.65, -10.5],
    lookAt: [0, 1.65, -16.0],
    description:
      'Potret kemajuan pesat Universitas Diponegoro sebagai PTN-BH unggulan berkelas dunia dengan fasilitas termodern: Muladi Dome, RSND, laboratorium riset terpadu, perpustakaan megah, dan rekognisi akreditasi internasional.',
    focusAreas: [
      'Gedung Konvensi Terakbar Muladi Dome & Kawasan Rektorat Widya Puraya',
      'Rumah Sakit Nasional Diponegoro (RSND) & Pusat Penelitian Medis',
      'Capaian Peringkat QS & THE World University Rankings',
      'Publikasi Ilmiah Internasional Bereputasi & Paten Industri',
    ],
  },
  {
    id: 'zone5',
    number: 5,
    title: 'Undip Future',
    subtitle: 'Smart Digital University, AI & Green Campus 2045',
    period: 'Menuju 2045',
    tagline: 'Inovasi Tanpa Batas Menuju Indonesia Emas',
    themeColor: '#0a4254',
    accentColor: '#e0b84c',
    cameraTarget: [0, 1.65, -15.5],
    lookAt: [0, 1.65, -20.0],
    description:
      'Visi masa depan Universitas Diponegoro memimpin revolusi Artificial Intelligence, kampus berkelanjutan (Net Zero Carbon), energi terbarukan terpadu, bio-kelautan masa depan, serta inovasi digital terdepan di Asia Pasifik.',
    focusAreas: [
      'Peta Jalan Smart University & AI Center of Excellence',
      'Inisiatif Green Campus, Solar Farm & Konservasi Maritim Jepara',
      'Jaringan Kolaborasi Riset Luar Angkasa & Nanoteknologi',
      'Gerakan Kepemimpinan Global Ikatan Alumni Diponegoro (IKA Undip)',
    ],
  },
]
