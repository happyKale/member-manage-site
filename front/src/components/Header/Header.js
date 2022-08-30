import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { styles as muiStyles } from "./muiStyles";

function Header() {
  return (
    <Stack sx={muiStyles.container}>
      <Typography sx={muiStyles.title}>
        <Link to={"/"} style={{ color: "black" }}>
          D'Amo 직원 명단 관리 사이트
        </Link>
      </Typography>
    </Stack>
  );
}

export default Header;
