import type { Page } from '@/types';

export type SectionPortfolioProject = Page & {
  title?: string;
  thumb_image?: string;
  thumb_image_alt?: string;
  date?: string | number | Date;
};

export type SectionPortfolioItem = {
  section_id: string;
  title?: string;
  subtitle?: string;
  layout_style?: 'mosaic' | 'grid';
  view_all_label?: string;
  view_all_url?: string;
  projects_number?: number;
};

export type SectionPortfolioProps = {
  section: SectionPortfolioItem;
  projects?: SectionPortfolioProject[];
};
