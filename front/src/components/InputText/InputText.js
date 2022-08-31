import React from "react";
import { TextField, InputLabel, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styles as muiStyles } from "./muiStyles";
import styles from "./inputText.module.css";

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
  multiline,
  rows,
  type,
}) {
  const helperTestClasses = helperTextStyles();

  return (
    <Box sx={muiStyles.marginBottom}>
      <InputLabel sx={muiStyles.inputLabel}>
        {label}
        {required ? (
          <span className={"labelRequireMark"}> *</span>
        ) : (
          <span className={"labelOptionalMark"}>(선택)</span>
        )}
      </InputLabel>
      <TextField
        fullWidth
        type={type ?? ""}
        error={
          requiredCheck && requiredCheck[name]
            ? false
            : requiredCheck
            ? true
            : false
        }
        value={(value && value[name]) || ""}
        name={name ?? ""}
        onChange={onChange}
        placeholder={placeholder ?? ""}
        inputProps={inputProps}
        helperText={helperText ?? ""}
        FormHelperTextProps={{
          classes: helperTestClasses,
        }}
        multiline={multiline ?? false}
        rows={rows ?? ""}
      />
    </Box>
  );
}

export default InputText;
