import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "../../utils/test-utils";
import { CreditCard } from ".";

describe("CreditCard", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <CreditCard
        className=""
        cvc=""
        expiration=""
        flipped={false}
        holder=""
        number=""
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("renders the card holder name correctly", () => {
    const holderName = "John Doe";
    const { getByText } = render(
      <CreditCard
        className=""
        cvc=""
        expiration=""
        flipped={false}
        holder={holderName}
        number=""
      />
    );
    const holderElement = getByText(holderName);
    expect(holderElement).toBeInTheDocument();
  });

  it("renders the card number correctly", () => {
    const cardNumber = "1234-5678-9012-3456";
    const { getByText } = render(
      <CreditCard
        className=""
        cvc=""
        expiration=""
        flipped={false}
        holder=""
        number={cardNumber}
      />
    );
    const numberElement = getByText(cardNumber.replaceAll("-", " "));
    expect(numberElement).toBeInTheDocument();
  });

  it("renders the card expiration date correctly", () => {
    const expirationDate = "12/24";
    const { getByText } = render(
      <CreditCard
        className=""
        cvc=""
        expiration={expirationDate}
        flipped={false}
        holder=""
        number=""
      />
    );
    const expirationElement = getByText(expirationDate);
    expect(expirationElement).toBeInTheDocument();
  });

  it("renders the card CVC correctly", () => {
    const cvc = "123";
    const { getByText } = render(
      <CreditCard
        className=""
        cvc={cvc}
        expiration=""
        flipped
        holder=""
        number=""
      />
    );
    const cvcElement = getByText(`${cvc}.`);
    expect(cvcElement).toBeInTheDocument();
  });
});
