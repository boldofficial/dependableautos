import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrganizationSchema from '@/components/StructuredData';
import { BUSINESS_NAME, ADDRESS_LINE, SITE_URL } from '@/lib/business';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const DEFAULT_TITLE = 'Used Cars for Sale in Madison, WI | Dependable Auto Sports LLC';
const DEFAULT_DESCRIPTION =
  `Shop quality pre-owned cars, trucks, and SUVs at ${BUSINESS_NAME}, a licensed dealer in Madison, WI. Fair, transparent pricing. Visit us at ${ADDRESS_LINE} or call (608) 217-4010.`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Dependable Auto Sports LLC',
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: BUSINESS_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <OrganizationSchema />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
