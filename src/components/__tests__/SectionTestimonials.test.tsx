import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SectionTestimonials from '../SectionTestimonials';

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
  htmlToReact: (html: string) => html,
  withPrefix: (url: string) => `/prefix${url}`,
}));

describe('SectionTestimonials', () => {
  const baseSection = {
    section_id: 'testimonials-1',
    title: 'Testimonials',
    subtitle: 'What people say',
    testimonials: [
      {
        content: 'Great work!',
        author: 'John Doe',
        avatar: '/images/john.jpg',
        avatar_alt: 'John',
      },
      {
        content: 'Amazing!',
        author: 'Jane Smith',
      },
    ],
  };

  it('renders the section with title and subtitle', () => {
    render(<SectionTestimonials section={baseSection} />);
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('What people say')).toBeInTheDocument();
  });

  it('renders testimonial content', () => {
    render(<SectionTestimonials section={baseSection} />);
    expect(screen.getByText('Great work!')).toBeInTheDocument();
    expect(screen.getByText('Amazing!')).toBeInTheDocument();
  });

  it('renders author names', () => {
    render(<SectionTestimonials section={baseSection} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders avatar images with prefix', () => {
    render(<SectionTestimonials section={baseSection} />);
    const img = screen.getByAltText('John');
    expect(img).toHaveAttribute('src', '/prefix/images/john.jpg');
  });

  it('renders col-3 grid by default', () => {
    const { container } = render(<SectionTestimonials section={baseSection} />);
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-col-3');
  });

  it('renders col-2 grid when specified', () => {
    const { container } = render(
      <SectionTestimonials section={{ ...baseSection, col_number: 'two' }} />,
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-col-2');
  });
});
