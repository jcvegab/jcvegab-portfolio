import React from 'react';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify } from '../utils';

/**
 * @typedef {Object} PageData
 * @property {Object} config
 */

/**
 * @typedef {Object} PagePage
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [image]
 * @property {string} [image_alt]
 * @property {string} [markdown_content]
 */

/**
 * @param {{ data: PageData, page: PagePage }} props
 */
export default function Page({ data, page }) {
  const { config } = data;

  const {
    title,
    subtitle,
    image,
    image_alt: imageAlt = '',
    markdown_content: markdownContent,
  } = page;

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
        </article>
      </div>
    </Layout>
  );
}
