import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function HomeScreen() {
  const navigate = useNavigate();
  const memberList = useSelector((state) => state.member);

  const rows = [
    {
      id: 1,
      col1: "DX팀",
      col2: "부장",
      col3: "팀장",
      col4: "직원1",
      col5: "02-2125-6530",
      col6: "010-1234-5678",
    },
    {
      id: 2,
      col1: "DX팀",
      col2: "대리",
      col3: "팀원",
      col4: "직원2",
      col5: "02-2125-6547",
      col6: "010-1234-5678",
    },
    {
      id: 3,
      col1: "DX팀",
      col2: "사원",
      col3: "팀원",
      col4: "직원3",
      col5: "02-2125-6548",
      col6: "010-1234-5678",
    },
    {
      id: 4,
      col1: "DX팀",
      col2: "사원",
      col3: "팀원",
      col4: "직원4",
      col5: "02-2125-6549",
      col6: "010-1234-5678",
    },
  ];

  const columns = [
    { field: "col1", headerName: "부서", width: 150 },
    { field: "col2", headerName: "직급", width: 150 },
    { field: "col3", headerName: "직책", width: 150 },
    { field: "col4", headerName: "사원명", width: 150 },
    { field: "col5", headerName: "사무실번호", width: 150 },
    { field: "col6", headerName: "핸드폰", width: 150 },
  ];

  const handleRowClick = (e) => {
    navigate(`/detail/${e.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "50px 0",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={"add"} style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            style={{
              width: "80px",
              height: "35px",
              backgroundColor: "green",
              marginRight: "15px",
              color: "white",
            }}
          >
            등록
          </Button>
        </Link>
        <Button
          variant="text"
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          삭제
        </Button>
      </div>
      <div style={{ flexGrow: 1, height: "500px", margin: "20px 0" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          pageSize={10}
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}

export { HomeScreen };
