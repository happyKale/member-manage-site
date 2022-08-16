import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components";
import { HomeScreen, DetailScreen, AddScreen, ModifyScreen } from "./screens";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
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
