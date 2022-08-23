import React from "react";

function Header() {
  return (
    <div style={{ display: "flex", height: "100px" }}>
      <h1
        style={{
          alignItems: "center",
          margin: "auto",
          padding: "0px",
          textAlign: "center",
        }}
      >
        D'Amo 직원 명단 관리 사이트
      </h1>
    </div>
  );
}

export { Header };
