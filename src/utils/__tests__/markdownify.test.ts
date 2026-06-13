vi.mock('../htmlToReact', () => ({
  default: vi.fn((html: string) => `reactified:${html}`),
}));

vi.mock('marked', () => ({
  marked: {
    parse: vi.fn((md: string) => `<p>${md}</p>`),
  },
}));

import markdownify from '../markdownify';

describe('markdownify', () => {
  it('returns null for empty input', () => {
    expect(markdownify('')).toBeNull();
  });

  it('returns null for falsy input', () => {
    expect(markdownify(null as any)).toBeNull();
  });

  it('converts markdown string to React elements', () => {
    const result = markdownify('Hello **world**');
    expect(result).toBe('reactified:<p>Hello **world**</p>');
  });

  it('passes through HTML from markdown', () => {
    const result = markdownify('# Title\n\nContent');
    expect(result).toBe('reactified:<p># Title\n\nContent</p>');
  });
});
