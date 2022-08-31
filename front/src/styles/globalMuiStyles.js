export const globalMuiStyles = {
  marginBottom: {
    marginBottom: "20px",
  },
  // screen
  screenContainer: {
    padding: "50px 30px",
    flexDirection: "column",
  },
  screenTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  screenContent: {
    borderTop: "1px solid #e5e5e5",
    borderBottom: "1px solid #e5e5e5",
    margin: "30px 0",
    flexDirection: "column",
  },
  screenFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // input
  inputLabel: {
    margin: "0 0 5px 0",
    fontWeight: "500",
  },
  inputContainer: {
    width: "65%",
    flexDirection: "column",
  },
  input2Column: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //section
  section: {
    margin: "20px 0",
    flexDirection: "row",
  },
  sectionTitle: {
    width: "35%",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#5b5b5b",
  },

  // button
  btnSmall: {
    width: "80px",
    height: "35px",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "gray",
    border: "1.5px solid #d3d3d3",
  },
  btnLarge: {
    width: "110px",
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
    border: "none",
    "&:hover": {
      backgroundColor: "#4792d8",
    },
  },
  btnMargin: {
    marginRight: "15px",
  },

  // icon
  iconSquareSmall: {
    fontSize: "10px",
    marginRight: "5px",
    paddingBottom: "3px",
  },
  iconSquareLarge: {
    fontSize: "12px",
    marginRight: "5px",
    paddingBottom: "3px",
  },
  iconArrow: {
    fontSize: "14px",
  },

  //modal
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #e5e5e5",
    padding: "10px 20px",
    fontWeight: "bold",
    color: "gray",
  },
  dialogContentTitle: {
    fontWeight: "bold",
  },
  dialogActions: {
    padding: "10px 20px 10px",
    borderTop: "1px solid #e5e5e5",
  },
};
