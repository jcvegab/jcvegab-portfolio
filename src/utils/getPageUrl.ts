import withPrefix from './withPrefix';

import type { Page } from '@/types';

export default function getPageUrl(
  page: Page,
  { withPrefix: addPrefix = false }: { withPrefix?: boolean } = {},
) {
  const urlPath = page.__metadata.urlPath;
  const canonicalPath = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  return addPrefix ? withPrefix(canonicalPath) : canonicalPath;
}
