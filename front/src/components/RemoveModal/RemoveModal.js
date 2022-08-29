import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";
import { modifySelectedIdList, remove } from "../../store/memberReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { memberRepository } from "./../../repositories/member-repository";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { dataGridColumnData } from "./../../asset/dataGridColumnData";

function RemoveModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const COLUMNS = dataGridColumnData.remove;
  const type = location.pathname.split("/")[1];
  const selectedIdList = useSelector((state) => state.member.selectedIdList);
  const memberList = useSelector((state) => state.member.memberList);
  const selectedMemberInfo = useSelector(
    (state) => state.member.selectedMemberInfo
  );
  const rows = memberList?.filter((member) => {
    if (selectedIdList?.includes(member.id)) {
      return {
        id: member.id,
        name: member.name,
        team: member.team,
        position: member.position,
        rank: member.rank,
      };
    }
  });

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false }));
    dispatch(modifySelectedIdList([]));
  };

  const handleRemove = () => {
    handleClose();
    if (type === "detail") {
      navigate("/");
    }
    memberRepository.delete(selectedIdList).then((res) => {
      dispatch(remove({ selectedMemberId: selectedIdList }));
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        onClose={handleClose}
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #e5e5e5",
          padding: "10px 20px",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        직원 명단 삭제
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent style={{ width: "500px", padding: "20px" }}>
        <Typography style={{ fontWeight: "bold" }}>
          선택된 직원 명단 개수: {selectedIdList?.length}
        </Typography>
        <Typography style={{ marginTop: "30px" }}>
          아래 직원 명단을 삭제하시겠습니까?
        </Typography>
        <DataGrid
          headerHeight={40}
          rowHeight={45}
          style={{ height: "250px", width: "460px", margin: "20px auto" }}
          columns={COLUMNS}
          rows={memberList.length === 0 ? [selectedMemberInfo] : rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </DialogContent>
      <DialogActions
        style={{ padding: "10px 20px 10px", borderTop: "1px solid #e5e5e5" }}
      >
        <Button
          onClick={handleRemove}
          variant="text"
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "#1386d2",
            color: "white",
          }}
        >
          삭제하기
        </Button>
        <Button
          onClick={handleClose}
          variant="text"
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "white",
            color: "gray",
            border: "1.5px solid #d3d3d3",
            fontWeight: "bold",
          }}
        >
          취소하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveModal;
