import { notFound } from 'next/navigation';

import pageLayouts from '../layouts';

import { getPageDataBySlug, getAllPagesData } from '../utils/content';

export async function generateMetadata() {
  const data = getPageDataBySlug('/');
  if (!data?.page?.seo) return {};

  return {
    title: data.page.seo.title,
    description: data.page.seo.description,
  };
}

export default function HomePage() {
  const data = getPageDataBySlug('/');

  if (!data) {
    notFound();
  }

  const modelName = data.page.__metadata.modelName;
  const PageLayout = pageLayouts[modelName];

  if (!PageLayout) {
    throw new Error(`No page layout matching the page model: ${modelName}`);
  }

  let additionalProps: any = {};
  if (modelName === 'advanced') {
    const allPages = getAllPagesData();
    additionalProps.projects = allPages
      .filter((p) => p.page.__metadata.modelName === 'project')
      .map((p) => p.page);
    additionalProps.posts = allPages
      .filter((p) => p.page.__metadata.modelName === 'post')
      .map((p) => p.page);
  }

  return <PageLayout page={data.page} data={{ config: data.site }} {...additionalProps} />;
}
