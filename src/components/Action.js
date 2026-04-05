import React from 'react';

import Icon from './Icon';

import { Link, withPrefix, classNames } from '../utils';

export default function Action({ action }) {
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
    <Link href={withPrefix(url)} {...attrs} className={classes}>
      {style === 'icon' ? (
        <React.Fragment>
          <Icon icon={icon} />
          <span className="screen-reader-text">{label}</span>
        </React.Fragment>
      ) : (
        label
      )}
    </Link>
  );
}
