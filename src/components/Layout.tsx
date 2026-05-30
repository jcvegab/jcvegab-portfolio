import { useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import noframe from 'reframe.js/dist/noframe';

import Header from './Header';
import Footer from './Footer';

import { get, isEmpty, trim, withPrefix, classNames } from '../utils';

import type { LayoutProps, LayoutSeo } from './Layout.types';

export default function Body({ children, config, page }: LayoutProps) {
  const {
    title: configTitle,
    color_scheme: colorScheme = 'light',
    accent_color: accentColor = 'pink',
    favicon,
    domain: configDomain = '',
  } = config;

  const { title: pageTitle, seo } = page;

  const {
    title: seoTitle,
    description: seoDescription = '',
    // robots: seoRobots = [],
    // extra: seoExtra = [],
  } = seo;

  const handleVideoEmbeds = () => {
    const videoEmbeds = [
      'iframe[src*="youtube.com"]',
      'iframe[src*="vimeo.com"]',
    ];
    noframe(videoEmbeds.join(','), '.inner-sm');
  };

  useEffect(() => {
    handleVideoEmbeds();
  }, [children]);

  const domain = trim(configDomain, '/');
  const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
  const seoRobots = get(seo, 'robots', []).join(',');

  const seoExtra = get(seo, 'extra', []).map(
    (meta: LayoutSeo['extra'][number], index: number) => {
      const keyName = get(meta, 'keyName', 'name');
      const name = get(meta, 'name');
      if (!name) {
        return null;
      }
      const nameAttr = { [keyName]: name };
      const relativeUrl = get(meta, 'relativeUrl');
      let value = get(meta, 'value');
      if (!value) {
        return null;
      }
      if (relativeUrl) {
        if (!domain) {
          return null;
        }
        value = domain + withPrefix(value);
      }
      return <meta key={index} {...nameAttr} content={value} />;
    },
  );

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <meta name="description" content={seoDescription} />
        {!isEmpty(seoRobots) && <meta name="robots" content={seoRobots} />}
        {seoExtra}
        {favicon && <link rel="icon" href={withPrefix(favicon)} />}
        <body
          className={classNames(
            `palette-${colorScheme}`,
            `accent-${accentColor}`,
          )}
        />
      </Helmet>
      <div id="page" className="site">
        <Header page={page} config={config} />
        <main id="content" className="site-content">
          {children}
        </main>
        <Footer config={config} />
      </div>
    </Fragment>
  );
}
