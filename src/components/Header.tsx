'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef } from 'react';

import {
  classNames,
  get,
  getPageUrl,
  Link,
  map,
  trim,
  withPrefix,
} from '@/utils';

import Action from './Action';

import type { Config, Page } from '@/types';
import type { ActionItem } from './Action.types';

export type HeaderProps = {
  page: Page;
  config: Config;
};

export default function Header({ page, config }: HeaderProps) {
  const { header } = config;

  const {
    logo_img: logo,
    logo_img_alt: logoAlt = '',
    title,
    has_nav: hasNav = false,
    nav_links: navLinks = [],
  } = header;

  const pageUrl = trim(getPageUrl(page), '/');

  const menuOpenRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pathname; // This is a safe way to trick linter that pathname is used in useEffect without side effects
    document.body.classList.remove('menu--opened');
  }, [pathname]);

  useEffect(() => {
    const handleWindowResize = (_event: UIEvent) => {
      const menuOpenElm = get(menuOpenRef, 'current.offsetParent');
      if (menuOpenElm === null) {
        document.body.classList.remove('menu--opened');
      }
    };

    window.addEventListener('resize', handleWindowResize, true);

    return () => {
      window.removeEventListener('resize', handleWindowResize, true);
    };
  }, []);

  const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.body.classList.toggle('menu--opened');
  };

  const renderNavLinks = (navLinks: ActionItem[], pageUrl: string) => {
    return (
      <Fragment>
        <button
          id="menu-open"
          className="menu-toggle"
          ref={menuOpenRef}
          onClick={handleMenuToggle}
          type="button"
        >
          <span className="screen-reader-text">Open Menu</span>
          <span className="icon-menu" aria-hidden="true" />
        </button>
        <nav
          id="main-navigation"
          className="site-navigation"
          aria-label="Main Navigation"
        >
          <div className="site-nav-inside">
            <button
              id="menu-close"
              className="menu-toggle"
              onClick={handleMenuToggle}
              type="button"
            >
              <span className="screen-reader-text">Close Menu</span>
              <span className="icon-close" aria-hidden="true" />
            </button>
            <ul className="menu">
              {map(navLinks, (action, index) => {
                const actionUrl = trim(get(action, 'url'), '/');
                const actionStyle = get(action, 'style', 'link');
                return (
                  <li
                    key={`${actionUrl}-${index}`}
                    className={classNames('menu-item', {
                      'current-menu-item': pageUrl === actionUrl,
                      'menu-button': actionStyle !== 'link',
                    })}
                  >
                    <Action action={action} />
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  };

  return (
    <header id="masthead" className="site-header outer">
      <div className="inner">
        <div className="site-header-inside">
          <div className="site-branding">
            {logo ? (
              <p className="site-logo">
                <Link href={withPrefix('/')}>
                  <Image
                    src={withPrefix(logo)}
                    alt={logoAlt}
                    width={200}
                    height={40}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </Link>
              </p>
            ) : (
              <p className="site-title">
                <Link href={withPrefix('/')}>{title}</Link>
              </p>
            )}
          </div>
          {hasNav && navLinks.length > 0 && renderNavLinks(navLinks, pageUrl)}
        </div>
      </div>
    </header>
  );
}
