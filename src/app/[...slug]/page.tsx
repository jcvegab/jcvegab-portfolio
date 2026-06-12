import { notFound } from 'next/navigation';

import pageLayouts from '../../layouts';

import {
  getAllPagePaths,
  getAllPagesData,
  getPageDataBySlug,
} from '../../utils/content';

export async function generateStaticParams() {
  const paths = getAllPagePaths();
  return paths
    .filter((p) => p !== '/') // root handled by page.tsx
    .map((p) => {
      const slugParts = p.replace(/^\//, '').split('/');
      return { slug: slugParts };
    });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = `/${slug ? slug.join('/') : ''}`;
  const data = getPageDataBySlug(slugPath);

  const seo = data?.page?.seo as Record<string, string> | undefined;
  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = `/${slug ? slug.join('/') : ''}`;
  const data = getPageDataBySlug(slugPath);

  if (!data) {
    notFound();
  }

  const metadata = data.page.__metadata as { modelName: string };
  const modelName = metadata.modelName;
  const PageLayout = pageLayouts[modelName];

  if (!PageLayout) {
    throw new Error(`No page layout matching the page model: ${modelName}`);
  }

  const additionalProps: {
    projects?: Record<string, unknown>[];
    posts?: Record<string, unknown>[];
  } = {};
  if (modelName === 'portfolio') {
    const allPages = getAllPagesData();
    additionalProps.projects = allPages
      .filter((p) => {
        const pMetadata = p.page.__metadata as { modelName?: string };
        return pMetadata?.modelName === 'project';
      })
      .map((p) => p.page);
  } else if (modelName === 'blog') {
    const allPages = getAllPagesData();
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
