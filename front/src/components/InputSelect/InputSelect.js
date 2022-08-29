import React from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";

function InputSelect({
  style,
  label,
  require,
  requiredCheck,
  name,
  onChange,
  value,
  ariaDescribedby,
  itemList,
  helperText,
}) {
  return (
    <Box style={style}>
      <InputLabel style={{ margin: "0 0 5px 0" }}>
        {label}
        {require && <span style={{ color: "red" }}> *</span>}
      </InputLabel>
      <Select
        fullWidth
        error={requiredCheck[name] ? false : true}
        name={name}
        aria-describedby={ariaDescribedby}
        value={value[name]}
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
      <Box style={{ height: "20px", marginTop: "3px" }}>
        {!requiredCheck[name] && (
          <FormHelperText
            id={ariaDescribedby}
            style={{ color: "red", height: "20px" }}
          >
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}

export default InputSelect;
