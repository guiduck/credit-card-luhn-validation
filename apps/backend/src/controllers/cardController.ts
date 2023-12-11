import type { Request, Response } from "express";
import CardModel from "../schemas/cardSchema";
import { validateCreditCardNumber } from "../utils/validateCard";

class CardController {
  public async index(req: Request, res: Response): Promise<Response> {
    const cards = await CardModel.find();

    if (cards) {
      return res.json(cards);
    }

    return res.status(400).json({ error: "No cards found" });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const isValid = validateCreditCardNumber(req.body.creditCardNumber);

    if (isValid) {
      const card = await CardModel.create(req.body);

      return res.json({
        success: true,
        data: card,
        message: "Valid number. Your card was accepted!",
      });
    }

    return res.status(400).json({ error: "Invalid credit card number" });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const cardExist = await CardModel.find({ _id: req.params.id });

      if (cardExist) {
        await CardModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({
          success: true,
          message: "Card deleted successfully",
        });
      }
      return res
        .status(200)
        .json({ message: "card doesn't exist", success: true });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || "unexpected error",
      });
    }
  }
}

export default new CardController();
