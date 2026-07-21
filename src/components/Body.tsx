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
