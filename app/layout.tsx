import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Omeru Digital - Modern Business Solutions',
  description: 'Custom digital solutions for modern businesses through app development, design, and strategic integrations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#111111] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
