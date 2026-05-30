import { compact, startsWith, trim, trimStart } from './lodash';
const pathPrefix = require('../../content/data/config.json').path_prefix;

/**
 * @param {string} url
 */
export default function withPrefix(url) {
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
  return '/' + compact([basePath, trimStart(url, '/')]).join('/');
}
