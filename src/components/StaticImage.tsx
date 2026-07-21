type StaticImageProps = Omit<
  React.ComponentPropsWithoutRef<'img'>,
  'width' | 'height' | 'src' | 'alt' | 'fill' | 'priority' | 'loading'
> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

export default function StaticImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className,
  style,
  ...rest
}: StaticImageProps) {
  const imgStyle: React.CSSProperties = {
    ...style,
  };

  if (fill) {
    imgStyle.position = 'absolute';
    imgStyle.top = 0;
    imgStyle.left = 0;
    imgStyle.width = '100%';
    imgStyle.height = '100%';
  }

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={imgStyle}
      {...rest}
    />
  );
}
