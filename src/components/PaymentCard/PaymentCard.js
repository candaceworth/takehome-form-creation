import { Card, Container } from "@mui/material";
import ControlledInput from "../ControlledInput/ControlledInput";

const PaymentCard = ({ name, control }) => {
  const paymentInfo = [
    {
      label: "First Name",
      id: "first-name",
      placeholder: "First Name",
      validation: { required: "First name required" },
      gridColumnSpan: 1,
    },
    {
      label: "Last Name",
      id: "last-name",
      placeholder: "Last Name",
      validation: { required: "First name required" },
      gridColumnSpan: 1,
    },
    {
      label: "Address",
      id: "address",
      placeholder: "Address",
      validation: { required: "Address required" },
      gridColumnSpan: 2,
    },
    {
      label: "Card Number",
      id: "card-number",
      placeholder: "0000 0000 0000 0000",
      inputMode: "numeric",
      inputProps: {
        inputMode: "numeric",
        autoComplete: "cc-number",
        maxLength: 24,
      },
      validation: {
        required: "Card number required",
        pattern: {
          value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
          message: " Invalid card number format",
        },
      },
      gridColumnSpan: 2,
    },
    {
      label: "Expiry date",
      id: "exp-date",
      placeholder: "MM/YY",
      validation: {
        required: "Expiry date required",
        pattern: {
          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
          message: "Use MM/YY format",
        },
      },
      gridColumnSpan: 1,
      inputProps: {
        inputMode: "numeric",
        autoComplete: "cc-exp",
        maxLength: 24,
      },
    },

    {
      label: "CVC",
      id: "card-verification",
      placeholder: "CVV",
      validation: {
        required: "CVV required",
        pattern: {
          value: /^\d{3,4}$/,
          message: "3-4 digits required",
        },
      },
      gridColumnSpan: 1,
      inputProps: {
        inputMode: "numeric",
        autoComplete: "cc-csc",
        maxLength: 4,
      },
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 2,
          padding: 3,
          boxSizing: "border-box",
        }}
      >
        {paymentInfo.map((info) => (
          <ControlledInput
            key={info.id}
            name={`${name}.${info.id}`} // e.g. paymentInfo.first-name
            control={control}
            rules={info.validation}
            label={info.label}
            placeholder={info.placeholder}
            slotProps={{ input: info.inputProps || { maxLength: 24 } }}
            sx={{
              gridColumn: `span ${info.gridColumnSpan}`,
            }}
            fullWidth
          />
        ))}
      </Card>
    </Container>
  );
};

export default PaymentCard;
