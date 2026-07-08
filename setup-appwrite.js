const { Client, Databases, Storage } = require('node-appwrite');
const fs = require('fs');

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6a4e79120010d087456d')
  .setKey('standard_57cff2f1f01badd2f82cd9db7a1ab911906ea72d03ffdbd66825e76f1d9bcb01571d0ff3c321c543b80a016dc0cfae07ceafb8d438c2a0ac341896aa8ba94c6b9edc9e2c26403c972137cabe7d9f27b64fae164193482f5c062dc40112ede751c6e2d814ce171bc140ded119ab0ba926cfa7b2e6eedc83a039b6b4291811ce6a');

const databases = new Databases(client);
const storage = new Storage(client);

const DB_ID = '6a4e7dda001361a156aa';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createAttr(fn, ...args) {
  try {
    await fn.apply(databases, args);
  } catch (e) {
    if (e.code !== 409) throw e;
  }
}

async function getOrCreateCollection(dbId, colId, name) {
  try {
    return await databases.createCollection(dbId, colId, name);
  } catch (e) {
    if (e.code === 409) return await databases.getCollection(dbId, colId);
    throw e;
  }
}

async function setup() {
  try {
    console.log('Creating cars collection...');
    const carsCol = await getOrCreateCollection(DB_ID, 'cars', 'Cars');
    console.log('Cars Collection ID:', carsCol.$id);
    
    // Add attributes to cars
    await createAttr(databases.createIntegerAttribute, DB_ID, carsCol.$id, 'year', true, 1886, 2100);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'make', 100, true);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'model', 100, true);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'trim', 100, false);
    await createAttr(databases.createFloatAttribute, DB_ID, carsCol.$id, 'price', true);
    await createAttr(databases.createIntegerAttribute, DB_ID, carsCol.$id, 'mileage', true, 0, 1000000);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'exteriorColor', 50, false);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'interiorColor', 50, false);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'transmission', 50, false);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'drivetrain', 50, false);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'engine', 100, false);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'vin', 17, false);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'status', 20, false, 'active'); // not required since it has a default
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'description', 5000, false);
    await createAttr(databases.createBooleanAttribute, DB_ID, carsCol.$id, 'featured', false, false);
    await createAttr(databases.createStringAttribute, DB_ID, carsCol.$id, 'images', 1000, false, undefined, true); // array of fileIds

    console.log('Creating inquiries collection...');
    const inqCol = await getOrCreateCollection(DB_ID, 'inquiries', 'Inquiries');
    console.log('Inquiries Collection ID:', inqCol.$id);

    await createAttr(databases.createStringAttribute, DB_ID, inqCol.$id, 'carId', 50, false);
    await createAttr(databases.createStringAttribute, DB_ID, inqCol.$id, 'firstName', 100, true);
    await createAttr(databases.createStringAttribute, DB_ID, inqCol.$id, 'lastName', 100, true);
    await createAttr(databases.createStringAttribute, DB_ID, inqCol.$id, 'email', 255, true);
    await createAttr(databases.createStringAttribute, DB_ID, inqCol.$id, 'phone', 20, false);
    await createAttr(databases.createStringAttribute, DB_ID, inqCol.$id, 'message', 2000, true);
    await createAttr(databases.createStringAttribute, DB_ID, inqCol.$id, 'status', 20, false, 'new'); 
    
    console.log('Fetching storage buckets...');
    let bucketId;
    const bucketList = await storage.listBuckets();
    if (bucketList.buckets.length > 0) {
      bucketId = bucketList.buckets[0].$id;
      console.log('Using existing bucket:', bucketId);
    } else {
      console.log('Creating storage bucket...');
      try {
        const bucket = await storage.createBucket('media', 'Media', ['any'], false, false, undefined, ['jpg', 'png', 'jpeg', 'webp', 'gif']);
        bucketId = bucket.$id;
      } catch (e) {
        if (e.code === 409) {
          const bucket = await storage.getBucket('media');
          bucketId = bucket.$id;
        } else {
          throw e;
        }
      }
    }
    console.log('Bucket ID resolved:', bucketId);

    console.log('Waiting for attributes to be processed...');
    await delay(3000); // Give appwrite a moment to process attributes

    const envContent = `NEXT_PUBLIC_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=6a4e79120010d087456d
NEXT_PUBLIC_APPWRITE_DATABASE_ID=6a4e7dda001361a156aa
NEXT_PUBLIC_APPWRITE_CARS_COLLECTION_ID=${carsCol.$id}
NEXT_PUBLIC_APPWRITE_INQUIRIES_COLLECTION_ID=${inqCol.$id}
NEXT_PUBLIC_APPWRITE_BUCKET_ID=${bucketId}
APPWRITE_API_KEY=standard_57cff2f1f01badd2f82cd9db7a1ab911906ea72d03ffdbd66825e76f1d9bcb01571d0ff3c321c543b80a016dc0cfae07ceafb8d438c2a0ac341896aa8ba94c6b9edc9e2c26403c972137cabe7d9f27b64fae164193482f5c062dc40112ede751c6e2d814ce171bc140ded119ab0ba926cfa7b2e6eedc83a039b6b4291811ce6a
`;
    fs.writeFileSync('.env.local', envContent);
    console.log('Successfully written to .env.local!');
  } catch (error) {
    console.error('Setup failed:', error.message);
  }
}

setup();
