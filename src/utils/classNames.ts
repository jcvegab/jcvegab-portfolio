import clsx from 'clsx';

// A simple wrapper around classNames to return null, if no classes were generated
// Otherwise, original classNames returns empty string which causes class="" to be generated
export default function classNames(
  ...args: Array<string | number | boolean | Record<string, unknown>>
) {
  return clsx(...args) || undefined;
}
