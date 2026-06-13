import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SectionContent from '../SectionContent';

vi.mock('@/utils', () => ({
  htmlToReact: (html: string) => html,
  markdownify: (md: string) => md,
  withPrefix: (url: string) => `/prefix${url}`,
}));

describe('SectionContent', () => {
  const baseSection = {
    section_id: 'content-1',
    title: 'About Me',
    subtitle: 'A short bio',
    image: '/images/me.jpg',
    image_alt: 'My photo',
    content: 'Hello **world**',
  };

  it('renders the section with title and subtitle', () => {
    render(<SectionContent section={baseSection} />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('A short bio')).toBeInTheDocument();
  });

  it('renders the image with prefix', () => {
    render(<SectionContent section={baseSection} />);
    const img = screen.getByAltText('My photo');
    expect(img).toHaveAttribute('src', '/prefix/images/me.jpg');
  });

  it('renders content', () => {
    render(<SectionContent section={baseSection} />);
    expect(screen.getByText('Hello **world**')).toBeInTheDocument();
  });

  it('renders without optional fields', () => {
    render(
      <SectionContent
        section={{
          section_id: 'minimal',
          title: '',
          subtitle: '',
          image: '',
          image_alt: '',
          content: '',
        }}
      />,
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
