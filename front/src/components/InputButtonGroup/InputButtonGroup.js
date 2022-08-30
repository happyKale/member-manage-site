import React from "react";
import {
  ButtonGroup,
  InputLabel,
  Box,
  Button,
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
  onClick,
  teamButtonActive,
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
      <ButtonGroup
        sx={muiStyles.buttonGroup}
        aria-describedby={ariaDescribedby}
      >
        {teamList?.map((teamName, idx) => {
          return (
            <Button
              onClick={onClick}
              name={name}
              value={teamName}
              key={teamName + idx}
              style={{
                width: "20%",
                backgroundColor: teamButtonActive[teamName]
                  ? "#1976d2"
                  : "white",
                color: teamButtonActive[teamName]
                  ? "white"
                  : requiredCheck[name]
                  ? "#1976d2"
                  : "rgba(0,0,0,0.6)",
                border: requiredCheck[name]
                  ? "1px solid #1976d2"
                  : "1px solid #d32f2f",
              }}
            >
              {teamName}
            </Button>
          );
        })}
      </ButtonGroup>
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
