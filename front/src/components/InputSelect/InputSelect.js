import React from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import { styles as muiStyles } from "./muiStyles";
import styles from "./inputSelect.module.css";

function InputSelect({
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
    <Box sx={muiStyles.container}>
      <InputLabel sx={muiStyles.inputLabel}>
        {label}
        {require ? (
          <span className={styles.labelRequireMark}> *</span>
        ) : (
          <span className={styles.labelOptionalMark}>(선택)</span>
        )}
      </InputLabel>
      <Select
        fullWidth
        error={requiredCheck[name] ? false : true}
        name={name}
        aria-describedby={ariaDescribedby}
        value={(value && value[name]) || ""}
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
        {!requiredCheck[name] && (
          <FormHelperText id={ariaDescribedby} sx={muiStyles.helperText}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}

export default InputSelect;
