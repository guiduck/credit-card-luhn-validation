import type { NextFunction, Request, Response } from "express";
import { log } from "../utils/logger";

export const validateCreditCardMiddleware = (
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
