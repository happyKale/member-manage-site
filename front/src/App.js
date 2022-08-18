import { Modal } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Footer, Header, RemoveModal } from "./components";
import { HomeScreen, DetailScreen, AddScreen, ModifyScreen } from "./screens";

function App() {
  const modalInfo = useSelector((state) => state.modal);

  return (
    <div className="App">
      <Header />
      <Container>
        {modalInfo.type == "remove" && modalInfo.openStatus ? (
          <RemoveModal />
        ) : (
          ""
        )}
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
      </Container>
      <Footer />
    </div>
  );
}

export default App;
