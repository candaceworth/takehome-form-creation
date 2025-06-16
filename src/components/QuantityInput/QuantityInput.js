import { useController } from "react-hook-form";

const QuantityInput = ({
  name,
  control,
  rules,
  isFirstTicket,
  allTicketsWatch,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...rules,
      ...(isFirstTicket && {
        validate: {
          atLeastOneTicket: () => {
            if (!allTicketsWatch) return true;

            const ticketValues = Object.values(allTicketsWatch || {});
            const hasOneTicket = ticketValues.some((value) => value > 0);
            return hasOneTicket || "Please select at least one ticket";
          },
        },
      }),
    },
    defaultValue: 0,
  });

  return (
    <>
      <input
        name="tickets"
        {...field}
        type="number"
        min="0"
        max="20"
        style={{
          margin: "15px",
          width: "50px",
        }}
      />
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </>
  );
};

export default QuantityInput;
