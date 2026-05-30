import type { ReactNode } from 'react';

import type { HeaderConfig, HeaderPage } from './Header.types';
import type { FooterConfig } from './Footer.types';

export type LayoutSeo = {
  title?: string;
  description?: string;
  robots?: string[];
  extra?: {
    keyName?: string;
    name?: string;
    value?: string;
    relativeUrl?: boolean;
  }[];
};

export type LayoutPage = HeaderPage & {
  title: string;
  seo: LayoutSeo;
};

export type LayoutConfig = HeaderConfig &
  FooterConfig & {
    title: string;
    color_scheme?: 'light' | 'dark';
    accent_color?: string;
    favicon?: string;
    domain?: string;
  };

export type LayoutProps = {
  children: ReactNode;
  config: LayoutConfig;
  page: LayoutPage;
};
