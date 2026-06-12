import Action from './Action';
import ActionLink from './ActionLink';

import { htmlToReact, isEmpty } from '../utils';

import type { FooterProps } from './Footer.types';

export default function Footer({ config }: FooterProps) {
  const { footer } = config;

  const {
    content: copyright,
    links = [],
    has_social: hasSocial,
    social_links: socialLinks,
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
          {hasSocial && !isEmpty(socialLinks) && (
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
