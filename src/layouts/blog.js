import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';

import { classNames, getPageUrl, Link, withPrefix } from '../utils';
import { formatDate } from '../utils/dates';

export default function Blog({ data, page, posts: rawPosts = [] }) {
  const { config } = data;

  const {
    title,
    hide_title: hideTitle,
    subtitle,
    col_number: colNumber = 'three',
  } = page;

  const posts = _.orderBy(rawPosts, 'date', 'desc');

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
            <h2 className="post-title">
              <Link href={postUrl}>{title}</Link>
            </h2>
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
    <Layout page={page} config={config}>
      <div className="inner outer">
        <header
          className={classNames('page-header', 'inner-sm', {
            'screen-reader-text': hideTitle,
          })}
        >
          <h1 className="page-title line-top">{title}</h1>
          {subtitle && <div className="page-subtitle">{subtitle}</div>}
        </header>
        <div
          className={classNames('post-feed', 'grid', {
            'grid-col-2': colNumber === 'two',
            'grid-col-3': colNumber === 'three',
          })}
        >
          {posts.map((post, index) => renderPost(post, index))}
        </div>
      </div>
    </Layout>
  );
}
