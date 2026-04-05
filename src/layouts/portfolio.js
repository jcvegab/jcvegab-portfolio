import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { getPageUrl, Link, withPrefix } from '../utils';

export default function Portfolio({ data, page, projects: rawProjects = [] }) {
  const { config } = data;

  const { title, subtitle, layout_style: layoutStyle = 'mosaic' } = page;

  const projects = _.orderBy(rawProjects, 'date', 'desc');

  const renderProject = (project, index) => {
    const {
      title,
      thumb_image: thumbImage,
      thumb_image_alt: thumbImageAlt = '',
    } = project;
    const projectUrl = getPageUrl(project, { withPrefix: true });

    return (
      <article key={index} className="project">
        <Link href={projectUrl} className="project-link">
          {thumbImage && (
            <div className="project-thumbnail">
              <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
            </div>
          )}
          <header className="project-header">
            <h2 className="project-title">{title}</h2>
          </header>
        </Link>
      </article>
    );
  };

  return (
    <Layout page={page} config={config}>
      <div className="inner outer">
        <header className="page-header inner-sm">
          <h1 className="page-title line-top">{title}</h1>
          {subtitle && <div className="page-subtitle">{subtitle}</div>}
        </header>
        <div className={`portfolio-feed layout-${layoutStyle}`}>
          {projects.map((project, index) => renderProject(project, index))}
        </div>
      </div>
    </Layout>
  );
}
