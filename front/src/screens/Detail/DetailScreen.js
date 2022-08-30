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
import { styles as muiStyles } from "./muiStyles";

const Item = ({ label, content }) => {
  return (
    <Stack sx={muiStyles.inputContainer}>
      <Box sx={muiStyles.inputSectionTitle}>
        <Typography sx={muiStyles.inputTitleText}>{label}</Typography>
      </Box>
      <Box sx={muiStyles.inputSectionValue}>
        {label !== "담당업무" ? (
          <Typography sx={muiStyles.inputValueText}>{content}</Typography>
        ) : (
          <TextareaAutosize
            minRows={5}
            readOnly
            style={muiStyles.inputValueTextArea}
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
    <Stack sx={muiStyles.screenContainer}>
      <Typography sx={muiStyles.screenTitle}>직원 정보</Typography>
      <Stack
        sx={muiStyles.boxSection}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareSmall} />
            기본 직원 정보
          </Typography>
          <Stack sx={muiStyles.sectionInputBox}>
            <Item label={"이름"} content={memberInfo?.name} />
            <Item label={"부서"} content={memberInfo?.team} />
            <Item label={"직급"} content={memberInfo?.rank} />
            <Item label={"직책"} content={memberInfo?.position} />
          </Stack>
        </Stack>
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareSmall} />
            직원 연락처
          </Typography>
          <Stack sx={muiStyles.sectionInputBox}>
            <Item label={"핸드폰"} content={memberInfo?.phone} />
            <Item label={"메일주소"} content={memberInfo?.email} />
            <Item label={"사무실번호"} content={memberInfo?.officeNum} />
            <Item label={"팩스번호"} content={memberInfo?.faxNum} />
          </Stack>
        </Stack>
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareSmall} />
            기타 직원 정보
          </Typography>
          <Stack sx={muiStyles.sectionInputBox}>
            <Item label={"생년월일"} content={memberInfo?.birth} />
            <Item label={"담당업무"} content={memberInfo?.task} />
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={muiStyles.screenFooter}>
        <Link to={"/"}>
          <Button variant="text" sx={muiStyles.btnSmall}>
            <ArrowBackIosIcon sx={muiStyles.iconArrow} />
            목록
          </Button>
        </Link>
        <div>
          <Link to={`/modify/${params.id}`}>
            <Button
              variant="text"
              sx={{ ...muiStyles.btnPositive, ...muiStyles.btnMargin }}
            >
              수정
            </Button>
          </Link>
          <Button variant="text" sx={muiStyles.btnSmall} onClick={handleRemove}>
            삭제
          </Button>
        </div>
      </Stack>
    </Stack>
  );
}

export default DetailScreen;
