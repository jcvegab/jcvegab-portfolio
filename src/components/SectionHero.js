import React from 'react';

import CtaButtons from './CtaButtons';

import { markdownify } from '../utils';

export default function SectionHero({ section }) {
  const { section_id: sectionId, title, avatar, content, actions } = section;

  return (
    <section id={sectionId} className="block block-hero outer avatar-hero">
      <img alt="Joseph Vega Avatar" src={avatar} />
      <div className="inner">
        {title && (
          <div className="block-header inner-sm">
            <h1 className="block-title">{title}</h1>
          </div>
        )}
        {content && (
          <div className="block-content inner-sm">{markdownify(content)}</div>
        )}
        {actions && (
          <div className="block-buttons inner-sm">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    </section>
  );
}
