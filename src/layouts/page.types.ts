import type { LayoutConfig, LayoutPage } from '../components/Layout.types';

export type PageData = {
  config: LayoutConfig;
};

export type PagePage = LayoutPage & {
  title: string;
  subtitle?: string;
  image?: string;
  image_alt?: string;
  markdown_content?: string;
};

export type PageProps = {
  data: PageData;
  page: PagePage;
};
