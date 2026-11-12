// cloudinary.ts
// Product photos live on Cloudinary, a service that stores pictures
// and serves them quickly from anywhere in the world.
// This file logs in to Cloudinary once and has small helpers for photo addresses.

import "dotenv/config";
import { env } from "node:process";
import { v2 as cloudinary } from "cloudinary";

// Every product photo is kept in the "quickcart/products" folder.

export const PHOTO_FOLDER = "quickcart/products";
export const UPLOAD_FOLDER = `${PHOTO_FOLDER}/uploads`;

// Store product photos on Cloudinary.

export const isCloudinaryReady = Boolean(
  env.CLOUDINARY_CLOUD_NAME &&
  env.CLOUDINARY_API_KEY &&
  env.CLOUDINARY_API_SECRET,
);

// What to do when the Cloudinary settings are missing.

export const CLOUDINARY_MISSING =
  "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to server/.env.";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

// The start of every product photo address.

const PHOTO_URL_START = `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

// Build a Cloudinary photo address.

export const photoUrl = (publicId: string) => {
  return PHOTO_URL_START + publicId;
};

// The photo of a demo product, from its slug.

export const productPhotoUrl = (slug: string) => {
  return photoUrl(`${PHOTO_FOLDER}/${slug}`);
};

// Check if this is one of our own product photos.

export const isOurPhoto = (url: string) => {
  if (
    !isCloudinaryReady ||
    !url.startsWith(PHOTO_URL_START + PHOTO_FOLDER + "/")
  ) {
    return false;
  }

  return /^[\w/-]+$/.test(url.slice(PHOTO_URL_START.length));
};

// Get the public ID of an uploaded photo.

export const uploadedPhotoId = (url: string) => {
  if (
    !isCloudinaryReady ||
    !url.startsWith(PHOTO_URL_START + UPLOAD_FOLDER + "/")
  ) {
    return null;
  }

  return url.slice(PHOTO_URL_START.length);
};

// Send a photo (the file bytes) to Cloudinary and return its public ID.

export const uploadPhoto = (Bytes: Buffer, publicId: string) => {
  return new Promise<string>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary didn't answer"));
          return;
        }

        resolve(result.public_id);
      },
    );

    upload.end(Bytes);
  });
};

// Delete one photo from Cloudinary (a missing photo is not an error).

export const deleteAllUploadedPhotos = async () => {
  if (!isCloudinaryReady) {
    return;
  }

  await cloudinary.api
    .delete_resources_by_prefix(`${UPLOAD_FOLDER}/`)
    .catch(() => {});
};

// List the names ()
//list the names (public ids) of all demo product photos on cloudinary
//e.g ["quickcart/products/smart-watch-ultra-1", ...]. Admin uploads are left out
//cloudinary sends at most 500 per pages, so we keep asking for the next page until there is none
//Empty list when cloudinary isn't set up (the products are then saved without pfotos.)

export const listProductPhotoId = async (): Promise<string[]> => {
  if (!isCloudinaryReady) {
    return [];
  }
  const ids: string[] = [];
  let nextCursor: string | undefined = undefined;

  do {
    const page = await cloudinary.api.resources({
      type: "upload",
      prefix: `${PHOTO_FOLDER}`,
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const photo of page.resources) {
      ids.push(photo.public_id);
    }
    nextCursor = page.next_cursor; //undefined on the last page which end th loop
  } while (nextCursor);

  return ids.filter((id) => {
    return !id.startsWith(`${UPLOAD_FOLDER}/`);
  });
};
