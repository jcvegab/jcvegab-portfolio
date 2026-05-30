export type ScriptTagProps = {
  src?: string;
  async?: boolean;
  defer?: boolean;
  type?: string;
  id?: string;
  dangerouslySetInnerHTML?: { __html: string };
  children?: React.ReactNode;
};
