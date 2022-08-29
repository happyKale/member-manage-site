import React from "react";
import { TextField, InputLabel, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const helperTextStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    margin: "5px 0 0 0",
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: "red",
      margin: "5px 0 0 0",
    },
  },
}));

function InputText({
  label,
  name,
  placeholder,
  inputProps,
  required,
  requiredCheck,
  onChange,
  value,
  helperText,
  marginBottom,
}) {
  const helperTestClasses = helperTextStyles();

  return (
    <Box style={{ marginBottom: `${marginBottom}` }}>
      <InputLabel style={{ margin: "0 0 5px 0" }}>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </InputLabel>
      <TextField
        fullWidth
        error={requiredCheck[name] ? false : true}
        value={value[name]}
        name={name}
        onChange={onChange}
        placeholder={placeholder ?? ""}
        inputProps={inputProps}
        helperText={helperText ?? ""}
        FormHelperTextProps={{
          classes: helperTestClasses,
        }}
      />
    </Box>
  );
}

export default InputText;
