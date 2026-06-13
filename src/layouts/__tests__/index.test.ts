import { describe, expect, it } from 'vitest';

import layoutIndex, * as namedExports from '../index';

describe('layouts index', () => {
  it('exports all expected layouts as named exports', () => {
    const expectedExports = [
      'advanced',
      'blog',
      'page',
      'portfolio',
      'post',
      'project',
    ];

    for (const name of expectedExports) {
      expect(namedExports[name]).toBeDefined();
    }
  });

  it('provides a default export object with all layouts', () => {
    const expectedKeys = [
      'advanced',
      'blog',
      'page',
      'portfolio',
      'post',
      'project',
    ];

    for (const key of expectedKeys) {
      expect(layoutIndex[key]).toBeDefined();
    }

    expect(Object.keys(layoutIndex)).toHaveLength(expectedKeys.length);
  });
});
