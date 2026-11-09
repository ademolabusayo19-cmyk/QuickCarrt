// app.ts
// Creates the Express app: settings first, then all the /api routes, then the "not found"
// it does not start listening; server.ts does that

// step 3 Create the express app
// The Express app: allow the website to call us (CORS), read JSON bodies, server uploaded photos, put every route under /api, then the 404 and error handlers

import express from "express";
import { env } from "./config/env";

// The Express app: allow the website to call the server.
const app = express();

app.use(express.json());

export default app;

// Next: Step 4 (Handle unknow URLs and errors) -> server/src/ middleware/notFound.ts
