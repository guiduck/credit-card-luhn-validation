import { log } from "node:console";
import { json, urlencoded } from "body-parser";
import type { Request, Response, NextFunction, Express } from "express";
import express, { Router } from "express";
import morgan from "morgan";
import cors from "cors";
import { validateCreditCardNumber } from "./utils/validateCard";

// Middleware for logging
const loggerMiddleware = morgan("dev");

// Middleware for parsing JSON and URL-encoded data
const bodyParserMiddleware = [urlencoded({ extended: true }), json()];

// Middleware for CORS
const corsMiddleware = cors();

// Middleware for validating credit card numbers
const validateCreditCardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { creditCardNumber } = req.body;
  log("creditCardNumber", creditCardNumber);

  if (!creditCardNumber || typeof creditCardNumber !== "string") {
    return res.status(400).json({ error: "Invalid credit card number" });
  }

  next();
};

// Route handler for /message/:name
const messageHandler = (req: Request, res: Response) => {
  const { name } = req.params;
  return res.json({ message: `hello ${name}` });
};

// Route handler for /status
const statusHandler = (_: Request, res: Response) => {
  return res.json({ ok: true });
};

// Route handler for /validate-credit-card
const validateCreditCardHandler = (req: Request, res: Response) => {
  const isValid = validateCreditCardNumber(req.body.creditCardNumber);
  console.log("card from back", req.body.creditCardNumber);

  if (isValid) {
    return res.json({ success: true, message: "Credit card is valid" });
  }

  return res.status(400).json({ error: "Invalid credit card number" });
};

// Create a Router
const router = Router();

// Attach middleware and route handlers to the router
router.use(loggerMiddleware, bodyParserMiddleware, corsMiddleware);
router.get("/message/:name", messageHandler);
router.get("/status", statusHandler);
router.post(
  "/validate-credit-card",
  validateCreditCardMiddleware,
  validateCreditCardHandler
);

// Create the Express app
export const createServer = (): Express => {
  const app = express();
  app.disable("x-powered-by");
  app.use("/api", router);
  return app;
};
