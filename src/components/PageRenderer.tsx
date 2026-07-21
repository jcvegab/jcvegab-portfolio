import pageLayouts from '@/layouts';

import type { Page, PageData } from '@/types';

type PageRendererProps = {
  data: PageData;
  posts?: Page[];
  projects?: Page[];
  currentPath?: string;
};

export default function PageRenderer({
  data,
  posts,
  projects,
  currentPath,
}: PageRendererProps) {
  const metadata = data.page.__metadata as { modelName: string };
  const modelName = metadata.modelName;
  const PageLayout = pageLayouts[modelName];

  if (!PageLayout) {
    throw new Error(`No page layout matching the page model: ${modelName}`);
  }

  const LayoutComponent = PageLayout as React.ComponentType<{
    data: { config: PageData['site'] };
    page: Page;
    posts?: Page[];
    projects?: Page[];
    currentPath?: string;
  }>;

  return (
    <LayoutComponent
      data={{ config: data.site }}
      page={data.page}
      posts={posts}
      projects={projects}
      currentPath={currentPath}
    />
  );
}
