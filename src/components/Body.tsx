'use client';

import { useEffect } from 'react';
import noframe from 'reframe.js/dist/noframe';

import { classNames } from '@/utils';

import Footer from './Footer';
import Header from './Header';

import type { Config, Page } from '@/types';

export type BodyProps = {
  children: React.ReactNode;
  config: Config;
  page: Page;
};

export default function Body({ children, config, page }: BodyProps) {
  const {
    color_scheme: colorScheme = 'light',
    accent_color: accentColor = 'pink',
  } = config;

  useEffect(() => {
    const handleVideoEmbeds = () => {
      const videoEmbeds = [
        'iframe[src*="youtube.com"]',
        'iframe[src*="vimeo.com"]',
      ];
      noframe(videoEmbeds.join(','), '.inner-sm');
    };
    handleVideoEmbeds();
  }, []);

  return (
    <div
      id="page"
      className={classNames(
        'site',
        `palette-${colorScheme}`,
        `accent-${accentColor}`,
      )}
    >
      <Header page={page} config={config} />
      <main id="content" className="site-content">
        {children}
      </main>
      <Footer config={config} />
    </div>
  );
}
