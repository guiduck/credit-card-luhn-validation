import React, { createContext, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface Data {
  show: boolean;
  message: string;
  time?: number;
  type?: "success" | "error" | "neutral";
}

export interface SnackbarProps {
  dataSnackbar?: Data;
  setDataSnackbar?: Dispatch<SetStateAction<Data | undefined>>;
}

const SnackbarContext = createContext<SnackbarProps>({} as SnackbarProps);

function SnackbarPropsContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const [dataSnackbar, setDataSnackbar] = useState<Data | undefined>();

  const value = useMemo(
    () => ({
      dataSnackbar,
      setDataSnackbar,
    }),
    [dataSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
}

export { SnackbarPropsContextProvider, SnackbarContext };
