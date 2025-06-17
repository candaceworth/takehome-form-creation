import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import PaymentCard from "./PaymentCard";

// Create a React component to wrap PaymentCard with form context
function PaymentCardWrapper() {
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      cardInfo: {
        cardNumber: "",
        expirationDate: "",
        cvc: "",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <PaymentCard name="cardInfo" control={methods.control} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

describe("PaymentCard", () => {
  it("shows required errors for card fields when submitted empty", async () => {
    render(<PaymentCardWrapper />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Card number required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Expiry date required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/CVC required/i)).toBeInTheDocument();
  });
});

it("shows min length error if card number is too short", async () => {
  render(<PaymentCardWrapper />);
  fireEvent.change(screen.getByLabelText(/card number/i), {
    target: { value: "123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(
    await screen.findByText(/Invalid card number format/i)
  ).toBeInTheDocument();
});

it("shows format error if expiration date is invalid", async () => {
  render(<PaymentCardWrapper />);
  fireEvent.change(screen.getByLabelText(/Expiry date/i), {
    target: { value: "13/99" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(await screen.findByText(/Use MM\/YY format/i)).toBeInTheDocument();
});

it("shows format error if CVC is invalid", async () => {
  render(<PaymentCardWrapper />);
  fireEvent.change(screen.getByLabelText(/CVC/i), {
    target: { value: "10" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(await screen.findByText(/3-4 digits required/i)).toBeInTheDocument();
});
