/**
 * Master Heritage Library Collection of Universitas Diponegoro
 * Authentic historical volumes, founding archives, faculty monographs,
 * and future foresight whitepapers displayed across the museum's low-profile bookshelves.
 */

export interface HeritageBook {
  id: string
  zoneId: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5'
  title: string
  subtitle: string
  author: string
  year: string
  category: string
  callNumber: string
  coverColor: string
  accentColor: string
  thicknessCm: number
  heightCm: number
  abstract: string
  fullOverview: string
  keyExcerpts: string[]
  historicalSignificance: string
  archivalSource: string
  tableOfContents?: string[]
}

export const HERITAGE_BOOKS: HeritageBook[] = [
  // =========================================================================
  // ZONE 1: THE ORIGIN OF UNDIP (1956–1961)
  // =========================================================================
  {
    id: 'book-akta-notaris-1956',
    zoneId: 'zone1',
    title: 'Akta Notaris Pembentukan Jajasan Universitas Semarang',
    subtitle: 'Akta Notaris No. 59 tertanggal 4 Desember 1956',
    author: 'Notaris R.M. Soeprapto (Semarang)',
    year: '1956',
    category: 'Arsip Hukum & Pendirian',
    callNumber: 'ARC-UND-1956-N59',
    coverColor: '#5a141a',
    accentColor: '#d4af37',
    thicknessCm: 4.8,
    heightCm: 32.0,
    abstract:
      'Naskah autentik pendirian Yayasan Universitas Semarang yang diprakarsai oleh para tokoh cendekiawan dan pejuang kemerdekaan Jawa Tengah untuk mendirikan perguruan tinggi pertama di Kota Semarang.',
    fullOverview:
      'Pada dekade 1950-an, pemuda dan lulusan sekolah menengah di Jawa Tengah menghadapi kendala besar karena ketiadaan universitas negeri di wilayah ini. Tokoh-tokoh hukum dan pemerintahan terkemuka—Mr. Soedarto, Mr. Dan Sulaiman, Mr. Imam Bardjo, Mr. Goenawan Goetomo, dan Mr. Tan Tjiang Bie—mengambil inisiatif monumental membentuk Yayasan Universitas Semarang melalui Akta Notaris R.M. Soeprapto No. 59 pada 4 Desember 1956. Dokumen ini meletakkan fondasi yuridis bagi pembukaan Akademi Administrasi Negara dan Fakultas Hukum.',
    keyExcerpts: [
      '"Maksud dan toedjoean Jajasan ini ialah membentoek, mendirikan dan memelihara soeatoe Pergoeroean Tinggi di Semarang..."',
      '"Perguruan tinggi ini didedikasikan untuk mengangkat harkat martabat putera-puteri bangsa melalui keilmuan luhur."',
    ],
    historicalSignificance:
      'Dokumen hukum paling mendasar yang menjadi titik awal formal perjalanan Universitas Diponegoro.',
    archivalSource: 'Arsip Nasional Republik Indonesia & Ruang Koleksi Khusus UPT Perpustakaan Undip',
    tableOfContents: [
      'Mukadimah Yayasan & Latar Belakang Kebutuhan Pendidikan Jawa Tengah',
      'Pasal Pendirian: Struktur Dewan Kurator dan Pengurus Perdana',
      'Anggaran Dasar Pengelolaan Fakultas Hukum dan Tata Praja',
      'Tanda Tangan Pengesahan Notaris R.M. Soeprapto',
    ],
  },
  {
    id: 'book-statuta-perdana-1957',
    zoneId: 'zone1',
    title: 'Statuta Perdana & Pedoman Akademik Universitas Semarang 1957',
    subtitle: 'Naskah Panduan Kuliah Perdana di Gedung Panti Budaya',
    author: 'Presidium Yayasan Universitas Semarang',
    year: '1957',
    category: 'Pedoman Akademik Historis',
    callNumber: 'ARC-UND-1957-STAT',
    coverColor: '#0d2744',
    accentColor: '#d4af37',
    thicknessCm: 3.5,
    heightCm: 29.5,
    abstract:
      'Buku pedoman penyelenggaraan kuliah perdana yang dimulai pada tanggal 9 Januari 1957 di Gedung Panti Budaya (sekarang Gedung RRI) Jalan Pemuda Semarang.',
    fullOverview:
      'Menjelang perkuliahan perdana, Dewan Pengurus menyusun Statuta Perdana untuk mengatur kurikulum, tata tertib sivitas akademika, dan pengangkatan tenaga pengajar. Perkuliahan diawali dengan fasilitas sederhana dan pinjaman ruangan, namun dipenuhi oleh antusiasme ratusan mahasiswa angkatan pertama yang haus akan pendidikan tinggi bermutu di Jawa Tengah.',
    keyExcerpts: [
      '"Pendidikan tinggi diselenggarakan dengan menjunjung tinggi integritas keilmuan, kepribadian nasional, dan kejujuran ilmiah."',
    ],
    historicalSignificance:
      'Tonggak operasionalisasi perkuliahan formal pertama di Jawa Tengah yang kelak berevolusi menjadi universitas riset terkemuka.',
    archivalSource: 'Koleksi Langka Senat Akademik Undip',
  },
  {
    id: 'book-pidato-dies-sukarno-1960',
    zoneId: 'zone1',
    title: 'Penganugerahan Nama Universitas Diponegoro oleh Bung Karno',
    subtitle: 'Transkrip Orasi Presiden Ir. Soekarno pada Dies Natalis III (9 Januari 1960)',
    author: 'Sekretariat Negara RI & Biro Penerangan Undip',
    year: '1960',
    category: 'Pidato Kenegaraan & Naming Decree',
    callNumber: 'SPE-BK-1960-UND',
    coverColor: '#173b22',
    accentColor: '#f7d070',
    thicknessCm: 4.2,
    heightCm: 31.0,
    abstract:
      'Catatan bersejarah momentum sakral ketika Presiden Pertama RI Ir. Soekarno secara resmi mengganti nama Universitas Semarang menjadi Universitas Diponegoro sebagai penghargaan atas jiwa kepahlawanan.',
    fullOverview:
      'Pada perayaan Dies Natalis ke-3 tanggal 9 Januari 1960, Presiden Soekarno hadir di hadapan ribuan mahasiswa dan rakyat Semarang. Dalam pidatonya yang berapi-api, beliau menyatakan bahwa universitas ini harus mengemban nama besar Pangeran Diponegoro agar seluruh warganya mewarisi semangat kesatria, patriotisme tanpa pamrih, dan keteguhan membela keadilan.',
    keyExcerpts: [
      '"Namailah universitas ini UNIVERSITAS DIPONEGORO! Tirulah kepribadian Pangeran Diponegoro, kesatria yang membela kedaulatan tanah air dengan segenap jiwa raganya!"',
    ],
    historicalSignificance:
      'Pemberian nama resmi yang menjadi ruh spiritual dan identitas abadi almamater hingga masa kini.',
    archivalSource: 'Pusat Dokumentasi Sejarah Kepresidenan & UPT Kearsipan Undip',
  },
  {
    id: 'book-pp-no-7-1961',
    zoneId: 'zone1',
    title: 'Lembaran Negara PP No. 7 Tahun 1961: Penegerian Universitas Diponegoro',
    subtitle: 'Payung Hukum Formal Status Perguruan Tinggi Negeri Republik Indonesia',
    author: 'Pemerintah Republik Indonesia (Lembaran Negara 1961 No. 22)',
    year: '1961',
    category: 'Dekrit Penegerian Negara',
    callNumber: 'LEG-RI-1961-PP7',
    coverColor: '#3d2516',
    accentColor: '#d4af37',
    thicknessCm: 3.2,
    heightCm: 28.5,
    abstract:
      'Peraturan Pemerintah Republik Indonesia Nomor 7 Tahun 1961 tentang Pendirian Universitas Diponegoro sebagai Perguruan Tinggi Negeri resmi yang ditetapkan berlaku surut sejak 15 Oktober 1957.',
    fullOverview:
      'Perjuangan panjang para pendiri membuahkan hasil bersejarah saat pemerintah resmi menegerikan Undip melalui PP No. 7 Tahun 1961. Menariknya, tanggal Dies Natalis ditetapkan pada 15 Oktober 1957 untuk mengenang pertempuran heroik Lima Hari di Semarang, mengaitkan universitas ini langsung dengan perjuangan fisik kemerdekaan bangsa.',
    keyExcerpts: [
      '"Universitas Diponegoro di Semarang adalah Perguruan Tinggi Negeri yang terdiri atas fakultas-fakultas: Hukum, Ekonomi, Teknik, dan Kedokteran."',
    ],
    historicalSignificance:
      'Legalitas tertinggi yang menandai berdirinya Undip sebagai institusi negara pengemban amanat mencerdaskan kehidupan bangsa.',
    archivalSource: 'Lembaran Negara Republik Indonesia 1961 & Arsip Biro Hukum Undip',
  },
  {
    id: 'book-biografi-imam-bardjo',
    zoneId: 'zone1',
    title: 'Mr. Imam Bardjo: Pelopor Pendidikan Tinggi & Integritas Kepemimpinan',
    subtitle: 'Biografi dan Rekam Jejak Rektor Pertama Universitas Diponegoro (1957–1961)',
    author: 'Tim Peneliti Sejarah Undip',
    year: '1982',
    category: 'Biografi Tokoh Pendiri',
    callNumber: 'BIO-UND-1982-IB',
    coverColor: '#142e56',
    accentColor: '#d4af37',
    thicknessCm: 3.8,
    heightCm: 26.5,
    abstract:
      'Kisah dedikasi tanpa lelah Mr. Imam Bardjo dalam memimpin universitas di tengah masa krisis dan keterbatasan logistik awal kemerdekaan hingga meletakkan standar moral keilmuan yang luhur.',
    fullOverview:
      'Mr. Imam Bardjo tidak hanya seorang sarjana hukum piawai, tetapi juga sosok pejuang yang rendah hati. Di bawah kepemimpinannya sebagai Presiden/Rektor pertama, beliau mengajar tanpa honor dan sering mengorbankan waktu pribadinya untuk memastikan para mahasiswa dari keluarga kurang mampu tetap dapat melanjutkan studinya.',
    keyExcerpts: [
      '"Ilmu pengetahuan tanpa ketulusan hati nurani adalah hampa. Kejujuran adalah mahkota tertinggi setiap sarjana."',
    ],
    historicalSignificance:
      'Teladan etika kepemimpinan yang menjadi panutan seluruh sivitas akademika Universitas Diponegoro.',
    archivalSource: 'Museum Warisan Sejarah Undip & Koleksi Keluarga Besar Mr. Imam Bardjo',
  },

  // =========================================================================
  // ZONE 2: THE GROWTH OF KNOWLEDGE (1961–1990)
  // =========================================================================
  {
    id: 'book-sejarah-14-fakultas',
    zoneId: 'zone2',
    title: 'Kronika 14 Pilar Ilmu: Sejarah Pendirian Fakultas-Fakultas Undip',
    subtitle: 'Dari Empat Fakultas Pendahulu Menuju Ragam Disiplin Sains, Humaniora & Teknologi',
    author: 'Prof. Dr. Moeljono S. Trastotenojo (Editor)',
    year: '1988',
    category: 'Historiografi Fakultas',
    callNumber: 'HIS-FAK-1988-K14',
    coverColor: '#18453b',
    accentColor: '#d4af37',
    thicknessCm: 5.4,
    heightCm: 31.5,
    abstract:
      'Dokumentasi komprehensif fase pemekaran dan pertumbuhan 14 Fakultas di Undip: Hukum, Ekonomika & Bisnis, Teknik, Kedokteran, Peternakan & Pertanian, Perikanan & Ilmu Kelautan, Ilmu Budaya, Ilmu Sosial & Politik, Sains & Matematika, Kesehatan Masyarakat, Psikologi, Sekolah Vokasi, dan Sekolah Pascasarjana.',
    fullOverview:
      'Undip mengawali perjalanannya dengan empat fakultas embrio. Seiring pesatnya tuntutan pembangunan nasional, berdiri Fakultas Kedokteran yang dipelopori RSUP Dr. Kariadi, Fakultas Teknik yang mengembangkan spesialisasi sipil dan perkapalan, Fakultas Perikanan yang mempelopori kajian bahari Nusantara, hingga ragam fakultas humaniora yang memperkokoh jatidiri sosial budaya bangsa.',
    keyExcerpts: [
      '"Setiap fakultas yang berdiri di Undip lahir dari kebutuhan nyata masyarakat dan cita-cita mewujudkan kemandirian bangsa."',
    ],
    historicalSignificance:
      'Arsip ensiklopedis yang mendokumentasikan evolusi multidisiplin Undip menjadi raksasa pendidikan tinggi nasional.',
    archivalSource: 'UPT Perpustakaan Pusat Undip & Dewan Riset Fakultas',
  },
  {
    id: 'book-masterplan-tembalang-1977',
    zoneId: 'zone2',
    title: 'Masterplan Kampus Terpadu Tembalang: Visi Tata Ruang 180 Hektar',
    subtitle: 'Rencana Induk Pengembangan Fisik Kampus Era Prof. Sudarto, S.H. (1977)',
    author: 'Biro Perencanaan Kampus Undip & Bappenas',
    year: '1977',
    category: 'Arsitektur & Tata Ruang Kampus',
    callNumber: 'ARC-PLN-1977-TMB',
    coverColor: '#3d2516',
    accentColor: '#f7d070',
    thicknessCm: 4.6,
    heightCm: 33.0,
    abstract:
      'Buku cetak biru agung pemindahan kampus dari kawasan sempit Pleburan menuju perbukitan asri Tembalang seluas 180 hektar dengan konsep Kampus Hijau Berwawasan Lingkungan.',
    fullOverview:
      'Melihat kapasitas kampus Pleburan yang kian terbatas oleh kepadatan pusat kota Semarang, Rektor Prof. Sudarto, S.H. memprakarsai pembebasan lahan perbukitan Tembalang. Dokumen masterplan ini merancang tata letak zonasi fakultas, waduk pengendali air, ruang terbuka hijau 60%, dan jaringan jalan berporos yang kini menjadi kenyataan.',
    keyExcerpts: [
      '"Tembalang bukan sekadar pemindahan gedung, melainkan pembangunan kota pendidikan modern yang menyatu dengan harmoni alam."',
    ],
    historicalSignificance:
      'Dasar perencanaan spasial yang memungkinkan Undip bertransformasi menjadi salah satu kampus terhijau dan terluas di Indonesia.',
    archivalSource: 'Biro Aset & Sarana Prasarana Undip',
  },
  {
    id: 'book-pionir-riset-kelautan',
    zoneId: 'zone2',
    title: 'Pionir Benua Maritim: Sejarah Riset Oseanografi & Pantai Teluk Awur',
    subtitle: 'Dedikasi Fakultas Perikanan & Ilmu Kelautan Undip Menjelajah Potensi Samudra',
    author: 'Lembaga Penelitian Universitas Diponegoro',
    year: '1985',
    category: 'Sains & Kelautan',
    callNumber: 'SCI-MAR-1985-FPIK',
    coverColor: '#003b70',
    accentColor: '#d4af37',
    thicknessCm: 3.9,
    heightCm: 29.0,
    abstract:
      'Catatan berdirinya Stasiun Lapangan Laboratorium Kelautan Teluk Awur Jepara dan kontribusi riset kelautan tropis Undip di tingkat internasional.',
    fullOverview:
      'Menyadari posisi Indonesia sebagai negara kepulauan terbesar di dunia, Undip menetapkan Pola Ilmiah Pokok (PIP) berbasis Pengembangan Wilayah Pesisir dan Kelautan. Didirikannya stasiun penelitian di Teluk Awur Jepara menjadikan Undip sebagai rujukan utama riset keanekaragaman hayati laut, mangrove, dan terumbu karang tropis di Asia Tenggara.',
    keyExcerpts: [
      '"Masa depan peradaban Nusantara ada di laut. Undip menatap samudra dengan kacamata sains mutakhir dan kearifan ekologis."',
    ],
    historicalSignificance:
      'Bukti sejarah komitmen ilmiah Undip dalam mewujudkan kedaulatan maritim Indonesia.',
    archivalSource: 'Perpustakaan FPIK Undip & Marine Science Diving Club Archive',
  },
  {
    id: 'book-orasi-prof-sudarto',
    zoneId: 'zone2',
    title: 'Hukum Pidana & Pembangunan Nasional: Pemikiran Prof. Sudarto, S.H.',
    subtitle: 'Kumpulan Naskah Orasi Ilmiah dan Rekonseptualisasi Hukum Indonesia',
    author: 'Prof. Sudarto, S.H.',
    year: '1984',
    category: 'Filsafat Hukum & Kebangsaan',
    callNumber: 'LAW-SUD-1984-HP',
    coverColor: '#5a141a',
    accentColor: '#f7d070',
    thicknessCm: 4.0,
    heightCm: 28.0,
    abstract:
      'Karya monumental begawan hukum pidana Indonesia dan mantan Rektor Undip mengenai pembaharuan hukum pidana nasional yang berkeadilan sosial.',
    fullOverview:
      'Prof. Sudarto, S.H. adalah tokoh sentral di balik penyusunan konsep Kitab Undang-Undang Hukum Pidana (KUHP) nasional yang melepaskan warisan kolonial Belanda. Gagasan-gagasannya mengenai hukum yang harus mengabdi pada kemanusiaan dan pembangunan menjadi pondasi kebanggaan Mazhab Hukum Diponegoro.',
    keyExcerpts: [
      '"Hukum bukan sekadar pasal-pasal kaku, melainkan sarana kebijakan untuk membahagiakan manusia dan memelihara ketertiban masyarakat."',
    ],
    historicalSignificance:
      'Membentuk reputasi Fakultas Hukum Undip sebagai salah satu kiblat pendidikan hukum terkemuka di tanah air.',
    archivalSource: 'Pusat Dokumentasi Hukum Prof. Sudarto, FH Undip',
  },

  // =========================================================================
  // ZONE 3: THE HERITAGE OF UNDIP (1990–2010)
  // =========================================================================
  {
    id: 'book-falsafah-kesatria-diponegoro',
    zoneId: 'zone3',
    title: 'Falsafah Kesatria Diponegoro: Nilai Kejujuran, Keberanian & Keadilan',
    subtitle: 'Internalisasi Karakter Pahlawan Nasional sebagai Etos Sivitas Akademika Undip',
    author: 'Prof. Dr. Muladi, S.H. & Tim Humaniora Undip',
    year: '1995',
    category: 'Nilai Historis & Karakter',
    callNumber: 'HER-DIP-1995-FK',
    coverColor: '#4a154b',
    accentColor: '#d4af37',
    thicknessCm: 4.5,
    heightCm: 30.0,
    abstract:
      'Uraian mendalam mengenai internalisasi watak Pangeran Diponegoro ke dalam kode etik kepemimpinan, riset ilmiah, dan pengabdian masyarakat di Universitas Diponegoro.',
    fullOverview:
      'Ditulis pada masa kepemimpinan Rektor Prof. Dr. Muladi, S.H., naskah ini mengkristalisasikan nilai-nilai kepahlawanan Diponegoro ke dalam motto "Pernah Jaya, Tetap Jaya, Makin Jaya". Mahasiswa Undip dididik tidak hanya menjadi insan cerdas secara kognitif, melainkan ksatria cendekia yang berani membela kebenaran dan memiliki kepedulian tulus terhadap rakyat.',
    keyExcerpts: [
      '"Seorang lulusan Undip harus memiliki ketegasan bersikap seperti Pangeran Diponegoro: lembut dalam pekerti, kokoh bagai karang dalam integritas."',
    ],
    historicalSignificance:
      'Menjadi pedoman pembentukan karakter mahasiswa baru (PENDIKAR / ODM) di Universitas Diponegoro.',
    archivalSource: 'Lembaga Pengembangan dan Penjaminan Mutu Pendidikan (LP2MP) Undip',
  },
  {
    id: 'book-esai-eko-budiharjo',
    zoneId: 'zone3',
    title: 'Kota Berkelanjutan & Arsitektur Berjiwa: Antologi Prof. Eko Budiharjo',
    subtitle: 'Refleksi Budayawan, Arsitek, dan Rektor Humanis Universitas Diponegoro',
    author: 'Prof. Ir. Eko Budiharjo, M.Sc.',
    year: '2001',
    category: 'Humaniora & Arsitektur',
    callNumber: 'ARC-EKO-2001-KB',
    coverColor: '#173b22',
    accentColor: '#d4af37',
    thicknessCm: 3.8,
    heightCm: 27.5,
    abstract:
      'Kumpulan puisi, esai arsitektural, dan kritik tata ruang kota yang ditulis dengan gaya bahasa puitis dan penuh kehangatan oleh Rektor Prof. Eko Budiharjo.',
    fullOverview:
      'Prof. Eko Budiharjo dikenal luas sebagai "Rektor Puisi" yang membawakan kepemimpinan universitas dengan sentuhan seni, humor cerdas, dan kepedulian lingkungan. Pemikiran-pemikirannya mengenai arsitektur hijau dan penataan ruang kota yang ramah manusia mendapatkan pengakuan luas baik nasional maupun internasional.',
    keyExcerpts: [
      '"Bangunan tanpa jiwa hanyalah tumpukan beton; kota tanpa pohon hanyalah gurun tandus. Berilah rasa cinta pada setiap jengkal ruang."',
    ],
    historicalSignificance:
      'Mewakili warisan kebudayaan dan intelektual humanis yang mengharumkan nama Undip di panggung nasional.',
    archivalSource: 'Pusat Studi Pemukiman dan Lingkungan Hidup Undip',
  },
  {
    id: 'book-regalia-tongkat-rektor',
    zoneId: 'zone3',
    title: 'Katalog Artefak & Regalia Akademik Universitas Diponegoro',
    subtitle: 'Dokumentasi Tongkat Pedel, Medali Emas Rektorat, dan Lambang Resmi Dies Natalis',
    author: 'Senat Akademik & Dewan Guru Besar Undip',
    year: '2005',
    category: 'Katalog Artefak Resmi',
    callNumber: 'REG-UND-2005-KAT',
    coverColor: '#3d2516',
    accentColor: '#f7d070',
    thicknessCm: 4.2,
    heightCm: 31.0,
    abstract:
      'Inventarisasi dan makna filosofis seluruh lambang kebesaran seremonial akademik yang digunakan dalam Sidang Senat Terbuka dan Wisuda Undip.',
    fullOverview:
      'Buku ini memuat uraian detail tentang Tongkat Rektor berukir sulur jati berujung patung kuningan Pangeran Diponegoro menunggang kuda, kalung emas rektor bermaterikan lambang perisai lima, hingga makna 15 helai kelopak bunga teratai dan kobaran api obor ilmu pengetahuan.',
    keyExcerpts: [
      '"Setiap lekuk regalia akademik memancarkan sumpah pengabdian tanpa henti kepada kemanusiaan dan kebenaran hakiki."',
    ],
    historicalSignificance:
      'Panduan protokol resmi pelestarian tradisi seremonial dan warisan kehormatan universitas.',
    archivalSource: 'Biro Administrasi Akademik & Museum Undip',
  },

  // =========================================================================
  // ZONE 4: UNDIP TODAY (2010–SEKARANG)
  // =========================================================================
  {
    id: 'book-ptnbh-transformasi-global',
    zoneId: 'zone4',
    title: 'Transformasi PTN-BH: Kemandirian Riset Menuju World Class University',
    subtitle: 'Perjalanan Universitas Diponegoro Meraih Peringkat Unggul Global (2015–2024)',
    author: 'Prof. Dr. Yos Johan Utama, S.H., M.Hum. & Kantor Pemeringkatan',
    year: '2021',
    category: 'Kebijakan Pendidikan Tinggi',
    callNumber: 'PTN-UND-2021-WCU',
    coverColor: '#003b70',
    accentColor: '#d4af37',
    thicknessCm: 4.8,
    heightCm: 30.5,
    abstract:
      'Laporan komprehensif era otonomi PTN-BH yang mendorong lompatan reputasi akademik, hilirisasi paten, dan capaian peringkat QS World University Rankings.',
    fullOverview:
      'Dengan penetapan status Perguruan Tinggi Negeri Badan Hukum (PTN-BH) melalui PP No. 81 Tahun 2014, Undip bergerak cepat memodernisasi tata kelola, fasilitas laboratorium berstandar internasional, serta meningkatkan insentif riset global. Hasilnya, Undip konsisten menembus jajaran universitas terbaik di Asia Tenggara dan menduduki peringkat teratas dalam indikator Kesiapan Kerja Lulusan (QS Graduate Employability Rankings).',
    keyExcerpts: [
      '"Undip adalah universitas benteng kebangsaan yang tangguh di kancah global namun tetap membumi dalam pengabdian kepada rakyat."',
    ],
    historicalSignificance:
      'Mendokumentasikan era keemasan modernitas dan daya saing global almamater di abad ke-21.',
    archivalSource: 'Kantor Pemeringkatan & Kantor Riset Internasional Undip',
  },
  {
    id: 'book-muladi-dome-monumen',
    zoneId: 'zone4',
    title: 'Gedung Muladi Dome: Mahakarya Konvensi & Episentrum Prestasi Tembalang',
    subtitle: 'Rancang Bangun, Akustik Modern, dan Makna Arsitektur Kubah Emas Terbesar di Jawa Tengah',
    author: 'Tim Pembangunan Fisik Undip',
    year: '2023',
    category: 'Arsitektur Modern & Fasilitas',
    callNumber: 'FAC-MLD-2023-DOM',
    coverColor: '#5a141a',
    accentColor: '#f7d070',
    thicknessCm: 3.6,
    heightCm: 29.5,
    abstract:
      'Dokumentasi peresmian gedung serbaguna berkapasitas 5.000 orang yang dinamai untuk mengenang jasa pengabdian Prof. Dr. Muladi, S.H.',
    fullOverview:
      'Gedung Muladi Dome yang berdiri megah di gerbang utama Tembalang merupakan ikon arsitektur modern kampus Undip. Dilengkapi tata akustik kelas dunia, sistem pencahayaan pintar hemat energi, dan ruang konvensi serbaguna, gedung ini menjadi tempat diselenggarakannya wisuda akbar, konser seni internasional, dan konferensi sains global.',
    keyExcerpts: [
      '"Kubah megah Muladi Dome adalah lambang penaung ilmu pengetahuan yang menjulang tinggi menembus cakrawala masa depan."',
    ],
    historicalSignificance:
      'Menjadi landmark fisik terpenting modernitas kampus Undip di abad ke-21.',
    archivalSource: 'Direktorat Aset dan Sarana Prasarana Undip',
  },
  {
    id: 'book-rsnd-pendidikan-medis',
    zoneId: 'zone4',
    title: 'Rumah Sakit Nasional Diponegoro: Sinergi Layanan Medis Prima & Riset Biomedis',
    subtitle: 'Satu Dekade RSND Mengabdi untuk Kesehatan Nusantara (2014–2024)',
    author: 'Direksi RSND & Fakultas Kedokteran Undip',
    year: '2024',
    category: 'Kesehatan & Sains Biomedis',
    callNumber: 'MED-RSN-2024-DEK',
    coverColor: '#18453b',
    accentColor: '#d4af37',
    thicknessCm: 4.1,
    heightCm: 28.5,
    abstract:
      'Pencapaian RSND sebagai Rumah Sakit Perguruan Tinggi Negeri (RSPTN) rujukan tipe B unggulan dengan pusat keunggulan kanker terpadu, bedah robotik, dan pelayanan telemedicine.',
    fullOverview:
      'Terletak di kawasan kampus Tembalang, RSND membuktikan komitmen nyata Undip dalam menghadirkan layanan kesehatan paripurna bagi masyarakat luas. Sebagai rumah sakit pendidikan terakreditasi paripurna, RSND mencetak ribuan dokter spesialis, perawat profesional, dan menghasilkan riset uji klinis terdepan.',
    keyExcerpts: [
      '"Kesembuhan pasien adalah kebahagiaan kami; kemajuan riset kedokteran adalah nafas pengabdian kami."',
    ],
    historicalSignificance:
      'Pusat layanan kesehatan dan riset klinis terintegrasi kebanggaan Jawa Tengah dan Indonesia.',
    archivalSource: 'Pusat Dokumentasi RSND & FK Undip',
  },

  // =========================================================================
  // ZONE 5: UNDIP FUTURE (MENUJU 2045)
  // =========================================================================
  {
    id: 'book-undip-2045-blueprint',
    zoneId: 'zone5',
    title: 'Cetrawisma 2045: Peta Jalan Transformasi Smart University & AI Kampus',
    subtitle: 'Rencana Jangka Panjang Universitas Diponegoro Menyongsong Indonesia Emas',
    author: 'Prof. Dr. Suharnomo, S.E., M.Si. & Tim Visi 2045',
    year: '2024',
    category: 'Visi Masa Depan & AI',
    callNumber: 'FUT-UND-2045-CTR',
    coverColor: '#0a4254',
    accentColor: '#e0b84c',
    thicknessCm: 5.2,
    heightCm: 32.5,
    abstract:
      'Buku putih strategi masa depan Undip mengintegrasikan kecerdasan buatan (AI), analitika data besar, kurikulum digital adaptif, dan kampus nol-emisi karbon pada tahun 2045.',
    fullOverview:
      'Buku Cetrawisma 2045 dirumuskan sebagai pedoman strategis menyeluruh bagi generasi penerus almamater. Memasuki era disrupsi kecerdasan buatan, Undip memposisikan diri sebagai katalisator inovasi teknologi berkeadilan, mengembangkan pusat superkomputasi otonom, serta memperkuat jejaring lulusan di panggung inovasi multinasional.',
    keyExcerpts: [
      '"Teknologi adalah sarana, kemanusiaan adalah tujuan. Undip menyongsong abad AI dengan memegang teguh martabat etika kesatria."',
    ],
    historicalSignificance:
      'Dokumen arah masa depan yang memandu transformasi seluruh fakultas di Undip menuju peringatan satu abad kemerdekaan Indonesia.',
    archivalSource: 'Biro Perencanaan Strategis & Rektorat Undip',
  },
  {
    id: 'book-green-campus-net-zero',
    zoneId: 'zone5',
    title: 'Kampus Berkelanjutan: Inisiatif Net Zero Carbon & Konservasi Maritim Jepara',
    subtitle: 'Penerapan Energi Terbarukan, Waduk Ekologis, dan Hutan Kampus Tembalang',
    author: 'Pusat Keberlanjutan & Lingkungan Hidup Undip',
    year: '2025',
    category: 'Keberlanjutan & Green Energy',
    callNumber: 'ENV-GRN-2025-NZC',
    coverColor: '#173b22',
    accentColor: '#f7d070',
    thicknessCm: 3.7,
    heightCm: 29.0,
    abstract:
      'Cetak biru implementasi energi surya terapung di Waduk Undip, mobilitas kendaraan listrik otonom kampus, dan program rehabilitasi 1 juta bibit mangrove di pesisir utara Jawa.',
    fullOverview:
      'Undip membuktikan kepemimpinan nyata dalam isu perubahan iklim global. Kawasan hutan Tembalang dikelola sebagai paru-paru kota Semarang, sementara seluruh gedung baru dirancang dengan sertifikasi Green Building Platinum. Kawasan laboratorium Teluk Awur Jepara dikembangkan sebagai cagar konservasi keanekaragaman laut berbasis kecerdasan buatan.',
    keyExcerpts: [
      '"Menjaga bumi adalah menjaga kehidupan generasi mendatang. Keberlanjutan adalah janji suci Diponegoro kepada pertiwi."',
    ],
    historicalSignificance:
      'Model percontohan kampus hijau berkelanjutan terdepan di tingkat internasional (UI GreenMetric).',
    archivalSource: 'Pusat Riset Perubahan Iklim dan Energi Baru Terbarukan Undip',
  },
  {
    id: 'book-alumni-global-network',
    zoneId: 'zone5',
    title: 'Sinergi Emas Diponegoro: Jaringan Kepemimpinan Alumni di Panggung Dunia',
    subtitle: 'Peran Strategis IKA Undip Mengawal Transformasi Kebijakan dan Inovasi Internasional',
    author: 'Dewan Pengurus Pusat Ikatan Alumni Universitas Diponegoro',
    year: '2025',
    category: 'Jejaring Global Alumni',
    callNumber: 'ALM-IKA-2025-GLB',
    coverColor: '#4a154b',
    accentColor: '#d4af37',
    thicknessCm: 4.0,
    heightCm: 28.0,
    abstract:
      'Rekam jejak ratusan ribu alumni Undip yang memegang posisi kunci di pemerintahan kabinet, pimpinan korporasi Fortune 500, peradilan agung, dan lembaga riset luar negeri.',
    fullOverview:
      'Kekuatan terbesar Universitas Diponegoro terletak pada karakter lulusannya yang tangguh, jujur, dan berintegritas. Buku ini merangkum inisiatif Dana Abadi Diponegoro (Endowment Fund), program beasiswa internasional, serta inkubator ventura teknologi yang didanai secara mandiri oleh jejaring alumni di seluruh penjuru dunia.',
    keyExcerpts: [
      '"Di manapun kaki berpijak, panji Diponegoro senantiasa berkibar dalam karya nyata yang mengharumkan bangsa."',
    ],
    historicalSignificance:
      'Bukti daya jangkau dan pengaruh global almamater yang menyatukan tradisi masa lalu dengan kejayaan masa depan.',
    archivalSource: 'Sekretariat DPP IKA Undip & Kantor Hubungan Alumni',
  },
]
