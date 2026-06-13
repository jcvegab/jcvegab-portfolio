import classNames from '../classNames';

describe('classNames', () => {
  it('returns null for no arguments', () => {
    expect(classNames()).toBeNull();
  });

  it('returns null for all falsy values', () => {
    expect(classNames(false, null, undefined, 0, '')).toBeNull();
  });

  it('joins truthy string arguments', () => {
    const result = classNames('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles record arguments', () => {
    const result = classNames('foo', { bar: true, baz: false });
    expect(result).toBe('foo bar');
  });

  it('handles numeric values', () => {
    const result = classNames(1, 2);
    expect(result).toBe('1 2');
  });

  it('returns null if all records are false', () => {
    const result = classNames({ foo: false, bar: false });
    expect(result).toBeNull();
  });

  it('combines strings and objects', () => {
    const result = classNames(
      'base',
      { active: true, disabled: false },
      'extra',
    );
    expect(result).toBe('base active extra');
  });

  it('ignores falsy mixed values', () => {
    const result = classNames('a', false, 'b', undefined, null, 'c');
    expect(result).toBe('a b c');
  });
});
