import { render, screen } from '@testing-library/react';

import SectionGrid from '../SectionGrid';

vi.mock('@/utils', () => ({
  classNames: (...args: any[]): string | null => {
    const classes: string[] = [];
    for (const arg of args) {
      if (!arg) continue;
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (typeof arg === 'object') {
        for (const [key, val] of Object.entries(arg)) {
          if (val) classes.push(key);
        }
      }
    }
    return classes.length ? classes.join(' ') : null;
  },
  htmlToReact: (html: string) => html,
  markdownify: (md: string) => md,
  withPrefix: (url: string) => `/prefix${url}`,
}));

vi.mock('../CtaButtons', () => ({
  default: ({ actions }: Record<string, any>) => (
    <div data-testid="cta-buttons">{actions.length} actions</div>
  ),
}));

describe('SectionGrid', () => {
  const baseSection = {
    section_id: 'grid-1',
    title: 'Services',
    subtitle: 'What I offer',
    grid_items: [
      { title: 'Web Dev', content: 'Building websites' },
      { title: 'Mobile', content: 'Mobile apps' },
    ],
  };

  it('renders the section with title and subtitle', () => {
    render(<SectionGrid section={baseSection} />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('What I offer')).toBeInTheDocument();
  });

  it('renders grid items', () => {
    render(<SectionGrid section={baseSection} />);
    expect(screen.getByText('Web Dev')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });

  it('shows numbered counters when is_numbered is true', () => {
    render(<SectionGrid section={{ ...baseSection, is_numbered: true }} />);
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
  });

  it('renders grid with col-3 class by default', () => {
    const { container } = render(<SectionGrid section={baseSection} />);
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-col-3');
  });

  it('renders grid with col-2 class when specified', () => {
    const { container } = render(
      <SectionGrid section={{ ...baseSection, col_number: 'two' }} />,
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-col-2');
  });

  it('renders grid item images', () => {
    render(
      <SectionGrid
        section={{
          ...baseSection,
          grid_items: [
            {
              title: 'Item',
              image: '/img/icon.svg',
              image_alt: 'Icon',
            },
          ],
        }}
      />,
    );
    const img = screen.getByAltText('Icon');
    expect(img).toHaveAttribute('src', '/prefix/img/icon.svg');
  });

  it('renders empty when no grid items', () => {
    const { container } = render(
      <SectionGrid
        section={{ section_id: 'empty', title: '', subtitle: '' }}
      />,
    );
    expect(container.querySelector('.grid')).not.toBeInTheDocument();
  });
});
