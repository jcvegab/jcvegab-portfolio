import withPrefix from './withPrefix';

import type { Page } from '@/types';

export default function getPageUrl(
  page: Page,
  { withPrefix: addPrefix = false }: { withPrefix?: boolean } = {},
) {
  const urlPath = page.__metadata.urlPath;
  return addPrefix ? withPrefix(urlPath) : urlPath;
}
