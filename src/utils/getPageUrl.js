import withPrefix from './withPrefix';

/**
 * @typedef {Object} PageUrlMetadata
 * @property {string} urlPath
 */

/**
 * @typedef {Object} PageUrlPost
 * @property {PageUrlMetadata} __metadata
 */

/**
 * @param {PageUrlPost} post
 * @param {{ withPrefix?: boolean }} [options]
 */
export default function getPageUrl(
  post,
  { withPrefix: addPrefix = false } = {},
) {
  const urlPath = post.__metadata.urlPath;
  return addPrefix ? withPrefix(urlPath) : urlPath;
}
