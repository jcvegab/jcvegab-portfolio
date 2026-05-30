export type ScriptTagProps = {
  isHydrating?: boolean;
  async?: boolean | number;
  crossOrigin?: string;
  defer?: boolean;
  integrity?: string;
  nonce?: string;
  src?: string;
  text?: string;
  type?: string;
  dangerouslySetInnerHTML?: { __html?: string };
  onError?: (event: Event) => void;
  onLoad?: (event: Event) => void;
};
