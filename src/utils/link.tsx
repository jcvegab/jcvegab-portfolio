import NextLink from 'next/link';

import type React from 'react';

type LinkProps = {
  children: React.ReactNode;
  href: string;
  [key: string]: unknown;
};

export default function Link({ children, href, ...other }: LinkProps) {
  const internal = /^\/(?!\/)/.test(href);
  if (internal) {
    return (
      <NextLink href={href} {...other}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} {...other}>
      {children}
    </a>
  );
}
