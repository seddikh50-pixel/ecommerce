import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export const getBanners = unstable_cache(
  async () => prisma.banner.findMany(),
  [],
  { tags: ['banners'], revalidate: 60 }
);