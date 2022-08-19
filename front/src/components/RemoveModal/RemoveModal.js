import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";
import { remove } from "../../store/memberReducer";
import { useLocation, useNavigate } from "react-router-dom";

function RemoveModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const type = location.pathname.split("/")[1];
  const selectedId = useSelector((state) => state.modal.selectedMemberId);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false, selectedMemberId: [] }));
  };

  const handleRemove = async () => {
    handleClose();
    if (type === "detail") {
      navigate("/");
    }
    await dispatch(remove({ selectedMemberId: selectedId }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          backgroundColor: "white",
        }}
      >
        삭제 모달
        <Button
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "green",
            marginRight: "15px",
            color: "white",
          }}
          onClick={handleRemove}
        >
          삭제하기
        </Button>
      </Box>
    </Modal>
  );
}

export { RemoveModal };
