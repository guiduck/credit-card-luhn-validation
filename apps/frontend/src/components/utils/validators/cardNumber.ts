export const cardNumberValidator = (number: string) => {
  if (number.length < 16) {
    return { error: true, message: "seu cartão deve ter 16 dígitos" };
  }

  return { error: false, message: "" };
};
