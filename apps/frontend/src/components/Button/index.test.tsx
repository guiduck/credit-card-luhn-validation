import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import { Button } from ".";

describe("Button", () => {
  it("renders without crashing", () => {
    const { container } = render(<Button />);
    expect(container).toBeInTheDocument();
  });

  it("renders with the correct default variant and size", () => {
    const { container } = render(<Button />);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-primary-foreground");
    expect(button).toHaveClass("h-9");
    expect(button).toHaveClass("px-4");
    expect(button).toHaveClass("py-2");
  });

  it("renders with the correct variant and size when specified", () => {
    const { container } = render(<Button size="sm" variant="outline" />);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("border-input");
    expect(button).toHaveClass("bg-transparent");
    expect(button).toHaveClass("shadow-sm");
    expect(button).toHaveClass("hover:bg-accent");
    expect(button).toHaveClass("hover:text-accent-foreground");
    expect(button).toHaveClass("h-8");
    expect(button).toHaveClass("rounded-md");
    expect(button).toHaveClass("px-3");
    expect(button).toHaveClass("text-xs");
  });
});
