import Image from 'next/image';

import {
  classNames,
  formatDate,
  getPageUrl,
  htmlToReact,
  Link,
  orderBy,
  withPrefix,
} from '@/utils';

import CtaButtons from './CtaButtons';

import type { SectionPostsItem, SectionPostsPost } from './SectionPosts.types';

export type SectionPostsProps = {
  section: SectionPostsItem;
  posts?: SectionPostsPost[];
};

export default function SectionPosts({
  section,
  posts: rawPosts = [],
}: SectionPostsProps) {
  const {
    section_id: sectionId,
    title,
    subtitle,
    actions = [],
    col_number: colNumber = 'three',
    posts_number: postsNumber = 3,
  } = section;

  const posts = orderBy(rawPosts, 'date', 'desc');
  const recentPosts = posts.slice(0, postsNumber);

  const renderPost = (post: SectionPostsPost, index: number) => {
    const {
      title,
      thumb_image: thumbImage,
      thumb_image_alt: thumbImageAlt = '',
      excerpt,
      date,
    } = post;

    const dateTimeAttr = formatDate(date, 'date_time_attribute');
    const formattedDate = formatDate(date, 'date_display');
    const postUrl = getPageUrl(post, { withPrefix: true });

    return (
      <article key={index} className="post grid-item">
        <div className="post-inside">
          {thumbImage && (
            <Link className="post-thumbnail" href={postUrl}>
              <Image
                src={withPrefix(thumbImage)}
                alt={thumbImageAlt}
                fill={true}
                style={{ objectFit: 'cover' }}
              />
            </Link>
          )}
          <header className="post-header">
            <h3 className="post-title">
              <Link href={postUrl}>{title}</Link>
            </h3>
            <div className="post-meta">
              <time className="published" dateTime={dateTimeAttr}>
                {formattedDate}
              </time>
            </div>
          </header>
          {excerpt && <p className="post-content">{excerpt}</p>}
        </div>
      </article>
    );
  };

  return (
    <section id={sectionId} className="block block-posts outer">
      <div className="inner">
        {(title || subtitle) && (
          <div className="block-header inner-sm">
            {title && <h2 className="block-title line-top">{title}</h2>}
            {subtitle && (
              <p className="block-subtitle">{htmlToReact(subtitle)}</p>
            )}
          </div>
        )}
        <div className="block-content">
          <div
            className={classNames('post-feed', 'grid', {
              'grid-col-2': colNumber === 'two',
              'grid-col-3': colNumber === 'three',
            })}
          >
            {recentPosts.map((post, index) => renderPost(post, index))}
          </div>
        </div>
        {actions.length > 0 && (
          <div className="block-buttons inner-sm">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    </section>
  );
}
