// demoData.ts
// Turns the demo data files (categories.ts, product.ts) into records shaped like the models, ready for seed.ts to save. Nothing here talks to MongoDB.

import { PHOTO_FOLDER, photoUrl } from "../config/cloudinary";
import { categories } from "./categories";
import { products, type SeedProduct } from "./products";
import type { Types } from "mongoose";

// STEP 12: Put the demo data in the database (part 1: shape the records)
// The data files use slugs and simple names; the database needs real IDs, full photo addresses and every field the model expects. These functions do that translation.

// ---- Start rating breakdown --------------------------------------------
// The product page shows bars for 5, 4, 3, 2 and 1 stars. When products.ts doesn't give ratingCounts, we make believable ones for the average rating.
// Each row: "If the rating is at least minRating, split the reviews like this (percent)."

const RATING_SHARE = [
  { minRating: 4.7, shares: [80, 14, 4, 1, 1] },
  { minRating: 4.2, shares: [65, 22, 8, 3, 2] },
  { minRating: 3.7, shares: [50, 20, 12, 6, 4] },
  { minRating: 0, shares: [35, 30, 10, 10, 15] },
];

// makeRatingCount(4.8, 248) -> [199, 35, 10, 2, 2] (adds up to exactly 248)
export const makeRatingCount = (
  rating: number,
  reviewCount: number,
): number[] => {
  const { shares } = RATING_SHARE.find((row) => {
    return rating >= row.minRating;
  })!;

  const counts = shares.map((share) => {
    return Math.round((reviewCount * share) / 100);
  });

  // Rounding can leave us 1 or 2 off; give the difference to the star bar.
  const total = counts.reduce((sum, count) => {
    return sum + count;
  }, 0);

  counts[0] += reviewCount - total;
  return counts;
};

// --- Photos ------------------------------------------------
// From all photo IDs on Cloudinary, pick this product's photos ("<slug>-1", "<slug>-2" ...),
// put them in number order, and turn them into full addresses.
export const photosFor = (slug: string, photoIds: string[]): string[] => {
  const prefix = `${PHOTO_FOLDER}/${slug}-`;

  return photoIds
    .filter((id) => {
      return id.startsWith(prefix) && /^\d+$/.test(id.slice(prefix.length));
    })
    .sort((a, b) => {
      return Number(a.slice(prefix.length)) - Number(b.slice(prefix.length));
    })
    .map(photoUrl);
};

// ---- Categories -----------------------------------------
// categories.ts is already shaped like the category model, so we hand it over as it is.
export const demoCategories = () => {
  return categories;
};

// --------- Product --------------------------------------------
// One product from product.ts -> one record shaped like the product model.
// bundle and related are left out here: they point to other products, which don't have IDs until they're saved. seed.ts links them.

const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const buildProduct = (
  item: SeedProduct,
  categoryId: Types.ObjectId,
  photoIds: string[],
) => {
  const slug = slugify(item.name);

  return {
    name: item.name,
    slug,
    description: item.description,
    tagline: item.tagline,
    priceNote: item.priceNote,
    features: item.features ?? [],
    specs: item.specs ?? [],
    category: categoryId,
    brand: item.brand,
    sku: item.sku,
    price: item.price,
    oldPrice: item.oldPrice,
    costPrice: Math.round(item.price * 0.6), // pretend the shop paid 60% (admin margin display)
    trackStock: true,
    stock: item.stock,
    lowStockThreshold: 10,
    images: photosFor(item.photo ?? slug, photoIds),
    gallery: [], // empty = the product page uses images
    colors: item.colors ?? [],
    tags: item.tags ?? [],
    badge: item.badge,
    highlights: item.highlights ?? [],
    ratings: item.rating, // products.ts says "rating", the model says "ratings"
    reviewCount: item.reviewCount,
    ratingCounts:
      item.ratingCounts ?? makeRatingCount(item.rating, item.reviewCount),
    sold: item.sold ?? item.reviewCount * 4,
    flashSaleStock: item.flashSaleStock,
    status: "published" as const,
  };
};

// All 40 products. categoryIds maps a category slug to its saved _id,
// e.g. "electronics" -> ObjectId("665f...")
export const demoProducts = (
  categoryIds: Map<string, Types.ObjectId>,
  photoIds: string[],
) => {
  return products.map((items) => {
    const categoryId = categoryIds.get(items.category);

    // A typo in product.ts (e.g "electronic") should stop the seed loudly, not save bad data

    if (!categoryId) {
      throw new Error(
        `"${items.name}" has an unknow category: "${items.category}"`,
      );
    }
    return buildProduct(items, categoryId, photoIds);
  });
};
