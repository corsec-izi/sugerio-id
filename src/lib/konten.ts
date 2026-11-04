import { getCollection } from 'astro:content';

// Draf hanya tampil saat `npm run dev` atau kalau PUBLIC_TAMPILKAN_DRAF=true.
const tampilkanDraf =
  import.meta.env.DEV || import.meta.env.PUBLIC_TAMPILKAN_DRAF === 'true';

const terbit = (e: { data: { draft: boolean } }) => tampilkanDraf || !e.data.draft;

const urutTurun = (a: Date, b: Date) => b.getTime() - a.getTime();

export async function ambilBelajar() {
  const semua = await getCollection('belajar', terbit);
  return semua.sort((a, b) => urutTurun(a.data.tanggal, b.data.tanggal));
}

export async function ambilCatatan() {
  const semua = await getCollection('catatan', terbit);
  return semua.sort((a, b) => urutTurun(a.data.tanggal, b.data.tanggal));
}

export async function ambilProduk() {
  const semua = await getCollection('produk', terbit);
  return semua.sort((a, b) => a.data.urutan - b.data.urutan || a.data.nama.localeCompare(b.data.nama));
}

export async function ambilAcara() {
  const semua = await getCollection('acara', terbit);
  return semua.sort((a, b) => a.data.tanggal.getTime() - b.data.tanggal.getTime());
}

export const akhirAcara = (e: { data: { tanggal: Date; selesai?: Date } }) =>
  e.data.selesai ?? e.data.tanggal;

// Tanggal di frontmatter dibaca sebagai UTC, jadi semua format pakai UTC agar tidak bergeser hari.
const fmt = (opsi: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('id-ID', { timeZone: 'UTC', ...opsi });

export const tglIndonesia = (d: Date) => fmt({ day: 'numeric', month: 'long', year: 'numeric' }).format(d);
export const bulanSingkat = (d: Date) => fmt({ month: 'short' }).format(d);
export const tglISO = (d: Date) => d.toISOString().slice(0, 10);

export function rentangTanggal(mulai: Date, selesai?: Date) {
  if (!selesai || tglISO(mulai) === tglISO(selesai)) return tglIndonesia(mulai);
  const sama = mulai.getUTCMonth() === selesai.getUTCMonth() && mulai.getUTCFullYear() === selesai.getUTCFullYear();
  if (sama) {
    const bulanTahun = fmt({ month: 'long', year: 'numeric' }).format(selesai);
    return `${mulai.getUTCDate()} sampai ${selesai.getUTCDate()} ${bulanTahun}`;
  }
  return `${tglIndonesia(mulai)} sampai ${tglIndonesia(selesai)}`;
}

export const labelJenis: Record<string, string> = {
  panduan: 'Panduan',
  'kabar-ai': 'Kabar AI',
};
