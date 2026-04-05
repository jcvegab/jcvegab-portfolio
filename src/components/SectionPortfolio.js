import React from 'react';
import _ from 'lodash';

import { getPageUrl, htmlToReact, Link, withPrefix } from '../utils';

export default function SectionPortfolio({
  section,
  projects: rawProjects = [],
}) {
  const {
    section_id: sectionId,
    title,
    subtitle,
    layout_style: layoutStyle = 'mosaic',
    view_all_label: viewAllLabel,
    view_all_url: viewAllUrl,
    projects_number: projectsNumber = 6,
  } = section;

  const projects = _.orderBy(rawProjects, 'date', 'desc');
  const recentProjects = projects.slice(0, projectsNumber);
  const projectCount = _.size(recentProjects);

  const renderProject = (
    project,
    index,
    projectCount,
    viewAllLabel,
    viewAllUrl,
  ) => {
    const {
      title,
      thumb_image: thumbImage,
      thumb_image_alt: thumbImageAlt = '',
    } = project;

    const projectUrl = getPageUrl(project, { withPrefix: true });

    if (index === projectCount - 1 && viewAllLabel && viewAllUrl) {
      return (
        <article key={index} className="project">
          <Link
            href={withPrefix(viewAllUrl)}
            className="project-link view-all-link"
          >
            {thumbImage && (
              <div className="project-thumbnail">
                <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
              </div>
            )}
            <span className="view-all-button">{viewAllLabel}</span>
          </Link>
        </article>
      );
    } else {
      return (
        <article key={index} className="project">
          <Link href={projectUrl} className="project-link">
            {thumbImage && (
              <div className="project-thumbnail">
                <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
              </div>
            )}
            <header className="project-header">
              <h3 className="project-title">{title}</h3>
            </header>
          </Link>
        </article>
      );
    }
  };

  return (
    <section id={sectionId} className="block-portfolio block outer">
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
          <div className={`portfolio-feed layout-${layoutStyle}`}>
            {recentProjects.map((project, index) =>
              renderProject(
                project,
                index,
                projectCount,
                viewAllLabel,
                viewAllUrl,
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
