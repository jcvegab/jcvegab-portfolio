import type { LayoutConfig, LayoutPage } from '../components/Layout.types';

export type PostData = {
  config: LayoutConfig;
};

export type PostPage = LayoutPage & {
  title: string;
  subtitle?: string;
  image?: string;
  image_alt?: string;
  date?: string | number | Date;
  markdown_content?: string;
};

export type PostProps = {
  data: PostData;
  page: PostPage;
};
