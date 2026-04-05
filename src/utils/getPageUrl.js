import withPrefix from './withPrefix';

export default function getPageUrl(
  post,
  { withPrefix: addPrefix = false } = {},
) {
  const urlPath = post.__metadata.urlPath;
  return addPrefix ? withPrefix(urlPath) : urlPath;
}
