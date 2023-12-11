import type { RenderOptions } from "@testing-library/react";
import { render, queries, within } from "@testing-library/react";
import type { ReactElement } from "react";

const customScreen = within(document.body, queries);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { queries, ...options });

export * from "@testing-library/react";
export { customScreen as screen, customRender as render };
