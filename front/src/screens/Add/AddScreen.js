import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Select, MenuItem } from "@mui/material";

function AddScreen() {
  const teamList = ["DA", "DE", "DK", "DP", "DX"];
  const rankList = ["사원", "대리", "과장", "차장", "부장"]; //직급
  const positionList = ["팀원", "팀장"]; //직책

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "50px 0",
      }}
    >
      <div>
        <h3>직원 등록</h3>
      </div>
      <div style={{ padding: "30px 0" }}>
        <TextField
          fullWidth
          required
          label={"이름"}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          label={"핸드폰"}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          label={"생년월일"}
          style={{ marginBottom: "15px" }}
        />
        <Select fullWidth style={{ marginBottom: "15px" }}>
          {teamList.map((team) => {
            return <MenuItem value={`${team}`}>{team}</MenuItem>;
          })}
        </Select>
        <Select fullWidth style={{ marginBottom: "15px" }}>
          {rankList.map((rank) => {
            return <MenuItem value={`${rank}`}>{rank}</MenuItem>;
          })}
        </Select>
        <Select fullWidth style={{ marginBottom: "15px" }}>
          {positionList.map((position) => {
            return <MenuItem value={`${position}`}>{position}</MenuItem>;
          })}
        </Select>
        <TextField
          fullWidth
          label={"메일주소"}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          label={"사무실번호"}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          label={"팩스번호"}
          style={{ marginBottom: "15px" }}
        />
        <TextField fullWidth label={"담당업무"} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            style={{
              width: "80px",
              height: "35px",
              backgroundColor: "lightgray",
              color: "white",
            }}
          >
            목록
          </Button>
        </Link>
        <Button
          variant="text"
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
}

export { AddScreen };
