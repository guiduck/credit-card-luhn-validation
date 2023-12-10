import type { Document, Model } from "mongoose";
import { Schema, model } from "mongoose";

interface CardInterface extends Document {
  holder: string;
  creditCardNumber: string;
  expires: string;
  cvc: string;
}

const cardSchema: Schema<CardInterface> = new Schema<CardInterface>(
  {
    holder: String,
    creditCardNumber: String,
    expires: String,
    cvc: String,
  },
  {
    timestamps: true,
  }
);

const CardModel: Model<CardInterface> = model<CardInterface>(
  "Card",
  cardSchema
);

export default CardModel;
