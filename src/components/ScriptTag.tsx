import Script from 'next/script';

import type { ScriptTagProps } from './ScriptTag.types';

export default function ScriptTag({
  src,
  async,
  defer,
  dangerouslySetInnerHTML,
  type,
  id,
  children,
}: ScriptTagProps) {
  if (dangerouslySetInnerHTML) {
    return (
      <Script
        id={id || Math.random().toString()}
        type={type}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        strategy={
          defer
            ? 'lazyOnload'
            : async
              ? 'afterInteractive'
              : 'beforeInteractive'
        }
      />
    );
  }

  return (
    <Script
      id={id || Math.random().toString()}
      src={src}
      type={type}
      strategy={
        defer ? 'lazyOnload' : async ? 'afterInteractive' : 'beforeInteractive'
      }
    >
      {children}
    </Script>
  );
}
