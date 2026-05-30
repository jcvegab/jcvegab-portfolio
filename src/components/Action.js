import React from 'react';

import Icon from './Icon';

import { Link, withPrefix, classNames } from '../utils';

/**
 * @typedef {Object} ActionData
 * @property {string} url
 * @property {string} label
 * @property {"link"|"button"|"icon"} [style]
 * @property {string} [icon]
 * @property {boolean} [new_window]
 * @property {boolean} [no_follow]
 */

/**
 * @param {{ action: ActionData }} props
 */
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
