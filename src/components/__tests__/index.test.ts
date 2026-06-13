import { describe, expect, it } from 'vitest';

import componentIndex, * as namedExports from '../index';

describe('components index', () => {
  it('exports all expected components as named exports', () => {
    const expectedExports = [
      'Action',
      'ActionLink',
      'Body',
      'CtaButtons',
      'Footer',
      'FormField',
      'Header',
      'Icon',
      'SectionContent',
      'SectionForm',
      'SectionGrid',
      'SectionHero',
      'SectionPortfolio',
      'SectionPosts',
      'SectionTestimonials',
    ];

    for (const name of expectedExports) {
      expect(namedExports[name]).toBeDefined();
    }
  });

  it('provides a default export object with all components', () => {
    const expectedKeys = [
      'Action',
      'ActionLink',
      'CtaButtons',
      'Footer',
      'FormField',
      'Header',
      'Body',
      'Icon',
      'SectionContent',
      'SectionForm',
      'SectionGrid',
      'SectionHero',
      'SectionPortfolio',
      'SectionPosts',
      'SectionTestimonials',
    ];

    for (const key of expectedKeys) {
      expect(componentIndex[key]).toBeDefined();
    }

    expect(Object.keys(componentIndex)).toHaveLength(expectedKeys.length);
  });
});
