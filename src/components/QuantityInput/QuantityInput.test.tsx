import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import QuantityInput from "./QuantityInput";

function QuantityInputWrapper() {
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      tickets: {
        "General Admission": 0,
      },
    },
  });

  const ticketName = "General Admission";
  const watchedTickets = methods.watch("tickets");

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <QuantityInput
          name={`tickets.${ticketName}`}
          control={methods.control}
          allTicketsWatch={watchedTickets}
          isFirstTicket={true}
          rules={{
            min: {
              value: 0,
              message: "Quantity must be greater than 0",
            },
            max: { value: 15, message: "Maximum is 15" },
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

describe("QuantityInput", () => {
  it("shows error if quantity is not greater than zero", async () => {
    render(<QuantityInputWrapper />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Please select at least one ticket/i)
    ).toBeInTheDocument();
  });

  it("shows error if quantity is greater than the max", async () => {
    render(<QuantityInputWrapper />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "16" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/Maximum is 15/i)).toBeInTheDocument();
  });

  it("does not show an error for valid quantity", async () => {
    render(<QuantityInputWrapper />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
