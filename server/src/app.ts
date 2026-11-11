// STEP 2: Create the Express app
// It does not start listening; server.ts does that

import express from "express";
import cors from "cors";
import { env } from "./config/env";
import routes from "./routes";
import { notFound } from "./middleware/notFound";

// STEP 3: Create the Express app
// The Express app: allow the website to call us (CORS), read JSON bodies, serve
// uploaded photos, put every route under /api, then the 404 and error handlers.

const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true })); // Let the website call the API
app.use(express.json());

app.use("/api", routes); // Every route lives under /api, e.g. /api/health

app.use(notFound); // Must come after the routes: runs only when nothing above matched

export default app;
// Next: STEP 4 (Handle unknown URLs and errors) -> server/src/middleware/notFound.ts
