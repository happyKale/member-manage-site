export const styles = {
  container: {
    padding: "30px 0",
  },
  link: {
    textDecoration: "none",
  },
  btn: {
    width: "80px",
    height: "35px",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "gray",
    border: "1.5px solid #d3d3d3",
  },
  btnPositive: {
    width: "80px",
    height: "35px",
    fontWeight: "bold",
    backgroundColor: "#1386d2",
    color: "white",
    marginRight: "15px",
    border: "none",
    "&:hover": {
      backgroundColor: "#4792d8",
    },
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
