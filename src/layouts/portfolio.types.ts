import type { LayoutConfig, LayoutPage } from '../components/Layout.types';

export type PortfolioProject = {
  title?: string;
  thumb_image?: string;
  thumb_image_alt?: string;
  __metadata: { urlPath: string };
  date?: string | number | Date;
};

export type PortfolioPage = LayoutPage & {
  title: string;
  subtitle?: string;
  layout_style?: 'mosaic' | 'grid';
};

export type PortfolioData = {
  config: LayoutConfig;
};

export type PortfolioProps = {
  data: PortfolioData;
  page: PortfolioPage;
  projects?: PortfolioProject[];
};
