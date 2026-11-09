// database.ts
// connect to Mongodb using the MONGO_URI from the .env file

import mongoose from "mongoose";
import { env } from "./env";

// STEP 2: connect to mongodb
// connectionDB() opens the connection to MongoDB with the address from.env server.t

export const connectDB = async () => {
  const connection = await mongoose.connect(env.mongoUri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

// Next: STEP 3 (Create the Express app) -> server/src/app.ts
