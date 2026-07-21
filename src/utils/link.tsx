type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  children: React.ReactNode;
};

export default function Link({ children, href, ...other }: LinkProps) {
  return (
    <a href={href} {...other}>
      {children}
    </a>
  );
}
