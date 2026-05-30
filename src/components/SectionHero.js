import React from 'react';

import CtaButtons from './CtaButtons';

import { markdownify } from '../utils';

/**
 * @typedef {Object} SectionHeroAction
 * @property {string} url
 * @property {string} label
 * @property {"link"|"button"|"icon"} [style]
 * @property {string} [icon]
 * @property {boolean} [new_window]
 * @property {boolean} [no_follow]
 */

/**
 * @typedef {Object} SectionHeroData
 * @property {string} section_id
 * @property {string} [title]
 * @property {string} [avatar]
 * @property {string} [content]
 * @property {SectionHeroAction[]} [actions]
 */

/**
 * @param {{ section: SectionHeroData }} props
 */
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
