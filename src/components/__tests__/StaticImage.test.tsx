import { render, screen } from '@testing-library/react';

import StaticImage from '../StaticImage';

describe('StaticImage', () => {
  it('renders an img with src and alt', () => {
    render(<StaticImage src="/test.png" alt="test image" />);
    const img = screen.getByAltText('test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.png');
  });

  it('renders with width and height', () => {
    render(<StaticImage src="/test.png" alt="test" width={200} height={100} />);
    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('width', '200');
    expect(img).toHaveAttribute('height', '100');
  });

  it('uses eager loading when priority is true', () => {
    render(<StaticImage src="/test.png" alt="test" priority />);
    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchPriority', 'high');
  });

  it('uses lazy loading by default', () => {
    render(<StaticImage src="/test.png" alt="test" />);
    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('applies position absolute styles when fill is true', () => {
    render(<StaticImage src="/test.png" alt="test" fill />);
    const img = screen.getByAltText('test');
    expect(img.style.position).toBe('absolute');
    expect(img.style.width).toBe('100%');
    expect(img.style.height).toBe('100%');
  });

  it('does not set width/height attrs when fill is true', () => {
    render(
      <StaticImage src="/test.png" alt="test" fill width={200} height={100} />,
    );
    const img = screen.getByAltText('test');
    expect(img).not.toHaveAttribute('width');
    expect(img).not.toHaveAttribute('height');
  });
});
