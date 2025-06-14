import { Card, TextField, Container } from "@mui/material";
import { useForm } from "react-hook-form";

const PaymentCard = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const paymentInfo = [
    {
      label: "First Name",
      id: "first-name",
      placeholder: "First Name",
      gridColumnSpan: 1,
    },
    {
      label: "Last Name",
      id: "last-name",
      placeholder: "Last Name",
      gridColumnSpan: 1,
    },
    {
      label: "Address",
      id: "address",
      placeholder: "Address",
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
      gridColumnSpan: 2,
    },
    {
      label: "Expiry date",
      id: "exp-date",
      placeholder: "MM/YY",
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
          <TextField
            {...register(info.id)}
            label={info.label}
            placeholder={info.placeholder}
            variant="outlined"
            fullWidth
            slotProps={{ input: info.inputProps || { maxLength: 24 } }}
            sx={{
              gridColumn: `span ${info.gridColumnSpan}`,
            }}
          />
        ))}
      </Card>
    </Container>
  );
};

export default PaymentCard;
