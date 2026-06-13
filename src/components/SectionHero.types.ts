import type { ActionItem } from './Action.types';

export type SectionHeroItem = {
  section_id: string;
  title?: string;
  avatar: string;
  avatar_alt: string;
  content?: string;
  actions?: ActionItem[];
};
