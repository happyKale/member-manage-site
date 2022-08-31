import { globalMuiStyles } from "./globalMuiStyles";
import { createTheme } from "@mui/material";
export const theme = createTheme({
  typography: {
    fontFamily: "Spoqa Han Sans Neo",
  },
});

export const styles = {
  ...globalMuiStyles,
  container: {
    padding: "50px",
    backgroundColor: "white",
    margin: "40px auto 80px",
    borderRadius: "15px",
    minWidth: "600px",
    maxWidth: "1100px",
  },
};
