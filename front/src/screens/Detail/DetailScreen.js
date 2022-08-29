import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";
import { load, modifySelectedIdList } from "../../store/memberReducer";
import { memberRepository } from "../../repositories/member-repository";
import {
  Button,
  Stack,
  Typography,
  Divider,
  TextareaAutosize,
  Box,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SquareIcon from "@mui/icons-material/Square";
import { styles } from "./muiStyles";

const Item = ({ label, content }) => {
  return (
    <Stack direction="row" spacing={2} sx={styles.inputContainer}>
      <Box sx={styles.inputSectionTitle}>
        <Typography sx={styles.inputTitle}>{label}</Typography>
      </Box>
      <Box sx={styles.inputSectionValue}>
        {label !== "담당업무" ? (
          <Typography sx={styles.inputValueText}>{content}</Typography>
        ) : (
          <TextareaAutosize
            minRows={5}
            readOnly
            style={styles.inputValueTextArea}
            value={content ?? ""}
          />
        )}
      </Box>
    </Stack>
  );
};

function DetailScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const memberInfo = useSelector((state) => state.member.selectedMemberInfo);

  useEffect(() => {
    memberRepository.getOne(params.id).then((res) => {
      dispatch(load({ selectedMemberInfo: res.data }));
    });
  }, []);

  const handleRemove = () => {
    dispatch(
      modify({
        type: "remove",
        openStatus: true,
      })
    );
    dispatch(modifySelectedIdList([Number(params.id)]));
  };

  return (
    <Stack direction={"column"} sx={styles.container}>
      <Typography sx={styles.screenTitle}>직원 정보</Typography>
      <Stack
        direction={"column"}
        sx={styles.boxSection}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquare} />
            기본 직원 정보
          </Typography>
          <Stack sx={styles.sectionInputBox}>
            <Item label={"이름"} content={memberInfo?.name} />
            <Item label={"부서"} content={memberInfo?.team} />
            <Item label={"직급"} content={memberInfo?.rank} />
            <Item label={"직책"} content={memberInfo?.position} />
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquare} />
            직원 연락처
          </Typography>
          <Stack sx={styles.sectionInputBox}>
            <Item label={"핸드폰"} content={memberInfo?.phone} />
            <Item label={"메일주소"} content={memberInfo?.email} />
            <Item label={"사무실번호"} content={memberInfo?.officeNum} />
            <Item label={"팩스번호"} content={memberInfo?.faxNum} />
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquare} />
            기타 직원 정보
          </Typography>
          <Stack sx={styles.sectionInputBox}>
            <Item label={"생년월일"} content={memberInfo?.birth} />
            <Item label={"담당업무"} content={memberInfo?.task} />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button variant="text" sx={styles.btn}>
            <ArrowBackIosIcon sx={styles.iconArrow} />
            목록
          </Button>
        </Link>
        <div>
          <Link to={`/modify/${params.id}`} style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{ ...styles.btnPositive, ...styles.btnMargin }}
            >
              수정
            </Button>
          </Link>
          <Button variant="text" sx={styles.btn} onClick={handleRemove}>
            삭제
          </Button>
        </div>
      </Stack>
    </Stack>
  );
}

export default DetailScreen;
