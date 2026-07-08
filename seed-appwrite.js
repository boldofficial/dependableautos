const { Client, Databases, Storage, ID } = require('node-appwrite');
const fs = require('fs');

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6a4e79120010d087456d')
  .setKey('standard_57cff2f1f01badd2f82cd9db7a1ab911906ea72d03ffdbd66825e76f1d9bcb01571d0ff3c321c543b80a016dc0cfae07ceafb8d438c2a0ac341896aa8ba94c6b9edc9e2c26403c972137cabe7d9f27b64fae164193482f5c062dc40112ede751c6e2d814ce171bc140ded119ab0ba926cfa7b2e6eedc83a039b6b4291811ce6a');

const databases = new Databases(client);

const DB_ID = '6a4e7dda001361a156aa';
const CARS_COLLECTION_ID = 'cars';

const demoCars = [
  {
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
    engine: '2.5L 4-Cyl',
    vin: '4T1B11HK2KU123456',
    status: 'active',
    description: 'Clean, reliable, and fuel-efficient Toyota Camry SE. One owner, no accidents.',
    featured: true,
    images: ['demo-camry_demo_1783526316718'] // fake id for frontend to intercept
  },
  {
    year: 2021,
    make: 'Ford',
    model: 'F-150',
    trim: 'XLT',
    price: 36000,
    mileage: 32000,
    exteriorColor: 'Black',
    interiorColor: 'Gray',
    transmission: 'Automatic',
    drivetrain: '4WD',
    engine: '3.5L V6 EcoBoost',
    vin: '1FTEW1EP0MK123456',
    status: 'active',
    description: 'Powerful and capable Ford F-150 XLT with 4WD. Great for work or play.',
    featured: true,
    images: ['demo-f150_demo_1783526322923']
  },
  {
    year: 2018,
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    price: 16200,
    mileage: 58000,
    exteriorColor: 'Red',
    interiorColor: 'Black',
    transmission: 'CVT',
    drivetrain: 'FWD',
    engine: '1.5L Turbo 4-Cyl',
    vin: '2HGFC2F7XJH123456',
    status: 'active',
    description: 'Sporty and efficient Honda Civic EX. Loaded with safety features and a sunroof.',
    featured: true,
    images: ['demo-civic_demo_1783526327092']
  }
];

async function seed() {
  try {
    const list = await databases.listDocuments(DB_ID, CARS_COLLECTION_ID);
    if (list.total > 0) {
      console.log('Database already has cars, skipping seed.');
      return;
    }

    console.log('Seeding 3 demo cars...');
    for (const car of demoCars) {
      const doc = await databases.createDocument(DB_ID, CARS_COLLECTION_ID, ID.unique(), car);
      console.log('Created car:', doc.make, doc.model);
    }
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seed failed:', error.message);
  }
}

seed();
