import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { modify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { load, modifySelectedIdList } from "../../store/memberReducer";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const COLUMNS = [
  { field: "team", headerName: "부서", width: 110 },
  { field: "rank", headerName: "직급", width: 110 },
  { field: "position", headerName: "직책", width: 110 },
  { field: "name", headerName: "사원명", width: 110 },
  { field: "officeNum", headerName: "사무실번호", width: 160 },
  { field: "phone", headerName: "핸드폰", width: 160 },
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
        })
      );
      dispatch(modifySelectedIdList([...selectedMemberId]));
    }
  };

  return (
    <Stack direction={"column"} style={{ padding: "30px 0" }}>
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Link to={"add"} style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            style={{
              width: "80px",
              height: "35px",
              backgroundColor: "#1386d2",
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
            backgroundColor: "white",
            color: "gray",
            border: "1.5px solid #d3d3d3",
            fontWeight: "bold",
          }}
          onClick={handleRemove}
        >
          삭제
        </Button>
      </Stack>
      <div style={{ height: "500px", margin: "20px 0" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          pageSize={10}
          rows={memberList}
          columns={COLUMNS}
          onSelectionModelChange={handleSelect}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[10]}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              cursor: "pointer",
            },
          }}
          style={{ height: "500px", margin: "20px 0" }}
        />
      </div>
    </Stack>
  );
}

export default HomeScreen;
