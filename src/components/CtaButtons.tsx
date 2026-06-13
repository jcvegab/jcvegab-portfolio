import Action from './Action';

import type { ActionItem } from './Action.types';

export type CtaButtonsProps = {
  actions: ActionItem[];
};

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
