import type { Page } from '@/types';

export type AdvancedSection = {
  section_id?: string;
  type: string;
};

export type AdvancedPage = Page & {
  hideTitle?: boolean;
  sections?: AdvancedSection[];
};
