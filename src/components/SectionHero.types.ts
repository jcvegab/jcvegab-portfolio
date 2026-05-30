import type { ActionData } from './Action.types';

export type SectionHeroData = {
  section_id: string;
  title?: string;
  avatar?: string;
  content?: string;
  actions?: ActionData[];
};

export type SectionHeroProps = {
  section: SectionHeroData;
};
