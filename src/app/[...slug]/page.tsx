import { notFound } from 'next/navigation';

import pageLayouts from '../../layouts';

import { getAllPagePaths, getPageDataBySlug, getAllPagesData } from '../../utils/content';

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

  if (!data?.page?.seo) return {};

  return {
    title: data.page.seo.title,
    description: data.page.seo.description,
  };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugPath = `/${slug ? slug.join('/') : ''}`;
  const data = getPageDataBySlug(slugPath);

  if (!data) {
    notFound();
  }

  const modelName = data.page.__metadata.modelName;
  const PageLayout = pageLayouts[modelName];

  if (!PageLayout) {
    throw new Error(`No page layout matching the page model: ${modelName}`);
  }

  let additionalProps: any = {};
  if (modelName === 'portfolio') {
    const allPages = getAllPagesData();
    additionalProps.projects = allPages
      .filter((p) => p.page.__metadata.modelName === 'project')
      .map((p) => p.page);
  } else if (modelName === 'blog') {
    const allPages = getAllPagesData();
    additionalProps.posts = allPages
      .filter((p) => p.page.__metadata.modelName === 'post')
      .map((p) => p.page);
  }

  return <PageLayout page={data.page} data={{ config: data.site }} {...additionalProps} />;
}
