import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const ControlledInput = ({ name, control, rules, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue: "" });
  return (
    <TextField
      {...field}
      {...props}
      error={!!error}
      helperText={error ? error.message : ""}
    />
  );
};

export default ControlledInput;
