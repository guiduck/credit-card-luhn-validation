import type { CardModel } from "../models/cardModel";
import api from "./api";

interface Response {
  type: "success" | "error";
  msg: string;
  data?: CardModel[];
}

export const uploadCardData = async (card: CardModel): Promise<Response> => {
  const endpoint = "/api/cards/";

  const body = {
    holder: card.holder,
    creditCardNumber: card.creditCardNumber,
    expires: card.expires,
    cvc: card.cvc,
  };

  try {
    const response = await api.post(endpoint, body);
    if (response.status === 200) {
      return {
        type: "success",
        msg: response.data.message,
      };
    }
    return {
      type: "error",
      msg: "There was a problem with your request, please wait and try again",
    };
  } catch (exception: any) {
    return {
      type: "error",
      msg:
        exception?.response?.data?.error ||
        `Failed to upload card number. ${exception?.toString()}`,
    };
  }
};

export const getUserCards = async (): Promise<Response | undefined> => {
  const endpoint = "/api/cards/";

  try {
    const response = await api.get(endpoint);
    if (response.status === 200) {
      return { type: "success", data: response.data, msg: "" };
    }
  } catch (exception: any) {
    return {
      type: "error",
      msg:
        exception?.response?.data?.error ||
        `Failed to update card list. ${exception?.toString()}`,
    };
  }
};

export const deleteUserCard = async (cardId: string): Promise<Response> => {
  const endpoint = `/api/cards/${cardId}`;

  try {
    const response = await api.delete(endpoint);
    if (response.status === 200) {
      return {
        type: "success",
        msg: response.data.message,
      };
    }
    return {
      type: "error",
      msg: "There was a problem with your request, please wait and try again",
    };
  } catch (exception: any) {
    return {
      type: "error",
      msg:
        exception?.response?.data?.error ||
        `Failed to delete card. ${exception?.toString()}`,
    };
  }
};
