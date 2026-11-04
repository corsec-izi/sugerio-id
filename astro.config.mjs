import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Ganti 'site' kalau alamat utama berubah.
export default defineConfig({
  site: 'https://sugerio.id',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
