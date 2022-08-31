import { globalMuiStyles } from "../../styles/globalMuiStyles";

export const styles = {
  ...globalMuiStyles,
  container: {
    padding: "30px",
    flexDirection: "column",
  },
  boxButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dataGrid: {
    height: "630.5px",
    margin: "10px 0",
  },
  dataGridCell: {
    fontSize: "20px",
    color: "gray",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
