import api from "./api";

interface Card {
  name: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
}

interface Response {
  type: "success" | "error";
  msg: string;
}

export const uploadCardData = async (card: Card): Promise<Response> => {
  const endpoint = `api/validate-credit-card/`;

  const body = {
    name: card.name,
    creditCardNumber: card.cardNumber,
    expiration: card.expiration,
    cvc: card.cvc,
  };

  try {
    const response = await api.post(endpoint, body);
    if (response.status === 200) {
      return { type: "success", msg: "Your card was accepted!" };
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
