import { Link, withPrefix } from '@/utils';

import type { ActionLinkItem } from './ActionLink.types';

type ActionLinkProps = {
  action: ActionLinkItem;
};

export default function ActionLink({ action }: ActionLinkProps) {
  const { url, label, new_window: newWindow, no_follow: noFollow } = action;

  const attrs: React.ComponentPropsWithoutRef<'a'> = {};
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
