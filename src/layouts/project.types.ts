import type { Page } from '@/types';

export type ProjectPage = Page & {
  subtitle?: string;
  image?: string;
  image_alt?: string;
};
