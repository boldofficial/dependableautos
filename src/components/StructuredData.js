import {
  BUSINESS_NAME,
  PHONE_TEL,
  EMAIL,
  ADDRESS,
  GEO,
  HOURS,
  FACEBOOK_URL,
  SITE_URL,
} from '@/lib/business';

/**
 * Site-wide AutoDealer / LocalBusiness structured data.
 * Powers Google's local pack, knowledge panel, and rich results.
 */
export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': `${SITE_URL}/#dealer`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/logo-light.png`,
    telephone: PHONE_TEL,
    email: EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.zip,
      addressCountry: ADDRESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    openingHoursSpecification: HOURS.filter((h) => !h.closed).map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [FACEBOOK_URL],
    areaServed: {
      '@type': 'City',
      name: 'Madison, Wisconsin',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
