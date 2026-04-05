import React, { useEffect, useRef } from 'react';
import Router from 'next/router';
import _ from 'lodash';

import { Link, withPrefix, classNames, getPageUrl } from '../utils';
import Action from './Action';

export default function Header({ page, config }) {
  const { header } = config;

  const {
    logo_img: logo,
    logo_img_alt: logoAlt = '',
    title,
    has_nav: hasNav,
    nav_links: navLinks,
  } = header;

  const pageUrl = _.trim(getPageUrl(page), '/');

  const menuOpenRef = useRef(null);

  useEffect(() => {
    const handleRouteChange = () => {
      document.body.classList.remove('menu--opened');
    };

    const handleWindowResize = () => {
      const menuOpenElm = _.get(menuOpenRef, 'current.offsetParent');
      if (menuOpenElm === null) {
        document.body.classList.remove('menu--opened');
      }
    };

    window.addEventListener('resize', handleWindowResize, true);
    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('resize', handleWindowResize, true);
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const handleMenuToggle = (event) => {
    event.preventDefault();
    document.body.classList.toggle('menu--opened');
  };

  const renderNavLinks = (navLinks, pageUrl) => {
    return (
      <React.Fragment>
        <button
          id="menu-open"
          className="menu-toggle"
          ref={menuOpenRef}
          onClick={handleMenuToggle}
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
            >
              <span className="screen-reader-text">Close Menu</span>
              <span className="icon-close" aria-hidden="true" />
            </button>
            <ul className="menu">
              {_.map(navLinks, (action, index) => {
                const actionUrl = _.trim(_.get(action, 'url'), '/');
                const actionStyle = _.get(action, 'style', 'link');
                return (
                  <li
                    key={index}
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
      </React.Fragment>
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
                  <img src={withPrefix(logo)} alt={logoAlt} />
                </Link>
              </p>
            ) : (
              <p className="site-title">
                <Link href={withPrefix('/')}>{title}</Link>
              </p>
            )}
          </div>
          {hasNav && !_.isEmpty(navLinks) && renderNavLinks(navLinks, pageUrl)}
        </div>
      </div>
    </header>
  );
}
