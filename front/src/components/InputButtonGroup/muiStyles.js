import { globalMuiStyles } from "../../styles/globalMuiStyles";

export const styles = {
  ...globalMuiStyles,
  buttonGroup: {
    marginBottom: "3px",
    height: "45px",
    width: "100%",
  },
  boxhelpertext: {
    height: "20px",
    marginTop: "3px",
  },
  helperText: {
    color: "red",
    height: "20px",
  },

  button: {
    width: "20%",
    "&.Mui-selected": {
      backgroundColor: "#1180db",
      color: "white",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#1180db",
    },
  },
  errorButton: {
    width: "20%",
    border: "1px solid #d32f2f",
  },
};
