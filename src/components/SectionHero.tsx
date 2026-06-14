import Image from 'next/image';

import { markdownify } from '@/utils';

import CtaButtons from './CtaButtons';

import type { SectionHeroItem } from './SectionHero.types';

export type SectionHeroProps = {
  section: SectionHeroItem;
};

export default function SectionHero({ section }: SectionHeroProps) {
  const {
    section_id: sectionId,
    title,
    avatar,
    avatar_alt,
    content,
    actions = [],
  } = section;

  return (
    <section id={sectionId} className="block block-hero outer avatar-hero">
      <Image src={avatar} alt={avatar_alt} width={160} height={160} priority />
      <div className="inner">
        {title && (
          <div className="block-header inner-sm">
            <h1 className="block-title">{title}</h1>
          </div>
        )}
        {content && (
          <div className="block-content inner-sm">{markdownify(content)}</div>
        )}
        {actions.length > 0 && (
          <div className="block-buttons inner-sm">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    </section>
  );
}
