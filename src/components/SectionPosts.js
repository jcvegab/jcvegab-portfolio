import React from 'react';
import { isEmpty, orderBy } from '../utils';

import CtaButtons from './CtaButtons';

import {
  getPageUrl,
  htmlToReact,
  classNames,
  Link,
  withPrefix,
} from '../utils';
import { formatDate } from '../utils/dates';

/**
 * @typedef {Object} SectionPostsAction
 * @property {string} url
 * @property {string} label
 * @property {"link"|"button"|"icon"} [style]
 * @property {string} [icon]
 * @property {boolean} [new_window]
 * @property {boolean} [no_follow]
 */

/**
 * @typedef {Object} SectionPostsPost
 * @property {string} [title]
 * @property {string} [thumb_image]
 * @property {string} [thumb_image_alt]
 * @property {string} [excerpt]
 * @property {string|number|Date} [date]
 * @property {{ urlPath: string }} __metadata
 */

/**
 * @typedef {Object} SectionPostsData
 * @property {string} section_id
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {SectionPostsAction[]} [actions]
 * @property {"two"|"three"} [col_number]
 * @property {number} [posts_number]
 */

/**
 * @param {{ section: SectionPostsData, posts?: SectionPostsPost[] }} props
 */
export default function SectionPosts({ section, posts: rawPosts = [] }) {
  const {
    section_id: sectionId,
    title,
    subtitle,
    actions,
    col_number: colNumber = 'three',
    posts_number: postsNumber = 3,
  } = section;

  const posts = orderBy(rawPosts, 'date', 'desc');
  const recentPosts = posts.slice(0, postsNumber);

  /**
   * @param {SectionPostsPost} post
   * @param {number} index
   */
  const renderPost = (post, index) => {
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
              <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
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
        {!isEmpty(actions) && (
          <div className="block-buttons inner-sm">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    </section>
  );
}
