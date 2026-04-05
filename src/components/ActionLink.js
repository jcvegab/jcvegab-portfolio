import React from 'react';

import { Link, withPrefix } from '../utils';

export default function ActionLink({ action }) {
  const { url, label, new_window: newWindow, no_follow: noFollow } = action;

  const attrs = {};
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
