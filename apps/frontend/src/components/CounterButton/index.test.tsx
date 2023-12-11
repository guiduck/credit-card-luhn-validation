import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import { CounterButton } from ".";

describe("CounterButton", () => {
  it("renders without crashing", () => {
    const { container } = render(<CounterButton />);
    expect(container).toBeInTheDocument();
  });
});
