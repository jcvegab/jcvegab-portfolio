import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import htmlToReact from '../htmlToReact';

describe('htmlToReact', () => {
  it('returns null for empty string', () => {
    expect(htmlToReact('')).toBeNull();
  });

  it('returns null for falsy input', () => {
    expect(htmlToReact(null as any)).toBeNull();
  });

  it('renders simple HTML', () => {
    const el = htmlToReact('<p>Hello</p>') as React.ReactElement;
    const { container } = render(el);
    expect(container.querySelector('p')).toHaveTextContent('Hello');
  });

  it('renders nested HTML', () => {
    const el = htmlToReact(
      '<div><h1>Title</h1><p>Body</p></div>',
    ) as React.ReactElement;
    const { container } = render(el);
    expect(container.querySelector('h1')).toHaveTextContent('Title');
    expect(container.querySelector('p')).toHaveTextContent('Body');
  });

  it('renders multiple elements as fragment', () => {
    const el = htmlToReact(
      '<span>A</span><span>B</span>',
    ) as React.ReactElement;
    const { container } = render(el);
    const spans = container.querySelectorAll('span');
    expect(spans).toHaveLength(2);
    expect(spans[0]).toHaveTextContent('A');
    expect(spans[1]).toHaveTextContent('B');
  });
});
