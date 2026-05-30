import '../sass/main.scss';

// This default export is required in a new `pages/_app.js` file.
/**
 * @param {{ Component: React.ComponentType, pageProps: Object }} props
 */
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
