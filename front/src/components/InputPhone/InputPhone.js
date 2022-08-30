import React from "react";
import { TextField, InputLabel, Stack } from "@mui/material";
import { styles as muiStyles } from "./muiStyles";
import styles from "./inputPhone.module.css";

function InputPhone({
  label,
  require,
  phoneNumberInfo,
  onChange,
  isPhoneFocused,
}) {
  return (
    <>
      <InputLabel sx={muiStyles.inputLabel}>
        {label}
        {require ? (
          <span className={styles.labelRequireMark}> *</span>
        ) : (
          <span className={styles.labelOptionalMark}>(선택)</span>
        )}
      </InputLabel>
      <Stack sx={muiStyles.inputPhoneSection}>
        <TextField
          value={phoneNumberInfo[0]}
          name={"phone_1"}
          onChange={onChange}
          placeholder={"010"}
          inputProps={{ maxLength: 3 }}
          sx={muiStyles.inputPhone}
        />
        <span className={styles.inputPhoneHyphen}>-</span>
        <TextField
          value={phoneNumberInfo[1]}
          name={"phone_2"}
          onChange={onChange}
          placeholder={"1234"}
          inputProps={{ maxLength: 4 }}
          sx={muiStyles.inputPhone}
          inputRef={(input) =>
            isPhoneFocused &&
            phoneNumberInfo[0].length === 3 &&
            phoneNumberInfo[2].length === 0 &&
            input?.focus()
          }
        />
        <span className={styles.inputPhoneHyphen}>-</span>
        <TextField
          value={phoneNumberInfo[2]}
          name={"phone_3"}
          onChange={onChange}
          placeholder={"5678"}
          inputProps={{ maxLength: 4 }}
          sx={muiStyles.inputPhone}
          inputRef={(input) =>
            isPhoneFocused &&
            phoneNumberInfo[0].length == 3 &&
            phoneNumberInfo[1].length == 4 &&
            phoneNumberInfo[2].length == 0 &&
            input?.focus()
          }
        />
      </Stack>
    </>
  );
}

export default InputPhone;
