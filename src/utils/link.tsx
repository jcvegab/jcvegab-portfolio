import NextLink from 'next/link';

type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  children: React.ReactNode;
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
