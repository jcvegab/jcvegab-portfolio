import React from 'react';

import { htmlToReact, classNames, withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default function SectionGrid({ section }) {
  const {
    section_id: sectionId,
    title,
    subtitle,
    grid_items: gridItems = [],
    col_number: colNumber = 'three',
    is_numbered: isNumbered,
  } = section;

  const renderGridItem = (gridItem, index) => {
    const {
      title,
      content,
      image,
      image_alt: imageAlt = '',
      actions = [],
    } = gridItem;

    return (
      <div key={index} className="grid-item">
        {isNumbered && (
          <span className="grid-item-counter" aria-hidden="true">
            {index + 1}.
          </span>
        )}
        {image && (
          <div className="grid-item-image">
            <img src={withPrefix(image)} alt={imageAlt} />
          </div>
        )}
        {title && <h3 className="grid-item-title">{title}</h3>}
        {content && (
          <div className="grid-item-content">{markdownify(content)}</div>
        )}
        {actions.length > 0 && (
          <div className="grid-item-buttons">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    );
  };

  return (
    <section id={sectionId} className="block block-grid outer">
      <div className="inner">
        {(title || subtitle) && (
          <div className="block-header inner-sm">
            {title && <h2 className="block-title line-top">{title}</h2>}
            {subtitle && (
              <p className="block-subtitle">{htmlToReact(subtitle)}</p>
            )}
          </div>
        )}
        {gridItems.length > 0 && (
          <div className="block-content">
            <div
              className={classNames('grid', {
                'grid-col-2': colNumber === 'two',
                'grid-col-3': colNumber === 'three',
              })}
            >
              {gridItems.map((gridItem, index) =>
                renderGridItem(gridItem, index, isNumbered),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
