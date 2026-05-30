import withPrefix from './withPrefix';

type PageUrlMetadata = {
  urlPath: string;
};

type PageUrlPost = {
  __metadata: PageUrlMetadata;
};

export default function getPageUrl(
  post: PageUrlPost,
  { withPrefix: addPrefix = false }: { withPrefix?: boolean } = {},
) {
  const urlPath = post.__metadata.urlPath;
  return addPrefix ? withPrefix(urlPath) : urlPath;
}
