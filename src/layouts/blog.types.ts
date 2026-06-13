import type { Page } from '@/types';
import type { PostPage } from './post.types';

export type BlogPost = PostPage & {
  thumb_image?: string;
  thumb_image_alt?: string;
  excerpt?: string;
};

export type BlogPage = Page & {
  hide_title?: boolean;
  subtitle?: string;
  col_number?: 'two' | 'three';
};
