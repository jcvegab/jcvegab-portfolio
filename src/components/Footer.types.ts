import type { ActionData } from './Action.types';
import type { ActionLinkData } from './ActionLink.types';

export type FooterConfig = {
  footer: {
    content?: string;
    links?: ActionLinkData[];
    has_social?: boolean;
    social_links?: ActionData[];
  };
};

export type FooterProps = {
  config: FooterConfig;
};
