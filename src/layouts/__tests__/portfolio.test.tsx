import { render, screen } from '@testing-library/react';

import PortfolioLayout from '../portfolio';

vi.mock('next/image', () => ({
  default: ({ priority, ...props }: Record<string, unknown>) => (
    <img alt="" {...props} />
  ),
}));

vi.mock('@/components', () => ({
  Body: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="body">{children}</div>
  ),
}));

vi.mock('@/utils', () => ({
  getPageUrl: (page: any, opts?: any) =>
    opts?.withPrefix
      ? `/prefix${page.__metadata.urlPath}`
      : page.__metadata.urlPath,
  Link: ({ children, href }: Record<string, any>) => (
    <a href={href}>{children}</a>
  ),
  orderBy: (arr: any[]) => arr,
  withPrefix: (url: string) => `/prefix${url}`,
}));

describe('Portfolio layout', () => {
  const baseProps = {
    data: {
      config: { title: 'My Site', header: {}, footer: {} },
    },
    page: {
      title: 'Portfolio',
      subtitle: 'My projects',
      markdown_content: '',
      __metadata: {
        urlPath: '/portfolio',
        modelName: 'portfolio' as const,
      },
    },
    projects: [
      {
        title: 'Project 1',
        __metadata: {
          urlPath: '/projects/1',
          modelName: 'project' as const,
        },
      },
      {
        title: 'Project 2',
        __metadata: {
          urlPath: '/projects/2',
          modelName: 'project' as const,
        },
      },
    ],
  };

  it('renders the portfolio title', () => {
    render(<PortfolioLayout {...(baseProps as any)} />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<PortfolioLayout {...(baseProps as any)} />);
    expect(screen.getByText('My projects')).toBeInTheDocument();
  });

  it('renders project titles', () => {
    render(<PortfolioLayout {...(baseProps as any)} />);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('renders with mosaic layout by default', () => {
    const { container } = render(<PortfolioLayout {...(baseProps as any)} />);
    expect(container.querySelector('.layout-mosaic')).toBeInTheDocument();
  });

  it('renders with grid layout when specified', () => {
    const { container } = render(
      <PortfolioLayout
        {...({
          ...baseProps,
          page: { ...baseProps.page, layout_style: 'grid' },
        } as any)}
      />,
    );
    expect(container.querySelector('.layout-grid')).toBeInTheDocument();
  });

  it('renders project thumbnails', () => {
    render(
      <PortfolioLayout
        {...({
          ...baseProps,
          projects: [
            {
              ...baseProps.projects[0],
              thumb_image: '/images/proj1.jpg',
              thumb_image_alt: 'Project 1 thumb',
            },
          ],
        } as any)}
      />,
    );
    const img = screen.getByAltText('Project 1 thumb');
    expect(img).toHaveAttribute('src', '/prefix/images/proj1.jpg');
  });
});
