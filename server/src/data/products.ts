// products.ts
// Every product from the designs (Shop, Home and Product Details page).
// Products that appear on several pages under different names are listed once, using the shop page name.
// The order of this list is the "Featured" order on the Shop page.
// "category" is a category slug; seed.ts swaps it for the real category id.
// prices are whole  naira (45000 = N45000)
// Tags used by the Home page sections: featured, flash-deal, fast-deal, deal, new-arrival, recommended

import { features } from "node:process";
import { IProductionHighlight, IProductSpec } from "../models/Product";

type SeedProductColor = {
  name: string;
  hex: string;
};

export type SeedProduct = {
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  oldPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  sold?: number; // units sold; seed.ts uses reviewCounts x 4 when not set
  flashSalesStock?: number; // units offered in flash sale
  description: string;
  tagline?: string; // one short line for small cards
  priceNote?: string; // short line under the price on small cards
  badge?: string;
  features?: string[];
  colors?: SeedProductColor[];
  specs?: IProductSpec[];
  tags?: string[];
  gallery?: string[]; // extra photo file names in /images/products for the product page
  highlights?: IProductionHighlight[];
  ratingCounts?: number[]; // 5, 4, 3, 2, and 1 star counts; seed.ts makes them up.
  bundle?: string[]; // names of "Frequenctly Bought Together" products
  related?: string[]; // names of "Related Products"
};

// STEP 10 (Part of this step): write the demo data
// The 40 demo products
// Main explanation: STEP 10 in server/src/data/categories.ts

export const products: SeedProduct[] = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    category: "electronics",
    brand: "Aura Sound Labs",
    sku: "QC-AU-9042",
    price: 45000,
    oldPrice: 60000,
    stock: 124,
    rating: 4.8,
    sold: 1420,
    reviewCount: 248,
    badge: "SALE",
    description:
      "Immersive sound with adaptive hybrid active noise cancellation, 30-hour battery life, and plush memory foam over-ear cups. Engineered for pure acoustic clarity and supreme everyday durability.",

    features: [
      "40mm Neodymium Drivers",
      "Bluetooth 5.3 Multipoint",
      "30h Playback w/ ANC",
      "USB-C Fast Fueling",
    ],

    colors: [
      {
        name: "Midnight Black",
        hex: "#1f2937",
      },

      {
        name: "Silver Frost",
        hex: "#cbd5e1",
      },

      {
        name: "Space Navy",
        hex: "#1e293b",
      },
    ],

    specs: [
      {
        group: "Audio & Connectivity",
        label: "Driver Size",
        value: "40mm Neodymium Custom Tuned",
      },
      {
        group: "Audio & Connectivity",
        label: "Frequency Response",
        value: "15 Hz - 40,000 Hz",
      },
      {
        group: "Audio & Connectivity",
        label: "Bluetooth Version",
        value: "v5.3 Multipoint (2 devices simultaneous)",
      },
      {
        group: "Audio & Connectivity",
        label: "Supported Codecs",
        value: "LDAC, AAC, SBC",
      },
      {
        group: "Audio & Connectivity",
        label: "Noise Cancellation",
        value: "Hybrid ANC with Ambient Aware Mode",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Battery Life",
        value: "30 hrs (ANC On) / 45 hrs (ANC Off)",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Charging Port",
        value: "USB Type-C Fast Charge",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Total Weight",
        value: "250 grams (Ultra lightweight)",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Microphones",
        value: "4 Beamforming with ENC voice clarity",
      },
      {
        group: "Power, Build & Box Contents",
        label: "Included in Box",
        value: "Headphones, Hard Case, 3.5mm Aux Cable, USB-C",
      },
    ],

    tags: ["audio", "wireless", "noise-cancelling", "bluetooth", "featured"],

    gallery: [
      "wireless headset 1.jpeg",
      "wireless headset 2.jpeg",
      "wireless headset 3.jpeg",
      "wireless headset 4.jpeg",
      "wireless headset 5.jpeg",
    ],
  },
];
