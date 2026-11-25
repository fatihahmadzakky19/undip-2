/**
 * ZONE 2: THE GROWTH OF KNOWLEDGE (1961–1990)
 * Master Content & Exhibits Data Model for Universitas Diponegoro Virtual Museum.
 * All entries follow verified historical facts with explicit tags [ISI DENGAN DATA RESMI]
 * for easy departmental customization.
 */

export interface Zone2Hotspot {
  id: string
  subzone: 'A' | 'B' | 'C' | 'D' | 'guide' | 'timeline'
  title: string
  subtitle: string
  year?: string
  badge?: string
  description: string
  fullContent: string
  highlights?: string[]
  imagePlaceholder?: string
  position?: [number, number, number]
  actionType?: 'modal' | 'counter' | 'comparison'
}

export interface FacultyPlaqueData {
  id: string
  code: string
  name: string
  founded: string
  color: string
  deans: string
  focus: string
  description: string
  highlights: string[]
}

/** 14 Faculties of Universitas Diponegoro represented on the Tree of Growth */
export const FACULTIES_DATA: FacultyPlaqueData[] = [
  {
    id: 'fac-fh',
    code: 'FH',
    name: 'Fakultas Hukum',
    founded: '1957',
    color: '#c41e3a',
    deans: 'Mr. Soedarto, S.H.',
    focus: 'Hukum Progresif, Hukum Acara & Tata Kelola Peradilan',
    description:
      'Fakultas Hukum merupakan cikal bakal tertua Universitas Diponegoro, diawali dari Akademi Administrasi Negara dan Fakultas Hukum dan Masyarakat tahun 1957. Dipelopori oleh tokoh hukum nasional Mr. Soedarto dan Mr. Imam Bardjo, fakultas ini melahirkan aliran "Hukum Progresif" karya Prof. Satjipto Rahardjo yang mendunia.',
    highlights: [
      'Tahun Berdiri: 1957 (Fakultas Perdana)',
      'Dekan Pertama: Mr. Soedarto, S.H.',
      'Aliran Khas: Hukum Progresif Prof. Satjipto Rahardjo',
      'Akreditasi: Unggul / Sertifikasi Internasional FIBAA',
    ],
  },
  {
    id: 'fac-ft',
    code: 'FT',
    name: 'Fakultas Teknik',
    founded: '1958',
    color: '#002366',
    deans: 'Ir. Jacob Rais',
    focus: 'Rekayasa Infrastruktur, Kemaritiman & Energi Terbarukan',
    description:
      'Didirikan pada 20 Oktober 1958 oleh Yayasan Universitas Semarang, Fakultas Teknik Undip berawal dari jurusan Teknik Sipil dan kini menaungi belasan departemen termasuk Arsitektur, Teknik Mesin, Kimia, Elektro, Geodesi, Perencanaan Wilayah Kota (PWK), dan Teknik Perkapalan kemaritiman terkemuka.',
    highlights: [
      'Tahun Berdiri: 1958',
      'Dekan Pertama: Ir. Jacob Rais',
      'Departemen Utama: Sipil, Mesin, Kimia, Arsitektur, Elektro, PWK, Kapal',
      'Akreditasi: Unggul / Internasional IABEE & ASIIN',
    ],
  },
  {
    id: 'fac-feb',
    code: 'FEB',
    name: 'Fakultas Ekonomika dan Bisnis',
    founded: '1960',
    color: '#808080',
    deans: 'Drs. Moelyo',
    focus: 'Kebijakan Ekonomi Makro, Akuntansi Sektor Publik & Keuangan Syariah',
    description:
      'Resmi berdiri pada 14 Maret 1960, FEB Undip berkembang menjadi institusi pendidikan ekonomi dan bisnis terakreditasi internasional yang mencetak para menteri, bankir, ekonom, dan pengusaha nasional.',
    highlights: [
      'Tahun Berdiri: 1960',
      'Dekan Pertama: Drs. Moelyo',
      'Keunggulan: Akuntansi, Manajemen, Ekonomi Pembangunan, Keuangan Syariah',
      'Akreditasi: Akreditasi Internasional FIBAA & ABEST21',
    ],
  },
  {
    id: 'fac-fk',
    code: 'FK',
    name: 'Fakultas Kedokteran',
    founded: '1961',
    color: '#2e8b57',
    deans: 'dr. Heyder bin Heyder',
    focus: 'Kesehatan Tropis, Riset Biomedis & Layanan Medis Terintegrasi RSND',
    description:
      'Diprakarsai melalui kolaborasi erat dengan Rumah Sakit Dr. Kariadi pada tahun 1961 oleh dr. Heyder bin Heyder. Memiliki rumah sakit pendidikan modern Rumah Sakit Nasional Diponegoro (RSND) di kampus Tembalang.',
    highlights: [
      'Tahun Berdiri: 1961',
      'Dekan Perintis: dr. Heyder bin Heyder',
      'Fasilitas Unggulan: Rumah Sakit Nasional Diponegoro (RSND)',
      'Akreditasi: Unggul & Rekognisi Kedokteran Dunia (WFME)',
    ],
  },
  {
    id: 'fac-fpp',
    code: 'FPP',
    name: 'Fakultas Peternakan dan Pertanian',
    founded: '1964',
    color: '#355e3b',
    deans: 'Prof. R. Soeratno',
    focus: 'Agrokompleks Berkelanjutan, Peternakan Presisi & Ketahanan Pangan',
    description:
      'Berdiri tahun 1964 sebagai Fakultas Peternakan, kemudian berkembang mencakup disiplin ilmu pertanian modern, agribisnis, teknologi pangan, dan agroekoteknologi dengan laboratorium lapang luas di Tembalang.',
    highlights: [
      'Tahun Berdiri: 1964',
      'Dekan Perintis: Prof. R. Soeratno',
      'Fokus: Ketahanan Pangan Nasional & Peternakan Tropis',
      'Laboratorium Unggulan: Teaching Farm & Agribisnis Terpadu',
    ],
  },
  {
    id: 'fac-fib',
    code: 'FIB',
    name: 'Fakultas Ilmu Budaya',
    founded: '1965',
    color: '#ffffff',
    deans: 'Prof. Soeharto',
    focus: 'Kebudayaan Jawa, Kearsipan, Sejarah Maritim & Sastra Multilingual',
    description:
      'Didirikan tahun 1965 awalnya sebagai Fakultas Sastra. Menjadi penjaga pilar humaniora, kesusastraan, sejarah kebangsaan, dan kajian peradaban pesisir Jawa yang kaya nilai-nilai luhur Diponegoro.',
    highlights: [
      'Tahun Berdiri: 1965',
      'Dekan Pertama: Prof. Soeharto',
      'Departemen: Sejarah, Sastra Indonesia, Sastra Inggris, Kearsipan',
      'Keunggulan Khusus: Pusat Kajian Sejarah Maritim Nusantara',
    ],
  },
  {
    id: 'fac-fpik',
    code: 'FPIK',
    name: 'Fakultas Perikanan dan Ilmu Kelautan',
    founded: '1968',
    color: '#0077be',
    deans: 'Prof. Johannes',
    focus: 'Oseanografi Tropis, Bioteknologi Kelautan & Pengelolaan Pesisir',
    description:
      'Menjadi ujung tombak Pola Ilmiah Pokok (PIP) Undip: "Pengembangan Wilayah Pesisir dan Lautan Tropis". Mengoperasikan stasiun riset kelautan Teluk Awur Jepara dan kapal riset samudera.',
    highlights: [
      'Tahun Berdiri: 1968',
      'Identitas Inti: Pusat Riset Maritim & Oseanografi Terbesar di Jateng',
      'Fasilitas Riset: Marine Science Techno Park (MSTP) Teluk Awur Jepara',
      'Akreditasi: Unggul / Internasional ASIIN',
    ],
  },
  {
    id: 'fac-fisip',
    code: 'FISIP',
    name: 'Fakultas Ilmu Sosial dan Ilmu Politik',
    founded: '1968',
    color: '#ffbf00',
    deans: 'Drs. Soedjito',
    focus: 'Kebijakan Publik, Diplomasi Internasional, Komunikasi & Tata Kelola Politik',
    description:
      'Mengembangkan ilmu administrasi publik, ilmu pemerintahan, komunikasi strategis, dan hubungan internasional berdaya saing global untuk memperkuat demokrasi dan kedaulatan bangsa.',
    highlights: [
      'Tahun Berdiri: 1968',
      'Dekan Pertama: Drs. Soedjito',
      'Departemen: Administrasi Publik, Ilmu Pemerintahan, Komunikasi, HI',
      'Akreditasi: Unggul / Sertifikasi Internasional FIBAA',
    ],
  },
  {
    id: 'fac-fsm',
    code: 'FSM',
    name: 'Fakultas Sains dan Matematika',
    founded: '1988',
    color: '#800080',
    deans: 'Prof. Supartono',
    focus: 'Kecerdasan Buatan (AI), Fisika Material, Komputasi & Bioteknologi',
    description:
      'Bermula dari Program MIPA tahun 1988 dan resmi menjadi Fakultas MIPA (kini FSM). Menjadi motor riset sains murni, komputasi, kecerdasan buatan, nanoteknologi, dan sains data terkini.',
    highlights: [
      'Tahun Berdiri: 1988',
      'Dekan Pertama: Prof. Supartono',
      'Program: Matematika, Fisika, Kimia, Biologi, Informatika, Statistika',
      'Riset Unggulan: Pusat Plasma Fisika & Nanoteknologi (CPR)',
    ],
  },
  {
    id: 'fac-fkm',
    code: 'FKM',
    name: 'Fakultas Kesehatan Masyarakat',
    founded: '1993',
    color: '#8fbc8f',
    deans: 'dr. Budioro',
    focus: 'Epidemiologi Komunitas, Kesehatan Kerja (K3) & Gizi Masyarakat',
    description:
      'Berdiri tahun 1993 untuk menjawab tantangan kesehatan masyarakat preventif dan promotif di Indonesia. Aktif merumuskan kebijakan penanggulangan pandemi dan sanitasi pesisir.',
    highlights: [
      'Tahun Berdiri: 1993',
      'Dekan Pertama: dr. Budioro',
      'Keunggulan: Keselamatan & Kesehatan Kerja (K3), Epidemiologi',
      'Akreditasi: Unggul / Internasional APHEA Candidate',
    ],
  },
  {
    id: 'fac-fpsi',
    code: 'FPSI',
    name: 'Fakultas Psikologi',
    founded: '2007',
    color: '#4682b4',
    deans: 'Dra. Karyono',
    focus: 'Psikologi Keluarga, Kebangsaan, Mental Health & Psikologi Industri',
    description:
      'Didirikan tahun 2007, Fakultas Psikologi Undip berfokus pada pengembangan kesehatan mental berbasis nilai-nilai kearifan lokal, ketahanan keluarga, dan psikologi organisasi kerja.',
    highlights: [
      'Tahun Berdiri: 2007',
      'Dekan Pertama: Dra. Karyono, M.Si.',
      'Fokus: Psikologi Positif, Klinis & Perkembangan Manusia',
      'Layanan Unggulan: Pusat Konseling & Layanan Psikologi Komunitas',
    ],
  },
  {
    id: 'fac-sv',
    code: 'SV',
    name: 'Sekolah Vokasi',
    founded: '2016',
    color: '#ff7f50',
    deans: 'Prof. Budiyono',
    focus: 'Keahlian Terapan Industri, Teaching Industry & Sertifikasi Kompetensi',
    description:
      'Mengintegrasikan seluruh program diploma Undip ke dalam Sekolah Vokasi pada 2016. Memiliki gedung megah berstandar industri sumbangan filantropi dengan kurikulum dual-system praktis.',
    highlights: [
      'Tahun Berdiri: 2016',
      'Dekan Pertama: Prof. Dr. Ir. Budiyono, M.Si.',
      'Fasilitas: Gedung Vokasi Modern & Laboratorium Digital Terapan',
      'Kerjasama: Puluhan BUMN dan Multi-National Corporations',
    ],
  },
  {
    id: 'fac-sps',
    code: 'SPs',
    name: 'Sekolah Pascasarjana',
    founded: '2003',
    color: '#8b0000',
    deans: 'Prof. Sudharto P. Hadi',
    focus: 'Ilmu Lingkungan Lintas Disiplin, Ketahanan Energi & Kebijakan Strategis',
    description:
      'Wadah program magister dan doktoral multidisiplin yang menghasilkan naskah kebijakan lingkungan, energi terbarukan, dan pembangunan berkelanjutan tingkat nasional.',
    highlights: [
      'Tahun Berdiri: 2003',
      'Dekan Pertama: Prof. Drs. Sudharto P. Hadi, MES, Ph.D.',
      'Program Unggulan: Doktor & Magister Ilmu Lingkungan',
      'Jurnal Ilmiah: Journal of Environmental Studies terakreditasi Sinta 1 & Scopus',
    ],
  },
  {
    id: 'fac-fkg',
    code: 'FKG',
    name: 'Fakultas Kedokteran Gigi',
    founded: '2024',
    color: '#008080',
    deans: 'Pimpinan Perintis FKG [ISI DENGAN DATA RESMI]',
    focus: 'Kesehatan Gigi & Mulut Spesialistik, Teknologi Bedah Maksilofasial',
    description:
      'Fakultas termuda di lingkungan Universitas Diponegoro yang dibentuk untuk memenuhi kebutuhan dokter gigi dan riset biomaterial gigi di Jawa Tengah dan nasional.',
    highlights: [
      'Tahun Berdiri: 2024',
      'Fokus: Dokter Gigi Unggul & Riset Kesehatan Mulut Terpadu',
      'Rumah Sakit Mitra: RSND & RSGM Universitas Diponegoro',
      'Status: Program Pendidikan Spesialis & Akademik Terakreditasi',
    ],
  },
]

/** Milestones for the Golden Wall Timeline on the Left Corridor Wall */
export interface TimelineMilestone {
  year: string
  title: string
  subtitle: string
  description: string
  location: string
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '1956',
    title: 'Prakarsa Yayasan Universitas Semarang',
    subtitle: 'Akta Notaris R.M. Soeprapto • 4 Desember 1956',
    description: 'Para tokoh hukum dan masyarakat Jawa Tengah bersepakat mendirikan universitas kebangsaan swasta di Semarang.',
    location: 'Semarang Kota',
  },
  {
    year: '1957',
    title: 'Perkuliahan Perdana & Fakultas Hukum',
    subtitle: 'Peresmian di Gedung Panti Budaya Pleburan',
    description: 'Mr. Imam Bardjo meresmikan kuliah perdana bagi mahasiswa fakultas hukum dan akademi administrasi negara.',
    location: 'Pleburan',
  },
  {
    year: '1960',
    title: 'Anugerah Nama UNIVERSITAS DIPONEGORO',
    subtitle: 'Amanat Presiden RI Ir. Soekarno • 9 Januari 1960',
    description: 'Presiden Soekarno secara langsung menganugerahkan nama pahlawan nasional Pangeran Diponegoro sebagai nama resmi universitas.',
    location: 'Semarang',
  },
  {
    year: '1961',
    title: 'Penegerian Resmi PP No. 7 Tahun 1961',
    subtitle: 'Lembaran Negara Republik Indonesia 1961',
    description: 'Universitas Diponegoro resmi beralih status menjadi Perguruan Tinggi Negeri dengan pengakuan hukum penuh dari pemerintah.',
    location: 'Jakarta - Semarang',
  },
  {
    year: '1968',
    title: 'Pencanangan Pola Ilmiah Pokok Kelautan',
    subtitle: 'Fakultas Kelautan & Pesisir Tropis',
    description: 'Undip menetapkan keunggulan spesifik sebagai universitas berbasis Wilayah Pesisir dan Kelautan Tropis.',
    location: 'Semarang - Jepara',
  },
  {
    year: '1977',
    title: 'Masterplan Kampus Tembalang',
    subtitle: 'Rancangan Relokasi Lahan Hijau 180 Hektar',
    description: 'Rektor Prof. Ir. Jacob Rais dan Prof. Sudarto memprakarsai pembelian lahan perbukitan Tembalang untuk kampus masa depan.',
    location: 'Tembalang',
  },
  {
    year: '1990',
    title: 'Migrasi Bertahap ke Tembalang',
    subtitle: 'Pembangunan Gedung Rektorat Widya Puraya',
    description: 'Fakultas-fakultas mulai berpindah dari kampus padat perkotaan Pleburan ke lingkungan kampus hijau terpadu Tembalang.',
    location: 'Tembalang',
  },
  {
    year: '2014',
    title: 'Transformasi Menjadi PTN-BH',
    subtitle: 'Peraturan Pemerintah No. 81 Tahun 2014',
    description: 'Undip resmi ditetapkan sebagai Perguruan Tinggi Negeri Berbadan Hukum (PTN-BH) dengan otonomi akademik dan finansial penuh.',
    location: 'Nasional',
  },
  {
    year: '2024–Kini',
    title: 'Pusat Keunggulan Dunia & Muladi Dome',
    subtitle: 'World Class University • Undip Bermartabat, Bermanfaat',
    description: 'Peresmian Muladi Dome sebagai convention center terbesar di Jateng, peringkat #1 QS Employability alumni cepat berkarir.',
    location: 'Kampus Tembalang',
  },
]

/** Sub-zone B: Campus Transformation Maket & Comparison Exhibits */
export interface CampusExhibit {
  id: string
  title: string
  period: string
  area: string
  description: string
  features: string[]
}

export const CAMPUS_EXHIBITS: Record<'pleburan' | 'tembalang', CampusExhibit> = {
  pleburan: {
    id: 'maket-pleburan',
    title: 'Kampus Bersejarah Pleburan (1957–1980-an)',
    period: 'Era Perintisan 1957 – 1980',
    area: 'Sekitar Jl. Imam Bardjo, Pleburan, Semarang Tengah',
    description:
      'Kampus pertama Universitas Diponegoro berada di kawasan rindang Pleburan, berpusat di gedung historis Panti Budaya dan Aula Hayam Wuruk. Di sinilah ruang-ruang kuliah awal fakultas hukum, ekonomi, dan teknik berdiri di tengah suasana kota Semarang tempo doeloe.',
    features: [
      'Gedung Panti Budaya (Tempat perkuliahan perdana 1957)',
      'Aula Besar Hayam Wuruk (Lokasi Dies Natalis & pidato Presiden Soekarno)',
      'Kawasan Taman & Jalan Bersejarah Mr. Imam Bardjo',
      'Kini difungsikan sebagai Kampus Pascasarjana & Layanan Eksekutif Undip',
    ],
  },
  tembalang: {
    id: 'maket-tembalang',
    title: 'Kampus Modern Tembalang (1980-an–Sekarang)',
    period: 'Era Kejayaan & Masa Depan (180+ Hektar)',
    area: 'Kawasan Perbukitan Hijau Tembalang, Semarang Selatan',
    description:
      'Pusat kegiatan akademik modern Universitas Diponegoro yang membentang di lahan hijau perbukitan lebih dari 180 hektar. Dilengkapi fasilitas berstandar internasional, sistem transportasi internal ramah lingkungan, waduk retensi edukasi, serta landmark ikonik patung Pangeran Diponegoro.',
    features: [
      'Gedung Rektorat Widya Puraya & Kawasan Monumen Diponegoro',
      'Muladi Dome (Convention Center modern berkapasitas 4.500+ orang)',
      'Rumah Sakit Nasional Diponegoro (RSND) & Marine Science Park',
      'Waduk Edukasi Kampus & Jalur Hijau Ekologis UI GreenMetric',
    ],
  },
}

/** Sub-zone C: Education & Research Statistics (Count-up target values) */
export const STATS_DATA = [
  {
    id: 'stat-students',
    label: 'Mahasiswa Aktif',
    value: 54200,
    suffix: '+',
    detail: 'Mahasiswa sarjana, pascasarjana, profesi & vokasi dari seluruh provinsi dan mancanegara',
  },
  {
    id: 'stat-programs',
    label: 'Program Studi',
    value: 172,
    suffix: '',
    detail: 'Terakreditasi Unggul nasional (LAM/BAN-PT) serta sertifikasi internasional (ASIIN, FIBAA, ABET)',
  },
  {
    id: 'stat-publications',
    label: 'Publikasi Scopus',
    value: 15800,
    suffix: '+',
    detail: 'Karya ilmiah terindeks bereputasi tinggi dengan ribuan sitasi riset kelautan & sains terapan',
  },
  {
    id: 'stat-professors',
    label: 'Guru Besar (Profesor)',
    value: 260,
    suffix: '+',
    detail: 'Akademisi terkemuka pencetus teori keilmuan nasional dan konsultan riset internasional',
  },
]

/** Sub-zone D: Prestasi & Kontribusi Masyarakat */
export const ACHIEVEMENTS_DATA = [
  {
    id: 'achieve-employability',
    title: 'Peringkat #1 QS Graduate Employability di Indonesia',
    category: 'Rekognisi Karir Alumni',
    year: '2022–2024',
    description:
      'Universitas Diponegoro dinobatkan sebagai perguruan tinggi nomor satu di Indonesia yang lulusannya paling cepat diserap dunia kerja dan industri oleh lembaga pemeringkat dunia QS Quacquarelli Symonds.',
  },
  {
    id: 'achieve-pimnas',
    title: 'Juara Umum & Medali Emas PIMNAS Kemendikbud',
    category: 'Kreativitas Mahasiswa',
    year: 'Berbagai Periode',
    description:
      'Kontingen mahasiswa Undip secara konsisten menembus 5 besar nasional dalam Pekan Ilmiah Mahasiswa Nasional (PIMNAS) melalui inovasi teknologi bionik, pangan lokal, dan energi hijau.',
  },
  {
    id: 'achieve-bionic-hand',
    title: 'Inovasi Tangan Bionik Robotik Undip (Karya CBIOM3S)',
    category: 'Inovasi Medis untuk Rakyat',
    year: 'Inovasi Berkelanjutan',
    description:
      'Pusat Riset CBIOM3S Undip memproduksi tangan palsu bionik sensorik murah berteknologi mutakhir yang telah dipasangkan kepada ratusan penyandang disabilitas di seluruh Indonesia.',
  },
  {
    id: 'achieve-kkn',
    title: 'KKN Tematik Kebangsaan & Pemberdayaan Pesisir',
    category: 'Pengabdian Masyarakat',
    year: 'Rutin Setiap Semester',
    description:
      'Pengerahan ribuan mahasiswa setiap tahun untuk program pengentasan stunting, elektrifikasi desa nelayan terpencil, dan konservasi mangrove di pulau-pulau 3T (Terdepan, Terluar, Tertinggal).',
  },
]
