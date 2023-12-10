export const cardNumberValidator = (number: string) => {
  if (number.length < 16) {
    return { error: true, message: "Your card must be 16 digits." };
  }

  return { error: false, message: "" };
};
