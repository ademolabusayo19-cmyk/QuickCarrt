// uploadImages.ts
// send every product photo in a folder

import {
  CLOUDINARY_MISSING,
  isCloudinaryReady,
  uploadPhoto,
  PHOTO_FOLDER,
  photoUrl,
} from "../config/cloudinary";

import fs from "fs";
import path from "path";

const PHOTO_TYPES = [".jpg", ".jpeg", ".png", ".webp"];

const uploadImages = async () => {
  const folder = process.argv[2];

  // 1. Check we have everything before we start

  if (!folder) {
    console.error(
      `Say where the photos are: npm run upload-images -- "C:/path/to/photos"`,
    );
    process.exit(1);
  }

  if (!isCloudinaryReady) {
    console.error(CLOUDINARY_MISSING);
    process.exit(1);
  }

  if (!fs.existsSync(folder)) {
    console.error(`Folder not found: ${folder}`);
    process.exit(1);
  }

  // 2. List the photo files in the folder

  const files = fs.readdirSync(folder).filter((file) => {
    return PHOTO_TYPES.includes(path.extname(file).toLowerCase());
  });

  console.log(`Uploading ${files.length} photos to Cloudinary...`);

  // 3. Upload them one at a time (simple, and kind to a slow connection)

  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    // "smart-watch-ultra-1.jpeg" -> "smart-watch-ultra-1"
    // trim removes stray spaces

    const name = path.parse(file).name.trim().toLowerCase();

    const bytes = fs.readFileSync(path.join(folder, file));

    try {
      const publicId = await uploadPhoto(bytes, `${PHOTO_FOLDER}/${name}`);

      uploaded++;

      console.log(`${uploaded}/${files.length} ${photoUrl(publicId)}`);
    } catch (error) {
      failed++;

      console.error(`Failed: ${file} -> ${(error as Error).message}`);
    }
  }

  console.log(`Done: ${uploaded} uploaded, ${failed} failed.`);
};

uploadImages();
