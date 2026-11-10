import { Body } from '@/components';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import StaticImage from '@/components/StaticImage';

import { htmlToReact, markdownify, withPrefix } from '@/utils';

import type { LayoutPage } from '@/types';
import type { BasePage } from './page.types';

export type PageProps = LayoutPage<BasePage>;

export default function Page({ data, page }: PageProps) {
  const { config } = data;

  const {
    title,
    subtitle,
    image,
    image_alt: imageAlt = '',
    intro,
    experience,
    markdown_content: markdownContent,
  } = page;

  return (
    <Body page={page} config={config}>
      <div className="inner outer">
        <article className="post post-full">
          <header className="post-header inner-sm">
            <h1 className="post-title line-top">{title}</h1>
            {subtitle && (
              <div className="post-subtitle">{htmlToReact(subtitle)}</div>
            )}
          </header>
          {image && (
            <div className="post-image">
              <StaticImage
                src={withPrefix(image)}
                alt={imageAlt}
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
          {(intro || experience?.length || markdownContent) && (
            <div className="post-content inner-sm">
              {intro && <div className="page-intro">{markdownify(intro)}</div>}
              {experience && <ExperienceTimeline experiences={experience} />}
              {markdownContent && markdownify(markdownContent)}
            </div>
          )}
        </article>
      </div>
    </Body>
  );
}
