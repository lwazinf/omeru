import './globals.css';
import { Inter } from 'next/font/google';
import ThemeProvider from './components/ThemeProvider';
import FacebookPixel from './components/FacebookPixel';
import { generateMetadata as baseMetadata } from './lib/metadata';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improves page loading performance
  variable: '--font-inter'
});

// Generate metadata for the layout
export const metadata = baseMetadata({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-[#111111] text-white antialiased`}>
        <ThemeProvider>
          <FacebookPixel />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
