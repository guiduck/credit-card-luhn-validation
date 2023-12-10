import { useContext } from "react";
import { SnackbarContext } from "../context/snackbar-context";

export const useSnackbar = () => {
  const { setDataSnackbar } = useContext(SnackbarContext);

  const setSnackbar = (
    message: string,
    time = 6000,
    type?: "neutral" | "success" | "error"
  ) => {
    setDataSnackbar?.({
      message,
      type,
      show: true,
      time,
    });
  };

  return setSnackbar;
};
