import { render, screen } from '@testing-library/react';

import Link from '../link';

describe('Link', () => {
  it('renders an internal link with NextLink', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders an external link with <a> tag', () => {
    render(<Link href="https://example.com">External</Link>);
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders a relative link without leading slash as external', () => {
    render(<Link href="relative/path">Relative</Link>);
    const link = screen.getByRole('link', { name: 'Relative' });
    expect(link).toHaveAttribute('href', 'relative/path');
  });

  it('renders an anchor link as external', () => {
    render(<Link href="#section">Section</Link>);
    const link = screen.getByRole('link', { name: 'Section' });
    expect(link).toHaveAttribute('href', '#section');
  });

  it('passes additional props to the element', () => {
    render(
      <Link href="/test" className="custom-link" data-testid="test-link">
        Test
      </Link>,
    );
    const link = screen.getByTestId('test-link');
    expect(link).toHaveClass('custom-link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders children correctly', () => {
    render(
      <Link href="/">
        <span>Home</span>
      </Link>,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
