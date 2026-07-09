import { getCars } from '@/lib/cars';
import { SITE_URL } from '@/lib/business';

// Refresh the sitemap periodically so newly listed vehicles get discovered.
export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/inventory`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  let vehicleRoutes = [];
  try {
    const cars = await getCars();
    vehicleRoutes = cars
      // Exclude the mock fallback records (only present when Appwrite is unreachable).
      .filter((c) => c.$id && !String(c.$id).startsWith('mock-'))
      .map((c) => ({
        url: `${SITE_URL}/inventory/${c.$id}`,
        lastModified: c.$updatedAt ? new Date(c.$updatedAt) : now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch {
    // Fall back to static routes only if inventory can't be enumerated.
  }

  return [...staticRoutes, ...vehicleRoutes];
}
