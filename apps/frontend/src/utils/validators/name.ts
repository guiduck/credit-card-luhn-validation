export const nameValidator = (name: string) => {
  if (name === "") {
    return { error: true, message: "Please, input your name." };
  }

  if (name.length < 3) {
    return {
      error: true,
      message: "Your name must be at least 3 letters long",
    };
  }

  return { error: false, message: "" };
};
