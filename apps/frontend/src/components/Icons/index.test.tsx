import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import { Icons } from ".";

describe("Icons", () => {
  it("renders the logo icon", () => {
    render(<Icons.logo />);
    const logoIcon = document.querySelector("svg");

    expect(logoIcon).toBeInTheDocument();
  });

  it("renders the GitHub icon", () => {
    render(<Icons.gitHub />);
    const gitHubIcon = document.querySelector("svg");

    expect(gitHubIcon).toBeInTheDocument();
  });

  it("renders the Radix icon", () => {
    render(<Icons.radix />);
    const radixIcon = document.querySelector("svg");

    expect(radixIcon).toBeInTheDocument();
  });
});
