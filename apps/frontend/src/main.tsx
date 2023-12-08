import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "@repo/tailwind-config/global.css";
import { ThemeProvider } from "./context/theme-provider";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
