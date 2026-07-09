/**
 * Single source of truth for business / NAP (Name, Address, Phone) data.
 *
 * Everything user-facing — components, metadata, and structured data — should
 * import from here so contact details can never drift out of sync again.
 * Consistent NAP data is also a local-SEO ranking factor.
 */

export const BUSINESS_NAME = 'Dependable Auto Sports LLC';
export const BUSINESS_SHORT = 'Dependable Auto Sports';
export const DEALER_LICENSE = 'MV 5126';

export const PHONE_DISPLAY = '(608) 217-4010';
export const PHONE_TEL = '+16082174010';
export const EMAIL = 'dependableautosportsllc@yahoo.com';
export const FACEBOOK_URL = 'https://www.facebook.com/DependableAutoSports/';

export const ADDRESS = {
  street: '4290 Hoepker Rd',
  city: 'Madison',
  state: 'WI',
  zip: '53704',
  country: 'US',
};

/** Single-line address for inline display. */
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.zip}`;

/** Coordinates taken from the verified Google Maps embed on the contact page. */
export const GEO = { lat: 43.1537233, lng: -89.2965684 };

/**
 * Canonical business hours. NOTE: the site previously disagreed about Saturday
 * hours (homepage/footer said "Mon–Sat 9–6"; contact page said "Sat 10–4").
 * Standardized on the more specific contact-page version — please confirm.
 *
 * `open`/`close` are 24h "HH:MM" for schema.org openingHoursSpecification.
 */
export const HOURS = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], label: 'Monday – Friday', display: '9:00 AM – 6:00 PM', open: '09:00', close: '18:00' },
  { days: ['Saturday'], label: 'Saturday', display: '10:00 AM – 4:00 PM', open: '10:00', close: '16:00' },
  { days: ['Sunday'], label: 'Sunday', display: 'Closed', closed: true },
];

/**
 * Public site origin, used for canonical URLs, sitemap, and OG image
 * resolution. Set NEXT_PUBLIC_SITE_URL in the host env to the real domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dependableautosports.com').replace(/\/$/, '');
