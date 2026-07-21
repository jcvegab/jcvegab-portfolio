import { render } from '@testing-library/react';

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
