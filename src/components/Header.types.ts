import type { ActionItem } from './Action.types';

export type HeaderConfig = {
  title?: string;
  has_nav?: boolean;
  nav_links?: ActionItem[];
  logo_img?: string;
  logo_img_alt?: string;
};
