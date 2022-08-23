import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";
import { remove } from "../../store/memberReducer";
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

const COLUMNS = [
  { field: "name", headerName: "사원명", width: 110 },
  { field: "team", headerName: "부서", width: 100 },
  { field: "position", headerName: "직책", width: 100 },
  { field: "rank", headerName: "직급", width: 100 },
];

function RemoveModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const type = location.pathname.split("/")[1];
  const selectedId = useSelector((state) => state.modal.selectedMemberId);
  const memberList = useSelector((state) => state.member.memberList);
  const rows = memberList?.filter((member) => {
    if (selectedId.includes(member.id)) {
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
    dispatch(modify({ type: "", openStatus: false, selectedMemberId: [] }));
  };

  const handleRemove = () => {
    handleClose();
    if (type === "detail") {
      navigate("/");
    }
    memberRepository.delete({ selectedId: selectedId }).then((res) => {
      dispatch(remove({ selectedMemberId: selectedId }));
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
          선택된 직원 명단 개수: {selectedId.length}
        </Typography>
        <Typography style={{ marginTop: "30px" }}>
          아래 직원 명단을 삭제하시겠습니까?
        </Typography>
        <DataGrid
          headerHeight={40}
          rowHeight={45}
          style={{ height: "250px", width: "460px", margin: "20px auto" }}
          columns={COLUMNS}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </DialogContent>
      <DialogActions
        style={{ padding: "10px 20px 10px", borderTop: "1px solid #e5e5e5" }}
      >
        <Button
          onClick={handleRemove}
          style={{ backgroundColor: "#1386d2", color: "white" }}
        >
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { RemoveModal };
