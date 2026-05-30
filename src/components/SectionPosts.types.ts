import type { ActionData } from './Action.types';

export type SectionPostsPost = {
  title?: string;
  thumb_image?: string;
  thumb_image_alt?: string;
  excerpt?: string;
  date?: string | number | Date;
  __metadata: { urlPath: string };
};

export type SectionPostsData = {
  section_id: string;
  title?: string;
  subtitle?: string;
  actions?: ActionData[];
  col_number?: 'two' | 'three';
  posts_number?: number;
};

export type SectionPostsProps = {
  section: SectionPostsData;
  posts?: SectionPostsPost[];
};
