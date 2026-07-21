import { render, screen } from '@testing-library/react';

import SectionHero from '../SectionHero';

vi.mock('@/components/StaticImage', () => ({
  default: ({ priority, ...props }: Record<string, unknown>) => (
    <img alt="" {...props} />
  ),
}));

vi.mock('@/utils', () => ({
  markdownify: (md: string) => md,
}));

vi.mock('../CtaButtons', () => ({
  default: ({ actions }: Record<string, any>) => (
    <div data-testid="cta-buttons">{actions.length} actions</div>
  ),
}));

describe('SectionHero', () => {
  const baseSection = {
    section_id: 'hero-1',
    title: 'Welcome',
    avatar: '/images/avatar.jpg',
    avatar_alt: 'My avatar',
    content: 'Hello!',
  };

  it('renders the hero section with title', () => {
    render(<SectionHero section={baseSection} />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('renders the avatar image', () => {
    render(<SectionHero section={baseSection} />);
    const img = screen.getByAltText('My avatar');
    expect(img).toHaveAttribute('src', '/images/avatar.jpg');
  });

  it('renders content', () => {
    render(<SectionHero section={baseSection} />);
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('renders CTA buttons when actions provided', () => {
    render(
      <SectionHero
        section={{
          ...baseSection,
          actions: [{ label: 'Click', url: '/click' }],
        }}
      />,
    );
    expect(screen.getByTestId('cta-buttons')).toBeInTheDocument();
  });

  it('renders without optional title and content', () => {
    render(
      <SectionHero
        section={{
          section_id: 'minimal',
          avatar: '/images/logo_full.png',
          avatar_alt: '',
        }}
      />,
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
