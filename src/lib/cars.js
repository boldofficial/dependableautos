import { databases, DATABASE_ID, CARS_COLLECTION_ID, ID, Query } from './appwrite';

const mockCars = [
  {
    $id: 'mock-1',
    year: 2019,
    make: 'Toyota',
    model: 'Camry',
    trim: 'SE',
    price: 18500,
    mileage: 45000,
    exteriorColor: 'Silver',
    interiorColor: 'Black',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    vin: '1YVABC1234567890',
    description: 'Beautiful, well-maintained Camry. One owner, clean Carfax. Excellent gas mileage and Toyota reliability.',
    status: 'active',
    photoIds: ['demo-camry']
  },
  {
    $id: 'mock-2',
    year: 2021,
    make: 'Ford',
    model: 'F-150',
    trim: 'XLT',
    price: 36000,
    mileage: 28000,
    exteriorColor: 'Black',
    interiorColor: 'Gray',
    transmission: 'Automatic',
    drivetrain: '4WD',
    vin: '1FTFW1E84MKD12345',
    description: 'Like new F-150. Perfect for work or weekend adventures. Tow package included.',
    status: 'active',
    photoIds: ['demo-f150']
  },
  {
    $id: 'mock-3',
    year: 2018,
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    price: 16500,
    mileage: 62000,
    exteriorColor: 'Red',
    interiorColor: 'Black',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    vin: '2HGFC2F58JH123456',
    description: 'Sporty and efficient Civic EX. Includes sunroof, backup camera, and Apple CarPlay.',
    status: 'active',
    photoIds: ['demo-civic']
  }
];

/**
 * Fetch all active car listings, sorted by newest first.
 */
export async function getCars() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [
      Query.equal('status', 'active'),
      Query.orderDesc('$createdAt'),
      Query.limit(100),
    ]);
    return response.documents.map(doc => ({ ...doc, photoIds: doc.images || [] }));
  } catch (error) {
    console.error('Error fetching cars, falling back to mock data:', error);
    return mockCars;
  }
}

/**
 * Fetch all car listings (active + sold) for admin.
 */
export async function getAllCars() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [
      Query.orderDesc('$createdAt'),
      Query.limit(100),
    ]);
    return response.documents.map(doc => ({ ...doc, photoIds: doc.images || [] }));
  } catch (error) {
    console.error('Error fetching all cars, falling back to mock data:', error);
    return mockCars;
  }
}

/**
 * Fetch a single car by document ID.
 */
export async function getCar(id) {
  try {
    const doc = await databases.getDocument(DATABASE_ID, CARS_COLLECTION_ID, id);
    return { ...doc, photoIds: doc.images || [] };
  } catch (error) {
    console.error('Error fetching car, falling back to mock data:', error);
    return mockCars.find(c => c.$id === id) || null;
  }
}

/**
 * Create a new car listing.
 */
export async function createCar(data) {
  return await databases.createDocument(DATABASE_ID, CARS_COLLECTION_ID, ID.unique(), {
    year: parseInt(data.year),
    make: data.make,
    model: data.model,
    trim: data.trim || '',
    price: parseInt(data.price),
    mileage: parseInt(data.mileage),
    exteriorColor: data.exteriorColor,
    interiorColor: data.interiorColor || '',
    transmission: data.transmission,
    drivetrain: data.drivetrain,
    vin: data.vin || '',
    description: data.description || '',
    status: data.status || 'active',
    images: data.photoIds || [],
  });
}

/**
 * Update an existing car listing.
 */
export async function updateCar(id, data) {
  const updateData = {};
  if (data.year !== undefined) updateData.year = parseInt(data.year);
  if (data.make !== undefined) updateData.make = data.make;
  if (data.model !== undefined) updateData.model = data.model;
  if (data.trim !== undefined) updateData.trim = data.trim;
  if (data.price !== undefined) updateData.price = parseInt(data.price);
  if (data.mileage !== undefined) updateData.mileage = parseInt(data.mileage);
  if (data.exteriorColor !== undefined) updateData.exteriorColor = data.exteriorColor;
  if (data.interiorColor !== undefined) updateData.interiorColor = data.interiorColor;
  if (data.transmission !== undefined) updateData.transmission = data.transmission;
  if (data.drivetrain !== undefined) updateData.drivetrain = data.drivetrain;
  if (data.vin !== undefined) updateData.vin = data.vin;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.photoIds !== undefined) updateData.images = data.photoIds;

  return await databases.updateDocument(DATABASE_ID, CARS_COLLECTION_ID, id, updateData);
}

/**
 * Delete a car listing.
 */
export async function deleteCar(id) {
  return await databases.deleteDocument(DATABASE_ID, CARS_COLLECTION_ID, id);
}

/**
 * Get featured cars (latest active, limited count).
 */
export async function getFeaturedCars(limit = 6) {
  try {
    const response = await databases.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [
      Query.equal('status', 'active'),
      Query.orderDesc('$createdAt'),
      Query.limit(limit),
    ]);
    return response.documents.map(doc => ({ ...doc, photoIds: doc.images || [] }));
  } catch (error) {
    console.error('Error fetching featured cars, falling back to mock data:', error);
    return mockCars.slice(0, limit);
  }
}
