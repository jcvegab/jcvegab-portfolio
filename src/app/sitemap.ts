export const dynamic = 'force-static';

import { getAllPagesData, getGlobalConfig } from '@/utils/content';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getGlobalConfig();
  const domain = config?.domain || 'http://localhost:3000';

  const pages = getAllPagesData();
  const indexablePages = pages.filter((pageData) => {
    const robots = pageData.page.seo?.robots || [];
    return !robots.includes('noindex');
  });

  return indexablePages.map((pageData) => {
    const path = pageData.page.__metadata.urlPath;

    const url = path === '/' ? domain : `${domain}${path}`;

    const rawData = pageData.page;

    return {
      url,
      ...('date' in rawData && {
        lastModified: new Date(rawData.date as string),
      }),
    };
  });
}
