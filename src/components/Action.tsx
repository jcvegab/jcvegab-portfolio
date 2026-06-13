import { Fragment } from 'react';

import { classNames, Link, withPrefix } from '@/utils';

import Icon from './Icon';

import type { ActionItem } from './Action.types';

type ActionProps = {
  action: ActionItem;
};

export default function Action({ action }: ActionProps) {
  const {
    url,
    label,
    style = 'link',
    icon = 'dribbble',
    new_window: newWindow,
    no_follow: noFollow,
  } = action;

  const classes = classNames({
    button: style === 'button',
    'button-icon': style === 'icon',
  });

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
    <Link href={withPrefix(url)} {...attrs} className={classes}>
      {style === 'icon' ? (
        <Fragment>
          <Icon icon={icon} />
          <span className="screen-reader-text">{label}</span>
        </Fragment>
      ) : (
        label
      )}
    </Link>
  );
}
