import type { Page } from '@/types';

export type PostPage = Page & {
  subtitle?: string;
  image?: string;
  image_alt?: string;
  date: string | number | Date;
};
