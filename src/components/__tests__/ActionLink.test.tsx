import { render, screen } from '@testing-library/react';

import ActionLink from '../ActionLink';

vi.mock('@/utils', () => ({
  Link: ({ children, href, target, rel }: Record<string, any>) => (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  ),
  withPrefix: (url: string) => url,
}));

describe('ActionLink', () => {
  it('renders a link with label and url', () => {
    render(<ActionLink action={{ label: 'About', url: '/about' }} />);
    const link = screen.getByText('About');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/about');
  });

  it('adds target=_blank for new_window', () => {
    render(
      <ActionLink
        action={{ label: 'External', url: '/ext', new_window: true }}
      />,
    );
    const link = screen.getByText('External').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('adds nofollow rel', () => {
    render(
      <ActionLink
        action={{ label: 'Nofollow', url: '/nf', no_follow: true }}
      />,
    );
    const link = screen.getByText('Nofollow').closest('a');
    expect(link).toHaveAttribute('rel', 'nofollow');
  });

  it('adds both rel attributes when new_window and no_follow', () => {
    render(
      <ActionLink
        action={{
          label: 'Both',
          url: '/both',
          new_window: true,
          no_follow: true,
        }}
      />,
    );
    const link = screen.getByText('Both').closest('a');
    expect(link?.getAttribute('rel')).toContain('noopener');
    expect(link?.getAttribute('rel')).toContain('nofollow');
  });
});
