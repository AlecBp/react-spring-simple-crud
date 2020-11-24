import React from "react";
const { TextField } = require("@material-ui/core");

const MyTextField = ({
  required,
  label,
  placeholder,
  shrinkLabel,
  type,
  disabled,
  onChange,
  onBlur,
  value,
  errors,
  touched,
  name,
  readOnly,
  // ...props
}) => {
  const errorText = errors && touched ? errors : "";
  return (
    <TextField
      required={required ? true : undefined}
      fullWidth
      disabled={disabled ? true : undefined}
      label={label}
      placeholder={placeholder}
      variant="outlined"
      margin="normal"
      size="small"
      // {...field}
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      type={type || "text"}
      helperText={errorText}
      error={errorText ? true : undefined}
      inputProps={readOnly ? { readOnly: true } : { readOnly: false }}
      InputLabelProps={{
        shrink: shrinkLabel,
      }}
    />
  );
};

export default React.memo(MyTextField);
