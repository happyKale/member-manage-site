import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { modify } from "../../store/modalReducer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modifySelectedIdList } from "../../store/memberReducer";

function ConfirmModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false }));
    dispatch(modifySelectedIdList([]));
    navigate(`/`);
  };

  const handleConfirm = () => {
    handleClose();
    navigate(`/`);
  };

  const handleStay = () => {
    const memberId = location.pathname.split("/").pop();
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false }));
    dispatch(modifySelectedIdList([]));
    if (type === "add") {
      window.location.reload();
    } else if (type === "modify") {
      navigate(`/detail/${memberId}`);
    }
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
        {type === "modify" ? "직원 명단 수정 확인" : "직원 명단 등록 확인"}
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent
        style={{ width: "500px", padding: "20px", margin: "20px 0" }}
      >
        <Typography style={{ fontWeight: "bold" }}>
          {type === "modify"
            ? "직원 명단이 수정되었습니다."
            : "직원 명단이 등록되었습니다."}
        </Typography>
        <Typography style={{ whiteSpace: "pre-wrap", marginTop: "30px" }}>
          {type === "modify"
            ? `홈으로 이동하시겠습니까? 아니면 상세화면에 머무르시겠습니까?`
            : `홈으로 이동하시겠습니다? 아니면 등록화면에 머무르시겠습니까?`}
        </Typography>
      </DialogContent>
      <DialogActions
        style={{ padding: "10px 20px 10px", borderTop: "1px solid #e5e5e5" }}
      >
        <Button
          onClick={handleConfirm}
          variant="text"
          style={{
            width: "110px",
            height: "35px",
            backgroundColor: "#1386d2",
            color: "white",
          }}
        >
          홈으로 이동
        </Button>
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
          onClick={handleStay}
        >
          머무르기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { ConfirmModal };
