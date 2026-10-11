import type { Dictionary } from "@/i18n/types";

/**
 * Bahasa Indonesia. Draft translation of en.ts; every string still needs a
 * native reviewer. `satisfies Dictionary` makes the build fail on a missing,
 * misspelt or extra key, so the shape always matches English.
 *
 * Choices a reviewer may want to revisit:
 * - "Islamic Principle(s)" is rendered "Prinsip Islam" / "sesuai prinsip
 *   Islam", never "syariah", mirroring the English copy's intent. Official
 *   names that contain "Syariah" (Bank Syariah Indonesia, the KNEKS long name)
 *   are kept as they are.
 * - SME is "UMKM", the term KNEKS and the government use.
 * - Akad names follow DSN-MUI spelling: murabahah, istishna', musyarakah,
 *   mudharabah, wakalah, maisir.
 * - Money figures use Indonesian abbreviations (rb, Jt, M = miliar, T =
 *   triliun) and decimal commas, since "$25M" would read as 25 miliar here.
 *   Short figures join number and unit with \u00a0 (no-break space) so a
 *   narrow column never splits "$23 M+" over two lines.
 */
const id = {
  _meta: {
    locale: "id",
    status: "draft, needs native review",
  },

  site: {
    name: "Moria Ventures",
    titleTemplate: "%s — Moria Ventures",
    description:
      "PT Moria Ventures Capital — modal sesuai prinsip Islam yang menghubungkan Indonesia dan kawasan Teluk melalui modal ventura, pembiayaan proyek, dan pembangunan usaha.",
  },

  common: {
    imInvestor: "Saya Investor",
    imFounder: "Saya Pendiri",
    imBusiness: "Saya Pelaku Usaha",
    contactUs: "Hubungi Kami",
    applyForFunding: "Ajukan Pendanaan",
    imagePlaceholder: "Tempat gambar",
    logoAlt: "Logo {name}",
    skylineAlt: "Cakrawala {city}",
  },

  languageSwitcher: {
    label: "Bahasa",
    current: "Bahasa: {language}",
  },

  header: {
    homeLabel: "Moria Ventures — beranda",
    toggleNav: "Buka/tutup navigasi",
    about: "Tentang",
    whatWeDo: "Layanan Kami",
    portfolio: "Portofolio",
    partners: "Mitra",
    contact: "Hubungi Kami",
    portfolioMenu: {
      portfolio: "Portofolio",
      forBusinesses: "Untuk Pelaku Usaha",
      forLimitedPartners: "Untuk Limited Partner",
      corridor: "Koridor Indonesia–Arab Saudi",
    },
    partnersMenu: {
      kneks: "KNEKS",
    },
  },

  footer: {
    tagline:
      "PT Moria Ventures Capital menjembatani Asia Tenggara dan negara-negara Dewan Kerja Sama Teluk.",
    platform: {
      title: "Platform",
      about: "Tentang Kami",
      whatWeDo: "Layanan Kami",
    },
    lpBiz: {
      title: "Untuk LP & Usaha",
      lps: "Untuk LP",
      businesses: "Untuk Pelaku Usaha",
      corridor: "Koridor",
    },
    resources: {
      title: "Informasi",
      insights: "Wawasan & Berita",
      careers: "Karier",
      contact: "Hubungi Kami",
    },
    copyright:
      "© 2026 PT Moria Ventures Capital. Hak cipta dilindungi. Terdaftar di OJK dan CMA Arab Saudi.",
    legal: {
      certification: "Sertifikasi Dewan Prinsip Islam",
      privacy: "Kebijakan Privasi",
      terms: "Ketentuan Layanan",
    },
  },

  ctaBand: {
    title: ["Siap berinvestasi pada masa depan", "inovasi yang sesuai", "prinsip Islam?"],
  },

  heroSlider: {
    region: "Sorotan",
    slide: "{index} dari {total}: {label}",
    showSlide: "Tampilkan slide {index}: {label}",
    previous: "Slide sebelumnya",
    next: "Slide berikutnya",
  },

  notFound: {
    title: "Halaman tidak ditemukan",
    body: "Halaman yang Anda cari tidak ada atau sudah dipindahkan.",
    home: "Kembali ke beranda",
  },

  home: {
    hero: {
      slideLabel: "Moria Ventures",
      title: ["Modal yang Patuh.", "Menghubungkan Teluk", "dan Indonesia"],
      lede: "<b>PT Moria Ventures Capital</b> adalah perusahaan investasi berbasis prinsip Islam yang mendukung perusahaan berbasis teknologi di Indonesia dan kawasan Teluk, menghubungkan investor global dengan keahlian regional serta komitmen jangka panjang kepada para pendiri.",
    },
    kneksSlide: {
      slideLabel: "Moria Ventures × KNEKS",
      title: ["Mitra dalam", "ekonomi Islam", "Indonesia"],
      lede: "<b>KNEKS</b>, Komite Nasional Ekonomi dan Keuangan Syariah, mengoordinasikan ekonomi Islam Indonesia lintas kementerian dan lembaga. Bersama, kami mempertemukan UMKM binaannya dengan investor dari kawasan Teluk dan Asia Tenggara.",
      explore: "Jelajahi program",
      about: "Tentang KNEKS",
      facts: [
        {
          value: "2020",
          label:
            "Dibentuk melalui Peraturan Presiden No. 28 Tahun 2020, melanjutkan KNKS yang berdiri pada 2016.",
        },
        {
          value: "Presiden & Wapres",
          label: "Diketuai langsung oleh Presiden dan Wakil Presiden Republik Indonesia.",
        },
        {
          value: "4\u00a0pilar",
          label: "Industri halal, keuangan Islam, bisnis berbasis nilai Islam, serta zakat dan wakaf.",
        },
      ],
    },
    quote: {
      text: "“Kami tidak ingin membangun VC yang sekadar menghindari yang haram. Kami ingin membangun VC yang memastikan semua yang kami sentuh, setiap perusahaan, setiap transaksi, setiap struktur, benar-benar dibangun dengan cara yang benar.”",
      attribution: "Husni Muhammad B, Managing Partner, Moria Ventures",
    },
    stats: [
      { value: "$25\u00a0Jt+", label: "Modal Tersalurkan" },
      { value: "~40%", label: "ROI Gabungan" },
      { value: "15+", label: "Perusahaan Portofolio" },
      { value: "2", label: "Pasar Aktif" },
    ],
    engines: {
      title: "Mesin Investasi",
      items: [
        {
          name: "Modal Ventura",
          body: "Mendukung para pemimpin teknologi masa depan di Asia Tenggara melalui investasi ekuitas, dengan horizon 3–7 tahun dan pendampingan langsung saat perusahaan portofolio berekspansi ke Timur Tengah dan Afrika Utara. Kami berfokus pada Fintech, Logistik, Agritech, dan teknologi halal, sektor tempat gelombang pertumbuhan berikutnya di kawasan ini sedang dibangun.",
        },
        {
          name: "Imbal Hasil Siklus Pendek",
          body: "Suntikan likuiditas yang terstruktur dan bervolatilitas rendah dengan akad murabahah, istishna', dan musyarakah. Kami mengelola pembiayaan PO dan perdagangan rantai pasok dengan siklus jatuh tempo ketat 30–180 hari, serta memitigasi risiko mata uang lintas negara dan risiko operasional melalui escrow institusional.",
        },
        {
          name: "Pembangun Usaha",
          body: "Pembangunan usaha secara langsung yang mengubah ide tahap awal menjadi perusahaan siap investasi. Kami bekerja bersama para pendiri dalam produk, struktur, dan strategi komersial — menekan risiko bisnis sebelum modal bergerak. Sektor fokus: Fintech, AI, teknologi Islam, F&B, dan Healthtech.",
        },
      ],
    },
    valueProps: {
      title: "Proposisi Nilai",
      imageAlt: "Cakrawala Jakarta saat senja",
      items: [
        {
          term: "Prinsip Islam",
          body: "Setiap penyaluran dana berjalan di bawah model kepatuhan ketat yang diaudit oleh ulama yang diakui secara global. Kami menghapus riba, gharar, dan maisir tanpa mengorbankan kemampuan menghasilkan imbal hasil.",
        },
        {
          term: "Akses Dua Pasar",
          body: "Jembatan operasional langsung antara kekuatan ekonomi Asia Tenggara (Indonesia) dan Dewan Kerja Sama Teluk (GCC). Kami membantu perusahaan melintasi batas negara dengan lancar.",
        },
        {
          term: "Lebih dari Sekadar Modal",
          body: "Mitra kami membawa jejaring regulasi, kelembagaan, dan komersial yang mendalam di kedua yurisdiksi, membuka jalan bagi usaha patungan, jalur perizinan, dan keterlibatan dengan modal institusional setingkat negara.",
        },
        {
          term: "Imbal Hasil Terbukti",
          body: "Kerangka imbal hasil yang disiplin, menargetkan kinerja yang konsisten dan disesuaikan dengan risiko melalui alokasi dua mesin kami — memadukan ekuitas ventura berpotensi tinggi dengan imbal hasil proyek siklus pendek yang dapat diprediksi.",
        },
      ],
    },
    corridor: {
      title: "Indonesia — Arab Saudi",
      subtitle: "Koridor Ekonomi Bernilai Triliunan Dolar",
      body: "Sebagai negara berpenduduk mayoritas Muslim terbesar di dunia, Indonesia memiliki pasar konsumen besar yang belum tergarap dan sektor digital yang sangat aktif. Arab Saudi, yang menggerakkan Visi 2030, memiliki cadangan modal likuid yang tak tertandingi. Moria Ventures berperan sebagai gerbang institusional, memastikan jalur yang cepat dan patuh regulasi untuk menghubungkan mandat Timur Tengah yang didukung negara dengan mesin pertumbuhan Asia Tenggara.",
      linksLabel: "Jejaring Ekosistem Strategis",
      ecosystem: [
        {
          name: "KNEKS",
          body: "Keselarasan dengan Komite Nasional Ekonomi dan Keuangan Syariah Indonesia.",
        },
        {
          name: "Fintech Saudi",
          body: "Jalur integrasi akselerasi regulatory sandbox Arab Saudi bagi pendatang regional.",
        },
        {
          name: "CMA Arab Saudi (Capital Market Authority)",
          body: "Keselarasan kepatuhan institusional yang ketat untuk persetujuan alokasi dana negara.",
        },
      ],
    },
    portfolio: {
      title: "Portofolio",
    },
  },

  about: {
    meta: {
      title: "Tentang",
      description:
        "Perusahaan modal ventura berbasis keuangan Islam untuk koridor Indonesia–Teluk, memadukan ekuitas tahap awal dengan pembiayaan proyek siklus pendek. Setiap transaksi berbasis aset dan bebas bunga sejak term sheet pertama.",
    },
    hero: {
      title: "Tentang Moria Ventures",
      lede: "Moria Ventures adalah perusahaan modal ventura berbasis keuangan Islam yang dibangun untuk koridor Indonesia–Teluk, menjalankan dua mesin: ekuitas di perusahaan tahap awal dan pembiayaan proyek siklus pendek yang memutar modal lebih cepat. Setiap transaksi berbasis aset dan bebas bunga, distrukturkan demikian sejak term sheet pertama, bukan disertifikasi belakangan.",
    },
    anchors: {
      whoWeAre: "Siapa Kami",
      compliance: "Kepatuhan Prinsip Islam",
      leadership: "Kepemimpinan",
    },
    whoWeAre: {
      eyebrow: "Siapa Kami",
      title: "Arsitek Pertumbuhan Bilateral",
      jakartaAlt: "Kawasan pusat bisnis Jakarta",
      riyadhAlt: "Cakrawala Riyadh",
      storyTitle: "Kisah Pendirian Kami",
      story:
        "Moria Ventures Capital didirikan untuk membuka koridor yang sebelumnya tidak ada: arus modal institusional yang terstruktur antara Indonesia, pasar berpenduduk mayoritas Muslim terbesar di dunia, dan cadangan likuiditas GCC yang dalam. Kami membangun infrastruktur regulasi, operasional, dan kepatuhan keuangan Islam untuk menyalurkan modal tersebut langsung kepada para pemimpin pasar.",
      mandateTitle: "Mandat Dua Mesin",
      mandate:
        "Moria Ventures berjalan dengan dua mesin, bukan satu: investasi ekuitas di perusahaan tahap awal yang dibangun untuk jangka panjang, dan pembiayaan proyek siklus pendek yang kembali dan disalurkan ulang lebih cepat daripada siklus dana konvensional. Bersama-sama, keduanya memungkinkan kami melayani kedua ujung koridor — modal sabar bagi pendiri yang membangun ke depan, dan modal cepat bagi usaha yang membutuhkannya sekarang.",
      milestonesEyebrow: "Tonggak Penting",
      milestones: [
        { year: "2021", text: "Moria Ventures didirikan di Jakarta" },
        { year: "2022", text: "Koridor GCC terbentuk & keselarasan LP Saudi pertama" },
        { year: "2023", text: "Mesin Pembiayaan Proyek diluncurkan dengan integrasi BSI" },
        { year: "2024", text: "Penyaluran aktif melampaui $25 Jt di lebih dari 15 perusahaan" },
      ],
    },
    governance: {
      eyebrow: "Tata Kelola Prinsip Islam",
      title: ["Kepatuhan Murni.", "Diterapkan Menyeluruh."],
      lede: "Berbeda dengan dana konvensional yang membatasi kepatuhan prinsip Islam pada struktur dana di tingkat atas, Moria secara aktif mengaudit dan menstrukturkan setiap penyaluran portofolio di bawahnya.",
      items: [
        {
          title: "Dewan Penasihat Prinsip Islam Independen",
          body: "Seluruh kontrak investasi, struktur dana, dan term sheet ditinjau dan disertifikasi sebelum modal disalurkan.<br/>(Penunjukan anggota dewan sedang berlangsung — Kuartal II 2026)",
        },
        {
          title: "Kemitraan Ekuitas Musyarakah",
          body: "Investasi ekuitas distrukturkan sebagai kemitraan bagi hasil dan bagi rugi yang sesungguhnya, bukan instrumen berbunga — keselarasan sejati antara investor, dana, dan pendiri.",
        },
        {
          title: "Instrumen Murabahah",
          body: "Pembiayaan proyek menggunakan jual beli dengan margin (murabahah). Seluruh transaksi terkait dengan kegiatan ekonomi yang nyata dan berwujud.",
        },
        {
          title: "Keselarasan MUI & AAOIFI",
          body: "Kerangka kerja kami selaras dengan standar akuntansi MUI dan prinsip AAOIFI global — menjadikan dana ini memenuhi syarat untuk mandat modal Islam dan kelompok LP berdampak etis.",
        },
      ],
    },
    leadership: {
      eyebrow: "Orang-Orang di Baliknya",
      title: "Puluhan Tahun Mengelola Lintas Batas",
      portraitPlaceholder: "Foto segera hadir",
      board: [
        {
          role: "CEO & Managing Partner",
          body: "Lebih dari 18 tahun menggerakkan arus investasi bilateral antara Jakarta dan pasar GCC. Arsitek struktur jalur akses dana negara milik Moria.",
        },
        {
          role: "Kepala Keuangan & Analisis Risiko",
          body: "Mengawasi audit kepatuhan prinsip Islam yang ketat, perhitungan capital call, dan fungsi treasuri dalam pengaturan multi-mata uang yang aktif.",
        },
        {
          role: "General Partner",
          body: "Spesialis logistik eksekusi lintas batas, operasi regulasi dalam kerangka OJK/BI, dan pengembangan skala perusahaan.",
        },
        {
          role: "General Partner",
          body: "Ahli strategi investasi Saudi berpengalaman yang mengawasi keselarasan dengan pengalokasi dana negara GCC serta portofolio proyek berstruktur murabahah.",
        },
      ],
    },
  },

  whatWeDo: {
    meta: {
      title: "Layanan Kami",
      description:
        "Dua produk permodalan. Satu platform pembangun usaha. Sesuai prinsip Islam dari penyaringan hingga exit.",
    },
    hero: {
      title: "Layanan Kami",
      lede: "Dua produk permodalan. Satu platform pembangun usaha. Sesuai prinsip Islam dari penyaringan hingga exit. Menghubungkan inovasi Asia Tenggara dengan pasar Dewan Kerja Sama Teluk.",
    },
    anchors: {
      ventureCapital: "01 / Modal Ventura",
      projectFinance: "02 / Pembiayaan Proyek",
      ventureBuilding: "03 / Pembangunan Usaha",
      criteria: "04 / Kriteria Investasi",
    },
    ventureCapital: {
      title: "Modal Ventura",
      imageAlt: "Cakrawala kota Jakarta",
      body: [
        "Mesin Modal Ventura kami berinvestasi ekuitas pada pionir digital berpertumbuhan tinggi di Asia Tenggara, dengan fokus pada Indonesia — mendukung model bisnis terdepan di kategorinya yang mengatasi inefisiensi struktural pada UMKM berbasis teknologi, komoditas, dan pertanian.",
        "Lebih dari sekadar modal, kami adalah jembatan menuju kawasan Teluk. Kami mendampingi perusahaan portofolio dalam ekspansi internasional — menghubungkan mereka dengan pengalokasi dana negara Timur Tengah, mitra korporasi strategis, dan jaringan komersial GCC yang mendorong pertumbuhan berkelanjutan.",
      ],
      specs: [
        { label: "Nilai Investasi", value: "$10\u00a0rb–$100\u00a0rb" },
        { label: "Horizon", value: "3–7\u00a0Tahun" },
        { label: "Struktur", value: "Ekuitas" },
      ],
    },
    projectFinance: {
      title: "Pembiayaan Proyek",
      imageAlt: "Dokumen pembiayaan perdagangan",
      body: [
        "Divisi Pembiayaan Proyek kami menyusun transaksi siklus pendek berbasis aset yang dirancang untuk imbal hasil yang dapat diprediksi dengan volatilitas minimal, menggunakan jalur likuiditas terstruktur yang disesuaikan dengan setiap transaksi.",
        "Kami berfokus pada rekening escrow institusional, pembiayaan purchase order, dan rantai pasok perdagangan, secara sistematis menekan risiko operasional dan risiko transaksi lintas batas. Hasilnya: siklus pendek yang dibangun untuk kecepatan, memberikan imbal hasil yang konsisten dan sesuai prinsip keuangan Islam.",
      ],
      specs: [
        { label: "Struktur", value: "Murabahah / PO" },
        { label: "Siklus", value: "30–180\u00a0Hari" },
        { label: "Rata-rata ROI", value: "~40%" },
      ],
    },
    ventureBuilding: {
      title: "Pembangunan Usaha",
      imageAlt: "Para operator portofolio dalam sesi kerja",
      items: [
        {
          term: "Pengembangan Pendiri",
          body: "Pendampingan administratif yang mendalam dan langsung untuk memastikan efisiensi organisasi, pengembangan kerangka operasional yang kokoh, dan sistem pembentukan tim yang dapat diskalakan.",
        },
        {
          term: "Pembangunan Usaha",
          body: "Jalur penghubung fisik, korporasi, dan kenegaraan langsung ke Arab Saudi, UEA, dan klaster ekonomi Teluk yang lebih luas untuk mempercepat peluncuran regional.",
        },
        {
          term: "Pertumbuhan Komersial",
          body: "Pemetaan regulasi dan protokol persetujuan yang komprehensif, selaras dari OJK dan Bank Indonesia di Jakarta hingga Capital Market Authority di Riyadh.",
        },
        {
          term: "Kesiapan Investasi",
          body: "Perancangan model yang ketat berdasarkan pedoman teraudit untuk menghapus risiko struktural riba, gharar, dan maisir dari arus transaksi, operasional, dan exit.",
        },
        {
          term: "Akses Permodalan",
          body: "Keterhubungan langsung dengan ekosistem ventura swasta dan yang didukung negara, grup korporasi regional, serta mitra teknologi yang andal untuk berkembang.",
        },
        {
          term: "Pertumbuhan Portofolio",
          body: "Pendampingan berkelanjutan, akses pasar regional, dukungan pendanaan lanjutan, dan arahan setingkat dewan — dukungan tidak berhenti saat investasi.",
        },
      ],
    },
    criteria: {
      title: "Kriteria Investasi",
      items: [
        {
          label: "Tahap",
          value: "Seed, Pra-Seri A, Seri A, dan Perdagangan Rantai Pasok siklus pendek",
        },
        {
          label: "Geografi",
          value: "Asia Tenggara (Indonesia) dan Dewan Kerja Sama Teluk (Arab Saudi / UEA)",
        },
        {
          label: "Sektor",
          value:
            "Infrastruktur Fintech, Logistik & Distribusi Halal, Rantai Pasok Pangan Berkelanjutan, platform Agritech",
        },
        {
          label: "Kepatuhan Prinsip Islam",
          value:
            "Kerangka etika yang ketat, mekanisme transaksi bebas riba yang tersertifikasi, eksekusi komersial yang teruji",
        },
        {
          label: "Nilai Investasi",
          value:
            "Bervariasi menurut model mesin (Ekuitas $100 rb–$500 rb, kapasitas transaksi menyesuaikan untuk alokasi pembiayaan perdagangan)",
        },
        {
          label: "Profil Kandidat Ideal",
          value:
            "Perusahaan teknologi berpertumbuhan tinggi dengan pendapatan tervalidasi, yang mencari jalur ekspansi di koridor ekonomi Indonesia–Arab Saudi.",
        },
      ],
    },
  },

  portfolio: {
    meta: {
      title: "Portofolio",
      description:
        "Lebih dari 15 perusahaan di bidang fintech, logistik, agritech, dan ekonomi halal, yang menjembatani Indonesia dan GCC.",
    },
    hero: {
      title: "Portofolio",
      lede: "<b>Ekuitas / Pembangun Usaha</b><br/>Portofolio perusahaan terdepan di kategorinya di bidang fintech, logistik, dan agritech. Dibangun, bukan sekadar didanai.<br/><br/><b>Pembiayaan Proyek</b><br/>Dipercaya oleh pelaku usaha di bidang pertanian, properti, F&B, dan FMCG untuk memutar modal melalui siklus terstruktur berbasis aset.",
      requestDataRoom: "Minta Akses Ruang Data",
      applyForFunding: "Ajukan Pendanaan",
    },
    stats: [
      { value: "15+", label: "Perusahaan" },
      { value: "$25\u00a0Jt+", label: "Tersalurkan" },
      { value: "~40%", label: "ROI Gabungan" },
      { value: "2", label: "Pasar" },
    ],
    register: {
      filterLabel: "Saring menurut Sektor",
      all: "Semua",
      types: {
        poFinancing: "Pembiayaan PO",
        projectFinancing: "Pembiayaan Proyek",
        khadamat: "Khadamat",
      },
      title: "Investasi Aktif",
      columns: {
        no: "No",
        project: "Proyek",
        type: "Jenis",
        investment: "Investasi",
      },
      empty: "Belum ada proyek untuk jenis ini.",
    },
    allocation: {
      title: "Alokasi Sektor",
      items: [
        { pct: "35%", name: "Perusahaan Berbasis Teknologi", count: "6 Perusahaan" },
        { pct: "20%", name: "Logistik & Rantai Pasok", count: "3 Perusahaan" },
        { pct: "15%", name: "Agritech", count: "2 Perusahaan" },
        { pct: "15%", name: "SaaS & Enterprise", count: "2 Perusahaan" },
        { pct: "15%", name: "Teknologi Ekonomi Halal", count: "2 Perusahaan" },
      ],
    },
    caseStudy: {
      title: "Sorotan Studi Kasus",
      items: [
        {
          term: "Pernyataan Masalah",
          body: "Perempuan di kawasan metropolitan Indonesia yang padat terus menghadapi tantangan keamanan dan aksesibilitas saat bepergian di dalam kota.",
        },
        {
          term: "Solusi",
          body: "HerMoves menghadirkan platform berbagi tumpangan khusus perempuan dengan pengemudi perempuan terverifikasi, fitur keamanan waktu nyata, dan pilihan tingkat kenyamanan.",
        },
        {
          term: "Hasil",
          body: "Pertumbuhan pengguna 3x dalam 6 bulan, berekspansi ke 3 kota di Indonesia.",
        },
      ],
    },
    exits: {
      imageAlt: "Anak panah emas yang menanjak",
      title: "Exit & Tonggak Penting",
      items: [
        {
          name: "PT Dhuha Logistics",
          body: "Diakuisisi oleh GCC Maritime Group untuk integrasi jaringan pasok halal lintas negara",
          year: "2024",
        },
        {
          name: "NusaQu Infra",
          body: "Menuntaskan integrasi API besar berbasis prinsip Islam dengan Bank Syariah Indonesia (BSI)",
          year: "2023",
        },
        {
          name: "HalalCommerce",
          body: "Bergabung dengan wahana investasi strategis milik negara Arab Saudi",
          year: "2022",
        },
      ],
    },
    join: {
      imageAlt: "Dua rekan kerja meninjau angka pertumbuhan di tablet",
      title: ["Ingin Bergabung dengan", "Portofolio Kami?"],
      body: "Kami secara aktif memilih proyek unggulan yang mencari dukungan ventura yang patuh atau pembiayaan proyek berjangka pendek.",
      cta: "Hubungi Kami",
    },
  },

  forBusinesses: {
    meta: {
      title: "Untuk Pelaku Usaha",
      description:
        "Ekuitas bagi pendiri yang berkembang menuju exit, dan pembiayaan proyek siklus pendek bagi usaha yang butuh modal kerja cepat — distrukturkan sesuai bisnis Anda.",
    },
    hero: {
      title: ["Dua Cara Kami Mendukung", "Pemilik Usaha"],
      lede: "Baik Anda membangun untuk jangka panjang maupun membutuhkan modal untuk bergerak sekarang, kami menstrukturkannya sesuai bisnis Anda, bukan sebaliknya. Ekuitas bagi pendiri yang berkembang menuju exit. Pembiayaan proyek siklus pendek bagi usaha yang membutuhkan modal kerja dengan cepat.",
      apply: "Ajukan Pendanaan",
      thesis: "Tesis Kami",
    },
    criteria: {
      title: "Kriteria Investasi",
      imageAlt: "Para pendiri meninjau dokumen transaksi di meja",
      items: [
        {
          term: "Model Bisnis Terdepan di Kategorinya",
          body: "Kami mendukung perusahaan yang mengatasi inefisiensi struktural yang nyata — bukan sekadar perbaikan kecil. Jika model bisnisnya tidak memiliki jalur yang jelas untuk memimpin kategorinya di pasar, itu bukan untuk kami.",
        },
        {
          term: "Berfokus pada UMKM",
          body: "Kami mendukung usaha kecil dan menengah dengan traksi operasional yang nyata — usaha yang mengatasi inefisiensi struktural di pasarnya, bukan ide tahap awal yang masih mencari model.",
        },
        {
          term: "Struktur Sesuai Keuangan Islam",
          body: "Setiap transaksi harus dapat distrukturkan dengan ketentuan berbasis aset dan bebas bunga. Jika model bisnis dasarnya tidak dapat distrukturkan demikian, itu di luar mandat kami, berapa pun potensi imbal hasilnya.",
        },
        {
          term: "Kecocokan Pendiri dan Pasar",
          body: "Kami berinvestasi pada pendiri sama besarnya dengan pada usahanya — kepemimpinan yang mampu menjalankan tata kelola, skala, dan disiplin operasional yang dituntut modal institusional.",
        },
        {
          term: "Fokus Sektor",
          body: "Sektor prioritas meliputi pertanian dan komoditas, properti, makanan & minuman (F&B), dan FMCG — tempat inefisiensi struktural paling besar, dan pengalaman operasional kami memberi nilai tambah terbesar di luar modal.",
        },
      ],
    },
    beyondCapital: {
      title: "Lebih dari Sekadar Modal",
      imageAlt: "Tim dalam sesi kerja membahas sebuah proposal",
      count: "06",
      countLabel: "Nilai Tambah Struktural",
      items: [
        {
          term: "Tata Kelola & Kesiapan Institusional",
          body: "Kami membangun tata kelola, pelaporan keuangan, dan infrastruktur uji tuntas yang dibutuhkan perusahaan agar layak menerima modal institusional — bukan sekadar saran, melainkan struktur yang nyata.",
        },
        {
          term: "Akses Pasar Lintas Negara",
          body: "Perkenalan langsung dengan pengalokasi dana negara di kawasan Teluk, mitra korporasi strategis, dan jaringan komersial GCC — akses yang sulit dibangun sendiri oleh sebagian besar usaha Indonesia.",
        },
        {
          term: "Penstrukturan Transaksi Sesuai Keuangan Islam",
          body: "Setiap transaksi distrukturkan dengan ketentuan berbasis aset dan bebas bunga sejak awal — bukan ditambahkan belakangan. Kepatuhan menjadi bagian dari arsitektur transaksi itu sendiri.",
        },
        {
          term: "Penguatan Operasional",
          body: "Pendampingan langsung di bidang produk, branding, penstrukturan hukum, dan operasional — kami bekerja di dalam bisnis, bukan sekadar memberi saran dari luar.",
        },
        {
          term: "Pengelolaan Portofolio Berkelanjutan",
          body: "Dukungan tidak berhenti di term sheet. Pendampingan berkelanjutan, arahan setingkat dewan, dan dukungan pendanaan lanjutan sepanjang pertumbuhan perusahaan.",
        },
        {
          term: "Disiplin Investasi yang Konsisten",
          body: "Setiap transaksi melalui proses terstruktur yang sama, dari penjaringan peluang hingga exit — sehingga penciptaan nilai tidak bergantung pada satu transaksi atau satu orang.",
        },
      ],
    },
    process: {
      title: "Proses Kami",
      imageAlt: "Meja kerja dengan laptop dan kalender tonggak proyek",
      steps: [
        {
          title: "Penyaringan Awal",
          body: "Evaluasi bertahap atas keselarasan struktur dengan prinsip Islam, unit ekonomi inti, dan kelayakan jembatan regional.",
        },
        {
          title: "Kajian Mendalam",
          body: "Uji tuntas teknis yang komprehensif, uji ketahanan unit secara strategis, dan audit keselarasan kepatuhan.",
        },
        {
          title: "Presentasi IC",
          body: "Validasi oleh Komite Investasi bilateral dengan masukan para ahli dari Jakarta dan pusat GCC.",
        },
        {
          title: "Term Sheet",
          body: "Kerangka likuiditas tanpa dilusi atau ekuitas yang dioptimalkan dan dipetakan secara mulus terhadap metrik pertumbuhan.",
        },
        {
          title: "Pascainvestasi",
          body: "Bergabung ke dalam jaringan koridor institusional kami, mendorong sinergi langsung dengan jejaring negara.",
        },
      ],
    },
    backed: {
      title: "Perusahaan yang Kami Dukung",
      imageAlt: "Tim di lokasi pengembangan properti portofolio",
    },
    pitch: {
      title: "Kirim Pitch Anda",
      body: "Isi formulir pendaftaran institusional di bawah ini. Komite evaluasi lintas negara kami memproses permintaan setiap minggu.",
      cta: "Hubungi Kami",
    },
  },

  forLimitedPartners: {
    meta: {
      title: "Untuk Limited Partner",
      description:
        "Akses institusional ke koridor investasi Indonesia–GCC, dibangun di atas arsitektur transaksi terstruktur yang sesuai prinsip keuangan Islam.",
    },
    hero: {
      title: "Untuk Limited Partner",
      lede: "Akses institusional ke koridor investasi Indonesia–GCC, dibangun di atas arsitektur transaksi terstruktur yang sesuai prinsip keuangan Islam. Kami memadukan penilaian risiko yang disiplin dengan proses investasi enam tahap yang dirancang untuk imbal hasil yang konsisten dan disesuaikan dengan risiko.",
      register: "Daftar",
      trackRecord: "Lihat Rekam Jejak",
    },
    photos: {
      whyInvest: "Tim Moria",
      trackRecord: "Dasbor kinerja portofolio",
      fundStructure: "Dokumen dana",
      gcc: "Cakrawala Riyadh saat senja",
    },
    why: {
      title: "Mengapa Berinvestasi Bersama Moria",
      items: [
        {
          term: ["Angka Nyata, Bukan Proyeksi"],
          body: "Portofolio kami telah menghasilkan ROI gabungan investor sebesar 40,5%, dilacak per transaksi di perusahaan portofolio aktif termasuk HerMoves, NusaQu, PT Dhuha, PT KGB, EV Bike, dan BeliAyam. Bukan perkiraan — kinerja nyata.",
        },
        {
          term: ["Kepatuhan Sejak Awal,", "Diperiksa Terus-Menerus"],
          body: "Setiap transaksi distrukturkan berbasis aset dan bebas bunga sejak term sheet, bukan disetujui belakangan. Dan kami tidak hanya menstrukturkannya sekali — setiap perusahaan portofolio menjalani pemantauan pemegang saham berkelanjutan, dengan risiko dipantau secara waktu nyata, bukan hanya saat penutupan.",
        },
        {
          term: ["Kami Menemukan yang Terlewat oleh Pihak Lain"],
          body: "Sebelum berinvestasi, setiap model kami audit sebagaimana kami ingin LP mengaudit kami — kami pernah menemukan penyusutan margin, tranche ekuitas yang salah label, dan kesalahan hitung valuasi dalam transaksi yang kami tinjau. Disiplin itu kami terapkan pertama-tama pada angka kami sendiri.",
        },
        {
          term: ["Dua Mesin, Satu Portofolio"],
          body: "Kami tidak sekadar menanamkan ekuitas lalu menunggu. Selain ekuitas jangka panjang di pemimpin pasar tahap awal, kami menjalankan pembiayaan proyek siklus pendek yang mengembalikan dan menyalurkan ulang modal lebih cepat — sehingga LP memperoleh eksposur pertumbuhan dan likuiditas kerja dalam satu mandat, bukan bertaruh pada satu model.",
        },
      ],
    },
    performance: {
      title: "Metrik Kinerja",
      headline: { value: "~40%", label: "ROI Gabungan Lintas Strategi" },
      metrics: [
        { value: "~74%", label: "ROI Pembiayaan PO" },
        { value: "$1,2\u00a0Jt", label: "Modal Tersalurkan" },
        { value: "15+", label: "Investasi Aktif" },
      ],
      note: "Data terperinci dan tinjauan audit formal tersedia di ruang data rahasia kami.",
    },
    seedFund: {
      title: "Dana Seed",
      lede: "Parameter struktural untuk alokasi privat yang patuh terhadap ketentuan dana negara.",
      terms: [
        { label: "Target Ukuran Dana", value: "5.000.000\u00a0USD" },
        {
          label: "Jangka Waktu Dana",
          value: "7 Tahun, dengan 2 × Opsi Perpanjangan 1 Tahun (Diskresi GP)",
        },
        { label: "Periode Investasi", value: "3 Tahun sejak First Close" },
        { label: "Target First Close", value: "Awal\u00a02027" },
        { label: "Komitmen Minimum LP", value: "50\u00a0rb\u00a0USD" },
        { label: "Komitmen GP", value: "2%\u00a0dari\u00a0Dana" },
        { label: "Biaya Pengelolaan", value: "3,0%\u00a0per\u00a0tahun" },
        {
          label: "Struktur Bagi Hasil",
          value: "Porsi Mudharib 20%, setelah Imbal Hasil Preferen 8% bagi LP",
        },
        { label: "Mata Uang", value: "Terstruktur dalam USD / SAR" },
        {
          label: "Struktur Keuangan Islam",
          value: "Arsitektur Mudharabah, Musyarakah & Wakalah",
        },
      ],
      footnote:
        "*Ketentuan lengkap perjanjian limited partnership dapat diakses setelah persetujuan formal ruang data.",
    },
    gulf: {
      title: "Kehadiran di Kawasan Teluk",
      lede: "Fondasi operasional yang menghubungkan mandat likuiditas GCC langsung dengan para pemimpin teknologi ASEAN.",
      items: [
        {
          title: "Kepatuhan Perizinan CMA Arab Saudi",
          body: "Keselarasan operasional yang ketat sesuai parameter Capital Market Authority untuk penyaluran modal privat negara ke luar negeri.",
        },
        {
          title: "Akselerasi Fintech Saudi",
          body: "Jalur yang didukung bersama dan dibangun langsung di dalam sandbox lokal untuk mempercepat masuknya usaha teknologi Indonesia ke Riyadh.",
        },
        {
          title: "Poros SCBD ke KAFD",
          body: "Operasi fisik langsung yang membentang dari SCBD Jakarta hingga King Abdullah Financial District di Riyadh untuk sinkronisasi jalur institusional seketika.",
        },
      ],
      stats: [
        { value: "100%", label: "Jalur Teraudit Sesuai Prinsip Islam" },
        { value: "SAR\u00a094\u00a0Jt", label: "Komitmen Lokal GCC Tersalurkan" },
      ],
    },
    focus: {
      title: "Fokus Portofolio",
      columns: {
        assetGroup: "Kelompok Aset",
        corridorFocus: "Fokus Koridor",
        jurisdiction: "Yurisdiksi",
        allocationStage: "Tahap Alokasi",
      },
      rows: [
        { focus: "Agro", jurisdiction: "Indonesia", stage: "Pembiayaan Proyek" },
        { focus: "Properti", jurisdiction: "Indonesia", stage: "Pembiayaan Proyek" },
        {
          focus: "Teknologi pendukung komunitas perempuan",
          jurisdiction: "Indonesia",
          stage: "Pra-Seed",
        },
      ],
    },
    dataRoom: {
      title: "Minta Akses Ruang Data",
      lede: "Investor Institusional yang Memenuhi Syarat dan Pengalokasi Dana Negara dapat mengirimkan data verifikasi untuk memulai tinjauan persetujuan regulasi secara penuh.",
      fields: {
        fullName: { label: "Nama Lengkap", placeholder: "mis. Tariq Bin Fahad" },
        institution: { label: "Lembaga / Perusahaan", placeholder: "mis. GCC Capital Advisory" },
        email: { label: "Email Bisnis", placeholder: "tariq@gcccapital.com" },
        phone: { label: "Nomor Telepon", placeholder: "+966 50 000 0000" },
        ticket: { label: "Rencana Nilai Investasi (USD)", placeholder: "mis. $5.000.000+" },
      },
      submit: "Kirim Permintaan",
      download: "Unduh Profil Singkat Institusional Moria Ventures",
      privacy:
        "PT Moria Ventures Capital memproses data investor secara ketat sesuai standar keamanan akses global. Verifikasi umumnya memerlukan 24–48 jam kerja.",
    },
  },

  contact: {
    meta: {
      title: "Kontak",
      description:
        "Hubungi tim kami di Jakarta dan Riyadh. Kami menjembatani kebutuhan modal institusional dengan usaha berpertumbuhan tinggi yang sesuai prinsip Islam.",
    },
    hero: {
      title: "Kontak",
      lede: "Hubungi tim kami di Jakarta dan Riyadh. Kami menjembatani kebutuhan modal institusional dengan usaha berpertumbuhan tinggi yang sesuai prinsip Islam.",
    },
    routed: {
      imageAlt: "Resepsionis Moria",
      title: "Jalur Kontak",
      routes: [
        {
          title: "Untuk Investor & LP",
          body: "Tertarik berinvestasi di koridor dana bilateral berbasis prinsip Islam kami atau meminta akses ruang data?",
          cta: "Hubungi Tim Investasi",
        },
        {
          title: "Untuk Pelaku Usaha & Pendiri",
          body: "Mencari modal pertumbuhan yang sesuai prinsip Islam, pembiayaan proyek, atau dukungan ekspansi ke GCC?",
          cta: "Hubungi Tim Portofolio",
        },
      ],
    },
    offices: [
      { region: "Kantor Pusat Asia Tenggara", city: "Jakarta" },
      { region: "Kantor Pusat Regional GCC", city: "Riyadh" },
    ],
    inquiries: {
      title: "Pertanyaan Umum",
      lede: "Kirimkan kriteria investasi atau rincian usaha Anda. Dewan kepatuhan prinsip Islam dan tim penilai risiko kami meninjau setiap pertanyaan dalam 3 hari kerja.",
      fields: {
        fullName: { label: "Nama Lengkap", placeholder: "mis. Sarah Mansour" },
        email: { label: "Alamat Email", placeholder: "mis. sarah.m@company.com" },
        phone: { label: "Nomor Telepon", placeholder: "mis. +62 812 3456 7890" },
      },
      submit: "Kirim Pertanyaan",
    },
    directLines: {
      title: "Kontak Langsung",
      lede: "Hubungi langsung tim pelaksana global terkait untuk penyelesaian cepat atas pertanyaan operasional, kepatuhan prinsip Islam, atau investor.",
      lines: [
        { team: "Hubungan Investor", person: "Musab Bin Nosair" },
        { team: "Media dan Pers", person: "Komunikasi Korporat" },
        { team: "Dukungan Portofolio", person: "Faris Achmad Kuddah" },
        { team: "Penasihat Hukum", person: "Meja Audit Prinsip Islam & Regulasi" },
      ],
    },
  },

  corridor: {
    meta: {
      title: "Koridor Indonesia–Arab Saudi",
      description:
        "Menjembatani ekonomi terbesar di Asia Tenggara dengan pasar dengan pertumbuhan tercepat di kawasan Teluk.",
    },
    hero: {
      title: ["Koridor", "Indonesia–Arab Saudi"],
      lede: "Menjembatani ekonomi terbesar di Asia Tenggara dengan pasar dengan pertumbuhan tercepat di kawasan Teluk.",
      imageAlt: "Jakarta dan Riyadh saat senja",
    },
    stats: [
      { value: "$23\u00a0M+", label: "Perdagangan Bilateral" },
      { value: "270\u00a0Jt", label: "Konsumen Muslim" },
      { value: "$3,2\u00a0T", label: "PDB Gabungan" },
      { value: "60%", label: "Penduduk di Bawah 30" },
      { value: "7,2%", label: "Pertumbuhan PDB Saudi" },
      { value: "5,0%", label: "Pertumbuhan PDB Indonesia" },
    ],
    opportunity: {
      title: "Peluangnya",
      imageAlt: "Pertemuan kemitraan bilateral",
      figure: "$3,2\u00a0T",
      figureLabel: "Peluang PDB Gabungan Koridor",
      lead: "Koridor yang menghubungkan Indonesia dan Kerajaan Arab Saudi merupakan salah satu jalur perdagangan dan investasi sesuai prinsip Islam yang paling kuat sekaligus paling belum terlayani dalam ekonomi global.",
      body: [
        "Didorong oleh Visi 2030 Arab Saudi yang ambisius dan proyeksi Indonesia sebagai lima besar ekonomi dunia pada 2030, koridor ini menghubungkan ekosistem teknologi berpertumbuhan tinggi di Asia Tenggara dengan likuiditas institusional yang dalam di GCC. Moria Ventures berperan sebagai penghubung utama yang memastikan arus dana tetap patuh.",
        "Melalui keselarasan strategis dengan entitas negara, bank nasional, dan otoritas regulasi di kedua kawasan, kami memfasilitasi ekspansi pasar, kliring perdagangan, dan alokasi modal yang lancar serta menjunjung kepatuhan prinsip Islam di setiap tahap.",
      ],
    },
    bridge: {
      title: "Cara Kami Menjembatani",
      imageAlt: "Ruang transaksi lintas negara",
      items: [
        {
          title: "Pendampingan Masuk Pasar",
          body: "Menyediakan cetak biru kesiapan pasar, dukungan perizinan, dan kerangka penstrukturan lokal untuk memastikan pendaratan yang mulus bagi scale-up digital terkemuka Asia Tenggara di Arab Saudi.",
        },
        {
          title: "Penghubung Modal",
          body: "Menghubungkan LP institusional dan family office kenegaraan di kawasan Teluk langsung ke putaran investasi unggulan, dengan memastikan struktur ekuitas yang sepenuhnya patuh.",
        },
        {
          title: "Navigasi Regulasi",
          body: "Berkoordinasi secara strategis dengan OJK, BI, dan CMA Arab Saudi untuk kepatuhan kerangka yang ketat, menghindari hambatan operasional dan transaksional.",
        },
        {
          title: "Akses Jaringan",
          body: "Membuka jalur eksekutif langsung ke pengelola dana kekayaan negara, jaringan perbankan, distributor regional terkemuka, dan kementerian ekonomi utama.",
        },
      ],
    },
    partners: {
      title: "Mitra Kami",
      imageAlt: "Pengarahan integrasi mitra",
      status: "Kerja Sama Aktif",
      items: [
        {
          name: "Fintech Saudi",
          body: "Simpul integrasi sandbox CMA dan Bank Sentral Arab Saudi.",
        },
        {
          name: "Bank Syariah Indonesia (BSI)",
          body: "Kerangka perbankan Islam untuk ritel dan perdagangan.",
        },
        {
          name: "CMA Arab Saudi (Keselarasan Berizin)",
          body: "Arus dana yang teregulasi dan kerangka kepatuhan.",
        },
        {
          name: "Kedutaan Besar Republik Indonesia",
          body: "Dukungan diplomatik dan perdagangan bilateral G2G di Riyadh.",
        },
      ],
    },
    inAction: {
      eyebrow: "Koridor dalam Aksi",
      title: "Mengembangkan Fintech Islam Lintas Kawasan",
      imageAlt: "Produk NusaQu sedang digunakan",
      caseTitle: "NusaQu Islamic Tech",
      caseBody:
        "NusaQu, platform infrastruktur keuangan Islam perintis asal Indonesia, perlu mendapatkan alokasi institusional dari kawasan Teluk untuk meluncurkan uji coba regulasinya di Arab Saudi.",
      stats: [
        { value: "$4,5\u00a0Jt", label: "Modal Tersalurkan" },
        { value: "90\u00a0Hari", label: "Persetujuan Sandbox CMA" },
      ],
      blocks: [
        {
          label: "Tantangannya",
          body: "Regulatory sandbox di Arab Saudi mensyaratkan dukungan lokal, keselarasan entitas yang kompleks secara struktural, dan audit kepatuhan modal yang sangat presisi untuk melindungi pengalokasi dana GCC dari masalah kepatuhan.",
        },
        {
          label: "Solusi Kami",
          body: "Moria Ventures menyusun arsitektur modal dual-SPV antara Jakarta dan Riyadh. Kami bermitra dengan penasihat hukum lokal di GCC untuk memenuhi pedoman CMA dan memperoleh izin uji coba melalui Fintech Saudi.",
        },
        {
          label: "Hasilnya",
          body: "Uji coba regional berhasil diluncurkan dengan kapabilitas operasional penuh, membuka akses ke lebih dari 10 juta pengguna lokal melalui operasi keuangan yang sesuai prinsip Islam.",
        },
      ],
    },
    dualEntity: {
      imageAlt: "Meja kerja Jakarta dan Riyadh",
      title: "Keunggulan Dua Entitas di Setiap Transaksi",
      body: "Kami memiliki satuan tugas investasi dan operasional khusus di Jakarta dan Riyadh, memberikan LP dan perusahaan portofolio kami akses langsung di lapangan di kedua sisi koridor.",
      tag: "Kapabilitas",
      capabilities: [
        "Integrasi Regulasi Langsung dengan OJK dan CMA",
        "Hubungan Perbankan Bilateral (BSI, bank lokal GCC)",
        "Tim Uji Tuntas di Dalam Negeri",
        "Penstrukturan Hukum dan Keuangan Islam Lintas Negara",
      ],
    },
    qris: {
      title: "Inisiatif Pembayaran Lintas Negara QRIS",
      body: "Moria Fund Global secara aktif memfasilitasi integrasi standar pembayaran QR nasional Bank Indonesia (QRIS) ke dalam ekosistem pembayaran Arab Saudi, memungkinkan penyelesaian transaksi pedagang lintas negara secara waktu nyata.",
      imageAlt: "Terminal penyelesaian transaksi pedagang QRIS",
      eyebrow: "Jembatan Infrastruktur",
      bridgeBody:
        "QRIS menghubungkan pedagang Indonesia dengan konsumen GCC, menciptakan lapisan penyelesaian lintas negara yang mulus untuk mengurangi hambatan, meningkatkan likuiditas, dan memperluas perdagangan regional.",
      stats: [
        { value: "$3,4\u00a0M+", label: "Perdagangan Bilateral Tahunan" },
        { value: "$120\u00a0Jt", label: "Target Alokasi Jalur Investasi" },
      ],
    },
    explore: {
      title: "Jelajahi Koridor",
      imageAlt: "Peta perdagangan koridor",
      investors: {
        title: "Untuk Investor",
        body: "Akses peluang pilihan berpertumbuhan tinggi yang sesuai prinsip Islam, mencakup fintech, rantai pasok berkelanjutan, dan portal konsumen di sepanjang koridor Asia Tenggara–GCC yang berimbal hasil tinggi.",
        cta: "Minta Presentasi LP",
      },
      businesses: {
        title: "Untuk Pelaku Usaha",
        body: "Kembangkan teknologi keuangan Islam Anda ke tingkat internasional. Manfaatkan izin regulasi, jaringan perbankan, dan dukungan modal kami untuk sukses masuk ke Riyadh dan kawasan Teluk yang lebih luas.",
        cta: "Ajukan Akses Koridor",
      },
    },
  },

  kneks: {
    meta: {
      title: "KNEKS × Moria",
      description:
        "Moria Ventures bekerja sama dengan KNEKS untuk mempertemukan UMKM Indonesia yang sesuai prinsip Islam dengan investor dan VC dari Timur Tengah, Afrika Utara, dan Asia Tenggara.",
    },
    logoAlt: "KNEKS — Komite Nasional Ekonomi dan Keuangan Syariah",
    hero: {
      title: ["UMKM Indonesia,", "siap menyambut", "modal global."],
      lede: "Moria Ventures bekerja sama dengan KNEKS untuk mempertemukan UMKM yang sesuai prinsip Islam dengan investor dan VC dari Timur Tengah, Afrika Utara, dan Asia Tenggara.",
      meetSmes: "Kenali UMKM-nya",
      becomePartner: "Jadi mitra investor",
      tagline: "Usaha yang selaras dengan prinsip Islam. Peluang lintas negara.",
      stats: {
        smes: "UMKM dalam pipeline",
        funded: "Lulusan terdanai",
        raised: "Dana terhimpun",
        sectors: "Sektor",
        note: "Angka terkini dari pipeline program.",
      },
    },
    about: {
      eyebrow: "Landasan kelembagaan",
      title: "Peran KNEKS",
      body: [
        "KNEKS memimpin upaya Indonesia menumbuhkan ekonomi dan keuangan Islam, menyatukan pemerintah, industri, dan lembaga keuangan di sekitar rantai nilai halal dan usaha berbasis prinsip Islam.",
        "UMKM berada di pusatnya; banyak di antaranya pelaku usaha yang tangguh namun aksesnya ke permodalan terbatas, dan program ini menutup kesenjangan tersebut.",
      ],
      supportTitle: "Cara program mendukung UMKM",
      support: [
        "Pendampingan bisnis dan kepatuhan prinsip Islam",
        "Kesiapan investasi (keuangan, tata kelola, pitch)",
        "Perkenalan dengan investor, VC, dan mitra pendanaan",
        "Akses lintas negara melalui jaringan Moria Ventures",
      ],
    },
    program: {
      title: "Cara kerja program",
      steps: [
        { title: "Daftar", body: "Bagikan profil usaha Anda." },
        { title: "Seleksi", body: "Tinjauan bisnis dan prinsip Islam." },
        { title: "Persiapan", body: "Susun laporan keuangan dan pitch Anda." },
        { title: "Pitch", body: "Bertemu investor yang selaras." },
        { title: "Terdanai", body: "Tuntaskan putaran pendanaan dan bertumbuh." },
      ],
      stageOf: "Tahap {current} dari {total}: {title}",
    },
    explorer: {
      title: "UMKM dalam program",
      lede: "Jelajahi jalur UMKM menurut sektor, kota, dan kesiapan.",
      previous: "UMKM sebelumnya",
      next: "UMKM berikutnya",
      searchLabel: "Cari UMKM",
      searchPlaceholder: "Cari nama, sektor, kota",
      filterLabel: "Saring menurut sektor",
      all: "Semua",
      empty: "Tidak ada UMKM yang cocok dengan pencarian itu.",
      countSmes: { other: "{count} UMKM" },
      countSectors: { other: "{count} sektor" },
      sampleProfiles: "Profil contoh",
      scrollHint: "Geser untuk menjelajah →",
      openBrief: "Buka ringkasan: {name}",
      funded: "Terdanai",
      roundClosed: "Putaran ditutup",
      interest: "Minat investor: {pct}% dari kebutuhan dana (contoh)",
      ask: "Kebutuhan dana",
      raised: "Dana terhimpun",
      notDisclosed: "Tidak diungkapkan",
      curatedProfiles: "Dikurasi untuk Halal Startup Demo Day 2026",
    },
    brief: {
      close: "Tutup ringkasan",
      stage: "Tahap",
      ask: "Kebutuhan dana",
      askValue: "USD {amount} rb",
      traction: "Traksi",
      status: "Status",
      fundedStatus: "Terdanai: USD {amount} rb dari {investor}",
      inProgram: "Dalam program",
      add: "Tambahkan ke daftar pilihan",
      remove: "Hapus dari daftar pilihan",
      readiness: "Kesiapan",
      legalForm: "Bentuk badan usaha",
      legalForms: {
        pt: "Perseroan terbatas (PT)",
        cv: "CV / persekutuan",
        none: "Belum berbadan hukum",
      },
      supportingOrg: "Lembaga pendamping",
      equity: "Ekuitas yang ditawarkan",
      useOfFunds: "Penggunaan dana",
      notDisclosed: "Tidak diungkapkan",
      fundedFrom: "Terdanai: {amount} dari {investor}",
      fundedBy: "Terdanai oleh {investor}",
    },
    shortlist: {
      title: "Daftar pilihan Anda",
      empty: "Belum ada.",
      hint: "Pilih UMKM lewat koinnya, atau di formulir, untuk menyertakannya dalam permintaan Anda.",
      add: "Tambahkan {name} ke daftar pilihan",
      remove: "Hapus {name} dari daftar pilihan",
    },
    stories: {
      eyebrow: "Perjalanan program",
      title: "Kisah sukses",
      lede: "Bagaimana UMKM menjalani program, dari seleksi dan pendampingan hingga percakapan dengan investor.",
      sample: "Contoh kisah",
      sampleNote: "Contoh kisah, hanya sebagai ilustrasi. Kisah ini menggambarkan perjalanan program secara umum dan bukan laporan faktual.",
      readStory: "Baca kisah",
      readStoryAbout: "Baca kisah: {title}",
      back: "Kembali ke kisah sukses",
      published: "Diterbitkan {date}",
      metaTitle: "{title} · Kisah sukses",
      englishOnly: "Kisah ini tersedia dalam bahasa Inggris.",
      aboutSme: "Tentang {name}",
      aboutSmeBody: "{name} adalah salah satu UMKM dalam program KNEKS × Moria.",
      sector: "Sektor",
      seeSmes: "Lihat UMKM dalam program",
      cta: {
        title: "Tertarik dengan UMKM seperti ini?",
        body: "Beri tahu kami wilayah dan nilai investasi Anda. Kami akan mengirimkan daftar UMKM terbaru dan menjadwalkan panggilan perkenalan.",
        button: "Minta akses investor",
      },
    },
    graduates: {
      title: "Alumni yang berhasil memperoleh pendanaan",
      lede: "Dua contoh alumni menggambarkan jalur pendanaan lintas negara.",
      featured: {
        name: "Aman Logistik",
        amount: "USD\u00a0600\u00a0rb",
        source: "Didanai oleh family office dari Timur Tengah",
        story:
          "Kisah contoh: layanan logistik yang menghubungkan UMKM Indonesia dengan rantai pasok regional.",
        quote: "“Program ini membantu kami bersiap untuk percakapan di luar pasar dalam negeri.”",
      },
      second: {
        name: "Sehat Herbal",
        amount: "USD\u00a0200\u00a0rb",
        source: "VC Asia Tenggara",
        quote: "“Kisah investasi yang lebih jelas membuka pintu bagi mitra baru.”",
      },
      quoteCaption: "Kutipan pendiri ilustratif · contoh",
      disclaimer: "Hanya maket. Nama, angka, dan kutipan adalah contoh.",
    },
    hubs: {
      title: "Terbuka bagi investor internasional",
      lede: "Ketuk salah satu pusat untuk melihat siapa yang kami cari di sana.",
      homeBase: "Basis utama",
      pickAway: "{name}: lihat siapa yang kami cari di sana",
      pickHome: "{name}, basis utama: lihat apa yang kami kerjakan di sana",
      selected: "{name} · Dipilih",
      items: {
        riyadh: {
          name: "Riyadh",
          blurb:
            "Riyadh dan kawasan GCC yang lebih luas: family office, dana, dan lembaga yang mencari peluang pertumbuhan yang selaras dengan prinsip halal.",
        },
        dubai: {
          name: "Dubai",
          blurb:
            "Dubai: VC regional dan platform lintas negara yang berinvestasi bersama di pasar berkembang.",
        },
        kualaLumpur: {
          name: "Kuala Lumpur",
          blurb:
            "Kuala Lumpur: lembaga keuangan Islam dan mitra strategis untuk ekspansi regional.",
        },
        singapore: {
          name: "Singapura",
          blurb:
            "Singapura: VC dan korporasi yang mencari UMKM Indonesia terseleksi untuk berinvestasi bersama dan bermitra.",
        },
        jakarta: {
          name: "Jakarta",
          blurb:
            "Jakarta: basis utama. Penyaringan transaksi, tinjauan prinsip Islam, dan eksekusi lokal bersama KNEKS.",
        },
      },
    },
    access: {
      eyebrow: "Langkah Anda berikutnya",
      title: ["Minta akses", "investor"],
      lede: "Beri tahu kami wilayah dan nilai investasi Anda. Kami akan mengirimkan daftar UMKM terbaru dan menjadwalkan panggilan perkenalan.",
    },
    form: {
      name: { label: "Nama", placeholder: "Nama lengkap Anda" },
      email: { label: "Email", placeholder: "anda@contoh.com" },
      region: { label: "Wilayah", placeholder: "Pilih wilayah" },
      ticket: { label: "Nilai investasi", placeholder: "Pilih nilai investasi" },
      message: { label: "Pesan", placeholder: "Ceritakan minat investasi Anda." },
      honeypot: "Situs web perusahaan",
      smesLabel: "UMKM yang Anda minati",
      selected: "{count} dipilih",
      pickAtLeastOne: "Pilih minimal satu",
      funded: "Terdanai",
      fundedSr: ", terdanai",
      privacy: "Data Anda hanya digunakan untuk mengoordinasikan akses investor dan perkenalan.",
      send: "Kirim permintaan",
      sending: "Mengirim…",
      filterSmes: "Saring UMKM",
      filterSmesPlaceholder: "Saring menurut nama, sektor, atau kota",
      filterSmesEmpty: "Tidak ada UMKM yang cocok dengan saringan itu.",
      sent: {
        title: "Permintaan terkirim",
        body: "Terima kasih, kami akan segera menghubungi Anda. Nantikan daftar UMKM terbaru dan undangan panggilan perkenalan.",
        shortlist: "Daftar pilihan Anda ikut terkirim: {names}.",
      },
    },
    errors: {
      name: "Masukkan nama Anda.",
      email: "Masukkan email yang valid.",
      region: "Pilih wilayah.",
      ticket: "Pilih nilai investasi.",
      shortlist: "Pilih minimal satu UMKM yang Anda minati.",
      tooLong: "Maksimal {limit} karakter.",
      rateLimited: "Terlalu banyak permintaan dari jaringan Anda. Silakan coba lagi nanti.",
      storeFailed: "Permintaan Anda belum dapat dikirim saat ini. Silakan coba lagi sebentar lagi.",
    },
  },
} satisfies Dictionary;

export default id;
