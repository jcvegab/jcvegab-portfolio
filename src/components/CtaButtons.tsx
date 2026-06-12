import Action from './Action';

import type { CtaButtonsProps } from './CtaButtons.types';

export default function CtaButtons({ actions }: CtaButtonsProps) {
  return (
    <>
      {actions.map((action, index) => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: Actions may not have unique identifiers
          <Action key={`${action.label}-${index}`} action={action} />
        );
      })}
    </>
  );
}
