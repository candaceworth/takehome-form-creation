import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

/**
 * ControlledInput is a reusable wrapper around MUI's TextField,
 * integrated with react-hook-form for form state management and validation.
 *
 * Automatically displays validation errors and connects the input to the form context.
 *
 * Props:
 * - name: the unique name of the form field.
 * - control: react-hook-form's control object used to register the field.
 * - rules: optional validation rules for the field.
 * - ...props: any additional props passed to MUI's TextField.
 */

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
