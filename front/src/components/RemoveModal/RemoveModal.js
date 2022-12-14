import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";
import { modifySelectedIdList, remove } from "../../store/memberReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { memberRepository } from "./../../repositories/member-repository";
import { dataGridColumnData } from "./../../asset/dataGridColumnData";
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
import { styles as muiStyles } from "./muiStyles";

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
  const content = useSelector((state) => state.modal.content);

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(modify({ type: "", openStatus: false, content: {} }));
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
      <DialogTitle onClose={handleClose} sx={muiStyles.dialogTitle}>
        {content?.title}
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent sx={muiStyles.dialogContent}>
        <Typography sx={muiStyles.dialogContentTitle}>
          {content?.contentTitle}: {selectedIdList?.length}
        </Typography>
        <Typography sx={muiStyles.dialogContentText}>
          {content?.contentText}
        </Typography>
        <DataGrid
          headerHeight={40}
          rowHeight={45}
          sx={muiStyles.dialogDataGrid}
          columns={COLUMNS}
          rows={memberList.length === 0 ? [selectedMemberInfo] : rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </DialogContent>
      <DialogActions sx={muiStyles.dialogActions}>
        <Button
          onClick={handleRemove}
          variant="text"
          sx={muiStyles.btnPositive}
        >
          ????????????
        </Button>
        <Button onClick={handleClose} variant="text" sx={muiStyles.btnSmall}>
          ????????????
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveModal;
