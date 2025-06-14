import { useForm } from "react-hook-form";
import QuantityInput from "./components/QuantityInput/QuantityInput";
import PaymentCard from "./components/PaymentCard/PaymentCard";
import BandInfoCard from "./components/BandInfoCard/BandInfoCard";

function BandForm({ band }) {
  const { control, handleSubmit, watch } = useForm();

  function onSubmit(data) {
    console.log("form data", data);
  }

  const ticketCount = watch("tickets");

  return (
    <>
      <BandInfoCard band={band} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Select Tickets</h3>
          <ul>
            {band.ticketTypes.map((ticket) => (
              <div key={ticket.name}>
                <li>{ticket.name}</li>
                <li> {ticket.description}</li>
                <li>{`$ ${ticket.cost}`}</li>
                <QuantityInput
                  name={`tickets.${ticket.name}`}
                  control={control}
                  rules={{
                    min: { value: 0, message: "Minimum is 0" },
                    max: { value: 15, message: "Maximum is 15" },
                  }}
                />
                <p>Total:</p>
              </div>
            ))}
          </ul>
          <PaymentCard />
        </div>
      </form>
    </>
  );
}

export default BandForm;
