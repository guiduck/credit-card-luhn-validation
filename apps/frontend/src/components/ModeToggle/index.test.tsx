import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ModeToggle } from ".";

describe("ModeToggle", () => {
  it("renders without crashing", () => {
    const { container } = render(<ModeToggle />);
    expect(container).toBeInTheDocument();
  });

  it("toggles theme when button is clicked", () => {
    const { getByRole } = render(<ModeToggle />);
    const button = getByRole("button");
    const sunIcon = getByRole("img", { name: "Sun" });
    const moonIcon = getByRole("img", { name: "Moon" });

    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(sunIcon).not.toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();

    fireEvent.click(button);

    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).not.toBeInTheDocument();
  });
});
