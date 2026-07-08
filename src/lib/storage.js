import { storage, BUCKET_ID, ID } from './appwrite';

/**
 * Upload a single image file to Appwrite Storage.
 * Returns the file object with $id.
 */
export async function uploadImage(file) {
  return await storage.createFile(BUCKET_ID, ID.unique(), file);
}

/**
 * Upload multiple image files.
 * Returns array of file objects.
 */
export async function uploadImages(files) {
  const uploads = [];
  for (const file of files) {
    const result = await uploadImage(file);
    uploads.push(result);
  }
  return uploads;
}

/**
 * Delete an image from Appwrite Storage.
 */
export async function deleteImage(fileId) {
  return await storage.deleteFile(BUCKET_ID, fileId);
}

/**
 * Delete multiple images from Appwrite Storage.
 */
export async function deleteImages(fileIds) {
  for (const id of fileIds) {
    try {
      await deleteImage(id);
    } catch (error) {
      console.error(`Error deleting image ${id}:`, error);
    }
  }
}

/**
 * Get the preview URL for an image (with optional transforms).
 */
export function getImagePreviewUrl(fileId, width = 800, height = 600) {
  if (fileId.startsWith('demo-')) {
    const name = fileId.split('-')[1].split('_')[0];
    return `/demo/${name}.png`;
  }
  return storage.getFilePreview(BUCKET_ID, fileId, width, height);
}

/**
 * Get thumbnail URL for car card display.
 */
export function getThumbnailUrl(fileId) {
  if (fileId.startsWith('demo-')) {
    const name = fileId.split('-')[1].split('_')[0];
    return `/demo/${name}.png`;
  }
  return storage.getFilePreview(BUCKET_ID, fileId, 400, 300);
}

/**
 * Get full-size image URL for gallery/lightbox.
 */
export function getFullImageUrl(fileId) {
  if (fileId.startsWith('demo-')) {
    const name = fileId.split('-')[1].split('_')[0];
    return `/demo/${name}.png`;
  }
  return storage.getFilePreview(BUCKET_ID, fileId, 1200, 900);
}

/**
 * Get the direct view URL (no transforms).
 */
export function getImageViewUrl(fileId) {
  if (fileId.startsWith('demo-')) {
    const name = fileId.split('-')[1].split('_')[0];
    return `/demo/${name}.png`;
  }
  return storage.getFileView(BUCKET_ID, fileId);
}
