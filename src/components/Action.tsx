import { Fragment } from 'react';

import Icon from './Icon';

import { classNames, Link, withPrefix } from '../utils';

import type { ActionData } from './Action.types';

type ActionProps = {
  action: ActionData;
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
    <Link href={withPrefix(url)} {...attrs} className={classes}>
      {style === 'icon' ? (
        <Fragment>
          <Icon icon={icon as import('./Icon.types').IconVariant} />
          <span className="screen-reader-text">{label}</span>
        </Fragment>
      ) : (
        label
      )}
    </Link>
  );
}
