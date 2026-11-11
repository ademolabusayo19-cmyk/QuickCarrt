// routes/index.ts
// join all the route files together app.ts puts these under /api

import { Router } from "express";

// STEP 5: join the routes and add a health check
// one route joins all the route files. app.ts mounts it at /api, so a rout like e.g "/products
// becomes" /api/products

const router = Router();
// Get /api/health: a quick check that the API is running
router.get("health", (_req, res) => {
  res.json({ status: "ok", message: "Quickcart API is running" });
});

export default router;
// Next: Step 6 (start the server) -> server.
