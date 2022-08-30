import React from "react";
import {
  ToggleButtonGroup,
  InputLabel,
  Box,
  ToggleButton,
  FormHelperText,
} from "@mui/material";
import { styles as muiStyles } from "./muiStyles";
import styles from "./inputButtonGroup.module.css";

function InputButtonGroup({
  label,
  require,
  requiredCheck,
  ariaDescribedby,
  helperText,
  name,
  teamList,
  onChange,
  value,
}) {
  return (
    <Box sx={muiStyles.marginBottom}>
      <InputLabel sx={muiStyles.inputLabel}>
        {label}
        {require ? (
          <span className={styles.labelRequireMark}> *</span>
        ) : (
          <span className={styles.labelOptionalMark}>(선택)</span>
        )}
      </InputLabel>
      <ToggleButtonGroup
        value={value?.[name]}
        exclusive
        sx={muiStyles.buttonGroup}
        onChange={onChange}
        aria-describedby={ariaDescribedby}
      >
        {teamList?.map((teamName, idx) => {
          return (
            <ToggleButton
              name={name}
              value={teamName}
              key={teamName + idx}
              sx={
                requiredCheck?.[name] ? muiStyles.button : muiStyles.errorButton
              }
            >
              {teamName}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Box sx={muiStyles.boxhelpertext}>
        {!requiredCheck[name] && (
          <FormHelperText id={ariaDescribedby} sx={muiStyles.helperText}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}

export default InputButtonGroup;
