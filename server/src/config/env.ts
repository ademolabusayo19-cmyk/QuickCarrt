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
};
