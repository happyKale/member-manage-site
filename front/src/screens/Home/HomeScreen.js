import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { modify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { load, modifySelectedIdList } from "../../store/memberReducer";
import { dataGridColumnData } from "../../asset/dataGridColumnData";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { styles as muiStyles } from "./muiStyles";

function HomeScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const COLUMNS = dataGridColumnData.home;
  const memberList = useSelector((state) => state.member.memberList);
  const rows = memberList?.map((member) => {
    return {
      ...member,
      detail: (
        <TextSnippetOutlinedIcon
          onClick={() => {
            navigate(`/detail/${member.id}`);
          }}
          sx={muiStyles.dataGridCell}
        />
      ),
      modify: (
        <SettingsOutlinedIcon
          onClick={() => {
            navigate(`/modify/${member.id}`);
          }}
          sx={muiStyles.dataGridCell}
        />
      ),
    };
  });
  const [selectedMemberIdList, setSelectedMemberIdList] = useState([]);

  useEffect(() => {
    memberRepository.getAll().then((res) => {
      dispatch(load({ memberList: Object.values(res.data) }));
    });
  }, []);

  const handleSelect = (e) => {
    setSelectedMemberIdList(e);
  };

  const handleRemove = () => {
    if (selectedMemberIdList.length === 0) {
      dispatch(modify({ type: "alert", openStatus: true }));
    } else {
      dispatch(modify({ type: "remove", openStatus: true }));
      dispatch(modifySelectedIdList([...selectedMemberIdList]));
    }
  };

  return (
    <Stack sx={muiStyles.container}>
      <Stack sx={muiStyles.boxButton}>
        <Link to={"add"}>
          <Button
            vatiant="text"
            sx={{ ...muiStyles.btnPositive, ...muiStyles.btnMargin }}
          >
            등록
          </Button>
        </Link>
        <Button variant="text" sx={muiStyles.btnSmall} onClick={handleRemove}>
          삭제
        </Button>
      </Stack>
      <div>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          pageSize={10}
          rows={rows}
          columns={COLUMNS}
          onSelectionModelChange={handleSelect}
          rowsPerPageOptions={[10]}
          sx={muiStyles.dataGrid}
        />
      </div>
    </Stack>
  );
}

export default HomeScreen;
