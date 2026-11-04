# sugerio.id

Situs utama Sugerio: tempat belajar AI, etalase produk yang diperbarui tiap pekan, catatan mingguan, dan jadwal acara. Dibangun dengan [Astro](https://astro.build), hasilnya situs statis (HTML biasa), jadi cepat dan murah dihosting.

## Menjalankan di komputer

Butuh Node 22 atau lebih baru.

```bash
npm install
npm run dev       # buka http://localhost:4321, konten draf ikut tampil
npm run build     # hasil ada di folder dist
```

## Menambah konten (tanpa menyentuh kode)

Semua konten adalah file Markdown di `src/content/`. Nama file menjadi alamat halaman.

| Folder | Isi | Contoh alamat |
|---|---|---|
| `belajar/` | Panduan AI dan Kabar AI | `/belajar/nama-file/` |
| `catatan/` | Catatan Pekan (satu per pekan) | `/catatan/nama-file/` |
| `produk/` | Produk dan statusnya | `/produk/nama-file/` |
| `acara/` | Jadwal acara | tampil di `/acara/` |

Cara paling cepat: buka folder-nya, salin `_template.md`, ganti nama file, isi. File berawalan `_` tidak pernah terbit.

### Draf

Tambahkan `draft: true` di bagian atas file untuk menyimpan tulisan yang belum siap. Draf tampil saat `npm run dev`, tidak tampil di situs publik. Semua file contoh bawaan berstatus draf. Hapus barisnya (atau ganti `false`) saat sudah siap terbit.

### Produk

- `status: segera` menampilkan kartu "Sedang disiapkan" tanpa tautan.
- `status: beta` menampilkan lencana Beta dan tombol "Coba ...".
- `status: rilis` menampilkan harga di lencana dan tombol "Buka ...".
- `hero: true` (maksimal 3 produk) menampilkan produk sebagai ubin di beranda.
- `urutan` mengatur urutan, angka kecil tampil lebih dulu.
- Memindah produk dari segera ke beta ke rilis cukup mengubah satu baris `status`.

### Acara

Acara yang tanggalnya sudah lewat otomatis pindah ke "Sudah lewat" berdasarkan tanggal pengunjung. Kamu tidak perlu deploy ulang untuk itu. Untuk acara beberapa hari, isi `selesai`.

### Ritme mingguan yang disarankan

1. Satu file baru di `catatan/` (apa yang baru, sedang dikerjakan, rencana pekan depan).
2. Satu tulisan di `belajar/` kalau ada.
3. Ubah `status` produk yang berubah, tambahkan acara baru.

## Deploy

Pengaturan sama untuk host mana pun:

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 22 (sudah ada `.nvmrc`)

### Netlify

Hubungkan repo GitHub, lalu isi pengaturan di atas. Pindahkan domain `sugerio.id` ke project ini (Domain management). Catatan: paket Free memakai sistem kredit dan tiap production deploy memakan kredit, jadi kumpulkan beberapa perubahan dalam satu commit kalau menulis sering.

### Cloudflare Pages

Buat project dari repo GitHub, isi pengaturan di atas, lalu tambahkan custom domain. Build dan bandwidth gratis, cocok kalau kamu menulis hampir tiap hari.

## Melihat draf di hasil build

```bash
PUBLIC_TAMPILKAN_DRAF=true npm run build
```

## Pengaturan lain

- Nama, tagline, tautan Instagram dan Lynk: `src/lib/situs.ts`
- Alamat situs untuk sitemap dan RSS: `astro.config.mjs` (`site`)
- Warna dan gaya: `src/styles/global.css` (variabel di bagian atas)
- Teks beranda (hero, visi, jasa, cerita): `src/pages/index.astro`
- RSS tersedia di `/rss.xml`, sitemap di `/sitemap-index.xml`

## Belum ada

Gambar pratinjau untuk dibagikan di media sosial (OG image), pencarian, dan formulir langganan. Bisa ditambah belakangan.
