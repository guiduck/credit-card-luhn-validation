import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import { Snackbar } from ".";

describe("Snackbar", () => {
  it("renders without crashing", () => {
    const { container } = render(<Snackbar />);
    expect(container).toBeInTheDocument();
  });
});
