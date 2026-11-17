// routes/index.ts
// join all the route files together app.ts puts these under /api
import categoryRoutes from "./categoryRoutes";

import { Router } from "express";
import accountRoutes from "./accountRoutes";

import productRoutes from "./productRoutes";
import promoRoutes from "./promoRoutes";
import orderRoutes from "./orderRoutes";

// STEP 5: join the routes and add a health check
// one route joins all the route files. app.ts mounts it at /api, so a rout like e.g "/products
// becomes" /api/products

const router = Router();
// Get /api/health: a quick check that the API is running
router.get("health", (_req, res) => {
  res.json({ status: "ok", message: "Quickcart API is running" });
});
router.use("/categories", categoryRoutes); // /api/categories...
router.use("/products", productRoutes); // /api/products...
router.use("/account", accountRoutes); // /api/account...
router.use("/promocodes", promoRoutes); // /api/promo-codes...
router.use("/orders", orderRoutes); // /api/orders...

export default router;
// Next: Step 6 (start the server) -> server.
