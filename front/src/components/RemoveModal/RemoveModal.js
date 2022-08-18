import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";
import { remove } from "../../store/memberReducer";

function RemoveModal() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.modal.selectedMemberId);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false, selectedMemberId: [] }));
  };

  const handleRemove = async () => {
    await dispatch(remove({ selectedMemberId: selectedId }));
    dispatch(modify({ type: "", openStatus: false, selectedMemberId: [] }));
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
