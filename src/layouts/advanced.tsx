import components, { Layout } from '../components';

import { camelCase, getPageUrl, upperFirst } from '../utils';

import type { AdvancedProps } from './advanced.types';

export default function Advanced({
  data,
  page,
  posts,
  projects,
}: AdvancedProps) {
  const { config } = data;

  const { hideTitle, title, sections = [] } = page;

  const pageUrl = getPageUrl(page);

  return (
    <Layout page={page} config={config}>
      {!hideTitle && (
        <header className="page-header inner-sm outer">
          <h1 className="page-title line-top">{title}</h1>
        </header>
      )}
      {sections.map((section, index) => {
        const sectionType = section.type;
        const component = upperFirst(camelCase(sectionType));
        if (!component) {
          throw new Error(
            `page section does not have the 'type' property, page: ${pageUrl}`,
          );
        }
        const Component = components[component];
        if (!Component) {
          throw new Error(
            `no component matching the page section's type: ${sectionType}`,
          );
        }
        return (
          <Component
            key={index}
            section={section}
            data={data}
            posts={posts}
            projects={projects}
          />
        );
      })}
    </Layout>
  );
}
