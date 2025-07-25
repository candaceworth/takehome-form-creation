import { Card, Container } from "@mui/material";
import ControlledInput from "../ControlledInput/ControlledInput";

/**
 * PaymentCard is a reusable component for rendering a styled credit card form.
 *
 * Renders a set of controlled inputs for collecting payment and billing details,
 * such as name, address, card number, expiration date, and CVC.
 *
 * Applies validation rules for required fields and proper formatting using react-hook-form.
 *
 * Props:
 * - name: base path for each input field (e.g., 'paymentInfo'), used to scope form values.
 * - control: react-hook-form's control object used to register inputs.
 */

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
      validation: { required: "Last name required" },
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
      placeholder: "CVC",
      validation: {
        required: "CVC required",
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
    <Container
      maxWidth="md"
      sx={{ mt: 4 }}
      component="section"
      aria-labelledby="payment-heading"
    >
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
