import Action from './Action';

import type { CtaButtonsProps } from './CtaButtons.types';

export default function CtaButtons({ actions }: CtaButtonsProps) {
  return (
    <>
      {actions.map((action, index) => (
        <Action key={index} action={action} />
      ))}
    </>
  );
}
