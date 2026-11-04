import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// File yang namanya diawali garis bawah (_) tidak ikut terbit.
// Pakai itu untuk templat. Tambahkan `draft: true` untuk menyimpan tulisan yang belum siap.

const belajar = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/belajar' }),
  schema: z.object({
    judul: z.string(),
    tanggal: z.coerce.date(),
    diperbarui: z.coerce.date().optional(),
    jenis: z.enum(['panduan', 'kabar-ai']),
    ringkasan: z.string(),
    tag: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const catatan = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/catatan' }),
  schema: z.object({
    judul: z.string(),
    tanggal: z.coerce.date(),
    pekan: z.number().optional(),
    ringkasan: z.string(),
    draft: z.boolean().default(false),
  }),
});

const produk = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/produk' }),
  schema: z.object({
    nama: z.string(),
    kelompok: z.enum(['Untuk sekolah', 'Untuk diri dan keluarga', 'Untuk profesional']),
    // segera = belum rilis, beta = sedang diuji, rilis = sudah bisa dipakai
    status: z.enum(['segera', 'beta', 'rilis']).default('rilis'),
    harga: z.string().default('Gratis'),
    tagline: z.string().optional(),
    ringkasan: z.string(),
    tautan: z.string().url().optional(),
    tautanLabel: z.string().optional(),
    kabar: z.string().url().optional(),
    ikon: z.enum(['rumah', 'centang', 'daftar', 'buku', 'bintang']).default('bintang'),
    hero: z.boolean().default(false),
    urutan: z.number().default(100),
    diperbarui: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const acara = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/acara' }),
  schema: z.object({
    judul: z.string(),
    tanggal: z.coerce.date(),
    selesai: z.coerce.date().optional(),
    waktu: z.string().optional(),
    lokasi: z.string(),
    daftar: z.string().url().optional(),
    ringkasan: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { belajar, catatan, produk, acara };
