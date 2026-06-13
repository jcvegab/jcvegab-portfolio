import type { IconVariant } from './Icon.types';

export type ActionStyle = 'link' | 'button' | 'icon';

export type ActionItem = {
  label: string;
  url: string;
  style?: ActionStyle;
  icon?: IconVariant;
  new_window?: boolean;
  no_follow?: boolean;
};
