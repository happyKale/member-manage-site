import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{ display: "flex", height: "80px" }}>
      <h1
        style={{
          alignItems: "center",
          margin: "auto",
          padding: "0px",
          textAlign: "center",
        }}
      >
        <Link to={"/"} style={{ color: "black" }}>
          D'Amo 직원 명단 관리 사이트
        </Link>
      </h1>
    </div>
  );
}

export default Header;
