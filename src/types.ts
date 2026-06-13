import type { FooterConfig } from './components/Footer.types';
import type { HeaderConfig } from './components/Header.types';

export type SeoPageExtra = {
  keyName?: string;
  name?: string;
  value?: string;
  relativeUrl?: boolean;
};

export type SeoPage = {
  title?: string;
  description?: string;
  robots?: string[];
  extra?: SeoPageExtra[];
};

export type PageType =
  | 'page'
  | 'advanced'
  | 'blog'
  | 'post'
  | 'portfolio'
  | 'project';

export type PageRaw = {
  title: string;
  seo?: SeoPage;
  type?: PageType;
  layout?: PageType;
};

export type ColorSchemeConfig = 'light' | 'dark';

export type Config = {
  title: string;
  color_scheme?: ColorSchemeConfig;
  accent_color?: string;
  path_prefix?: string;
  favicon?: string;
  domain?: string;
  header: HeaderConfig;
  footer: FooterConfig;
};

export type MetadataPage = {
  urlPath: string;
  modelName: PageType;
};

export type Page = PageRaw & {
  markdown_content: string;
  __metadata: MetadataPage;
};

export interface PageData<T extends Page = Page> {
  page: T;
  site: Config | null;
}

export type LayoutPage<T> = {
  data: {
    config: Config;
  };
  page: T;
};
