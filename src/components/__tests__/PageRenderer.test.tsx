import { render, screen } from '@testing-library/react';

import PageRenderer from '../PageRenderer';

import type { PageData } from '@/types';

vi.mock('@/layouts', () => ({
  default: {
    page: ({ page }: Record<string, unknown>) => (
      <div data-testid="page-layout">
        <h1>{String((page as Record<string, string>)?.title)}</h1>
      </div>
    ),
    project: ({ page }: Record<string, unknown>) => (
      <div data-testid="project-layout">
        <h1>{String((page as Record<string, string>)?.title)}</h1>
      </div>
    ),
  },
  page: () => <div>page</div>,
  project: () => <div>project</div>,
}));

const basePage: PageData = {
  page: {
    title: 'Test Page',
    markdown_content: '',
    __metadata: { urlPath: '/test', modelName: 'page' },
  },
  site: { title: 'Test', header: {} as never, footer: {} as never },
};

describe('PageRenderer', () => {
  it('renders the correct layout based on modelName', () => {
    render(<PageRenderer data={basePage} />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders project layout for project model', () => {
    const projectPage: PageData = {
      page: {
        title: 'My Project',
        markdown_content: '',
        __metadata: { urlPath: '/project', modelName: 'project' },
      },
      site: { title: 'Test', header: {} as never, footer: {} as never },
    };
    render(<PageRenderer data={projectPage} />);
    expect(screen.getByTestId('project-layout')).toBeInTheDocument();
  });

  it('throws for unknown modelName', () => {
    const badPage: PageData = {
      page: {
        title: 'Bad',
        markdown_content: '',
        __metadata: {
          urlPath: '/bad',
          modelName: 'post',
        },
      },
      site: { title: 'Test', header: {} as never, footer: {} as never },
    };
    expect(() => render(<PageRenderer data={badPage} />)).toThrow(
      'No page layout matching the page model',
    );
  });

  it('passes currentPath prop to layout', () => {
    render(<PageRenderer data={basePage} currentPath="/test" />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('passes posts and projects to layout', () => {
    const posts = [
      {
        title: 'Post 1',
        markdown_content: '',
        __metadata: { urlPath: '/post-1', modelName: 'post' },
      },
    ];
    render(<PageRenderer data={basePage} posts={posts as never} />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });
});
