import type { LayoutConfig, LayoutPage } from '../components/Layout.types';

export type AdvancedSection = {
  type: string;
};

export type AdvancedPage = LayoutPage & {
  hideTitle?: boolean;
  title?: string;
  sections?: AdvancedSection[];
  __metadata: { urlPath: string };
};

export type AdvancedData = {
  config: LayoutConfig;
};

export type AdvancedProps = {
  data: AdvancedData;
  page: AdvancedPage;
  posts?: Record<string, unknown>[];
  projects?: Record<string, unknown>[];
};
