import { render, screen } from '@testing-library/react';

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

  it('renders single action', () => {
    const actions = [{ label: 'Single', url: '/single' }];
    render(<CtaButtons actions={actions} />);
    expect(screen.getByText('Single')).toBeInTheDocument();
  });

  it('renders actions with external urls', () => {
    const actions = [
      { label: 'External', url: 'https://example.com' },
      { label: 'Internal', url: '/internal' },
    ];
    render(<CtaButtons actions={actions} />);
    expect(screen.getByText('External')).toBeInTheDocument();
    expect(screen.getByText('Internal')).toBeInTheDocument();
  });

  it('renders actions in correct order', () => {
    const actions = [
      { label: 'First', url: '/first' },
      { label: 'Second', url: '/second' },
      { label: 'Third', url: '/third' },
    ];
    render(<CtaButtons actions={actions} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('First');
    expect(links[1]).toHaveTextContent('Second');
    expect(links[2]).toHaveTextContent('Third');
  });
});
