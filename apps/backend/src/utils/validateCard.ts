export const validateCreditCardNumber = (creditCardNumber: string): boolean => {
  const sanitizedNumber = creditCardNumber.replace(/\s/g, "");

  if (!/^\d+$/.test(sanitizedNumber)) {
    return false;
  }

  let sum = 0;
  let double = false;

  for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedNumber[i], 10);

    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
};
