export type ExperiencePeriod = {
  start: string;
  start_label: string;
  end?: string;
  end_label: string;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  company_url?: string;
  role: string;
  location: string;
  summary: string;
  periods: ExperiencePeriod[];
  highlights: string[];
  technologies: string[];
};

export type ExperienceTimelineProps = {
  experiences: ExperienceEntry[];
};
