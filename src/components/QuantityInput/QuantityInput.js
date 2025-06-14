import { useController } from "react-hook-form";

const QuantityInput = ({ name, control, rules }) => {
  const { field, fieldState } = useController({
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
        style={{ width: "60px" }}
      />
    </>
  );
};

export default QuantityInput;
