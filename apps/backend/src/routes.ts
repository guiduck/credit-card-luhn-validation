import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { log } from "@repo/logger";
import CardController from "./controllers/cardController";

const router = Router();

const messageHandler = (req: Request, res: Response) => {
  const { name } = req.params;
  return res.json({ message: `hello ${name}` });
};

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

router.get("/message/:name", messageHandler);
router.get("/cards", CardController.index);
router.delete("/cards/:id", CardController.delete);
router.post("/cards", validateCreditCardMiddleware, CardController.create);

export default router;
