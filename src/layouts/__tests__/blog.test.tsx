import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import BlogLayout from '../blog';

vi.mock('@/components', () => ({
  Body: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="body">{children}</div>
  ),
}));

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
  Link: ({ children, href }: Record<string, any>) => (
    <a href={href}>{children}</a>
  ),
  orderBy: (arr: any[]) => arr,
  withPrefix: (url: string) => `/prefix${url}`,
}));

describe('Blog layout', () => {
  const baseProps = {
    data: {
      config: { title: 'My Site', header: {}, footer: {} },
    },
    page: {
      title: 'Blog',
      subtitle: 'My posts',
      hide_title: false,
      markdown_content: '',
      __metadata: { urlPath: '/blog', modelName: 'blog' as const },
    },
    posts: [
      {
        title: 'Post 1',
        date: '2024-01-15',
        excerpt: 'First post',
        __metadata: {
          urlPath: '/blog/post1',
          modelName: 'post' as const,
        },
      },
      {
        title: 'Post 2',
        date: '2024-02-20',
        __metadata: {
          urlPath: '/blog/post2',
          modelName: 'post' as const,
        },
      },
    ],
  };

  it('renders the blog title', () => {
    render(<BlogLayout {...(baseProps as any)} />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<BlogLayout {...(baseProps as any)} />);
    expect(screen.getByText('My posts')).toBeInTheDocument();
  });

  it('renders post titles', () => {
    render(<BlogLayout {...(baseProps as any)} />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('renders post excerpts', () => {
    render(<BlogLayout {...(baseProps as any)} />);
    expect(screen.getByText('First post')).toBeInTheDocument();
  });

  it('applies screen-reader-text class when hide_title is true', () => {
    const { container } = render(
      <BlogLayout
        {...({
          ...baseProps,
          page: { ...baseProps.page, hide_title: true },
        } as any)}
      />,
    );
    const header = container.querySelector('.page-header');
    expect(header?.className).toContain('screen-reader-text');
  });
});
