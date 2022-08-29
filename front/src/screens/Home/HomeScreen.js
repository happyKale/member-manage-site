import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { modify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { load, modifySelectedIdList } from "../../store/memberReducer";
import { dataGridColumnData } from "../../asset/dataGridColumnData";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styles } from "./muiStyles";

function HomeScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const COLUMNS = dataGridColumnData.home;
  const memberList = useSelector((state) => state.member.memberList);
  const [selectedMemberIdList, setSelectedMemberIdList] = useState([]);

  useEffect(() => {
    memberRepository.getAll().then((res) => {
      dispatch(load({ memberList: Object.values(res.data) }));
    });
  }, []);

  const handleSelect = (e) => {
    setSelectedMemberIdList(e);
  };
  const handleRowClick = (e) => {
    navigate(`/detail/${e.id}`);
  };
  const handleRemove = () => {
    if (selectedMemberIdList.length === 0) {
      alert("삭제할 직원 명단을 선택하세요.");
    } else {
      dispatch(
        modify({
          type: "remove",
          openStatus: true,
        })
      );
      dispatch(modifySelectedIdList([...selectedMemberIdList]));
    }
  };

  return (
    <Stack direction={"column"} sx={styles.container}>
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Link to={"add"}>
          <Button
            vatiant="text"
            sx={{ ...styles.btnPositive, ...styles.btnMargin }}
          >
            등록
          </Button>
        </Link>
        <Button variant="text" sx={styles.btn} onClick={handleRemove}>
          삭제
        </Button>
      </Stack>
      <div style={{ height: "520px" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          pageSize={10}
          rows={memberList}
          columns={COLUMNS}
          onSelectionModelChange={handleSelect}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[10]}
          sx={styles.dataGrid}
        />
      </div>
    </Stack>
  );
}

export default HomeScreen;
