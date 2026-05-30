import React from 'react';
import NextLink from 'next/link';

type LinkProps = {
  children: React.ReactNode;
  href: string;
  [key: string]: unknown;
};

export default function Link({ children, href, ...other }: LinkProps) {
  // Pass Any internal link to Next.js Link, for anything else, use <a> tag
  const internal = /^\/(?!\/)/.test(href);
  if (internal) {
    return (
      <NextLink href={href}>
        <a {...other}>{children}</a>
      </NextLink>
    );
  }

  return (
    <a href={href} {...other}>
      {children}
    </a>
  );
}
