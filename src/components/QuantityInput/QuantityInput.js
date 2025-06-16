import { useController } from "react-hook-form";

const QuantityInput = ({ name, control, rules }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
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
