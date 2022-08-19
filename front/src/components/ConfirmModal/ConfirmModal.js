import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { modify } from "../../store/modalReducer";

function ConfirmModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const [open, setOpen] = useState(true);

  const handleClose = async () => {
    setOpen(false);
    await dispatch(
      modify({ type: "", openStatus: false, selectedMemberId: [] })
    );
    navigate(`/`);
  };

  const handleConfirm = () => {
    handleClose();
    navigate(`/`);
  };

  const handleStay = async () => {
    const memberId = location.pathname.split("/").pop();
    setOpen(false);
    await dispatch(
      modify({ type: "", openStatus: false, selectedMemberId: [] })
    );
    navigate(`/detail/${memberId}`);
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
        확인 모달
        <Button
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "green",
            marginRight: "15px",
            color: "white",
          }}
          onClick={handleConfirm}
        >
          확인
        </Button>
        {type === "modify" && (
          <Button
            style={{
              width: "80px",
              height: "35px",
              backgroundColor: "blue",
              marginRight: "15px",
              color: "white",
            }}
            onClick={handleStay}
          >
            머무르기
          </Button>
        )}
      </Box>
    </Modal>
  );
}

export { ConfirmModal };
