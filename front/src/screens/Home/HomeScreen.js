import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { modify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { load } from "../../store/memberReducer";

const COLUMNS = [
  { field: "team", headerName: "부서", width: 150 },
  { field: "rank", headerName: "직급", width: 150 },
  { field: "position", headerName: "직책", width: 150 },
  { field: "name", headerName: "사원명", width: 150 },
  { field: "officeNum", headerName: "사무실번호", width: 150 },
  { field: "phone", headerName: "핸드폰", width: 150 },
];

function HomeScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberList = useSelector((state) => state.member.memberList);
  const [selectedMemberId, setSelectedMemberId] = useState([]);

  useEffect(() => {
    memberRepository.getAll().then((res) => {
      dispatch(load({ memberList: Object.values(res.data) }));
    });
  }, []);

  const handleSelect = (e) => {
    setSelectedMemberId(e);
  };
  const handleRowClick = (e) => {
    navigate(`/detail/${e.id}`);
  };
  const handleRemove = () => {
    if (selectedMemberId.length === 0) {
      alert("삭제할 직원 명단을 선택하세요.");
    } else {
      dispatch(
        modify({
          type: "remove",
          openStatus: true,
          selectedMemberId: selectedMemberId,
        })
      );
    }
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
          onClick={handleRemove}
        >
          삭제
        </Button>
      </div>
      <div style={{ flexGrow: 1, height: "500px", margin: "20px 0" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          pageSize={10}
          rows={memberList}
          columns={COLUMNS}
          onSelectionModelChange={handleSelect}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}

export { HomeScreen };
