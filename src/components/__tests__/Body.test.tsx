import { render, screen } from '@testing-library/react';

import Body from '../Body';

vi.mock('reframe.js/dist/noframe', () => ({
  default: vi.fn(),
}));

vi.mock('@/utils', () => ({
  classNames: (...args: any[]) => args.flat().filter(Boolean).join(' ') || null,
}));

vi.mock('../Header', () => ({
  default: (_props: Record<string, any>) => (
    <header data-testid="header">Header</header>
  ),
}));

vi.mock('../Footer', () => ({
  default: (_props: Record<string, any>) => (
    <footer data-testid="footer">Footer</footer>
  ),
}));

describe('Body', () => {
  const config = {
    title: 'My Site',
    color_scheme: 'dark' as const,
    accent_color: 'blue',
    header: { title: 'My Site' },
    footer: {},
  };

  const page = {
    title: 'Home',
    markdown_content: '',
    __metadata: { urlPath: '/', modelName: 'page' as const },
  };

  it('renders the body wrapper with palette and accent classes', () => {
    const { container } = render(
      <Body config={config as any} page={page}>
        Content
      </Body>,
    );
    const pageDiv = container.querySelector('#page');
    expect(pageDiv).toHaveClass('palette-dark');
    expect(pageDiv).toHaveClass('accent-blue');
  });

  it('renders default palette and accent when not specified', () => {
    const { container } = render(
      <Body
        config={{ title: 'Site', header: {}, footer: {} } as any}
        page={page}
      >
        Content
      </Body>,
    );
    const pageDiv = container.querySelector('#page');
    expect(pageDiv).toHaveClass('palette-light');
    expect(pageDiv).toHaveClass('accent-pink');
  });

  it('renders the Header', () => {
    render(
      <Body config={config as any} page={page}>
        Content
      </Body>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders children in main content area', () => {
    render(
      <Body config={config as any} page={page}>
        Main Content Here
      </Body>,
    );
    expect(screen.getByText('Main Content Here')).toBeInTheDocument();
  });

  it('renders the Footer', () => {
    render(
      <Body config={config as any} page={page}>
        Content
      </Body>,
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
