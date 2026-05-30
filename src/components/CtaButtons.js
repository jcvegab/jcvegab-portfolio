import React from 'react';

import Action from './Action';

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
 * @param {{ actions: ActionData[] }} props
 */
export default function CtaButtons({ actions }) {
  return actions.map((action, index) => <Action key={index} action={action} />);
}
