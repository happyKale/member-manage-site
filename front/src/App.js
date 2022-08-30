import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AlertModal, ConfirmModal, Header, RemoveModal } from "./components";
import { HomeScreen, DetailScreen, AddScreen, ModifyScreen } from "./screens";
import { ThemeProvider, createTheme } from "@mui/material";
import { Container } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: "Spoqa Han Sans Neo",
  },
});

function App() {
  const modalInfo = useSelector((state) => state.modal);

  return (
    <div className="App">
      <Container
        style={{
          maxWidth: "1000px",
          padding: "50px",
          backgroundColor: "white",
          margin: "80px auto",
          borderRadius: "15px",
          minWidth: "600px",
        }}
      >
        <Header />
        {modalInfo.type == "remove" && modalInfo.openStatus ? (
          <RemoveModal />
        ) : modalInfo.type === "confirm" && modalInfo.openStatus ? (
          <ConfirmModal />
        ) : modalInfo.type === "alert" && modalInfo.openStatus ? (
          <AlertModal />
        ) : (
          ""
        )}
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="detail">
              <Route path=":id" element={<DetailScreen />} />
            </Route>
            <Route path="add" element={<AddScreen />} />
            <Route path="modify">
              <Route path=":id" element={<ModifyScreen />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default App;
