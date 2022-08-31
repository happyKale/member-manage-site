import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { modify } from "../../store/modalReducer";
import { modifySelectedIdList } from "../../store/memberReducer";
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

function ConfirmModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const content = useSelector((state) => state.modal.content);
  const type = location.pathname.split("/")[1];
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false, content: {} }));
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
      <DialogTitle onClose={handleClose} sx={muiStyles.dialogTitle}>
        {content?.title}
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent sx={muiStyles.dialogContent}>
        <Typography sx={muiStyles.dialogContentTitle}>
          {content?.contentTitle}
        </Typography>
        <Typography sx={muiStyles.dialogContentText}>
          {content?.contentText}
        </Typography>
      </DialogContent>
      <DialogActions sx={muiStyles.dialogActions}>
        <Button
          onClick={handleConfirm}
          variant="text"
          sx={muiStyles.btnPositive}
        >
          홈으로 이동
        </Button>
        <Button variant="text" sx={muiStyles.btnSmall} onClick={handleStay}>
          머무르기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
