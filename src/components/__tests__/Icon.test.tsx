import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Icon from '../Icon';

describe('Icon', () => {
  const iconVariants = [
    'dribbble',
    'facebook',
    'github',
    'instagram',
    'linkedin',
    'pinterest',
    'twitter',
    'youtube',
    'vimeo',
  ] as const;

  for (const variant of iconVariants) {
    it(`renders ${variant} icon as an SVG`, () => {
      const { container } = render(<Icon icon={variant} />);
      const svg = container.querySelector('svg.icon');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    });
  }

  it('returns null for unknown icon', () => {
    const { container } = render(<Icon icon={'unknown' as any} />);
    expect(container.innerHTML).toBe('');
  });
});
