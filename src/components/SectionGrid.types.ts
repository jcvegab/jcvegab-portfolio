import type { ActionItem } from './Action.types';

export type SectionGridItem = {
  title?: string;
  content?: string;
  image?: string;
  image_alt?: string;
  actions?: ActionItem[];
};

export type SectionItem = {
  section_id: string;
  title?: string;
  subtitle?: string;
  grid_items?: SectionGridItem[];
  col_number?: 'two' | 'three';
  is_numbered?: boolean;
};
