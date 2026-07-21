import { render, screen } from '@testing-library/react';

import ProjectLayout from '../project';

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

describe('Project layout', () => {
  const baseProps = {
    data: {
      config: { title: 'My Site', header: {}, footer: {} },
    },
    page: {
      title: 'My Project',
      subtitle: 'A cool project',
      markdown_content: 'Project details',
      __metadata: {
        urlPath: '/projects/my-project',
        modelName: 'project' as const,
      },
    },
  };

  it('renders the project title', () => {
    render(<ProjectLayout {...(baseProps as any)} />);
    expect(screen.getByText('My Project')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<ProjectLayout {...(baseProps as any)} />);
    expect(screen.getByText('A cool project')).toBeInTheDocument();
  });

  it('renders markdown content', () => {
    render(<ProjectLayout {...(baseProps as any)} />);
    expect(screen.getByText('Project details')).toBeInTheDocument();
  });

  it('renders the image when provided', () => {
    render(
      <ProjectLayout
        {...({
          ...baseProps,
          page: {
            ...baseProps.page,
            image: '/images/proj.jpg',
            image_alt: 'Project image',
          },
        } as any)}
      />,
    );
    const img = screen.getByAltText('Project image');
    expect(img).toHaveAttribute('src', '/prefix/images/proj.jpg');
  });
});
