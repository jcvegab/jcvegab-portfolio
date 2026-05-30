import type { LayoutConfig, LayoutPage } from '../components/Layout.types';

export type ProjectData = {
  config: LayoutConfig;
};

export type ProjectPage = LayoutPage & {
  title: string;
  subtitle?: string;
  image?: string;
  image_alt?: string;
  markdown_content?: string;
};

export type ProjectProps = {
  data: ProjectData;
  page: ProjectPage;
};
