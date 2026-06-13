import { notFound } from 'next/navigation';

import pageLayouts from '@/layouts';

import { getAllPagesData, getPageDataBySlug } from '@/utils/content';

import type { Page } from '@/types';

export async function generateMetadata() {
  const data = getPageDataBySlug('/');
  const seo = data?.page?.seo;
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

  const metadata = data.page.__metadata;
  const modelName = metadata.modelName;
  const PageLayout = pageLayouts[modelName];

  if (!PageLayout) {
    throw new Error(`No page layout matching the page model: ${modelName}`);
  }

  const additionalProps: {
    projects?: Page[];
    posts?: Page[];
  } = {};
  if (modelName === 'advanced') {
    const allPages = getAllPagesData();
    additionalProps.projects = allPages
      .filter((p) => p.page.__metadata?.modelName === 'project')
      .map((p) => p.page);
    additionalProps.posts = allPages
      .filter((p) => p.page.__metadata?.modelName === 'post')
      .map((p) => p.page);
  }

  return (
    <PageLayout
      data={{ config: data.site }}
      // biome-ignore lint/suspicious/noExplicitAny: This is a bit of a hack to avoid having to define a ton of types for the page data and additional props.
      page={data.page as any}
      // biome-ignore lint/suspicious/noExplicitAny: This is a bit of a hack to avoid having to define a ton of types for the page data and additional props.
      {...(additionalProps as any)}
    />
  );
}
