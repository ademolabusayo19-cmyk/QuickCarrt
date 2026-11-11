// env.ts
// Reads the settings from the .env file in one place, so the rest of the code usues `env.port`, `env.mongouri`,etc

import dotenv from "dotenv";

dotenv.config({ quiet: true });

// ===Step 1 : Read the settings from .env
// All settings (port, database address, JWT secret...) are read from .env here, once, so the rest of the code uses env.port, env.monogoUri and so on.

// Next: STEP 2 (Connect to MongoDB) -> server/src/config/database.ts

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://ademolabusayo19_db_user:U2FYDpkoZ5IwrTT5@cluster0.ozob9oj.mongodb.net/quickcart",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  jwtExpiredIn: process.env.JWT_EXPIRE_IN || "15d", // "remain logged in for 15 days"
  clientUrl: process.env.CLIENT_URL || "http//localhost:5173",
  // The hidden demo panel (reset the data, move orders along) for presentations.
  // On while developing (npm run dev... runs the .ts files); off the built site (npm start runs .js from dist)
  // uless DEMO_MODE=true is set. DEMO_MODE=false always turns it off.
  demoMode:
    process.env.DEMO_MODE === "true" ||
    (process.env.DEMO_MODE !== "false" && __filename.endsWith(".ts")),

  // Cloudinary stores the product photos (see config/cloudinary.ts). Empty = use the photo in client/public
  cloudinaryCloudName: process.env.CLOUGINARY_CLOUD_NAME || "",
  clodinaryApiKey: process.env.CLOUGINARY_API_KEY || "",
  clodinaryApiSecret: process.env.CLOUGINARY_SECRET || "",
};
