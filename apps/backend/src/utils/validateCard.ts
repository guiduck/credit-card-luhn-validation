export const validateCreditCardNumber = (creditCardNumber: string): boolean => {
  const reversedNumber = creditCardNumber
    .replace(/\s/g, "")
    .split("")
    .reverse()
    .join("");

  let sum = 0;
  const parity = reversedNumber.length % 2;

  for (let i = 0; i < reversedNumber.length; i++) {
    const digit = parseInt(reversedNumber[i], 10);

    if (i % 2 !== parity) {
      sum += digit;
    } else {
      sum += digit > 4 ? digit * 2 - 9 : digit * 2;
    }
  }

  return (
    reversedNumber[reversedNumber.length - 1] === (10 - (sum % 10)).toString()
  );
};
