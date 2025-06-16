import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";
import QuantityInput from "./components/QuantityInput/QuantityInput";
import PaymentCard from "./components/PaymentCard/PaymentCard";
import BandInfoCard from "./components/BandInfoCard/BandInfoCard";
import getSelectedTicketsWithPrices from "./utils/calculatesTickets";
import "./BandForm.css";

function BandForm({ band }) {
  const { control, handleSubmit } = useForm();
  const [total, SetTotal] = useState(null);

  function onSubmit(data) {
    const paymentData = data.paymentInfo;

    const selectedWithPrice = getSelectedTicketsWithPrices(
      band.ticketTypes,
      data.tickets
    );

    SetTotal(selectedWithPrice.totalCost);
    console.log("prices", selectedWithPrice, "payment data", paymentData);
  }

  return (
    <div className="container">
      <div className="band-info">
        <BandInfoCard band={band} />
      </div>

      <div className="band-form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="band-form">
          <ul>
            <h3>Select Tickets</h3>
            {band.ticketTypes.map((ticket) => (
              <li key={ticket.name}>
                <div className="ticket-types">
                  <div className="ticket-details">
                    <p>{ticket.name}</p>
                    <p> {ticket.description}</p>
                    <p>{`$ ${ticket.cost}`}</p>
                  </div>
                  <QuantityInput
                    name={`tickets.${ticket.name}`}
                    control={control}
                    rules={{
                      min: { value: 0, message: "Minimum is 0" },
                      max: { value: 15, message: "Maximum is 15" },
                    }}
                  />
                </div>
              </li>
            ))}
            <p>
              TOTAL: <span>{total}</span>
            </p>
          </ul>
          <PaymentCard name="paymentInfo" control={control} />

          <Box
            sx={{
              gridColumn: "span 2",
              justifySelf: "center",
            }}
          >
            <Button variant="contained" type="submit">
              Get Tickets
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default BandForm;
