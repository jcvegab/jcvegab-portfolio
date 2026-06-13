import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SectionPosts from '../SectionPosts';

vi.mock('@/utils', () => ({
  classNames: (...args: any[]): string | null => {
    const classes: string[] = [];
    for (const arg of args) {
      if (!arg) continue;
      if (typeof arg === 'string') classes.push(arg);
      else if (typeof arg === 'object') {
        for (const [key, val] of Object.entries(arg)) {
          if (val) classes.push(key);
        }
      }
    }
    return classes.length ? classes.join(' ') : null;
  },
  formatDate: (_date: any, type: string) => {
    if (type === 'date_time_attribute') return '2024-01-15 00:00';
    return 'January 15, 2024';
  },
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
  withPrefix: (url: string) => `/prefix${url}`,
}));

vi.mock('../CtaButtons', () => ({
  default: ({ actions }: Record<string, any>) => (
    <div data-testid="cta-buttons">{actions.length} actions</div>
  ),
}));

describe('SectionPosts', () => {
  const baseSection = {
    section_id: 'posts-1',
    title: 'Blog',
    subtitle: 'Latest posts',
  };

  const posts = [
    {
      title: 'Post 1',
      date: '2024-01-15',
      __metadata: { urlPath: '/blog/post1', modelName: 'post' as const },
    },
    {
      title: 'Post 2',
      date: '2024-02-20',
      __metadata: { urlPath: '/blog/post2', modelName: 'post' as const },
    },
  ];

  it('renders the section with title and subtitle', () => {
    render(<SectionPosts section={baseSection} posts={posts} />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Latest posts')).toBeInTheDocument();
  });

  it('renders post items', () => {
    render(<SectionPosts section={baseSection} posts={posts} />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('renders post dates', () => {
    render(<SectionPosts section={baseSection} posts={posts} />);
    const dates = screen.getAllByText('January 15, 2024');
    expect(dates.length).toBeGreaterThan(0);
  });

  it('limits posts to posts_number', () => {
    const manyPosts = Array.from({ length: 10 }, (_, i) => ({
      title: `Post ${i + 1}`,
      date: '2024-01-15',
      __metadata: {
        urlPath: `/blog/p${i}`,
        modelName: 'post' as const,
      },
    }));
    render(
      <SectionPosts
        section={{ ...baseSection, posts_number: 3 }}
        posts={manyPosts}
      />,
    );
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 3')).toBeInTheDocument();
    expect(screen.queryByText('Post 4')).not.toBeInTheDocument();
  });

  it('renders CTA buttons when actions provided', () => {
    render(
      <SectionPosts
        section={{
          ...baseSection,
          actions: [{ label: 'View All', url: '/blog' }],
        }}
        posts={posts}
      />,
    );
    expect(screen.getByTestId('cta-buttons')).toBeInTheDocument();
  });

  it('renders excerpt content', () => {
    render(
      <SectionPosts
        section={baseSection}
        posts={[{ ...posts[0], excerpt: 'Read more...' }]}
      />,
    );
    expect(screen.getByText('Read more...')).toBeInTheDocument();
  });
});
