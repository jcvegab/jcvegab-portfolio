import type { ExperienceEntry } from '@/components/ExperienceTimeline.types';
import type { Page } from '@/types';

export type BasePage = Page & {
  subtitle?: string;
  image?: string;
  image_alt?: string;
  intro?: string;
  experience?: ExperienceEntry[];
};
