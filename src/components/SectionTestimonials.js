import React from 'react';
import { isEmpty } from '../utils';

import { htmlToReact, classNames, withPrefix } from '../utils';

/**
 * @typedef {Object} SectionTestimonialItem
 * @property {string} [content]
 * @property {string} [avatar]
 * @property {string} [avatar_alt]
 * @property {string} [author]
 */

/**
 * @typedef {Object} SectionTestimonialsData
 * @property {string} section_id
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {SectionTestimonialItem[]} [testimonials]
 * @property {"two"|"three"} [col_number]
 */

/**
 * @param {{ section: SectionTestimonialsData }} props
 */
export default function SectionTestimonials({ section }) {
  const {
    section_id: sectionId,
    title,
    subtitle,
    testimonials,
    col_number: colNumber = 'three',
  } = section;

  /**
   * @param {SectionTestimonialItem} testimonial
   * @param {number} index
   */
  const renderTestimonial = (testimonial, index) => {
    const { content, avatar, avatar_alt: avatarAlt = '', author } = testimonial;

    return (
      <div key={index} className="grid-item">
        <blockquote className="testimonial">
          <p className="testimonial-content">{htmlToReact(content)}</p>
          <footer className="testimonial-footer">
            {avatar && (
              <img
                className="testimonial-avatar"
                src={withPrefix(avatar)}
                alt={avatarAlt}
              />
            )}
            {author && <cite className="testimonial-author">{author}</cite>}
          </footer>
        </blockquote>
      </div>
    );
  };

  return (
    <section id={sectionId} className="block block-testimonials outer">
      <div className="inner">
        {(title || subtitle) && (
          <div className="block-header inner-sm">
            {title && <h2 className="block-title line-top">{title}</h2>}
            {subtitle && (
              <p className="block-subtitle">{htmlToReact(subtitle)}</p>
            )}
          </div>
        )}
        {!isEmpty(testimonials) && (
          <div className="block-content">
            <div
              className={classNames('grid', {
                'grid-col-2': colNumber === 'two',
                'grid-col-3': colNumber === 'three',
              })}
            >
              {testimonials.map((testimonial, index) =>
                renderTestimonial(testimonial, index),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
