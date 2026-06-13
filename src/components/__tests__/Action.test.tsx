import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Action from '../Action';

vi.mock('@/utils', () => ({
  Link: ({ children, href, className, target, rel }: Record<string, any>) => (
    <a href={href} className={className} target={target} rel={rel}>
      {children}
    </a>
  ),
  withPrefix: (url: string) => url,
  classNames: (...args: any[]): string | null => {
    const classes: string[] = [];
    for (const arg of args) {
      if (!arg) continue;
      if (typeof arg === 'string' || typeof arg === 'number') {
        classes.push(String(arg));
      } else if (typeof arg === 'object') {
        for (const [key, val] of Object.entries(arg)) {
          if (val) classes.push(key);
        }
      }
    }
    return classes.length ? classes.join(' ') : null;
  },
}));

vi.mock('../Icon', () => ({
  default: ({ icon }: Record<string, any>) => (
    <span data-testid="icon">{icon}</span>
  ),
}));

describe('Action', () => {
  it('renders a link with label', () => {
    render(<Action action={{ label: 'Click me', url: '/test' }} />);
    const link = screen.getByText('Click me');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/test');
  });

  it('renders a button style', () => {
    render(
      <Action action={{ label: 'Button', url: '/btn', style: 'button' }} />,
    );
    const link = screen.getByText('Button');
    expect(link.closest('a')).toHaveClass('button');
  });

  it('renders an icon style', () => {
    render(
      <Action
        action={{
          label: 'GitHub',
          url: '/gh',
          style: 'icon',
          icon: 'github',
        }}
      />,
    );
    expect(screen.getByTestId('icon')).toHaveTextContent('github');
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('adds target=_blank for new_window', () => {
    render(
      <Action action={{ label: 'External', url: '/ext', new_window: true }} />,
    );
    const link = screen.getByText('External').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('adds rel attributes for new_window and no_follow', () => {
    render(
      <Action
        action={{
          label: 'Link',
          url: '/l',
          new_window: true,
          no_follow: true,
        }}
      />,
    );
    const link = screen.getByText('Link').closest('a');
    expect(link?.getAttribute('rel')).toMatch(/noopener/);
    expect(link?.getAttribute('rel')).toMatch(/nofollow/);
  });
});
