import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const content = useSelector((state) => state.modal.content);
  const type = location.pathname.split("/")[1];
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false, content: {} }));
  };

  const handleConfirm = () => {
    handleClose();
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
