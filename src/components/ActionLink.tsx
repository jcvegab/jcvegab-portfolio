import { Link, withPrefix } from '../utils';

import type { ActionLinkData } from './ActionLink.types';

type ActionLinkProps = {
  action: ActionLinkData;
};

export default function ActionLink({ action }: ActionLinkProps) {
  const { url, label, new_window: newWindow, no_follow: noFollow } = action;

  const attrs: Record<string, unknown> = {};
  if (newWindow) {
    attrs.target = '_blank';
  }
  if (newWindow || noFollow) {
    attrs.rel = [newWindow ? 'noopener' : '', noFollow ? 'nofollow' : '']
      .filter(Boolean)
      .join(' ');
  }

  return (
    <Link href={withPrefix(url)} {...attrs}>
      {label}
    </Link>
  );
}
