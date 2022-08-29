import { globalMuiStyles } from "../../styles/globalMuiStyles";

export const styles = {
  ...globalMuiStyles,
  container: {
    padding: "50px 0",
  },
  boxSection: {
    borderTop: "1px solid #e5e5e5",
    borderBottom: "1px solid #e5e5e5",
    margin: "30px 0",
  },
  section: {
    margin: "20px 0",
  },
  sectionTitle: {
    width: "25%",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#5b5b5b",
  },
  sectionInputBox: {
    width: "75%",
  },
  inputContainer: {
    border: "1px solid #eef2f5",
    marginBottom: "10px",
    borderRadius: "2px",
  },
  inputSectionTitle: {
    backgroundColor: "#eef2f5",
    display: "inline-block",
    width: "25%",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
  },
  inputTitle: {
    lineHeight: "45px",
    paddingLeft: "15px",
    fontSize: "14px",
  },
  inputSectionValue: {
    display: "inline-block",
    width: "75%",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  inputValueText: {
    lineHeight: "45px",
    paddingLeft: "10px",
    fontSize: "14px",
  },
  inputValueTextArea: {
    display: "inline-block",
    fontSize: "14px",
    width: "100%",
    padding: "10px 20px 10px 10px",
    boxSizing: "border-box",
    border: "none",
    resize: "none",
    outline: "none",
    lineHeight: "30px",
  },
};
