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
      <script
        id={id}
        type={type}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is intended for dynamic script injection
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    );
  }

  return (
    <script id={id} src={src} type={type} async={async} defer={defer}>
      {children}
    </script>
  );
}
