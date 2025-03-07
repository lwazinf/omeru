import { Metadata } from 'next';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  pathname?: string;
};

const baseUrl = 'https://omerudigital.com';

export function generateMetadata({
  title = 'Omeru Digital - Modern Business Solutions',
  description = 'Custom digital solutions for modern businesses through app development, design, and strategic integrations.',
  keywords = 'digital agency, app development, web design, business automation, digital transformation',
  image = '/og-image.jpg',
  type = 'website',
  pathname = '/',
}: MetadataProps): Metadata {
  const url = `${baseUrl}${pathname}`;
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Omeru Digital Team' }],
    robots: 'index, follow',
    generator: 'Next.js',
    applicationName: 'Omeru Digital',
    referrer: 'origin-when-cross-origin',
    creator: 'Omeru Digital',
    publisher: 'Omeru Digital',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Omeru Digital',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@omerudigital',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
        },
      ],
    },
    manifest: '/site.webmanifest',
    verification: {
      google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add your verification code
      yandex: 'YOUR_YANDEX_VERIFICATION_CODE', // If you need Yandex verification
      yahoo: 'YOUR_YAHOO_VERIFICATION_CODE', // If you need Yahoo verification
      other: {
        'facebook-domain-verification': 'YOUR_FACEBOOK_VERIFICATION_CODE',
      }
    },
  };
} 