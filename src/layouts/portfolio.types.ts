import type { Page } from '@/types';
import type { ProjectPage } from './project.types';

export type PortfolioProject = ProjectPage & {
  thumb_image?: string;
  thumb_image_alt?: string;
  date?: string | number | Date;
};

export type PortfolioPage = Page & {
  subtitle?: string;
  layout_style?: 'mosaic' | 'grid';
};
