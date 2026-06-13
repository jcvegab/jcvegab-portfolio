import { render, screen } from '@testing-library/react';

vi.mock('next/font/google', () => ({
  Karla: () => ({ variable: '--font-karla-mocked' }),
}));

import Layout from '../layout';

import type { Metadata } from 'next';

describe('root layout', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children', () => {
    render(
      <Layout>
        <p>test child</p>
      </Layout>,
    );
    expect(screen.getByText('test child')).toBeInTheDocument();
  });
});

describe('metadata', () => {
  it('has correct icon config', async () => {
    const { metadata } = await import('../layout');
    expect(metadata).toBeDefined();
    const meta = metadata as Metadata;
    expect(meta.icons).toEqual({
      icon: '/images/favicon.png',
      shortcut: '/images/favicon.png',
      apple: '/images/favicon.png',
    });
  });
});
