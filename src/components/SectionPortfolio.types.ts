export type SectionPortfolioProject = {
  title?: string;
  thumb_image?: string;
  thumb_image_alt?: string;
  __metadata: { urlPath: string };
  date?: string | number | Date;
};

export type SectionPortfolioData = {
  section_id: string;
  title?: string;
  subtitle?: string;
  layout_style?: 'mosaic' | 'grid';
  view_all_label?: string;
  view_all_url?: string;
  projects_number?: number;
};

export type SectionPortfolioProps = {
  section: SectionPortfolioData;
  projects?: SectionPortfolioProject[];
};
