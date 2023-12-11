import React from "react";
import { render } from "@testing-library/react";
import { Snackbar } from ".";

describe("Snackbar", () => {
  it("renders without crashing", () => {
    const { container } = render(<Snackbar />);
    expect(container).toBeInTheDocument();
  });
});
