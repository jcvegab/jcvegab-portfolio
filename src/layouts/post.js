import React from 'react';

import { Layout } from '../components/index';

import { htmlToReact, withPrefix, markdownify } from '../utils';
import { formatDate } from '../utils/dates';

export default function Post({ data, page }) {
  const { config } = data;

  const {
    title,
    subtitle,
    image,
    image_alt: imageAlt = '',
    date,
    markdown_content: markdownContent,
  } = page;

  const dateTimeAttr = formatDate(date, 'date_time_attribute');
  const formattedDate = formatDate(date, 'date_display_full');

  return (
    <Layout page={page} config={config}>
      <div className="inner outer">
        <article className="post post-full">
          <header className="post-header inner-sm">
            <h1 className="post-title line-top">{title}</h1>
            {subtitle && (
              <div className="post-subtitle">{htmlToReact(subtitle)}</div>
            )}
          </header>
          {image && (
            <div className="post-image">
              <img src={withPrefix(image)} alt={imageAlt} />
            </div>
          )}
          {markdownContent && (
            <div className="post-content inner-sm">
              {markdownify(markdownContent)}
            </div>
          )}
          <footer className="post-meta inner-sm">
            <time className="published" dateTime={dateTimeAttr}>
              {formattedDate}
            </time>
          </footer>
        </article>
      </div>
    </Layout>
  );
}
