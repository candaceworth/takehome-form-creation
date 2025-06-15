import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const ControlledInput = ({ name, control, rules, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  return <TextField {...field} {...props} />;
};

export default ControlledInput;
