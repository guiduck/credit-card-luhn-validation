import { AxiosError } from "axios";
import api from "./api";

interface Card {
  name: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
}

export const uploadCardData = async (card: Card) => {
  const endpoint = `api/validate-credit-card/`;

  const body = {
    name: card.name,
    creditCardNumber: card.cardNumber,
    expiration: card.expiration,
    cvc: card.cvc,
  };

  try {
    const response = await api.post(endpoint, body);
    console.log(response);
    if (response.status === 200) {
      return response.data.data;
    }
    return response.data;
  } catch (exception: unknown | Error | AxiosError) {
    return (
      exception?.response?.data?.error ||
      `Failed to upload card number. ${exception?.toString()}`
    );
  }
};
