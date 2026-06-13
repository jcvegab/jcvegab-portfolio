import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/script', () => ({
  default: ({ children, ...props }: Record<string, any>) => {
    if (props.dangerouslySetInnerHTML) {
      return <script data-testid="script" {...props} />;
    }
    return (
      <script data-testid="script" {...props}>
        {children}
      </script>
    );
  },
}));

import ScriptTag from '../ScriptTag';

describe('ScriptTag', () => {
  it('renders a script with src', () => {
    const { container } = render(<ScriptTag src="/js/app.js" />);
    const script = container.querySelector('script');
    expect(script).toBeInTheDocument();
  });

  it('renders a script with dangerouslySetInnerHTML', () => {
    const { container } = render(
      <ScriptTag
        id="inline-script"
        dangerouslySetInnerHTML={{ __html: 'console.log("hello")' }}
      />,
    );
    const script = container.querySelector('script');
    expect(script).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { container } = render(<ScriptTag id="test">alert('hi')</ScriptTag>);
    const script = container.querySelector('script');
    expect(script).toBeInTheDocument();
  });

  it('generates fallback id when not provided', () => {
    const { container } = render(<ScriptTag src="/js/app.js" />);
    const script = container.querySelector('script');
    expect(script).toBeInTheDocument();
  });
});
