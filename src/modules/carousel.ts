import { getCollection } from 'astro:content';

import type { Carousel } from '@/types/carousel';

export interface SeriesMeta {
  title: string;
  description: string;
}

export const SERIES_META: Record<string, SeriesMeta> = {
  layoff: {
    title: 'Layoff Series',
    description:
      'Enam slide dari satu surat panjang — tentang bertahan, mencari kerja, dan menemukan diri lagi setelah kehilangan pekerjaan.',
  },
};

export async function getAllCarousels(): Promise<Carousel[]> {
  const carousels = await getCollection('carousel', ({ data }) => {
    if (import.meta.env.PROD) return !data.draft;
    return true;
  });

  return carousels
    .map((c) => ({ ...c, slug: c.id }))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}
