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
    height: "500px",
    margin: "20px 0",
    "& .MuiDataGrid-cell:hover": {
      cursor: "pointer",
    },
  },
};
