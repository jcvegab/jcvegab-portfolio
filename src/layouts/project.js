import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify } from '../utils';

export default class Project extends React.Component {
  render() {
    const data = _.get(this.props, 'data');
    const config = _.get(data, 'config');
    const page = _.get(this.props, 'page');
    const title = _.get(page, 'title');
    const subtitle = _.get(page, 'subtitle');
    const image = _.get(page, 'image');
    const imageAlt = _.get(page, 'image_alt', '');
    const markdownContent = _.get(page, 'markdown_content');

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
}
