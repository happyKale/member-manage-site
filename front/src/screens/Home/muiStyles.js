import { globalMuiStyles } from "../../styles/globalMuiStyles";

export const styles = {
  ...globalMuiStyles,
  container: {
    padding: "30px 0",
  },
  boxDataGrid: {
    height: "520px",
  },
  dataGrid: {
    height: "500px",
    margin: "20px 0",
    "& .MuiDataGrid-cell:hover": {
      cursor: "pointer",
    },
  },
};
