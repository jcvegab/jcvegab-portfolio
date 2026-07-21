// withPrefix reads config.json at module level via static import
// The real config has path_prefix: "/". We test the function as-is.
import withPrefix from '../withPrefix';

describe('withPrefix', () => {
  it('returns empty string for empty input', () => {
    expect(withPrefix('')).toBe('');
  });

  it('returns null for nullish input', () => {
    expect(withPrefix(null as any)).toBeNull();
  });

  it('returns anchor links as-is', () => {
    expect(withPrefix('#section')).toBe('#section');
  });

  it('returns http links as-is', () => {
    expect(withPrefix('http://example.com')).toBe('http://example.com');
  });

  it('returns https links as-is', () => {
    expect(withPrefix('https://example.com')).toBe('https://example.com');
  });

  it('prepends the configured path prefix to relative URLs', () => {
    // With path_prefix "/" in config, output is the URL itself with clean slashes
    const result = withPrefix('/about');
    expect(result).toBe('/about');
  });
});
