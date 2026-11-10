import { render, screen } from '@testing-library/react';

import PageLayout from '../page';

vi.mock('@/components/StaticImage', () => ({
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
  htmlToReact: (html: string) => html,
  markdownify: (md: string) => <span>{md}</span>,
  withPrefix: (url: string) => `/prefix${url}`,
}));

describe('Page layout', () => {
  const baseProps = {
    data: {
      config: {
        title: 'My Site',
        header: {},
        footer: {},
      },
    },
    page: {
      title: 'About',
      subtitle: 'Learn about me',
      markdown_content: '## Content here',
      __metadata: { urlPath: '/about', modelName: 'page' as const },
    },
  };

  it('renders the page title', () => {
    render(<PageLayout {...(baseProps as any)} />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<PageLayout {...(baseProps as any)} />);
    expect(screen.getByText('Learn about me')).toBeInTheDocument();
  });

  it('renders markdown content', () => {
    render(<PageLayout {...(baseProps as any)} />);
    expect(screen.getByText('## Content here')).toBeInTheDocument();
  });

  it('renders a structured experience timeline between intro and content', () => {
    const { container } = render(
      <PageLayout
        {...({
          ...baseProps,
          page: {
            ...baseProps.page,
            intro: 'My introduction',
            experience: [
              {
                id: 'company',
                company: 'Company',
                role: 'Developer',
                location: 'Remote',
                summary: 'Built software.',
                periods: [
                  {
                    start: '2025-05',
                    start_label: 'May 2025',
                    end_label: 'Present',
                  },
                ],
                highlights: ['Built a product'],
                technologies: ['React'],
              },
            ],
          },
        } as any)}
      />,
    );

    expect(screen.getByText('My introduction')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Developer' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('## Content here')).toBeInTheDocument();
    const html = container.innerHTML;
    expect(html.indexOf('My introduction')).toBeLessThan(
      html.indexOf('experience-timeline'),
    );
    expect(html.indexOf('experience-timeline')).toBeLessThan(
      html.indexOf('## Content here'),
    );
  });

  it('renders the image when provided', () => {
    render(
      <PageLayout
        {...({
          ...baseProps,
          page: {
            ...baseProps.page,
            image: '/images/hero.jpg',
            image_alt: 'Hero',
          },
        } as any)}
      />,
    );
    const img = screen.getByAltText('Hero');
    expect(img).toHaveAttribute('src', '/prefix/images/hero.jpg');
  });

  it('renders without optional fields', () => {
    render(
      <PageLayout
        {...({
          data: baseProps.data,
          page: {
            title: 'Minimal',
            markdown_content: '',
            __metadata: { urlPath: '/minimal', modelName: 'page' as const },
          },
        } as any)}
      />,
    );
    expect(screen.getByText('Minimal')).toBeInTheDocument();
  });
});
