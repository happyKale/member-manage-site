import React from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import { styles as muiStyles } from "./muiStyles";

function InputSelect({
  label,
  require,
  requiredCheck,
  valueKey,
  onChange,
  value,
  ariaDescribedby,
  itemList,
  helperText,
}) {
  return (
    <Box sx={muiStyles.container}>
      <InputLabel sx={muiStyles.inputLabel}>
        {label}
        {require ? (
          <span className={"labelRequireMark"}> *</span>
        ) : (
          <span className={"labelOptionalMark"}>(선택)</span>
        )}
      </InputLabel>
      <Select
        fullWidth
        error={requiredCheck[valueKey] ? false : true}
        name={valueKey}
        aria-describedby={ariaDescribedby}
        value={(value && value[valueKey]) || ""}
        onChange={onChange}
      >
        {itemList?.map((item, idx) => {
          return (
            <MenuItem key={item + idx} value={`${item}`}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <Box sx={muiStyles.boxHelperText}>
        {!requiredCheck[valueKey] && (
          <FormHelperText id={ariaDescribedby} sx={muiStyles.helperText}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}

export default InputSelect;
