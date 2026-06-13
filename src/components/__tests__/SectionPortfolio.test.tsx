import { render, screen } from '@testing-library/react';

import SectionPortfolio from '../SectionPortfolio';

vi.mock('@/utils', () => ({
  getPageUrl: (page: any, opts?: any) =>
    opts?.withPrefix
      ? `/prefix${page.__metadata.urlPath}`
      : page.__metadata.urlPath,
  htmlToReact: (html: string) => html,
  Link: ({ children, href, className }: Record<string, any>) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  orderBy: (arr: any[]) => arr,
  size: (arr: any[]) => arr.length,
  withPrefix: (url: string) => `/prefix${url}`,
}));

describe('SectionPortfolio', () => {
  const baseSection = {
    section_id: 'portfolio-1',
    title: 'My Work',
    subtitle: 'Projects I built',
  };

  const projects = [
    {
      title: 'Project 1',
      __metadata: {
        urlPath: '/projects/proj1',
        modelName: 'project' as const,
      },
    },
    {
      title: 'Project 2',
      __metadata: {
        urlPath: '/projects/proj2',
        modelName: 'project' as const,
      },
    },
  ];

  it('renders the section with title and subtitle', () => {
    render(
      <SectionPortfolio section={baseSection} projects={projects as any} />,
    );
    expect(screen.getByText('My Work')).toBeInTheDocument();
    expect(screen.getByText('Projects I built')).toBeInTheDocument();
  });

  it('renders project items', () => {
    render(
      <SectionPortfolio section={baseSection} projects={projects as any} />,
    );
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  it('renders view all link in last project when specified', () => {
    render(
      <SectionPortfolio
        section={{
          ...baseSection,
          view_all_label: 'View All',
          view_all_url: '/portfolio',
        }}
        projects={projects as any}
      />,
    );
    expect(screen.getByText('View All')).toBeInTheDocument();
  });

  it('renders with mosaic layout by default', () => {
    const { container } = render(
      <SectionPortfolio section={baseSection} projects={projects as any} />,
    );
    expect(container.querySelector('.layout-mosaic')).toBeInTheDocument();
  });

  it('renders with grid layout when specified', () => {
    const { container } = render(
      <SectionPortfolio
        section={{ ...baseSection, layout_style: 'grid' }}
        projects={projects as any}
      />,
    );
    expect(container.querySelector('.layout-grid')).toBeInTheDocument();
  });

  it('limits projects to projects_number', () => {
    const manyProjects = Array.from({ length: 10 }, (_, i) => ({
      title: `Project ${i + 1}`,
      __metadata: {
        urlPath: `/projects/p${i}`,
        modelName: 'project' as const,
      },
    }));
    render(
      <SectionPortfolio
        section={{ ...baseSection, projects_number: 3 }}
        projects={manyProjects as any}
      />,
    );
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
    expect(screen.queryByText('Project 4')).not.toBeInTheDocument();
  });
});
