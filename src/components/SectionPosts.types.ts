import type { PostPage } from '@/layouts/post.types';
import type { ActionItem } from './Action.types';

export type SectionPostsPost = PostPage & {
  thumb_image?: string;
  thumb_image_alt?: string;
  excerpt?: string;
};

export type SectionPostsItem = {
  section_id: string;
  title?: string;
  subtitle?: string;
  actions?: ActionItem[];
  col_number?: 'two' | 'three';
  posts_number?: number;
};
