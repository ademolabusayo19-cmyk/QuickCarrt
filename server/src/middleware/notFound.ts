// notFound
// Runs when no route matches the request, and replies with a 404 message.

import { Request, Response } from "express";

// Step 4: Handle unknow URLs and errors
// Run when no route matched: Replies 404 as JSON. errorHandlers.ts (same step) turns any thrown error into a JSON reply instaed of crashing

export const notFound = (req: Request, res: Response) => {
  res
    .status(404)
    .json({ message: `Not found: $ {req.method} ${req.originalUrl}` });
};

// Next: Step 5 (Join the routes and add a health check) -> server/src/routes/index.ts
