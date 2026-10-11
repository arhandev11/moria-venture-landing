/**
 * Indonesia's 38 provinces and the cities and regencies (kota and kabupaten)
 * in each, for the SME form's province-then-city choice. Plain data with no
 * imports, so the client form can load it.
 *
 * Names follow the curation data: provinces in their Indonesian names, places
 * in their common short form ("Bandung", "Sleman"). Where a regency shares
 * its name with a city in the same province, the regency is written
 * "Kabupaten X" ("Bandung" is the city, "Kabupaten Bandung" the regency).
 * Each list is alphabetical by place name, a city before its namesake regency.
 */

/** Builds one province's list from its cities and its regencies. */
function places(kota: string[], kabupaten: string[]): readonly string[] {
  const cities = new Set(kota);
  const all = [...kota, ...kabupaten.map((k) => (cities.has(k) ? `Kabupaten ${k}` : k))];
  const base = (s: string) => s.replace(/^Kabupaten /, "");
  return all.sort((a, b) => base(a).localeCompare(base(b)) || a.length - b.length);
}

export const INDONESIA_REGIONS: Readonly<Record<string, readonly string[]>> = {
  Aceh: places(
    ["Banda Aceh", "Langsa", "Lhokseumawe", "Sabang", "Subulussalam"],
    [
      "Aceh Barat", "Aceh Barat Daya", "Aceh Besar", "Aceh Jaya", "Aceh Selatan", "Aceh Singkil", "Aceh Tamiang", "Aceh Tengah",
      "Aceh Tenggara", "Aceh Timur", "Aceh Utara", "Bener Meriah", "Bireuen", "Gayo Lues", "Nagan Raya", "Pidie", "Pidie Jaya", "Simeulue",
    ],
  ),
  Bali: places(["Denpasar"], ["Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana", "Karangasem", "Klungkung", "Tabanan"]),
  Banten: places(["Cilegon", "Serang", "Tangerang", "Tangerang Selatan"], ["Lebak", "Pandeglang", "Serang", "Tangerang"]),
  Bengkulu: places(
    ["Bengkulu"],
    ["Bengkulu Selatan", "Bengkulu Tengah", "Bengkulu Utara", "Kaur", "Kepahiang", "Lebong", "Mukomuko", "Rejang Lebong", "Seluma"],
  ),
  "DI Yogyakarta": places(["Yogyakarta"], ["Bantul", "Gunungkidul", "Kulon Progo", "Sleman"]),
  "DKI Jakarta": places(
    ["Jakarta", "Jakarta Barat", "Jakarta Pusat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara"],
    ["Kepulauan Seribu"],
  ),
  Gorontalo: places(["Gorontalo"], ["Boalemo", "Bone Bolango", "Gorontalo", "Gorontalo Utara", "Pohuwato"]),
  Jambi: places(
    ["Jambi", "Sungai Penuh"],
    ["Batanghari", "Bungo", "Kerinci", "Merangin", "Muaro Jambi", "Sarolangun", "Tanjung Jabung Barat", "Tanjung Jabung Timur", "Tebo"],
  ),
  "Jawa Barat": places(
    ["Bandung", "Banjar", "Bekasi", "Bogor", "Cimahi", "Cirebon", "Depok", "Sukabumi", "Tasikmalaya"],
    [
      "Bandung", "Bandung Barat", "Bekasi", "Bogor", "Ciamis", "Cianjur", "Cirebon", "Garut", "Indramayu", "Karawang", "Kuningan",
      "Majalengka", "Pangandaran", "Purwakarta", "Subang", "Sukabumi", "Sumedang", "Tasikmalaya",
    ],
  ),
  "Jawa Tengah": places(
    ["Magelang", "Pekalongan", "Salatiga", "Semarang", "Surakarta", "Tegal"],
    [
      "Banjarnegara", "Banyumas", "Batang", "Blora", "Boyolali", "Brebes", "Cilacap", "Demak", "Grobogan", "Jepara", "Karanganyar",
      "Kebumen", "Kendal", "Klaten", "Kudus", "Magelang", "Pati", "Pekalongan", "Pemalang", "Purbalingga", "Purworejo", "Rembang",
      "Semarang", "Sragen", "Sukoharjo", "Tegal", "Temanggung", "Wonogiri", "Wonosobo",
    ],
  ),
  "Jawa Timur": places(
    ["Batu", "Blitar", "Kediri", "Madiun", "Malang", "Mojokerto", "Pasuruan", "Probolinggo", "Surabaya"],
    [
      "Bangkalan", "Banyuwangi", "Blitar", "Bojonegoro", "Bondowoso", "Gresik", "Jember", "Jombang", "Kediri", "Lamongan", "Lumajang",
      "Madiun", "Magetan", "Malang", "Mojokerto", "Nganjuk", "Ngawi", "Pacitan", "Pamekasan", "Pasuruan", "Ponorogo", "Probolinggo",
      "Sampang", "Sidoarjo", "Situbondo", "Sumenep", "Trenggalek", "Tuban", "Tulungagung",
    ],
  ),
  "Kalimantan Barat": places(
    ["Pontianak", "Singkawang"],
    ["Bengkayang", "Kapuas Hulu", "Kayong Utara", "Ketapang", "Kubu Raya", "Landak", "Melawi", "Mempawah", "Sambas", "Sanggau", "Sekadau", "Sintang"],
  ),
  "Kalimantan Selatan": places(
    ["Banjarbaru", "Banjarmasin"],
    [
      "Balangan", "Banjar", "Barito Kuala", "Hulu Sungai Selatan", "Hulu Sungai Tengah", "Hulu Sungai Utara", "Kotabaru", "Tabalong",
      "Tanah Bumbu", "Tanah Laut", "Tapin",
    ],
  ),
  "Kalimantan Tengah": places(
    ["Palangka Raya"],
    [
      "Barito Selatan", "Barito Timur", "Barito Utara", "Gunung Mas", "Kapuas", "Katingan", "Kotawaringin Barat", "Kotawaringin Timur",
      "Lamandau", "Murung Raya", "Pulang Pisau", "Seruyan", "Sukamara",
    ],
  ),
  "Kalimantan Timur": places(
    ["Balikpapan", "Bontang", "Samarinda"],
    ["Berau", "Kutai Barat", "Kutai Kartanegara", "Kutai Timur", "Mahakam Ulu", "Paser", "Penajam Paser Utara"],
  ),
  "Kalimantan Utara": places(["Tarakan"], ["Bulungan", "Malinau", "Nunukan", "Tana Tidung"]),
  "Kepulauan Bangka Belitung": places(["Pangkalpinang"], ["Bangka", "Bangka Barat", "Bangka Selatan", "Bangka Tengah", "Belitung", "Belitung Timur"]),
  "Kepulauan Riau": places(["Batam", "Tanjungpinang"], ["Bintan", "Karimun", "Kepulauan Anambas", "Lingga", "Natuna"]),
  Lampung: places(
    ["Bandar Lampung", "Metro"],
    [
      "Lampung Barat", "Lampung Selatan", "Lampung Tengah", "Lampung Timur", "Lampung Utara", "Mesuji", "Pesawaran", "Pesisir Barat",
      "Pringsewu", "Tanggamus", "Tulang Bawang", "Tulang Bawang Barat", "Way Kanan",
    ],
  ),
  Maluku: places(
    ["Ambon", "Tual"],
    [
      "Buru", "Buru Selatan", "Kepulauan Aru", "Kepulauan Tanimbar", "Maluku Barat Daya", "Maluku Tengah", "Maluku Tenggara",
      "Seram Bagian Barat", "Seram Bagian Timur",
    ],
  ),
  "Maluku Utara": places(
    ["Ternate", "Tidore Kepulauan"],
    ["Halmahera Barat", "Halmahera Selatan", "Halmahera Tengah", "Halmahera Timur", "Halmahera Utara", "Kepulauan Sula", "Pulau Morotai", "Pulau Taliabu"],
  ),
  "Nusa Tenggara Barat": places(
    ["Bima", "Mataram"],
    ["Bima", "Dompu", "Lombok Barat", "Lombok Tengah", "Lombok Timur", "Lombok Utara", "Sumbawa", "Sumbawa Barat"],
  ),
  "Nusa Tenggara Timur": places(
    ["Kupang"],
    [
      "Alor", "Belu", "Ende", "Flores Timur", "Kupang", "Lembata", "Malaka", "Manggarai", "Manggarai Barat", "Manggarai Timur", "Nagekeo",
      "Ngada", "Rote Ndao", "Sabu Raijua", "Sikka", "Sumba Barat", "Sumba Barat Daya", "Sumba Tengah", "Sumba Timur",
      "Timor Tengah Selatan", "Timor Tengah Utara",
    ],
  ),
  Papua: places(["Jayapura"], ["Biak Numfor", "Jayapura", "Keerom", "Kepulauan Yapen", "Mamberamo Raya", "Sarmi", "Supiori", "Waropen"]),
  "Papua Barat": places([], ["Fakfak", "Kaimana", "Manokwari", "Manokwari Selatan", "Pegunungan Arfak", "Teluk Bintuni", "Teluk Wondama"]),
  "Papua Barat Daya": places(["Sorong"], ["Maybrat", "Raja Ampat", "Sorong", "Sorong Selatan", "Tambrauw"]),
  "Papua Pegunungan": places([], ["Jayawijaya", "Lanny Jaya", "Mamberamo Tengah", "Nduga", "Pegunungan Bintang", "Tolikara", "Yahukimo", "Yalimo"]),
  "Papua Selatan": places([], ["Asmat", "Boven Digoel", "Mappi", "Merauke"]),
  "Papua Tengah": places([], ["Deiyai", "Dogiyai", "Intan Jaya", "Mimika", "Nabire", "Paniai", "Puncak", "Puncak Jaya"]),
  Riau: places(
    ["Dumai", "Pekanbaru"],
    ["Bengkalis", "Indragiri Hilir", "Indragiri Hulu", "Kampar", "Kepulauan Meranti", "Kuantan Singingi", "Pelalawan", "Rokan Hilir", "Rokan Hulu", "Siak"],
  ),
  "Sulawesi Barat": places([], ["Majene", "Mamasa", "Mamuju", "Mamuju Tengah", "Pasangkayu", "Polewali Mandar"]),
  "Sulawesi Selatan": places(
    ["Makassar", "Palopo", "Parepare"],
    [
      "Bantaeng", "Barru", "Bone", "Bulukumba", "Enrekang", "Gowa", "Jeneponto", "Kepulauan Selayar", "Luwu", "Luwu Timur", "Luwu Utara",
      "Maros", "Pangkajene dan Kepulauan", "Pinrang", "Sidenreng Rappang", "Sinjai", "Soppeng", "Takalar", "Tana Toraja", "Toraja Utara", "Wajo",
    ],
  ),
  "Sulawesi Tengah": places(
    ["Palu"],
    [
      "Banggai", "Banggai Kepulauan", "Banggai Laut", "Buol", "Donggala", "Morowali", "Morowali Utara", "Parigi Moutong", "Poso", "Sigi",
      "Tojo Una-Una", "Tolitoli",
    ],
  ),
  "Sulawesi Tenggara": places(
    ["Baubau", "Kendari"],
    [
      "Bombana", "Buton", "Buton Selatan", "Buton Tengah", "Buton Utara", "Kolaka", "Kolaka Timur", "Kolaka Utara", "Konawe",
      "Konawe Kepulauan", "Konawe Selatan", "Konawe Utara", "Muna", "Muna Barat", "Wakatobi",
    ],
  ),
  "Sulawesi Utara": places(
    ["Bitung", "Kotamobagu", "Manado", "Tomohon"],
    [
      "Bolaang Mongondow", "Bolaang Mongondow Selatan", "Bolaang Mongondow Timur", "Bolaang Mongondow Utara", "Kepulauan Sangihe",
      "Kepulauan Siau Tagulandang Biaro", "Kepulauan Talaud", "Minahasa", "Minahasa Selatan", "Minahasa Tenggara", "Minahasa Utara",
    ],
  ),
  "Sumatera Barat": places(
    ["Bukittinggi", "Padang", "Padang Panjang", "Pariaman", "Payakumbuh", "Sawahlunto", "Solok"],
    [
      "Agam", "Dharmasraya", "Kepulauan Mentawai", "Lima Puluh Kota", "Padang Pariaman", "Pasaman", "Pasaman Barat", "Pesisir Selatan",
      "Sijunjung", "Solok", "Solok Selatan", "Tanah Datar",
    ],
  ),
  "Sumatera Selatan": places(
    ["Lubuklinggau", "Pagar Alam", "Palembang", "Prabumulih"],
    [
      "Banyuasin", "Empat Lawang", "Lahat", "Muara Enim", "Musi Banyuasin", "Musi Rawas", "Musi Rawas Utara", "Ogan Ilir",
      "Ogan Komering Ilir", "Ogan Komering Ulu", "Ogan Komering Ulu Selatan", "Ogan Komering Ulu Timur", "Penukal Abab Lematang Ilir",
    ],
  ),
  "Sumatera Utara": places(
    ["Binjai", "Gunungsitoli", "Medan", "Padangsidimpuan", "Pematangsiantar", "Sibolga", "Tanjungbalai", "Tebing Tinggi"],
    [
      "Asahan", "Batu Bara", "Dairi", "Deli Serdang", "Humbang Hasundutan", "Karo", "Labuhanbatu", "Labuhanbatu Selatan",
      "Labuhanbatu Utara", "Langkat", "Mandailing Natal", "Nias", "Nias Barat", "Nias Selatan", "Nias Utara", "Padang Lawas",
      "Padang Lawas Utara", "Pakpak Bharat", "Samosir", "Serdang Bedagai", "Simalungun", "Tapanuli Selatan", "Tapanuli Tengah",
      "Tapanuli Utara", "Toba",
    ],
  ),
};

/** The 38 province names, alphabetical. */
export const INDONESIA_PROVINCES: readonly string[] = Object.keys(INDONESIA_REGIONS).sort((a, b) => a.localeCompare(b));

/** A province's cities and regencies, or an empty list for a province not in the table. */
export function citiesOf(province: string): readonly string[] {
  return INDONESIA_REGIONS[province] ?? [];
}
