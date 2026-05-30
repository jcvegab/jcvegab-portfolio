import { Metadata } from 'next';
import { Karla } from 'next/font/google';
import '../sass/main.scss';

const karla = Karla({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-karla',
});

export const metadata: Metadata = {
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={karla.variable}>
      <body>{children}</body>
    </html>
  );
}
