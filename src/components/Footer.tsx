import { htmlToReact } from '@/utils';

import Action from './Action';
import ActionLink from './ActionLink';

import type { Config } from '@/types';

export type FooterProps = {
  config: Config;
};

export default function Footer({ config }: FooterProps) {
  const { footer } = config;

  const {
    content: copyright,
    links = [],
    has_social: hasSocial = false,
    social_links: socialLinks = [],
  } = footer;

  return (
    <footer id="colophon" className="site-footer outer">
      <div className="inner">
        <div className="site-footer-inside">
          <div className="site-info">
            {copyright && (
              <span className="copyright">{htmlToReact(copyright)}</span>
            )}
            {links.map((action, index) => {
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: Links may not have unique identifiers
                <ActionLink key={`${action.label}-${index}`} action={action} />
              );
            })}
          </div>
          {hasSocial && socialLinks.length > 0 && (
            <div className="social-links">
              {socialLinks.map((action, index) => {
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Social links may not have unique identifiers
                  <Action key={`${action.url}-${index}`} action={action} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
