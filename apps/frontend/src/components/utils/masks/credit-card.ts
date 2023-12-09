export const creditCardMask = (input: string): string => {
  // Remove non-numeric characters
  const cleanInput = input.replace(/\D/g, "");

  // Define the format for the credit card mask
  const maskFormat = "xxxx-xxxx-xxxx-xxxx";

  let maskedInput = "";
  let maskIndex = 0;

  // Apply the mask format to the clean input
  for (let i = 0; i < cleanInput.length && maskIndex < maskFormat.length; i++) {
    if (maskFormat[maskIndex] === "x") {
      // Replace 'x' with the corresponding digit from the clean input
      maskedInput += cleanInput[i];
      maskIndex++;
    } else {
      // Keep non-'x' characters in the mask format
      maskedInput += maskFormat[maskIndex];
      maskIndex++;
      i--; // Move back one step in the clean input since we didn't consume a digit
    }
  }

  return maskedInput;
};
