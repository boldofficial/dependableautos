import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Dependable Auto Sports LLC | Quality Used Vehicles in Madison, WI',
  description:
    'Dependable Auto Sports LLC is a licensed used car dealership in Madison, WI offering quality pre-owned vehicles at competitive prices. Visit us at 4290 Hoepker Rd, Madison, WI 53704.',
  keywords: 'used cars, Madison WI, dealership, pre-owned vehicles, Dependable Auto Sports',
  openGraph: {
    title: 'Dependable Auto Sports LLC | Quality Used Vehicles in Madison, WI',
    description:
      'Licensed used car dealership in Madison, WI. Quality pre-owned vehicles at competitive prices.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
