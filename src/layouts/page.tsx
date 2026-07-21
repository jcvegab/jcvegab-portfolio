import { Body } from '@/components';
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
          {markdownContent && (
            <div className="post-content inner-sm">
              {markdownify(markdownContent)}
            </div>
          )}
        </article>
      </div>
    </Body>
  );
}
