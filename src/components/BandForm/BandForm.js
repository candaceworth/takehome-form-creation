import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button, Box } from "@mui/material";
import QuantityInput from "../QuantityInput/QuantityInput";
import PaymentCard from "../PaymentCard/PaymentCard";
import BandInfoCard from "../BandInfoCard/BandInfoCard";
import getSelectedTicketsWithPrices from "../../utils/calculatesTickets";
import "./BandForm.css";

function BandForm({ band }) {
  const { control, handleSubmit, formState } = useForm();

  const watchedTickets = useWatch({
    control,
    name: "tickets",
    defaultValue: {},
  });

  const [total, setTotal] = useState(0);

  // Ensures the total is updated as user selects a ticket
  useEffect(() => {
    const selectedWithPrice = getSelectedTicketsWithPrices(
      band.ticketTypes,
      watchedTickets
    );

    setTotal(selectedWithPrice.totalCost || 0);
  }, [watchedTickets, band.ticketTypes]);

  function onSubmit(data) {
    /* If validation passes, proceed with form submission and 
    collect tickets with prices and total cost */

    const paymentData = data.paymentInfo;

    const selectedWithPrice = getSelectedTicketsWithPrices(
      band.ticketTypes,
      data.tickets
    );

    setTotal(selectedWithPrice.totalCost || 0);

    console.log(
      "Selected Tickets with Prices:",
      selectedWithPrice,
      "Payment Data:",
      paymentData
    );
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
            {band.ticketTypes.map((ticket, index) => (
              <li key={ticket.name}>
                <div className="ticket-types">
                  <div className="ticket-details">
                    <p>{ticket.name}</p>
                    <p> {ticket.description}</p>
                    <p>{`$ ${ticket.cost}`}</p>
                    <hr className="border" />
                  </div>
                  <QuantityInput
                    name={`tickets.${ticket.name}`}
                    control={control}
                    allTicketsWatch={watchedTickets}
                    isFirstTicket={index === 0}
                    rules={{
                      min: {
                        value: 0,
                        message: "Quantity must be greater than 0",
                      },
                      max: { value: 15, message: "Maximum is 15" },
                    }}
                  />
                </div>
              </li>
            ))}
            {formState.errors.tickets && (
              <p style={{ color: "red", marginTop: "8px" }}>
                {formState.errors.tickets.message}
              </p>
            )}
            <p>
              TOTAL: $<span>{total}</span>
            </p>
          </ul>
          <PaymentCard name="paymentInfo" control={control} />

          <Box
            sx={{
              gridColumn: "span 2",
              justifySelf: "center",
            }}
          >
            <Button
              variant="contained"
              style={{ margin: "20px" }}
              type="submit"
            >
              Get Tickets
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default BandForm;
