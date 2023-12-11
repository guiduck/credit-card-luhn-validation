import * as React from "react";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/test-utils";
import { CardList } from ".";

const mockCards = [
  {
    id: "1",
    holder: "John Doe",
    creditCardNumber: "1234567890123456",
    expires: "01/2021",
    cvc: "123",
    _id: "3",
  },
  {
    id: "2",
    holder: "Jane Smith",
    creditCardNumber: "9876543290127654",
    expires: "01/2021",
    cvc: "123",
    _id: "4",
  },
];

describe("CardList", () => {
  it("renders the list of cards correctly", () => {
    render(<CardList cards={mockCards} onCardDelete={jest.fn()} />);

    const cardHolderElements = screen.getAllByText(/John Doe|Jane Smith/i);
    expect(cardHolderElements).toHaveLength(2);

    const maskedCardNumberElements = screen.getAllByText("**** **** 9012 ****");
    expect(maskedCardNumberElements).toHaveLength(2);
  });

  it("calls the onCardDelete function when remove button is clicked", () => {
    const mockOnCardDelete = jest.fn();
    render(<CardList cards={mockCards} onCardDelete={mockOnCardDelete} />);

    const removeButtons = screen.getAllByText(/remove/i);
    expect(removeButtons).toHaveLength(2);

    fireEvent.click(removeButtons[0]);
    expect(mockOnCardDelete).toHaveBeenCalledWith("1");

    fireEvent.click(removeButtons[1]);
    expect(mockOnCardDelete).toHaveBeenCalledWith("2");
  });
});
