import { databases, DATABASE_ID, CARS_COLLECTION_ID, ID, Query } from './appwrite';

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
    return response.documents;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
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
    return response.documents;
  } catch (error) {
    console.error('Error fetching all cars:', error);
    return [];
  }
}

/**
 * Fetch a single car by document ID.
 */
export async function getCar(id) {
  try {
    return await databases.getDocument(DATABASE_ID, CARS_COLLECTION_ID, id);
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
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
    photoIds: data.photoIds || [],
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
  if (data.photoIds !== undefined) updateData.photoIds = data.photoIds;

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
    return response.documents;
  } catch (error) {
    console.error('Error fetching featured cars:', error);
    return [];
  }
}
