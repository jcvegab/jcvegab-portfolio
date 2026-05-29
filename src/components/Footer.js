import React from 'react';
import { isEmpty } from '../utils';

import { htmlToReact } from '../utils';
import ActionLink from './ActionLink';
import Action from './Action';

export default function Footer({ config }) {
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
            {links.map((action, index) => (
              <ActionLink key={index} action={action} />
            ))}
          </div>
          {hasSocial && !isEmpty(socialLinks) && (
            <div className="social-links">
              {socialLinks.map((action, index) => (
                <Action key={index} action={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
