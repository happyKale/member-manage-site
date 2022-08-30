import { globalMuiStyles } from "../../styles/globalMuiStyles";

export const styles = {
  ...globalMuiStyles,
  container: {
    padding: "30px 0",
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
    "&:hover": {
      cursor: "pointer",
    },
  },
};
