import type { ActionData } from './Action.types';

export type HeaderConfig = {
  header: {
    logo_img?: string;
    logo_img_alt?: string;
    title?: string;
    has_nav?: boolean;
    nav_links?: ActionData[];
  };
};

export type HeaderPage = {
  __metadata: {
    urlPath: string;
  };
};

export type HeaderProps = {
  page: HeaderPage;
  config: HeaderConfig;
};
