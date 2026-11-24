export interface Founder {
  id: string
  name: string
  title: string
  years: string
  role: string
  description: string
  quote?: string
  imagePath?: string
  category?: 'pendiri-utama' | 'direktorat-rektorat'
}

export interface HistoryExhibit {
  id: string
  title: string
  category: 'history' | 'campus-photo' | 'decree' | 'archive'
  period: string
  shortLabel: string
  description: string
  fullContent: string
  imagePath?: string
  highlights?: string[]
  orientation?: 'landscape' | 'portrait' | 'square'
  size?: 'large' | 'medium' | 'small'
}

/**
 * 5 TOKOH PENDIRI UTAMA UNIVERSITAS DIPONEGORO
 * (Pancamitra Pendiri Yayasan Universitas Semarang 1956)
 */
export const UNDIP_FOUNDERS_5: Founder[] = [
  {
    id: 'mr-soedarto',
    name: 'Mr. Soedarto',
    title: 'Ketua Presidium Yayasan & Rektor Pembangun',
    years: '1913–1986',
    role: 'Pelopor pendirian Yayasan Universitas Semarang (1956) dan peletak dasar akademik utama Undip.',
    description: 'Mr. Soedarto adalah tokoh sentral di balik pendirian Yayasan Universitas Semarang pada 1956. Sebagai Jaksa Tinggi Jawa Tengah dan kemudian Rektor Universitas Diponegoro, beliau mendedikasikan hidupnya untuk mentransformasikan perguruan tinggi swasta lokal menjadi universitas negeri bereputasi tinggi.',
    quote: 'Pendidikan tinggi adalah jembatan emas pembangun karakter bangsa yang berdaulat.',
    category: 'pendiri-utama',
  },
  {
    id: 'mr-imam-bardjo',
    name: 'Mr. Imam Bardjo',
    title: 'Presiden (Rektor) Pertama Universitas Semarang (1957–1961)',
    years: 'Periode : 1957 – 1961',
    role: 'Ketua Pengadilan Tinggi Jawa Tengah dan Rektor pertama yang meresmikan perkuliahan perdana tahun 1957.',
    description: 'Mr. Imam Bardjo memimpin universitas di masa-masa awal yang penuh keterbatasan. Dengan wibawa kepemimpinannya, beliau berhasil menyatukan para akademisi dan praktisi hukum untuk mendirikan Fakultas Hukum dan Masyarakat serta Akademi Administrasi Negara.',
    quote: 'Bermula dari cita-cita luhur di Kota Semarang untuk mencerdaskan generasi penerus bangsa.',
    imagePath: '/textures/rektors/mr-imam-bardjo.webp',
    category: 'pendiri-utama',
  },
  {
    id: 'mr-goenawan-goetomo',
    name: 'Mr. Goenawan Goetomo',
    title: 'Dekan Pertama Akademi Administrasi Negara',
    years: '1915–1992',
    role: 'Pelopor pendidikan administrasi dan tata kelola pemerintahan di Jawa Tengah.',
    description: 'Sebagai dekan pertama, beliau meletakkan fondasi kurikulum administrasi niaga dan negara yang kemudian berkembang menjadi Fakultas Ilmu Sosial dan Ilmu Politik (FISIP).',
    category: 'pendiri-utama',
  },
  {
    id: 'mr-tan-tjing-hak',
    name: 'Mr. Tan Tjing Hak',
    title: 'Cendekiawan Hukum & Tokoh Inklusivitas',
    years: '1912–1985',
    role: 'Praktisi hukum terkemuka yang mewujudkan semangat inklusivitas dan kebhinekaan dalam pendirian Undip.',
    description: 'Kehadiran Mr. Tan Tjing Hak mencerminkan bahwa sejak awal kelahirannya, Universitas Diponegoro terbuka untuk semua etnis dan golongan masyarakat demi kemajuan ilmu pengetahuan.',
    category: 'pendiri-utama',
  },
  {
    id: 'dr-heyder-bin-heyder',
    name: 'dr. Heyder bin Heyder',
    title: 'Direktur R.S. Semarang & Perintis Kedokteran',
    years: '1909–1982',
    role: 'Memprakarsai pendirian Fakultas Kedokteran Undip bekerjasama dengan RSUP Dr. Kariadi.',
    description: 'Dedikasinya membawa dunia medis Semarang menjadi pusat pendidikan dokter yang berdedikasi tinggi bagi masyarakat Jawa Tengah.',
    category: 'pendiri-utama',
  },
]

/**
 * 13 TOKOH REKTOR UNIVERSITAS DIPONEGORO DARI MASA KE MASA
 * (Jajaran Rektor & Pimpinan Tertinggi Universitas Diponegoro)
 */
export const UNDIP_LEADERSHIP_13: Founder[] = [
  {
    id: 'rektor-imam-bardjo',
    name: 'Mr. Imam Bardjo',
    title: 'Rektor Universitas Diponegoro (1957–1961)',
    years: 'Periode : 1957 – 1961',
    role: 'Presiden (Rektor) pertama yang memimpin peletakan batu fondasi dan peresmian perkuliahan perdana.',
    description: 'Sebagai Presiden (Rektor) pertama, Mr. Imam Bardjo memimpin universitas di masa perintisan awal. Di tengah keterbatasan fasilitas dan sarana pascakemerdekaan, beliau berhasil menghimpun para tokoh hukum dan pemerintahan untuk menyelenggarakan pendidikan tinggi berkualitas di Semarang.',
    imagePath: '/textures/rektors/mr-imam-bardjo.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-mochtar',
    name: 'Mochtar',
    title: 'Rektor Universitas Diponegoro (1963)',
    years: 'Periode : 1 – 13 September 1963',
    role: 'Rektor pada masa transisi pimpinan universitas September 1963.',
    description: 'Mochtar mengemban amanah kepemimpinan sebagai Rektor Universitas Diponegoro pada awal September 1963. Pada masa peralihan kepemimpinan ini, beliau memastikan kesinambungan administrasi dan kelangsungan proses akademik universitas tetap berjalan tertib dan stabil.',
    imagePath: '/textures/rektors/mochtar.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-sunario',
    name: 'Prof. Sunario, S.H.',
    title: 'Rektor Universitas Diponegoro (1963–1966)',
    years: 'Periode : 1 – 13 September 1963',
    role: 'Tokoh nasional pergerakan kemerdekaan, mantan Menlu RI, dan Rektor Undip pembina integritas kebangsaan.',
    description: 'Prof. Sunario, S.H. adalah tokoh bangsa terkemuka yang berperan aktif dalam Kongres Pemuda II (Manifesto Sumpah Pemuda 1928) dan Konferensi Asia Afrika 1955. Selaku Rektor, beliau membawa kehormatan diplomasi dan wawasan kebangsaan mendalam ke seluruh civitas akademika Universitas Diponegoro.',
    imagePath: '/textures/rektors/prof-sunario-sh.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-jacub-rais',
    name: 'Prof. Ir. Jacub Rais',
    title: 'Rektor Universitas Diponegoro (1966)',
    years: 'Periode : 14 April – 21 September 1966',
    role: 'Rektor tahun 1966 dan perintis keilmuan geodesi, geomatika & teknik nasional di Undip.',
    description: 'Prof. Ir. Jacub Rais memimpin Undip pada masa dinamis tahun 1966. Beliau adalah ilmuwan geodesi terkemuka Indonesia yang kemudian menjadi tokoh perintis Badan Koordinasi Survei dan Pemetaan Nasional (Bakosurtanal). Dedikasinya memperkuat fondasi Fakultas Teknik dan tradisi riset eksakta di Undip.',
    imagePath: '/textures/rektors/prof-ir-jacub-rais.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-suroyo',
    name: 'Brigjen TNI Dr. A. Suroyo',
    title: 'Rektor Universitas Diponegoro (1966–1976)',
    years: 'Periode : 1966 – 1976',
    role: 'Rektor pemantap stabilitas kelembagaan dan pengembangan Fakultas Kedokteran selama satu dekade kepemimpinan.',
    description: 'Brigjen TNI Dr. A. Suroyo memimpin Undip selama satu dekade penuh (1966–1976). Di bawah kepemimpinannya, Undip mencapai stabilitas organisasi yang kokoh, penataan fakultas-fakultas baru, serta penguatan pendidikan kedokteran dan pelayanan kesehatan bagi masyarakat luas.',
    imagePath: '/textures/rektors/brigjen-tni-dr-a-suroyo.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-soedarto-sh',
    name: 'Prof. Sudarto, S.H.',
    title: 'Rektor Universitas Diponegoro (1977–1986)',
    years: 'Periode : 1977 – 1986',
    role: 'Rektor pemrakarsa rencana induk pengembangan kampus terpadu Tembalang dan penguatan riset hukum pidana.',
    description: 'Prof. Sudarto, S.H. memimpin Universitas Diponegoro selama dua periode (1977–1986). Beliau adalah pakar hukum pidana terkemuka Indonesia yang turut menyusun naskah pembaruan hukum nasional. Di bawah kepemimpinannya, Undip mulai merintis pemindahan kampus ke kawasan Tembalang serta membangun tata kelola akademik modern dan berwibawa.',
    quote: 'Pendidikan hukum dan moralitas adalah benteng keadilan bangsa.',
    imagePath: '/textures/rektors/prof-sudarto-sh.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-moeljono',
    name: 'Prof. Dr. Moeljono Soegiarto Trastotenojo',
    title: 'Rektor Universitas Diponegoro (1986–1993)',
    years: 'Periode : 1986 – 1993',
    role: 'Rektor visioner pelopor pembangunan dan relokasi kampus terpadu Tembalang 180 hektar.',
    description: 'Prof. Dr. dr. R. Moeljono Soegiarto Trastotenojo adalah dokter spesialis anak dan rektor yang merealisasikan megaproyek kampus terpadu Tembalang dengan dukungan Bank Dunia dan Pemerintah RI. Di bawah kepemimpinan beliau, Undip bertransformasi dari kampus terfragmentasi di Pleburan menjadi kawasan kampus terintegrasi modern.',
    quote: 'Membangun kampus bukan sekadar menata batu bata, tetapi membangun peradaban.',
    imagePath: '/textures/rektors/prof-moeljono-trastotenojo.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-muladi',
    name: 'Prof. Dr. Muladi, S.H.',
    title: 'Rektor Universitas Diponegoro (1994–1997)',
    years: 'Periode : 1994 – 1997',
    role: 'Guru besar hukum pidana, Hakim Agung, dan Menteri Kehakiman RI yang mengharumkan nama Undip di kancah nasional dan internasional.',
    description: 'Prof. Dr. Muladi, S.H. adalah begawan hukum pidana dan hak asasi manusia terkemuka Indonesia. Beliau pernah menjabat sebagai Menteri Kehakiman RI, Menteri Sekretaris Negara, dan Gubernur Lemhannas. Di masa kepemimpinannya sebagai Rektor Undip, beliau memperkokoh martabat akademisi Undip dan memperluas kerjasama internasional. Sosok beliau diabadikan pada Muladi Dome.',
    quote: 'Hukum harus menjadi panglima yang mengayomi kemanusiaan dan keadilan.',
    imagePath: '/textures/rektors/prof-muladi.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-eko-budihardjo',
    name: 'Prof. Ir. Eko Budiharjo',
    title: 'Rektor Universitas Diponegoro (1998–2006)',
    years: 'Periode : 1998 – 2006',
    role: 'Sang Rektor Humanis, budayawan, dan pakar tata ruang arsitektur berwawasan lingkungan.',
    description: 'Prof. Ir. Eko Budiharjo, M.Sc. memimpin Universitas Diponegoro melewati masa genting reformasi dengan pendekatan kultural, dialogis, dan penuh humor humanis. Beliau adalah arsitek dan budayawan nasional yang sangat dicintai mahasiswa dan masyarakat luas, serta mempopulerkan penataan ruang kampus hijau dan berkarakter.',
    quote: 'Ilmu tanpa nurani dan sentuhan seni akan kehilangan makna kemanusiaannya.',
    imagePath: '/textures/rektors/prof-eko-budiharjo.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-susilo-wibowo',
    name: 'Prof. Dr. dr. Susilo Wibowo, M.S. Med, Sp.And',
    title: 'Rektor Universitas Diponegoro (2006–2010)',
    years: 'Periode : 2006 – 2010',
    role: 'Pelopor universitas riset, pendiri RSND, dan pengembang program andrologi kedokteran unggulan.',
    description: 'Prof. Dr. dr. Susilo Wibowo, M.S. Med, Sp.And adalah pakar andrologi dan kedokteran reproduksi pertama di Indonesia yang memimpin Undip bertransformasi menjadi universitas riset. Beliau menggagas dan menginisiasi berdirinya Rumah Sakit Nasional Diponegoro (RSND) sebagai rumah sakit rujukan dan pendidikan modern di Jawa Tengah.',
    quote: 'Riset bermutu tinggi adalah nyawa utama kemajuan bangsa.',
    imagePath: '/textures/rektors/prof-susilo-wibowo.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-sudharto',
    name: 'Prof. Drs. Sudharto Prawata Hadi, MES, Ph.D.',
    title: 'Rektor Universitas Diponegoro (2010–2015)',
    years: 'Periode : 2010 – 2015',
    role: 'Pelopor status PTN-BH Undip dan pengembang kampus hijau lestari (Green Campus).',
    description: 'Prof. Drs. Sudharto Prawata Hadi, MES, Ph.D. adalah pakar manajemen lingkungan hidup terkemuka Indonesia. Di bawah kepemimpinannya, Undip sukses bertransformasi menjadi Perguruan Tinggi Negeri Berbadan Hukum (PTN-BH) pada 2014 dan meraih peringkat teratas universitas ramah lingkungan UI GreenMetric.',
    quote: 'Kelestarian alam dan kemajuan ilmu pengetahuan harus senantiasa berjalan beriringan.',
    imagePath: '/textures/rektors/prof-sudharto-p-hadi.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-yos-johan',
    name: 'Prof. Dr. Yos Johan Utama, S.H., M.Hum.',
    title: 'Rektor Universitas Diponegoro (2015–2024)',
    years: 'Periode : 2015 – 2024',
    role: 'Membawa Undip menembus peringkat 2 universitas paling diminati di Indonesia dan jajaran top perguruan tinggi dunia.',
    description: 'Prof. Dr. Yos Johan Utama, S.H., M.Hum. memimpin Undip selama hampir satu dekade (dua periode). Beliau berhasil mengakselerasi akreditasi internasional bagi puluhan program studi, memodernisasi fasilitas kampus megah seperti Muladi Dome, dan mengantarkan alumni Undip sebagai lulusan tercepat memperoleh pekerjaan di Indonesia (peringkat 1 QS Employability).',
    quote: 'Bekerja dengan hati, mengabdi untuk kemuliaan bangsa dan almamater.',
    imagePath: '/textures/rektors/prof-yos-johan-utama.webp',
    category: 'direktorat-rektorat',
  },
  {
    id: 'rektor-suharnomo',
    name: 'Prof. Dr. Suharnomo, S.E., M.Si.',
    title: 'Rektor Universitas Diponegoro (2025–2030)',
    years: 'Periode : 2025 – 2030',
    role: 'Rektor Undip pembawa visi strategis "Undip Bermartabat, Undip Bermanfaat" era inovasi masa depan.',
    description: 'Prof. Dr. Suharnomo, S.E., M.Si. adalah pakar manajemen sumber daya manusia terkemuka dan mantan Dekan Fakultas Ekonomika dan Bisnis (FEB) Undip. Beliau memimpin Universitas Diponegoro menuju era transformasi digital, hilirisasi hasil riset terapan bagi industri, serta penguatan pengabdian masyarakat yang inklusif dan berdaya saing global.',
    quote: 'Undip Bermartabat, Undip Bermanfaat bagi nusa dan bangsa.',
    imagePath: '/textures/rektors/prof-suharnomo.webp',
    category: 'direktorat-rektorat',
  },
]

/** Full combined founders list for backward compatibility */
export const UNDIP_FOUNDERS: Founder[] = [...UNDIP_FOUNDERS_5, ...UNDIP_LEADERSHIP_13]

/**
 * Historical exhibits for the History & Archives Wing:
 * Comprehensive dense collection organized for the authentic Masonry gallery wall layout
 * flanking the 3D Miniature Map of Universitas Diponegoro.
 * Sourced directly from official archive https://undip.ac.id/sejarah-2 and verified historical records.
 */
export const HISTORY_EXHIBITS: HistoryExhibit[] = [
  // 1. Centerpiece Monumental Art
  {
    id: 'artwork-diponegoro-center',
    title: 'Mahakarya Raden Saleh: Penangkapan Pangeran Diponegoro (1857)',
    category: 'history',
    period: 'Karya Bersejarah 1857',
    shortLabel: 'Mahakarya Raden Saleh',
    description: 'Lukisan mahakarya legendaris karya Raden Saleh Syarif Bustaman (1857) yang melukiskan momen kepahlawanan dan keteguhan Pangeran Diponegoro di hadapan Jenderal De Kock.',
    fullContent: 'Karya seni monumental "Penangkapan Pangeran Diponegoro" (1857) dilukis oleh pelukis kenamaan dunia asal Semarang, Raden Saleh Syarif Bustaman. Lukisan ini menggambarkan puncak Perang Jawa (1825–1830) ketika Pangeran Diponegoro dijebak dan ditangkap secara licik saat perundingan damai di Wisma Karesidenan Magelang pada 28 Maret 1830.\n\nBerbeda dengan versi pelukis Belanda Nicolaas Pieneman yang menggambarkan Diponegoro tampak pasrah dan tunduk, Raden Saleh melukiskan sang Pangeran berdiri tegak dengan tatapan berani, tenang, penuh wibawa, dan menolak tunduk pada kolonialisme.\n\nSosok dan api perjuangan Pangeran Diponegoro inilah yang menjadi inspirasi luhur bagi Presiden RI Ir. Soekarno ketika menganugerahkan nama UNIVERSITAS DIPONEGORO pada 9 Januari 1960. Seluruh sivitas akademika Undip senantiasa meneladani karakter Diponegoro: jujur, berani, adil, peduli rakyat kecil, dan pantang menyerah.',
    imagePath: '/textures/history/artwork-diponegoro-center.webp',
    highlights: [
      'Mahakarya pelukis legendaris kelas dunia asal Semarang: Raden Saleh',
      'Menggambarkan keteguhan moral dan keberanian Pangeran Diponegoro',
      'Menjadi sumber inspirasi penamaan universitas oleh Presiden Soekarno',
      'Nilai luhur Undip: Kejujuran, Keberanian, Keadilan, dan Kepedulian Sosial',
    ],
    orientation: 'landscape',
    size: 'large',
  },

  // 2. Akta Notaris No. 59 Tahun 1956
  {
    id: 'archives-notary-1956',
    title: 'Akta Pendirian Yayasan Universitas Semarang No. 59 Tahun 1956',
    category: 'archive',
    period: '4 Desember 1956',
    shortLabel: 'Akta Notaris No. 59/1956',
    description: 'Naskah akta otentik Notaris R.M. Soeprapto tertanggal 4 Desember 1956 yang menandai tonggak hukum berdirinya Yayasan Universitas Semarang.',
    fullContent: 'Sekitar awal 1950-an, masyarakat Jawa Tengah dan khususnya Kota Semarang sangat mendambakan kehadiran perguruan tinggi negeri untuk membantu pemerintah mengisi kemerdekaan dan mempercepat pembangunan. Pada masa itu, satu-satunya universitas negeri di Jawa Tengah dan D.I. Yogyakarta adalah Universitas Gadjah Mada (UGM) di Yogyakarta.\n\nJumlah lulusan SMA di Jawa Tengah bagian utara yang ingin melanjutkan ke pendidikan tinggi melonjak tajam namun daya tampung sangat minim. Menyadari kebutuhan mendesak tersebut, para tokoh terkemuka di Semarang menghimpun prakarsa bersama.\n\nPada tanggal 4 Desember 1956, secara resmi disahkan pendirian "Yayasan Universitas Semarang" melalui Akta Notaris R.M. Soeprapto Nomor 59. Akta bersejarah ini ditandatangani oleh para perintis (Mr. Soedarto, Mr. Dan Sulaiman, Mr. Imam Bardjo, Mr. Goenawan Goetomo, Mr. Tan Tjing Hak, dan dr. Heyder bin Heyder) sebagai landasan yuridis awal berdirinya universitas kebanggaan Jawa Tengah.',
    highlights: [
      'Disahkan di hadapan Notaris R.M. Soeprapto pada 4 Desember 1956',
      'Menjawab kelangkaan perguruan tinggi negeri di kawasan Jawa Tengah bagian utara',
      'Ditandatangani oleh para tokoh hukum, medis, dan birokrat terkemuka Semarang',
      'Fondasi hukum awal lahirnya embrio Universitas Diponegoro',
    ],
    orientation: 'portrait',
    size: 'medium',
  },

  // 3. Statuta & Kurikulum Pertama 1957
  {
    id: 'archives-statuta-1957',
    title: 'Peresmian Pembukaan Universitas Semarang & Statuta Perdana (1957)',
    category: 'archive',
    period: '9 Januari 1957',
    shortLabel: 'Pembukaan Kuliah 1957',
    description: 'Naskah peresmian pembukaan perkuliahan perdana dan pedoman statuta akademik Universitas Semarang pada 9 Januari 1957.',
    fullContent: 'Setelah Yayasan Universitas Semarang berbadan hukum resmi, universitas secara resmi dibuka pada hari Rabu, 9 Januari 1957. Upacara peresmian pembukaan dipimpin oleh Presiden Universitas yang pertama, Mr. Imam Bardjo (Ketua Pengadilan Tinggi Jawa Tengah).\n\nPada saat pembukaan awal tersebut, universitas membuka dua unit pendidikan:\n1. Fakultas Hukum dan Masyarakat (dipimpin Mr. Soedarto)\n2. Akademi Administrasi Negara (dipimpin Mr. Goenawan Goetomo)\n\nNaskah statuta perdana ini merumuskan kurikulum modern berlandaskan Pancasila, menggabungkan kepakaran hukum adat nusantara, hukum tata negara modern, dan ilmu administrasi publik. Kuliah perdana diikuti oleh ratusan mahasiswa angkatan pertama yang datang dari berbagai pelosok Jawa Tengah dengan antusiasme membara.',
    highlights: [
      'Peresmian pembukaan resmi universitas pada 9 Januari 1957',
      'Mr. Imam Bardjo dilantik sebagai Presiden (Rektor) pertama',
      'Fakultas perdana: Fakultas Hukum & Masyarakat dan Akademi Administrasi Negara',
      'Meletakkan tradisi keunggulan akademik berwawasan kebangsaan',
    ],
    orientation: 'portrait',
    size: 'medium',
  },

  // 4. Foto Gedung Panti Budaya & Kampus Pleburan
  {
    id: 'early-photo-panti-budaya',
    title: 'Foto Bersejarah: Peresmian Patung P. Diponegoro di Biro Rektor Pleburan',
    category: 'campus-photo',
    period: 'Era Kampus Pleburan',
    shortLabel: 'Patung Diponegoro Pleburan',
    description: 'Dokumentasi arsip resmi Undip: Upacara peresmian patung Pangeran Diponegoro di halaman depan Biro Rektor Undip Kampus Pleburan Semarang.',
    fullContent: 'Foto arsip otentik bersejarah dari laman resmi Universitas Diponegoro merekam momen khidmat upacara peresmian patung Pangeran Diponegoro di pelataran halaman Gedung Biro Rektor Undip Kampus Pleburan Semarang.\n\nKampus Pleburan di Jalan Imam Bardjo berkembang menjadi pusat sentral aktivitas rektorat, senat, perkuliahan Fakultas Hukum, Fakultas Ekonomi, dan program magister-doktor. Patung Pangeran Diponegoro di depan gedung rektorat lama ini menjadi monumen ikonik kebanggaan sivitas akademika dan masyarakat Kota Semarang selama beberapa dasawarsa.',
    imagePath: '/textures/history/early-photo-peresmian-patung-pleburan.webp',
    highlights: [
      'Foto arsip resmi dari situs sejarah Universitas Diponegoro (undip.ac.id)',
      'Halaman Gedung Biro Rektor Undip di Kampus Pleburan Semarang',
      'Simbol identitas pejuang yang mengakar kuat di pusat kota',
      'Pusat kegiatan pimpinan universitas sebelum relokasi ke Tembalang',
    ],
    orientation: 'landscape',
    size: 'medium',
  },

  // 5. Foto Upacara di Lapangan Olah Raga Pleburan
  {
    id: 'early-photo-students-1957',
    title: 'Foto Bersejarah: Upacara di Lapangan Olah Raga Kampus Pleburan',
    category: 'campus-photo',
    period: 'Era Kampus Awal',
    shortLabel: 'Upacara Lapangan OR Pleburan',
    description: 'Dokumentasi arsip resmi Undip: Barisan ribuan mahasiswa dan sivitas akademika dalam apel upacara akbar di Lapangan Olah Raga Undip Pleburan.',
    fullContent: 'Dokumentasi fotografi langka dari arsip resmi Universitas Diponegoro memperlihatkan apel akbar sivitas akademika di Lapangan Olah Raga Undip Kampus Pleburan Semarang.\n\nLapangan OR Pleburan merupakan saksi sejarah tempat diselenggarakannya berbagai peristiwa penting kampus: orientasi penerimaan mahasiswa baru (Opspek/Penerimaan Mahasiswa), peringatan Dies Natalis, pekan olahraga mahasiswa, hingga apel kebangsaan. Di latar belakang tampak gedung perkuliahan bergaya arsitektur tropis 1960-an yang kokoh dan rindang dikelilingi pepohonan asam kranji.',
    imagePath: '/textures/history/early-photo-upacara-lapangan-pleburan.webp',
    highlights: [
      'Foto arsip resmi dari situs sejarah Universitas Diponegoro (undip.ac.id)',
      'Upacara apel akbar mahasiswa di Lapangan Olah Raga Kampus Pleburan',
      'Mencerminkan disiplin tinggi, kekompakan, dan jiwa korsa Diponegoro',
      'Pusat kegiatan fisik dan keolahragaan mahasiswa Jawa Tengah',
    ],
    orientation: 'landscape',
    size: 'small',
  },

  // 6. SK Presiden & PP No. 7 Tahun 1961
  {
    id: 'decree-sk-1961',
    title: 'Peraturan Pemerintah No. 7 Tahun 1961 & SK Menteri No. 101247/UU',
    category: 'decree',
    period: '15 Oktober 1960 / 1961',
    shortLabel: 'PP No. 7/1961 Penegerian',
    description: 'Landasan hukum utama penegerian Universitas Diponegoro oleh Pemerintah Republik Indonesia dan penetapan resmi tanggal Dies Natalis 15 Oktober 1957.',
    fullContent: 'Prestasi gemilang Universitas Semarang dalam mendidik putra-putri bangsa menarik perhatian Pemerintah Pusat di Jakarta. Pada Dies Natalis ketiga tanggal 9 Januari 1960, Presiden Republik Indonesia Ir. Soekarno mengganti nama Universitas Semarang menjadi UNIVERSITAS DIPONEGORO.\n\nKeputusan Presiden ini kemudian dikukuhkan secara yuridis formal dengan:\n1. Peraturan Pemerintah Republik Indonesia No. 7 Tahun 1961\n2. Surat Keputusan Menteri Pendidikan, Pengajaran dan Kebudayaan No. 101247/UU tanggal 3 Desember 1960.\n\nKeputusan penegerian tersebut berlaku surut mulai tanggal 15 Oktober 1957. Ketentuan ini secara resmi menetapkan 15 OKTOBER sebagai Hari Ulang Tahun (Dies Natalis) Universitas Diponegoro. Tanggal ini dipilih khusus untuk memperingati dan meneruskan cita-cita suci pejuang kemerdekaan dalam peristiwa patriotik "Pertempuran Lima Hari di Semarang" (15–19 Oktober 1945).',
    highlights: [
      'PP No. 7 Tahun 1961 tentang Penegerian Universitas Diponegoro',
      'Berlaku surut sejak 15 Oktober 1957 sebagai Dies Natalis resmi Undip',
      'Mengenang peristiwa heroik Pertempuran Lima Hari di Kota Semarang',
      'Menetapkan Semarang sebagai kedudukan resmi universitas negeri Jawa Tengah',
    ],
    orientation: 'portrait',
    size: 'medium',
  },

  // 7. Salinan Lembaran Negara 1961
  {
    id: 'decree-lembaran-negara',
    title: 'Lembaran Negara RI No. 21 Tahun 1961: Pengesahan Undip sebagai PTN',
    category: 'decree',
    period: 'Tahun 1961',
    shortLabel: 'Lembaran Negara No. 21/1961',
    description: 'Salinan resmi publikasi Lembaran Negara Republik Indonesia Tahun 1961 Nomor 21 tentang pendirian dan penegerian Universitas Diponegoro.',
    fullContent: 'Publikasi resmi Lembaran Negara Republik Indonesia Nomor 21 Tahun 1961 mengesahkan peralihan kelembagaan dari perguruan tinggi swasta Yayasan Universitas Semarang menjadi Perguruan Tinggi Negeri (PTN) penuh di bawah Departemen Perguruan Tinggi dan Ilmu Pengetahuan (PTIP).\n\nDengan terbitnya Lembaran Negara ini, seluruh fakultas, kurikulum, dosen, dan aset universitas berada di bawah jaminan dan pembinaan langsung Pemerintah Republik Indonesia, memberikan kewenangan penuh untuk menganugerahkan gelar kesarjanaan yang diakui secara nasional maupun internasional.',
    highlights: [
      'Publikasi resmi Lembaran Negara Republik Indonesia No. 21 Tahun 1961',
      'Jaminan status hukum penuh sebagai Perguruan Tinggi Negeri (PTN)',
      'Peralihan resmi aset dan organisasi yayasan ke pemerintah negara',
      'Tonggak pengakuan formal seluruh gelar akademik kesarjanaan Undip',
    ],
    orientation: 'portrait',
    size: 'small',
  },

  // 8. Naskah Pidato & Foto Bung Karno 1960
  {
    id: 'archives-soekarno-1960',
    title: 'Presiden Ir. Soekarno: Penganugerahan Nama Universitas Diponegoro (1960)',
    category: 'archive',
    period: '9 Januari 1960',
    shortLabel: 'Amanat Presiden Soekarno',
    description: 'Potret Presiden Republik Indonesia Ir. Soekarno yang secara resmi menganugerahkan nama UNIVERSITAS DIPONEGORO pada Dies Natalis ke-3 tanggal 9 Januari 1960.',
    fullContent: 'Pada perayaan Dies Natalis ketiga Universitas Semarang tanggal 9 Januari 1960, Presiden Republik Indonesia Ir. Soekarno secara langsung mengganti nama universitas menjadi UNIVERSITAS DIPONEGORO.\n\nPerubahan nama agung ini merupakan anugerah dan bentuk penghargaan tertinggi dari Pemerintah Republik Indonesia atas prestasi luar biasa Universitas Semarang dalam memelopori dan membina pendidikan tinggi di Jawa Tengah.\n\nBung Karno berpesan agar sivitas akademika meneladani api jiwa perjuangan Pangeran Diponegoro: kejujuran yang teguh, keberanian moral membela kebenaran, keadilan sosial, dan kesetiaan mengabdi bagi rakyat marhaen dan bangsa Indonesia.\n\nDalam laporannya pada Dies Natalis ke-13, Rektor Undip menegaskan bahwa tahun 1957 ditetapkan sebagai tahun resmi berdirinya Undip, karena Universitas Semarang (1957) merupakan embrio yang tak terpisahkan dari Universitas Diponegoro.',
    imagePath: '/textures/history/archives-soekarno-1960.webp',
    highlights: [
      'Peresmian nama Universitas Diponegoro pada 9 Januari 1960 oleh Ir. Soekarno',
      'Penghargaan presiden atas dedikasi pendidikan tinggi di Jawa Tengah',
      'Pesan kepemimpinan: Mewarisi api perjuangan patriotik Pangeran Diponegoro',
      'Tahun 1957 dikukuhkan sebagai tahun resmi kelahiran Undip (Dies Natalis XIII)',
    ],
    orientation: 'portrait',
    size: 'large',
  },

  // 9. Foto Auditorium Kampus Pleburan Dilihat dari Balkon
  {
    id: 'early-photo-soekarno-visit',
    title: 'Foto Bersejarah: Auditorium Kampus Pleburan Dilihat dari Balkon',
    category: 'campus-photo',
    period: 'Era Kampus Pleburan',
    shortLabel: 'Auditorium Pleburan',
    description: 'Dokumentasi arsip resmi Undip: Pandangan sudut atas dari balkon ruang Auditorium Universitas Diponegoro Kampus Pleburan Semarang.',
    fullContent: 'Foto arsip otentik dari situs resmi Universitas Diponegoro menampilkan kemegahan interior ruang Auditorium Undip Kampus Pleburan yang dilihat dari arah balkon lantai atas.\n\nAuditorium Pleburan merupakan ruang aula serbaguna paling prestisius di Semarang pada jamannya. Di aula berlantai kayu jati ini berlangsung berbagai peristiwa bersejarah universitas, mulai dari pidato tahunan rektor, perayaan Dies Natalis, kuliah umum para tokoh nasional dan menteri, hingga prosesi wisuda sarjana periode awal Undip.',
    imagePath: '/textures/history/early-photo-auditorium-pleburan.webp',
    highlights: [
      'Foto arsip resmi dari situs sejarah Universitas Diponegoro (undip.ac.id)',
      'Interior megah Auditorium Kampus Pleburan dari sudut pandang balkon',
      'Tempat diselenggarakannya Dies Natalis dan sidang senat terbuka wisuda',
      'Saksi pertemuan para cendekiawan terkemuka dan pimpinan nasional',
    ],
    orientation: 'landscape',
    size: 'medium',
  },

  // 10. Foto Gedung Pusat Riset Undip Pleburan
  {
    id: 'early-campus-pleburan',
    title: 'Foto Bersejarah: Gedung Pusat Riset Undip di Kampus Pleburan',
    category: 'campus-photo',
    period: 'Era Kampus Pleburan',
    shortLabel: 'Gedung Pusat Riset',
    description: 'Dokumentasi arsip resmi Undip: Bangunan Gedung Pusat Riset Universitas Diponegoro di kompleks Kampus Pleburan Semarang.',
    fullContent: 'Foto arsip resmi Universitas Diponegoro memperlihatkan fasad Gedung Pusat Riset Undip di Kampus Pleburan. Bangunan bertingkat dengan jendela kaca lebar khas arsitektur modern 1970-an ini menjadi embrio lembaga penelitian dan pengabdian masyarakat (LPPM) Undip.\n\nDi gedung inilah para peneliti Undip merintis riset-riset strategis dalam bidang keilmuan kelautan dan pesisir (Pola Ilmiah Pokok/PIP Undip: Pengembangan Wilayah Pesisir), riset hukum progresif, kajian kependudukan, energi alternatif, dan kedokteran tropis yang mengharumkan nama Undip.',
    imagePath: '/textures/history/early-photo-pusat-riset-pleburan.webp',
    highlights: [
      'Foto arsip resmi dari situs sejarah Universitas Diponegoro (undip.ac.id)',
      'Gedung Pusat Riset Undip di kawasan Kampus Pleburan Semarang',
      'Tonggak lahirnya Pola Ilmiah Pokok (PIP): Pengembangan Wilayah Pesisir',
      'Cikal bakal Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM)',
    ],
    orientation: 'landscape',
    size: 'medium',
  },

  // 11. Patung Pangeran Diponegoro Rektorat Tembalang
  {
    id: 'history-masterplan-tembalang',
    title: 'Monumen Patung Pangeran Diponegoro Rektorat Widya Puraya Tembalang',
    category: 'history',
    period: 'Era Kampus Tembalang',
    shortLabel: 'Patung Kuda Rektorat',
    description: 'Dokumentasi monumen patung Pangeran Diponegoro menunggang kuda yang berdiri kokoh di bundaran depan Gedung Rektorat Widya Puraya Kampus Tembalang.',
    fullContent: 'Monumen Patung Pangeran Diponegoro menunggang kuda perkasa di pelataran bundaran Gedung Rektorat Widya Puraya merupakan simbol selamat datang dan landmark paling ikonik di Kampus Terpadu Tembalang.\n\nPangeran Diponegoro digambarkan dengan sorban dan jubah putih, memegang kendali kuda yang tengah meringkik gagah dengan dua kaki depan terangkat ke udara. Sikap ini melambangkan keberanian menerobos rintangan masa depan, semangat kepemimpinan yang progresif, dan komitmen seluruh sivitas akademika Undip untuk terus maju mengukir prestasi dunia.',
    imagePath: '/textures/history/monument-patung-kuda-rektorat.webp',
    highlights: [
      'Landmark sentral paling ikonik di gerbang Rektorat Widya Puraya Tembalang',
      'Patung Pangeran Diponegoro menunggang kuda dengan posisi gagah perkasa',
      'Melambangkan keberanian, ketangkasan, dan visi masa depan gemilang',
      'Tempat favorit dokumentasi kebanggaan mahasiswa, alumni, dan tamu negara',
    ],
    orientation: 'portrait',
    size: 'medium',
  },

  // 12. Gedung Fakultas & Manajemen Kampus Tembalang
  {
    id: 'history-groundbreaking-tembalang',
    title: 'Gedung Kampus Manajemen & Fakultas di Kawasan Terpadu Tembalang',
    category: 'campus-photo',
    period: 'Era Kampus Tembalang',
    shortLabel: 'Kampus Tembalang Modern',
    description: 'Dokumentasi arsitektur modern gedung fakultas dan manajemen di kawasan kampus terpadu perbukitan Tembalang seluas 180 hektar.',
    fullContent: 'Pembangunan Kampus Terpadu Tembalang seluas lebih dari 180 hektar dirintis sejak akhir dekade 1970-an di bawah kepemimpinan Rektor Prof. Sudarto, S.H. dan direalisasikan secara masif oleh Rektor Prof. Dr. Moeljono S. Trastotenojo dengan dukungan pendanaan Bank Dunia dan Pemerintah RI.\n\nKawasan perbukitan Tembalang yang sejuk kini menjadi rumah bersama bagi 11 Fakultas, 2 Sekolah (Sekolah Pascasarjana dan Sekolah Vokasi), laboratorium terpadu, perpustakaan modern, gelanggang olahraga, dan asrama mahasiswa berkelas internasional.',
    imagePath: '/textures/history/history-gedung-manajemen.webp',
    highlights: [
      'Relokasi kampus terpadu perbukitan Tembalang seluas 180+ hektar',
      'Konsep kampus hijau terpadu (Integrated Eco-Campus)',
      'Menaungi 11 Fakultas dan ribuan fasilitas riset laboratorium',
      'Menjadikan Undip sebagai salah satu kampus terluas dan terlengkap di Jawa',
    ],
    orientation: 'landscape',
    size: 'medium',
  },

  // 13. Gedung Widya Puraya Rektorat
  {
    id: 'history-widya-puraya',
    title: 'Gedung Rektorat Widya Puraya: Pusat Pimpinan & Seremonial Undip',
    category: 'campus-photo',
    period: '1993–Modern',
    shortLabel: 'Rektorat Widya Puraya',
    description: 'Foto ikonik Gedung Rektorat Widya Puraya dengan menara jam khas dan atap limas bertingkat di jantung Kampus Tembalang.',
    fullContent: 'Gedung Widya Puraya diresmikan pada dekade 1990-an sebagai jantung administratif dan seremonial utama Universitas Diponegoro di Kampus Tembalang. Nama "Widya Puraya" bermakna "Istana Ilmu Pengetahuan".\n\nBangunan ini memiliki arsitektur megah yang memadukan filosofi tradisional limasan Jawa dengan fungsionalitas modern, dilengkapi menara jam tinggi yang membunyikan genta setiap pergantian jam perkuliahan. Di pelataran luas Widya Puraya diselenggarakan upacara bendera kenegaraan, penerimaan mahasiswa baru (Penerimaan Mahasiswa Baru/PMB), dan berbagai parade budaya universitas.',
    imagePath: '/textures/history/history-widya-puraya.webp',
    highlights: [
      'Gedung Rektorat sentral pusat tata kelola dan administrasi universitas',
      'Arsitektur ikonik menara jam genta dan atap limasan berlapis emas',
      'Pusat upacara seremonial akbar penerimaan mahasiswa baru dan Dies Natalis',
      'Simbol wibawa dan kepemimpinan akademik Universitas Diponegoro',
    ],
    orientation: 'portrait',
    size: 'medium',
  },

  // 14. Gedung Muladi Dome
  {
    id: 'history-muladi-dome',
    title: 'Gedung Muladi Dome: Mahakarya Convention & Expo Hall Terbesar Undip',
    category: 'history',
    period: '2024–Modern',
    shortLabel: 'Gedung Muladi Dome',
    description: 'Foto resmi Gedung Muladi Dome berkapasitas 4.000+ delegasi dengan kubah champagne gold megah untuk konferensi internasional dan wisuda akbar.',
    fullContent: 'Gedung Muladi Dome dinamai secara khusus untuk menghormati jasa agung Prof. Dr. Muladi, S.H., mantan Rektor Universitas Diponegoro (1994–1998) yang juga menjabat Menteri Kehakiman RI, Menteri Sekretaris Negara, dan Gubernur Lemhannas.\n\nDiinisiasi di era kepemimpinan Rektor Prof. Dr. Yos Johan Utama, S.H., M.Hum. dan diselesaikan modern, gedung megah beratap kubah emas champagne ini merupakan gedung pertemuan dan pameran (Convention & Multi-Purpose Expo Hall) termegah dan berteknologi akustik mutakhir di Jawa Tengah. Muladi Dome menjadi pusat penyelenggaraan wisuda sarjana, konser simfoni, expo riset teknologi, serta konferensi internasional.',
    imagePath: '/textures/history/history-muladi-dome.webp',
    highlights: [
      'Foto resmi dari situs Universitas Diponegoro (undip.ac.id)',
      'Dinamai untuk mengenang begawan hukum nasional Prof. Dr. Muladi, S.H.',
      'Kapasitas lebih dari 4.000 orang dengan teknologi tata suara kelas dunia',
      'Lokasi maket 3D kampus terpadu dan pusat wisuda akbar universitas',
    ],
    orientation: 'landscape',
    size: 'large',
  },

  // 15. Rumah Sakit Nasional Diponegoro (RSND)
  {
    id: 'history-rsnd',
    title: 'Rumah Sakit Nasional Diponegoro (RSND): Rumah Sakit Pendidikan Utama',
    category: 'campus-photo',
    period: '2014–Modern',
    shortLabel: 'RSND Tembalang',
    description: 'Foto Rumah Sakit Nasional Diponegoro (RSND) Tipe B di Kampus Tembalang yang menjadi pusat rujukan kesehatan dan riset medis modern.',
    fullContent: 'Rumah Sakit Nasional Diponegoro (RSND) berdiri megah di kawasan timur Kampus Tembalang sebagai wujud nyata komitmen Undip dalam memberikan layanan kesehatan prima kepada masyarakat dan sarana pendidikan klinis bagi mahasiswa Fakultas Kedokteran.\n\nGagasan berdirinya RSND dipelopori oleh Rektor Prof. Dr. dr. Susilo Wibowo, M.S. Med, Sp.And dan diresmikan beroperasi penuh pada tahun 2014. Sebagai Rumah Sakit Pendidikan Utama Tipe B dengan akreditasi Paripurna, RSND dilengkapi fasilitas IGD 24 jam, kamar bedah canggih, radiologi intervensi, pusat rehabilitasi medik, serta pusat unggulan riset kedokteran tropis dan onkologi.',
    imagePath: '/textures/history/history-rsnd.webp',
    highlights: [
      'Rumah Sakit Pendidikan Utama Tipe B terakreditasi Paripurna',
      'Pusat pelayanan kesehatan masyarakat Jawa Tengah dan riset medis terapan',
      'Didukung dokter spesialis, konsultan, dan peneliti Fakultas Kedokteran Undip',
      'Terintegrasi langsung dengan laboratorium biomedik dan klinik kampus',
    ],
    orientation: 'landscape',
    size: 'medium',
  },

  // 16. Waduk Undip & Sabuk Hijau Konservasi
  {
    id: 'history-waduk-undip',
    title: 'Waduk Pendidikan Undip & Sabuk Hijau Konservasi Eco-Campus',
    category: 'campus-photo',
    period: '2016–Sekarang',
    shortLabel: 'Waduk & Eco-Campus',
    description: 'Danau retensi air, laboratorium alam perikanan, dan kawasan konservasi biodiversitas kampus yang mendukung peringkat UI GreenMetric Undip.',
    fullContent: 'Waduk Pendidikan Undip dibangun di lembah perbukitan Tembalang sebagai infrastruktur ekologis pengendali hidrologi dan tata kelola air kampus. Waduk ini menampung jutaan meter kubik air hujan untuk mencegah banjir di wilayah Semarang bawah serta menjadi sumur resapan alami.\n\nSelain fungsi hidrologis, waduk ini difungsikan sebagai sarana riset biologi perairan dan budidaya perikanan oleh Fakultas Perikanan dan Ilmu Kelautan (FPIK), sarana latihan olahraga dayung, jogging track hijau, dan ruang terbuka rekreasi edukatif bagi masyarakat. Keberadaan waduk dan hutan kampus ini mengantarkan Undip ke jajaran 2 besar universitas paling berkelanjutan di Indonesia dalam pemeringkatan UI GreenMetric World University.',
    highlights: [
      'Kapasitas tampung air jutaan meter kubik pengendali banjir Semarang',
      'Laboratorium alam riset perikanan, kelautan, dan limnologi FPIK',
      'Kawasan sabuk hijau arboretum pohon langka dan konservasi burung liar',
      'Mendukung reputasi Undip sebagai Green Campus berkelanjutan',
    ],
    orientation: 'landscape',
    size: 'small',
  },

  // 17. Potret Bersejarah Pangeran Diponegoro
  {
    id: 'history-wisuda-perdana',
    title: 'Pangeran Diponegoro (1785–1855): Figur Teladan & Jiwa Patriotik Almamater',
    category: 'campus-photo',
    period: 'Tokoh Bangsa 1785–1855',
    shortLabel: 'Pangeran Diponegoro',
    description: 'Potret agung pahlawan nasional Pangeran Harya Dipanegara yang menjadi nama abadi almamater tercinta Universitas Diponegoro.',
    fullContent: 'Pangeran Diponegoro (lahir di Yogyakarta, 11 November 1785 – wafat di Makassar, 8 Januari 1855) adalah Pahlawan Nasional Indonesia yang memimpin Perang Jawa (Diponegoro War, 1825–1830) melawan penindasan penjajah Belanda.\n\nPerang yang dipimpinnya merupakan perang terbesar dan paling mengguncang keuangan pemerintah kolonial Hindia Belanda. Pangeran Diponegoro menolak segala bentuk kompromi yang mengorbankan harkat martabat rakyat kecil dan kesucian agama.\n\nSebagai penghormatan abadi atas jiwa kepahlawanan beliau, Presiden Sukarno menetapkan nama UNIVERSITAS DIPONEGORO pada tahun 1960. Nilai-nilai keberanian moral, kejujuran nurani, dan keikhlasan berkorban untuk nusa dan bangsa menjadi kompas spiritual seluruh insan Diponegoro (Dipo Muda) di mana pun mengabdi.',
    imagePath: '/textures/history/portrait-diponegoro-hero.webp',
    highlights: [
      'Pahlawan Nasional pemimpin Perang Jawa (1825–1830) melawan kolonialisme',
      'Tokoh pemersatu rakyat, ulama, dan bangsawan demi kedaulatan bangsa',
      'Namanya diabadikan sebagai identitas abadi Universitas Diponegoro',
      'Nilai dasar almamater: Jujur, Berani, Peduli Rakyat, dan Pantang Menyerah',
    ],
    orientation: 'portrait',
    size: 'medium',
  },

  // 18. Transformasi Menuju PTN-BH
  {
    id: 'history-transformation',
    title: 'Transformasi Kelembagaan: PTN (1961) → BLU (2008) → PTN-BH (2015)',
    category: 'history',
    period: '2014–Sekarang',
    shortLabel: 'Transformasi PTN-BH',
    description: 'Perjalanan panjang penetapan status hukum Universitas Diponegoro dari PTN (PP No. 7/1961), BLU (KMK No. 259/2008), hingga PTN Badan Hukum (PP No. 81/2014 & PP No. 52/2015).',
    fullContent: 'Perjalanan panjang Universitas Diponegoro diwarnai oleh lompatan transformasi kelembagaan strategis:\n\n1. STATUS PERGURUAN TINGGI NEGERI (PTN):\nBerdasarkan Peraturan Pemerintah RI No. 7 Tahun 1961, Undip resmi berstatus Perguruan Tinggi Negeri berkedudukan di Kota Semarang.\n\n2. STATUS BADAN LAYANAN UMUM (BLU):\nBerdasarkan Keputusan Menteri Keuangan No. 259/KMK.05/2008 tanggal 15 September 2008, Undip ditetapkan sebagai instansi pemerintah yang menerapkan Pengelolaan Keuangan Badan Layanan Umum untuk fleksibilitas pelayanan akademik dan riset.\n\n3. STATUS PTN BERBADAN HUKUM (PTN-BH):\nBerdasarkan Peraturan Pemerintah RI No. 81 Tahun 2014 dan PP No. 52 Tahun 2015 tentang Statuta Universitas Diponegoro (Lembaran Negara RI Tahun 2014 No. 302), Undip resmi menyandang kasta tertinggi otonomi perguruan tinggi sebagai PTN Badan Hukum.\n\nDengan status PTN-BH, Undip bertransformasi menjadi World Class University. Undip berhasil menduduki peringkat #1 di Indonesia untuk lulusan tercepat mendapatkan pekerjaan (QS Graduate Employability Rankings) dan melahirkan puluhan ribu karya inovasi bermanfaat bagi kemaslahatan bangsa.',
    highlights: [
      'PP No. 7 Tahun 1961: Pengesahan status Perguruan Tinggi Negeri (PTN)',
      'KMK No. 259/KMK.05/2008: Penetapan Pengelolaan Keuangan Badan Layanan Umum (BLU)',
      'PP No. 81 Tahun 2014 & PP No. 52 Tahun 2015: Penetapan status PTN Badan Hukum (PTN-BH)',
      'Peringkat 1 Indonesia: Lulusan tercepat mendapat kerja (QS Graduate Employability)',
    ],
    orientation: 'landscape',
    size: 'large',
  },
]
