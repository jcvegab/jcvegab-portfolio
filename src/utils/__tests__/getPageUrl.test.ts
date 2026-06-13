vi.mock('../withPrefix', () => ({
  default: (url: string) => `/prefix${url}`,
}));

import getPageUrl from '../getPageUrl';

describe('getPageUrl', () => {
  const mockPage = {
    title: 'Test',
    markdown_content: '',
    __metadata: {
      urlPath: '/test-page',
      modelName: 'page' as const,
    },
  };

  it('returns urlPath when withPrefix is false', () => {
    const result = getPageUrl(mockPage);
    expect(result).toBe('/test-page');
  });

  it('returns urlPath when withPrefix option is false', () => {
    const result = getPageUrl(mockPage, { withPrefix: false });
    expect(result).toBe('/test-page');
  });

  it('returns prefixed urlPath when withPrefix is true', () => {
    const result = getPageUrl(mockPage, { withPrefix: true });
    expect(result).toBe('/prefix/test-page');
  });

  it('handles root path', () => {
    const rootPage = {
      ...mockPage,
      __metadata: { urlPath: '/', modelName: 'page' as const },
    };
    const result = getPageUrl(rootPage);
    expect(result).toBe('/');
  });

  it('uses default options when none provided', () => {
    const result = getPageUrl(mockPage);
    expect(result).toBe('/test-page');
  });
});
