export const nameValidator = (name: string) => {
  if (name === "") {
    return { error: true, message: "preencha seu nome" };
  }

  if (name.length < 3) {
    return { error: true, message: "seu nome deve ter no mínimo 3 letras" };
  }

  return { error: false, message: "" };
};
