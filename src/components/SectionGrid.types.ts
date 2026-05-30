import type { ActionData } from './Action.types';

export type SectionGridItem = {
  title?: string;
  content?: string;
  image?: string;
  image_alt?: string;
  actions?: ActionData[];
};

export type SectionGridData = {
  section_id: string;
  title?: string;
  subtitle?: string;
  grid_items?: SectionGridItem[];
  col_number?: 'two' | 'three';
  is_numbered?: boolean;
};

export type SectionGridProps = {
  section: SectionGridData;
};
