import { render, screen } from '@testing-library/react';

import Header from '../Header';

vi.mock('@/utils', () => ({
  classNames: (...args: unknown[]) =>
    args.flat().filter(Boolean).join(' ') || undefined,
  get: (obj: Record<string, any>, path: string, defaultValue?: any) => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result == null) return defaultValue;
      result = result[key];
    }
    return result !== undefined ? result : defaultValue;
  },
  getPageUrl: (page: { __metadata: { urlPath: string } }) =>
    page.__metadata.urlPath,
  Link: ({ children, href, className }: Record<string, any>) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  map: (arr: any[], fn: any) => arr.map(fn),
  trim: (str: string) => str.replace(/^\//, '').replace(/\/$/, ''),
  withPrefix: (url: string) => url,
}));

vi.mock('../Action', () => ({
  default: ({ action }: Record<string, any>) => (
    <a href={action.url}>{action.label}</a>
  ),
}));

describe('Header', () => {
  const basePage = {
    title: 'Home',
    markdown_content: '',
    __metadata: { urlPath: '/', modelName: 'page' as const },
  };

  const baseConfig = {
    title: 'My Site',
    header: {
      title: 'My Site',
      logo_img: '',
      logo_img_alt: '',
      has_nav: true,
      nav_links: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
      ],
    },
    footer: {},
  };

  it('renders the site title when no logo', () => {
    render(<Header page={basePage} config={baseConfig as any} />);
    const title = screen.getByText('My Site');
    expect(title).toBeInTheDocument();
  });

  it('renders logo image when logo_img is set', () => {
    render(
      <Header
        page={basePage}
        config={
          {
            ...baseConfig,
            header: {
              ...baseConfig.header,
              logo_img: '/images/logo.png',
            },
          } as any
        }
      />,
    );
    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  it('renders navigation links when has_nav is true', () => {
    render(<Header page={basePage} config={baseConfig as any} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('does not render navigation when has_nav is false', () => {
    render(
      <Header
        page={basePage}
        config={
          {
            ...baseConfig,
            header: { ...baseConfig.header, has_nav: false },
          } as any
        }
      />,
    );
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('renders an icon menu button for navigation', () => {
    render(<Header page={basePage} config={baseConfig as any} />);
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });
});
