import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { ambilBelajar, ambilCatatan } from '../lib/konten';
import { SITUS } from '../lib/situs';

export async function GET(context: APIContext) {
  const [belajar, catatan] = await Promise.all([ambilBelajar(), ambilCatatan()]);
  const items = [
    ...belajar.map((t) => ({
      title: t.data.judul,
      description: t.data.ringkasan,
      pubDate: t.data.tanggal,
      link: `/belajar/${t.id}/`,
    })),
    ...catatan.map((t) => ({
      title: `Catatan Pekan: ${t.data.judul}`,
      description: t.data.ringkasan,
      pubDate: t.data.tanggal,
      link: `/catatan/${t.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITUS.nama,
    description: SITUS.deskripsi,
    site: context.site ?? SITUS.url,
    items,
    customData: '<language>id</language>',
  });
}
