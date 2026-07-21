import { render, screen } from '@testing-library/react';

import PostLayout from '../post';

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
  formatDate: (_date: any, type: string) => {
    if (type === 'date_time_attribute') return '2024-01-15 00:00';
    return 'Monday, January 15, 2024';
  },
  htmlToReact: (html: string) => html,
  markdownify: (md: string) => <span>{md}</span>,
  withPrefix: (url: string) => `/prefix${url}`,
}));

describe('Post layout', () => {
  const baseProps = {
    data: {
      config: { title: 'My Site', header: {}, footer: {} },
    },
    page: {
      title: 'My Post',
      subtitle: 'A great post',
      date: '2024-01-15',
      markdown_content: 'Post body content',
      __metadata: {
        urlPath: '/blog/my-post',
        modelName: 'post' as const,
      },
    },
  };

  it('renders the post title', () => {
    render(<PostLayout {...(baseProps as any)} />);
    expect(screen.getByText('My Post')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<PostLayout {...(baseProps as any)} />);
    expect(screen.getByText('A great post')).toBeInTheDocument();
  });

  it('renders the formatted date', () => {
    render(<PostLayout {...(baseProps as any)} />);
    expect(screen.getByText('Monday, January 15, 2024')).toBeInTheDocument();
  });

  it('renders markdown content', () => {
    render(<PostLayout {...(baseProps as any)} />);
    expect(screen.getByText('Post body content')).toBeInTheDocument();
  });

  it('renders the image when provided', () => {
    render(
      <PostLayout
        {...({
          ...baseProps,
          page: {
            ...baseProps.page,
            image: '/images/post.jpg',
            image_alt: 'Post image',
          },
        } as any)}
      />,
    );
    const img = screen.getByAltText('Post image');
    expect(img).toHaveAttribute('src', '/prefix/images/post.jpg');
  });
});
