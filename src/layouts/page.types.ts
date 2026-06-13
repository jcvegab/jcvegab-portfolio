import type { Page } from '@/types';

export type BasePage = Page & {
  subtitle?: string;
  image?: string;
  image_alt?: string;
};
