import React from "react";
import {
  ButtonGroup,
  InputLabel,
  Box,
  Button,
  FormHelperText,
} from "@mui/material";
import { globalMuiStyles as styles } from "../../styles/globalMuiStyles";

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
    <Box sx={styles.marginBottom}>
      <InputLabel sx={styles.inputLabel}>
        {label}
        {require && <span style={{ color: "red" }}>*</span>}
      </InputLabel>
      <ButtonGroup
        style={{
          marginBottom: "3px",
          height: "45px",
          width: "100%",
        }}
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

export default InputButtonGroup;
