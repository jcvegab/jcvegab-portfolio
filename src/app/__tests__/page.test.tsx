import { render, screen } from '@testing-library/react';

const mockNotFound = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
);

const mockPageLayout = vi.hoisted(() =>
  vi.fn(({ page }: Record<string, any>) => <section>{page.title}</section>),
);

const mockAdvancedLayout = vi.hoisted(() =>
  vi.fn(({ page, projects, posts }: Record<string, any>) => (
    <section>
      {page.title}
      {projects && <span>projects:{projects.length}</span>}
      {posts && <span>posts:{posts.length}</span>}
    </section>
  )),
);

vi.mock('next/navigation', () => ({
  notFound: mockNotFound,
}));

vi.mock('@/layouts', () => ({
  default: { advanced: mockAdvancedLayout, page: mockPageLayout },
  advanced: mockAdvancedLayout,
  page: mockPageLayout,
}));

vi.mock('@/utils/content', () => ({
  getPageDataBySlug: vi.fn(),
  getAllPagesData: vi.fn(),
}));

import * as content from '@/utils/content';

import HomePage, { generateMetadata } from '../page';

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with home page data', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Home',
        __metadata: { modelName: 'page', urlPath: '/' },
        markdown_content: '',
      },
      site: { title: 'My Site', header: {} as any, footer: {} as any },
    });

    const Component = await HomePage();
    render(Component);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('calls notFound when no data', () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue(null);

    expect(() => HomePage()).toThrow();
    expect(mockNotFound).toHaveBeenCalled();
  });

  it('throws error for unknown layout model', () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Custom',
        __metadata: { modelName: 'custom' as any, urlPath: '/' },
        markdown_content: '',
      },
      site: null,
    });

    expect(() => HomePage()).toThrow(
      'No page layout matching the page model: custom',
    );
  });

  it('injects projects and posts for advanced model', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Advanced',
        __metadata: { modelName: 'advanced', urlPath: '/' },
        markdown_content: '',
      },
      site: null,
    });

    vi.mocked(content.getAllPagesData).mockReturnValue([
      {
        page: {
          title: 'Project 1',
          __metadata: { modelName: 'project', urlPath: '/p1' },
          markdown_content: '',
        },
        site: null,
      },
      {
        page: {
          title: 'Post 1',
          __metadata: { modelName: 'post', urlPath: '/post1' },
          markdown_content: '',
        },
        site: null,
      },
      {
        page: {
          title: 'A Page',
          __metadata: { modelName: 'page', urlPath: '/about' },
          markdown_content: '',
        },
        site: null,
      },
    ]);

    const Component = await HomePage();
    render(Component);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByText('projects:1')).toBeInTheDocument();
    expect(screen.getByText('posts:1')).toBeInTheDocument();
  });
});

describe('generateMetadata', () => {
  it('returns metadata from seo', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Home',
        seo: { title: 'SEO Home', description: 'SEO Description' },
        __metadata: { modelName: 'page', urlPath: '/' },
        markdown_content: '',
      },
      site: null,
    });

    const meta = await generateMetadata();
    expect(meta).toEqual({
      title: 'SEO Home',
      description: 'SEO Description',
    });
  });

  it('returns empty object when no seo', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Home',
        __metadata: { modelName: 'page', urlPath: '/' },
        markdown_content: '',
      },
      site: null,
    });

    const meta = await generateMetadata();
    expect(meta).toEqual({});
  });
});
