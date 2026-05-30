import React from 'react';

import { htmlToReact, withPrefix, markdownify } from '../utils';

/**
 * @typedef {Object} SectionI
 * @property {string} section_id
 * @property {string} title
 * @property {string} subtitle
 * @property {string} image
 * @property {string} image_alt
 * @property {string} content
 */

/**
 * @typedef {Object} SectionContentProps
 * @property {SectionI} section
 */

/**
 * @param {SectionContentProps} props
 * @returns {JSX.Element} - Rendered component
 */
export default function SectionContent({ section }) {
  const {
    section_id: sectionId,
    title,
    subtitle,
    image,
    image_alt: imageAlt = '',
    content,
  } = section;

  return (
    <section id={sectionId} className="block block-text outer">
      <div className="inner">
        {(title || subtitle) && (
          <div className="block-header inner-sm">
            {title && <h2 className="block-title line-top">{title}</h2>}
            {subtitle && (
              <p className="block-subtitle">{htmlToReact(subtitle)}</p>
            )}
          </div>
        )}
        {image && (
          <div className="block-image">
            <img src={withPrefix(image)} alt={imageAlt} />
          </div>
        )}
        {content && (
          <div className="block-content inner-sm">{markdownify(content)}</div>
        )}
      </div>
    </section>
  );
}
