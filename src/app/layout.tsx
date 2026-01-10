import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import portfolioData from '@/data/portfolio.json';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: portfolioData.meta.title,
  description: portfolioData.meta.description,
  keywords: portfolioData.meta.keywords,
  authors: [{ name: portfolioData.meta.author }],
  icons: {
    icon: '/images/profile.jpg',
  },
  metadataBase: new URL('https://krishna-vijay-g.github.io'),
  openGraph: {
    title: portfolioData.meta.title,
    description: portfolioData.meta.description,
    type: 'website',
    images: [
      {
        url: 'https://krishna-vijay-g.github.io/images/OpenGraph.png',
        secureUrl: 'https://krishna-vijay-g.github.io/images/OG.png',
        alt: 'OpenGraph Thumbnail',
      },
    ],
  },
};

export const viewport = {
  themeColor: '#f43f5e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeProvider>
          <div className="mesh-gradient" />
          <div className="w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
