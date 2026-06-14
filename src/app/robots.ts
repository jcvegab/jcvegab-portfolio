export const dynamic = 'force-static';

import { getGlobalConfig } from '@/utils/content';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const config = getGlobalConfig();
  const domain = config?.domain || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
