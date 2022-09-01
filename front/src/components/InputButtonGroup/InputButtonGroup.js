import React from "react";
import {
  ToggleButtonGroup,
  InputLabel,
  Box,
  ToggleButton,
  FormHelperText,
} from "@mui/material";
import { styles as muiStyles } from "./muiStyles";

function InputButtonGroup({
  label,
  require,
  requiredCheck,
  ariaDescribedby,
  helperText,
  valueKey,
  teamList,
  onChange,
  value,
}) {
  return (
    <Box sx={muiStyles.marginBottom}>
      <InputLabel sx={muiStyles.inputLabel}>
        {label}
        {require ? (
          <span className={"labelRequireMark"}> *</span>
        ) : (
          <span className={"labelOptionalMark"}>(선택)</span>
        )}
      </InputLabel>
      <ToggleButtonGroup
        value={value?.[valueKey]}
        exclusive
        sx={muiStyles.buttonGroup}
        onChange={onChange}
        aria-describedby={ariaDescribedby}
      >
        {teamList?.map((teamName, idx) => {
          return (
            <ToggleButton
              name={valueKey}
              value={teamName}
              key={teamName + idx}
              sx={
                requiredCheck?.[valueKey]
                  ? muiStyles.button
                  : muiStyles.errorButton
              }
            >
              {teamName}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Box sx={muiStyles.boxhelpertext}>
        {!requiredCheck[valueKey] && (
          <FormHelperText id={ariaDescribedby} sx={muiStyles.helperText}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}

export default InputButtonGroup;
