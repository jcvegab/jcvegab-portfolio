import Image from 'next/image';

import { classNames, htmlToReact, withPrefix } from '@/utils';

import type {
  SectionTestimonialsItem,
  TestimonialItem,
} from './SectionTestimonials.types';

export type SectionTestimonialsProps = {
  section: SectionTestimonialsItem;
};

export default function SectionTestimonials({
  section,
}: SectionTestimonialsProps) {
  const {
    section_id: sectionId,
    title,
    subtitle,
    testimonials = [],
    col_number: colNumber = 'three',
  } = section;

  const renderTestimonial = (testimonial: TestimonialItem, index: number) => {
    const { content, avatar, avatar_alt: avatarAlt = '', author } = testimonial;

    return (
      <div key={index} className="grid-item">
        <blockquote className="testimonial">
          <p className="testimonial-content">{htmlToReact(content)}</p>
          <footer className="testimonial-footer">
            {avatar && (
              <Image
                className="testimonial-avatar"
                src={withPrefix(avatar)}
                alt={avatarAlt}
                width={60}
                height={60}
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
        {testimonials.length > 0 && (
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
