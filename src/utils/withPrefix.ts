import config from '../../content/data/config.json';
import { compact, startsWith, trim, trimStart } from './lodash';

const pathPrefix = config.path_prefix;

export default function withPrefix(url: string) {
  if (!url) {
    return url;
  }

  if (
    startsWith(url, '#') ||
    startsWith(url, 'http://') ||
    startsWith(url, 'https://')
  ) {
    return url;
  }
  const basePath = trim(pathPrefix, '/');
  return `/${compact([basePath, trimStart(url, '/')]).join('/')}`;
}
