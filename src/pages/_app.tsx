import type { AppProps } from 'next/app';

import '../sass/main.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
