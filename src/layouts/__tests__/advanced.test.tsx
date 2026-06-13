import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AdvancedLayout from '../advanced';

vi.mock('@/components', () => {
  const MockComponent = ({ section }: Record<string, any>) => (
    <div data-testid={`section-${section.type}`}>{section.title}</div>
  );
  const componentMap: Record<string, any> = {
    SectionHero: MockComponent,
    SectionContent: MockComponent,
    SectionGrid: MockComponent,
    SectionForm: MockComponent,
    SectionPortfolio: MockComponent,
    SectionPosts: MockComponent,
    SectionTestimonials: MockComponent,
  };
  return {
    Body: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="body">{children}</div>
    ),
    ...componentMap,
    default: componentMap,
  };
});

vi.mock('@/utils', () => ({
  camelCase: (str: string) => {
    if (!str) throw new Error('Cannot process undefined type');
    return str.replace(/_([a-z])/g, (_: string, c: string) => c.toUpperCase());
  },
  getPageUrl: (page: any) => page.__metadata.urlPath,
  upperFirst: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
}));

describe('Advanced layout', () => {
  const baseProps = {
    data: {
      config: { title: 'My Site', header: {}, footer: {} },
    },
    page: {
      title: 'Home',
      hideTitle: false,
      markdown_content: '',
      sections: [
        { section_id: 'hero-1', type: 'section_hero', title: 'Welcome' },
        { section_id: 'content-1', type: 'section_content', title: 'About' },
      ],
      __metadata: { urlPath: '/', modelName: 'advanced' as const },
    },
  };

  it('renders the page title', () => {
    render(<AdvancedLayout {...(baseProps as any)} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('hides title when hideTitle is true', () => {
    render(
      <AdvancedLayout
        {...({
          ...baseProps,
          page: { ...baseProps.page, hideTitle: true },
        } as any)}
      />,
    );
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('renders all sections', () => {
    render(<AdvancedLayout {...(baseProps as any)} />);
    expect(screen.getByTestId('section-section_hero')).toBeInTheDocument();
    expect(screen.getByTestId('section-section_content')).toBeInTheDocument();
  });

  it('throws error for section without type', () => {
    const invalidProps = {
      ...baseProps,
      page: {
        ...baseProps.page,
        sections: [{ section_id: 'bad' } as any],
      },
    };
    expect(() =>
      render(<AdvancedLayout {...(invalidProps as any)} />),
    ).toThrow();
  });

  it('throws error for unknown section type', () => {
    const invalidProps = {
      ...baseProps,
      page: {
        ...baseProps.page,
        sections: [{ section_id: 'bad', type: 'unknown_type' }],
      },
    };
    expect(() => render(<AdvancedLayout {...(invalidProps as any)} />)).toThrow(
      'no component matching',
    );
  });

  it('passes posts and projects to section components', () => {
    const props = {
      ...baseProps,
      posts: [
        {
          title: 'Post 1',
          __metadata: {
            urlPath: '/post1',
            modelName: 'post' as const,
          },
        },
      ],
      projects: [
        {
          title: 'Project 1',
          __metadata: {
            urlPath: '/proj1',
            modelName: 'project' as const,
          },
        },
      ],
    };
    render(<AdvancedLayout {...(props as any)} />);
    expect(screen.getByTestId('section-section_hero')).toBeInTheDocument();
  });
});
