// cloudinary.ts
// Product photo lives on cloudinary, a service that stores picture and serves them quickly from anywhere in the world This file logs in to cloudinary once and has small helpers for photo addresses

import { env } from "node:process";
import { v2 as cloudinary } from "cloudinary";
import { bytes } from "node:stream/consumers";
import { error } from "node:console";
import { resourceLimits } from "node:worker_threads";

// Every product photo is kept in the "quickcart/product" folder:

export const PHOTO_FOLDER = "quickcart/products";
export const UPLOAD_FOLDER = `${PHOTO_FOLDER}/uploads`;

// Store product photos on Cloudinary
// Log into cloudinary with the 3 settings from .env, and build photo addresses. f_auto, q_auto in an address asks cloudinary for the best format and size for each brouser, so photos loads faster.

export const isCloudinaryReady = Boolean(
  env.CLOUDINARY_CLOUD_NAME &&
  env.CLOUDINARY_API_KEY &&
  env.CLOUDINARY_API_SECRET,
);

// What to do when the cloudinary settings are missing
export const CLOUDINARY_MISSING =
  "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to server/.env.";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true, // http addresses
});

// The start of every product photo address. e.g "http://res.cloudinary.com/my-cloud/image/upload/f_auto,q_auto/"
const PHOTO_URL_START = `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

// "quickcart/products/smart-watch-ultral" -> "http://res.cloudinary.com/my-cloud/images/upload/f_auto,q_auto/quickcart/product/smart-watch-ultra"

export const photourl = (publicId: string) => {
  return PHOTO_URL_START + publicId;
};
//  The photo of a demo product, from its slug: "smart-watch-ultra" -> its cloudinary address

export const productPhotourl = (slug: string) => {
  return photourl(`${PHOTO_FOLDER}/${slug}`);
};

// is this one of our own product photos? (an address in our cloudinary folder, nothing else)
export const isOurPhoto = (url: string) => {
  if (
    !isCloudinaryReady ||
    !url.startsWith(PHOTO_URL_START + PHOTO_FOLDER + "/")
  ) {
    return false;
  }

  return /^[\w/-]+$/.test(url.slice(PHOTO_URL_START.length));
};

export const uploadedPhotoId = (url: string) => {
  if (
    !isCloudinaryReady ||
    !url.startsWith(PHOTO_URL_START + UPLOAD_FOLDER + "/")
  ) {
    return null;
  }

  return url.slice(PHOTO_URL_START.length);
};

// Sends a photo (the files bytes) to cloudinary and returns its public id
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

// Delete one photo from cloudinary (a missing photo is not an error)
// export const delelte

// Delete one photo from cloudinary (a missing photo is not an error)
export const deleteAllUpoadedPhotos = async () => {
  if (!isCloudinaryReady) {
    return;
  }
  await cloudinary.api
    .delete_resources_by_prefix(`${UPLOAD_FOLDER}/`)
    .catch(() => {});
};
