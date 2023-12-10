export const cvcVallidator = (number: string) => {
  if (!/\d/.test(number)) {
    return {
      error: true,
      message: "Must contain at least one numeric digit.",
    };
  }

  if (number.length < 3) {
    return {
      error: true,
      message: "Value must be at least 3 digits.",
    };
  }

  return { error: false, message: "" };
};
