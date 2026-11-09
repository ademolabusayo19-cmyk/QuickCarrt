// Category model
// A shop department, e.g Electronics, Fashion, Home & Living

import { Schema, model } from "mongoose";

// Step 7: The Category model
// A model describes what one record looks like in the database.
// ICategory is the TypeScript type; the schema tells MongoDB the rules.

export interface ICategory {
  name: string;
  slug: string;
  icon: string;
}

// Category Schema
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Export Category model
export const Category = model<ICategory>("Category", categorySchema);

// Next: STEP 8 (the product model) -> server/src/models/product.ts
