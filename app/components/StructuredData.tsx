'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'WebSite' | 'Article';
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  priceRange?: string;
  openingHours?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  name = 'Omeru Digital',
  url,
  logo = 'https://omerudigital.com/logo.png',
  description = 'Custom digital solutions for modern businesses through app development, design, and strategic integrations.',
  sameAs = [],
  address,
  geo,
  telephone,
  priceRange,
  openingHours,
  datePublished,
  dateModified,
  author,
}) => {
  const pathname = usePathname();
  const currentUrl = url || `https://omerudigital.com${pathname}`;

  let structuredData = {};

  // Common fields for all types
  structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    url: currentUrl,
    description,
  };

  // Additional fields based on type
  if (type === 'Organization' || type === 'LocalBusiness') {
    structuredData = {
      ...structuredData,
      logo,
      sameAs,
    };

    if (type === 'LocalBusiness') {
      structuredData = {
        ...structuredData,
        address: address ? {
          '@type': 'PostalAddress',
          ...address,
        } : undefined,
        geo: geo ? {
          '@type': 'GeoCoordinates',
          ...geo,
        } : undefined,
        telephone,
        priceRange,
        openingHoursSpecification: openingHours ? openingHours.map(hours => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: hours.split(' ')[0],
          opens: hours.split(' ')[1]?.split('-')[0],
          closes: hours.split(' ')[1]?.split('-')[1],
        })) : undefined,
      };
    }
  } else if (type === 'Article') {
    structuredData = {
      ...structuredData,
      headline: name,
      image: logo,
      datePublished,
      dateModified: dateModified || datePublished,
      author: author ? {
        '@type': 'Person',
        name: author.name,
        url: author.url,
      } : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'Omeru Digital',
        logo: {
          '@type': 'ImageObject',
          url: logo,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl,
      },
    };
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData; 