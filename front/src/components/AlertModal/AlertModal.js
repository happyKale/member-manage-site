import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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
import { styles as muiStyles } from "./muiStyles";

function AlertModal() {
  const dispatch = useDispatch();
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false }));
  };

  const handleConfirm = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle onClose={handleClose} sx={muiStyles.dialogTitle}>
        {type === "" ? "삭제할 직원 명단 확인" : "직원 명단 항목 확인"}
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent sx={muiStyles.dialogContent}>
        <Typography sx={muiStyles.dialogContentTitle}>
          {type === ""
            ? "삭제할 직원 명단을 선택하세요."
            : "필수 항목을 모두 입력하세요."}
        </Typography>
      </DialogContent>
      <DialogActions sx={muiStyles.dialogActions}>
        <Button
          onClick={handleConfirm}
          variant="text"
          sx={muiStyles.btnPositive}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertModal;
