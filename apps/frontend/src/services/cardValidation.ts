import api from "./api";

interface Card {
  holder: string;
  cardNumber: string;
  expires: string;
  cvc: string;
}

interface Response {
  type: "success" | "error";
  msg: string;
}

export const uploadCardData = async (card: Card): Promise<Response> => {
  const endpoint = `api/cards/`;

  const body = {
    holder: card.holder,
    creditCardNumber: card.cardNumber,
    expires: card.expires,
    cvc: card.cvc,
  };

  try {
    const response: any = await api.post(endpoint, body);
    console.log(response);
    if (response && response.status === 200) {
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
