import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AlertModal, ConfirmModal, Header, RemoveModal } from "./components";
import { HomeScreen, DetailScreen, AddScreen, ModifyScreen } from "./screens";
import { ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { theme } from "./styles/muiStyles";
import { styles as muiStyles } from "./styles/muiStyles";

function App() {
  const modalInfo = useSelector((state) => state.modal);

  return (
    <div className="App">
      <Container maxWidth={false} sx={muiStyles.container}>
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
