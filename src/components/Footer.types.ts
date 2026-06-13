import type { ActionItem } from './Action.types';
import type { ActionLinkItem } from './ActionLink.types';

export type FooterConfig = {
  content?: string;
  has_social?: boolean;
  links?: ActionLinkItem[];
  social_links?: ActionItem[];
};
