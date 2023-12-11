import * as React from "react";
import "@testing-library/jest-dom";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "../../utils/test-utils";
import { PaymentCard } from ".";

describe("PaymentCard", () => {
  it("renders without crashing", () => {
    render(<PaymentCard onSuccess={() => {}} />);
  });

  it("fills all the data and submits the form successfully", async () => {
    const onSuccessMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <PaymentCard onSuccess={onSuccessMock} />
    );

    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const cardNumberInput = getByLabelText("Card number");
    fireEvent.change(cardNumberInput, {
      target: { value: "1234 5678 9012 3456" },
    });

    const monthSelect = getByLabelText("Expires");
    fireEvent.change(monthSelect, { target: { value: "2" } });

    const yearSelect = getByLabelText("Year");
    fireEvent.change(yearSelect, { target: { value: "2023" } });

    const cvcInput = getByLabelText("CVC");
    fireEvent.change(cvcInput, { target: { value: "123" } });

    const submitButton = getByText("Continue");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });
});
