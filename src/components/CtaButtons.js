import React from 'react';

import Action from './Action';

export default function CtaButtons({ actions }) {
  return actions.map((action, index) => <Action key={index} action={action} />);
}
