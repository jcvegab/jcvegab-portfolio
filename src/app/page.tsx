import { notFound } from 'next/navigation';

import pageLayouts from '../layouts';

import { getAllPagesData, getPageDataBySlug } from '../utils/content';

export async function generateMetadata() {
  const data = getPageDataBySlug('/');
  const seo = data?.page?.seo as Record<string, string> | undefined;
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default function HomePage() {
  const data = getPageDataBySlug('/');

  if (!data) {
    notFound();
  }

  const metadata = data.page.__metadata as { modelName: string };
  const modelName = metadata.modelName;
  const PageLayout = pageLayouts[modelName];

  if (!PageLayout) {
    throw new Error(`No page layout matching the page model: ${modelName}`);
  }

  const additionalProps: Record<string, unknown> = {};
  if (modelName === 'advanced') {
    const allPages = getAllPagesData();
    additionalProps.projects = allPages
      .filter((p) => {
        const pMetadata = p.page.__metadata as { modelName?: string };
        return pMetadata?.modelName === 'project';
      })
      .map((p) => p.page);
    additionalProps.posts = allPages
      .filter((p) => {
        const pMetadata = p.page.__metadata as { modelName?: string };
        return pMetadata?.modelName === 'post';
      })
      .map((p) => p.page);
  }

  return (
    <PageLayout
      page={data.page}
      data={{ config: data.site }}
      {...additionalProps}
    />
  );
}
