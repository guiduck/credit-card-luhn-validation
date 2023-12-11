import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./global.css";
import { ThemeProvider } from "./context/theme-provider";
import { SnackbarPropsContextProvider } from "./context/snackbar-context";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SnackbarPropsContextProvider>
          <App />
        </SnackbarPropsContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
