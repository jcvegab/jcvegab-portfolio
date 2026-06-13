import Script from 'next/script';

export type ScriptTagProps = Pick<
  React.ComponentPropsWithoutRef<'script'>,
  | 'src'
  | 'async'
  | 'defer'
  | 'type'
  | 'id'
  | 'dangerouslySetInnerHTML'
  | 'children'
>;

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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is intended for dynamic script injection
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
    // biome-ignore lint/correctness/useInlineScriptId: Handled dynamically below
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
