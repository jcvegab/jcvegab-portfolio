import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CtaButtons from '../CtaButtons';

vi.mock('../Action', () => ({
  default: ({ action }: Record<string, any>) => (
    <a href={action.url}>{action.label}</a>
  ),
}));

describe('CtaButtons', () => {
  it('renders multiple action buttons', () => {
    const actions = [
      { label: 'Action 1', url: '/a1' },
      { label: 'Action 2', url: '/a2' },
    ];
    render(<CtaButtons actions={actions} />);
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  it('renders nothing for empty actions', () => {
    const { container } = render(<CtaButtons actions={[]} />);
    expect(container.innerHTML).toBe('');
  });
});
