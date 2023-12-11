export const creditCardMask = (input: string): string => {
  const cleanInput = input.replace(/\D/g, "");

  const maskFormat = "xxxx-xxxx-xxxx-xxxx";

  let maskedInput = "";
  let maskIndex = 0;

  for (let i = 0; i < cleanInput.length && maskIndex < maskFormat.length; i++) {
    if (maskFormat[maskIndex] === "x") {
      maskedInput += cleanInput[i];
      maskIndex++;
    } else {
      maskedInput += maskFormat[maskIndex];
      maskIndex++;
      i--;
    }
  }

  return maskedInput;
};
