import { globalMuiStyles } from "../../styles/globalMuiStyles";

export const styles = {
  ...globalMuiStyles,
  dialogContent: {
    width: "500px",
    padding: "20px",
    margin: "20px 0",
  },
  dialogContentText: {
    whiteSpace: "pre-wrap",
    marginTop: "30px",
  },
  btnPositive: {
    width: "100px",
    height: "35px",
    fontWeight: "bold",
    backgroundColor: "#1386d2",
    color: "white",
    border: "none",
    "&:hover": {
      backgroundColor: "#4792d8",
    },
  },
};
