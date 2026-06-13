import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockNotFound = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
);

const mockPortfolioLayout = vi.hoisted(() =>
  vi.fn(({ page, projects }: Record<string, any>) => (
    <section>
      {page.title}
      {projects && <span>projects:{projects.length}</span>}
    </section>
  )),
);

const mockBlogLayout = vi.hoisted(() =>
  vi.fn(({ page, posts }: Record<string, any>) => (
    <section>
      {page.title}
      {posts && <span>posts:{posts.length}</span>}
    </section>
  )),
);

const mockPageLayout = vi.hoisted(() =>
  vi.fn(({ page }: Record<string, any>) => <section>{page.title}</section>),
);

const mockPostLayout = vi.hoisted(() =>
  vi.fn(({ page }: Record<string, any>) => <section>{page.title}</section>),
);

vi.mock('next/navigation', () => ({
  notFound: mockNotFound,
}));

vi.mock('@/layouts', () => ({
  default: {
    portfolio: mockPortfolioLayout,
    blog: mockBlogLayout,
    page: mockPageLayout,
    post: mockPostLayout,
  },
  portfolio: mockPortfolioLayout,
  blog: mockBlogLayout,
  page: mockPageLayout,
  post: mockPostLayout,
}));

vi.mock('@/utils/content', () => ({
  getAllPagePaths: vi.fn(),
  getAllPagesData: vi.fn(),
  getPageDataBySlug: vi.fn(),
}));

import * as content from '@/utils/content';

import SlugPage, {
  generateMetadata,
  generateStaticParams,
} from '../[...slug]/page';

const defaultParams = { params: Promise.resolve({ slug: ['about'] }) };

describe('generateStaticParams', () => {
  it('returns slug parts for non-root paths', async () => {
    vi.mocked(content.getAllPagePaths).mockReturnValue([
      '/',
      '/about',
      '/blog/first-post',
    ]);

    const result = await generateStaticParams();
    expect(result).toEqual([
      { slug: ['about'] },
      { slug: ['blog', 'first-post'] },
    ]);
  });

  it('excludes root path', async () => {
    vi.mocked(content.getAllPagePaths).mockReturnValue(['/']);

    const result = await generateStaticParams();
    expect(result).toEqual([]);
  });
});

describe('generateMetadata', () => {
  it('returns metadata from seo', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'About',
        seo: { title: 'SEO About', description: 'About page' },
        __metadata: { modelName: 'page', urlPath: '/about' },
        markdown_content: '',
      },
      site: null,
    });

    const meta = await generateMetadata({
      params: Promise.resolve({ slug: ['about'] }),
    });
    expect(meta).toEqual({
      title: 'SEO About',
      description: 'About page',
    });
  });

  it('returns empty object when no seo', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'About',
        __metadata: { modelName: 'page', urlPath: '/about' },
        markdown_content: '',
      },
      site: null,
    });

    const meta = await generateMetadata({
      params: Promise.resolve({ slug: ['about'] }),
    });
    expect(meta).toEqual({});
  });

  it('handles empty slug', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Root',
        seo: { title: 'Root SEO' },
        __metadata: { modelName: 'page', urlPath: '/' },
        markdown_content: '',
      },
      site: null,
    });

    const meta = await generateMetadata({
      params: Promise.resolve({ slug: [] }),
    });
    expect(meta.title).toBe('Root SEO');
  });
});

describe('SlugPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page data for a simple page', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'About',
        __metadata: { modelName: 'page', urlPath: '/about' },
        markdown_content: '',
      },
      site: null,
    });

    const Component = await SlugPage(defaultParams);
    render(Component);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('calls notFound when no data', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue(null);

    await expect(SlugPage(defaultParams)).rejects.toThrow('NOT_FOUND');
    expect(mockNotFound).toHaveBeenCalled();
  });

  it('injects projects for portfolio model', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Portfolio',
        __metadata: { modelName: 'portfolio', urlPath: '/portfolio' },
        markdown_content: '',
      },
      site: null,
    });

    vi.mocked(content.getAllPagesData).mockReturnValue([
      {
        page: {
          title: 'Proj 1',
          __metadata: { modelName: 'project', urlPath: '/proj1' },
          markdown_content: '',
        },
        site: null,
      },
      {
        page: {
          title: 'Proj 2',
          __metadata: { modelName: 'project', urlPath: '/proj2' },
          markdown_content: '',
        },
        site: null,
      },
    ]);

    const Component = await SlugPage(defaultParams);
    render(Component);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('projects:2')).toBeInTheDocument();
  });

  it('injects posts for blog model', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'Blog',
        __metadata: { modelName: 'blog', urlPath: '/blog' },
        markdown_content: '',
      },
      site: null,
    });

    vi.mocked(content.getAllPagesData).mockReturnValue([
      {
        page: {
          title: 'Post 1',
          __metadata: { modelName: 'post', urlPath: '/post1' },
          markdown_content: '',
        },
        site: null,
      },
    ]);

    const Component = await SlugPage(defaultParams);
    render(Component);
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('posts:1')).toBeInTheDocument();
  });

  it('injects neither projects nor posts for page model', async () => {
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'About',
        __metadata: { modelName: 'page', urlPath: '/about' },
        markdown_content: '',
      },
      site: null,
    });

    const Component = await SlugPage(defaultParams);
    render(Component);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('handles multi-level slug paths', async () => {
    const params = { params: Promise.resolve({ slug: ['blog', 'my-post'] }) };
    vi.mocked(content.getPageDataBySlug).mockReturnValue({
      page: {
        title: 'My Post',
        __metadata: { modelName: 'post', urlPath: '/blog/my-post' },
        markdown_content: '',
      },
      site: null,
    });

    const Component = await SlugPage(params);
    render(Component);
    expect(screen.getByText('My Post')).toBeInTheDocument();
    expect(content.getPageDataBySlug).toHaveBeenCalledWith('/blog/my-post');
  });
});
