import type { LayoutConfig, LayoutPage } from '../components/Layout.types';

export type BlogPost = {
  title?: string;
  thumb_image?: string;
  thumb_image_alt?: string;
  excerpt?: string;
  date?: string | number | Date;
  __metadata: { urlPath: string };
};

export type BlogPage = LayoutPage & {
  title: string;
  hide_title?: boolean;
  subtitle?: string;
  col_number?: 'two' | 'three';
};

export type BlogData = {
  config: LayoutConfig;
};

export type BlogProps = {
  data: BlogData;
  page: BlogPage;
  posts?: BlogPost[];
};
