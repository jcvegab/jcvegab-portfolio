import { render, screen } from '@testing-library/react';

import Footer from '../Footer';

vi.mock('@/utils', () => ({
  htmlToReact: (html: string) => <span>{html}</span>,
}));

vi.mock('../Action', () => ({
  default: ({ action }: Record<string, any>) => (
    <a href={action.url}>{action.label}</a>
  ),
}));

vi.mock('../ActionLink', () => ({
  default: ({ action }: Record<string, any>) => (
    <a href={action.url}>{action.label}</a>
  ),
}));

describe('Footer', () => {
  const config = {
    title: 'My Site',
    header: { title: 'My Site' },
    footer: {
      content: '© 2024 My Site',
      links: [{ label: 'Privacy', url: '/privacy' }],
      has_social: true,
      social_links: [
        {
          label: 'GitHub',
          url: 'https://github.com',
          style: 'icon',
          icon: 'github',
        },
        {
          label: 'X',
          url: 'https://x.com/jcvegab',
          style: 'icon',
          icon: 'x',
        },
      ],
    },
  };

  it('renders the footer', () => {
    const { container } = render(<Footer config={config as any} />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders copyright content', () => {
    render(<Footer config={config as any} />);
    expect(screen.getByText('© 2024 My Site')).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Footer config={config as any} />);
    expect(screen.getByText('Privacy')).toBeInTheDocument();
  });

  it('renders social links when has_social is true', () => {
    render(<Footer config={config as any} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'X' })).toHaveAttribute(
      'href',
      'https://x.com/jcvegab',
    );
  });

  it('does not render social links when has_social is false', () => {
    render(
      <Footer
        config={
          {
            ...config,
            footer: { ...config.footer, has_social: false },
          } as any
        }
      />,
    );
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });
});
