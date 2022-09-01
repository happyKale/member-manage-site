import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load, modify as memberModify } from "../../store/memberReducer";
import { modify as modalModify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { inputOptionData } from "../../asset/inputOptionData";
import {
  InputText,
  InputSelect,
  InputButtonGroup,
  InputPhone,
} from "../../components";
import { Button, Typography, Stack, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SquareIcon from "@mui/icons-material/Square";
import { styles as muiStyles } from "./muiStyles";

function ModifyScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teamList = inputOptionData.teamList;
  const rankList = inputOptionData.rankList;
  const positionList = inputOptionData.positionList;
  const memberInfo = useSelector((state) => state.member.selectedMemberInfo);
  const checkPhoneValueIndex = ["phone_1", "phone_2", "phone_3"];

  const [phoneNumber, setPhoneNumber] = useState(["", "", ""]);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [inputMemberInfo, setInputMemberInfo] = useState({ ...memberInfo });
  const [requiredInputCheck, setRequiredInputCheck] = useState({
    name: true,
    team: true,
    rank: true,
    position: true,
  });

  useEffect(() => {
    if (Object.values(memberInfo).length === 0) {
      memberRepository.getOne(params.id).then((res) => {
        dispatch(load({ selectedMemberInfo: res.data }));

        if (res.data.phone === "") {
          setPhoneNumber(["", "", ""]);
        } else {
          const numList = res.data.phone.split("-");
          setPhoneNumber([numList[0], numList[1], numList[2]]);
        }
      });
    } else {
      if (memberInfo.phone === "") {
        setPhoneNumber(["", "", ""]);
      } else {
        const numList = memberInfo.phone.split("-");
        setPhoneNumber([numList[0], numList[1], numList[2]]);
      }
    }
  }, []);

  useEffect(() => {
    setInputMemberInfo(memberInfo);
  }, [memberInfo]);

  const handleChange = (e, value) => {
    if (e.target.name === "team") {
      setIsPhoneFocused(false);
      setInputMemberInfo({
        ...inputMemberInfo,
        team: value,
      });
    } else if (checkPhoneValueIndex.includes(e.target.name)) {
      setIsPhoneFocused(true);
      const index = checkPhoneValueIndex.indexOf(e.target.name);
      const newPhone = [...phoneNumber];
      newPhone[index] = e.target.value;
      setPhoneNumber(newPhone);

      setInputMemberInfo({
        ...inputMemberInfo,
        ["phone"]: newPhone.join("-"),
      });
    } else {
      setIsPhoneFocused(false);
      setInputMemberInfo({
        ...inputMemberInfo,
        [e.target.name]: e.target.value,
      });
    }
    if (Object.keys(requiredInputCheck).indexOf(e.target.name) !== -1) {
      if (e.target.value !== "") {
        if (e.target.name === "team") {
          setRequiredInputCheck({
            ...requiredInputCheck,
            team: inputMemberInfo.team == e.target.value ? false : true,
          });
        } else {
          setRequiredInputCheck({
            ...requiredInputCheck,
            [e.target.name]: true,
          });
        }
      } else {
        setRequiredInputCheck({
          ...requiredInputCheck,
          [e.target.name]: false,
        });
      }
    }
  };

  const handleSubmit = () => {
    if (Object.values(requiredInputCheck).includes(false)) {
      dispatch(
        modalModify({
          type: "alert",
          openStatus: true,
          content: {
            title: "직원 명단 항목 확인",
            contentTitle: "필수 항목을 모두 입력하세요.",
          },
        })
      );
    } else {
      memberRepository.update(params.id, inputMemberInfo).then((res) => {
        dispatch(memberModify(inputMemberInfo));
        dispatch(
          modalModify({
            type: "confirm",
            openStatus: true,
            content: {
              title: "직원 명단 수정 확인",
              contentTitle: "직원 명단이 수정되었습니다.",
              contentText:
                "홈으로 이동하시겠습니까? 아니면 상세화면에 머무르시겠습니까?",
            },
          })
        );
      });
    }
  };

  return (
    <Stack sx={muiStyles.screenContainer}>
      <Typography sx={muiStyles.screenTitle}>직원 수정</Typography>
      <Stack
        sx={muiStyles.screenContent}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareLarge} />
            필수입력사항
          </Typography>
          <Stack sx={muiStyles.inputContainer}>
            <InputText
              label={"이름"}
              valueKey={"name"}
              placeholder={"홍길동"}
              inputProps={{ maxLength: 30 }}
              required
              requiredCheck={requiredInputCheck}
              onChange={handleChange}
              value={inputMemberInfo}
              helperText={"이름을 입력하세요."}
            />
            <InputButtonGroup
              label={"부서"}
              require
              valueKey={"team"}
              value={inputMemberInfo}
              requiredCheck={requiredInputCheck}
              ariaDescribedby={"input-team-helper-text"}
              helperText={"부서를 선택하세요."}
              teamList={teamList}
              onChange={handleChange}
            />
            <Stack
              sx={{ ...muiStyles.input2Column, ...muiStyles.marginBottom }}
            >
              <InputSelect
                label={"직책"}
                require
                requiredCheck={requiredInputCheck}
                valueKey={"position"}
                onChange={handleChange}
                value={inputMemberInfo}
                ariaDescribedby={"input-position-helper-text"}
                itemList={positionList}
                helperText={"직책을 선택하세요."}
              />
              <InputSelect
                label={"직급"}
                require
                requiredCheck={requiredInputCheck}
                valueKey={"rank"}
                onChange={handleChange}
                value={inputMemberInfo}
                ariaDescribedby={"input-rank-helper-text"}
                itemList={rankList}
                helperText={"직급을 선택하세요."}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareLarge} />
            연락처
          </Typography>
          <Stack sx={muiStyles.inputContainer}>
            <InputPhone
              label={"핸드폰"}
              value={phoneNumber}
              onChange={handleChange}
              isPhoneFocused={isPhoneFocused}
            />
            <InputText
              label={"메일주소"}
              valueKey={"email"}
              onChange={handleChange}
              value={inputMemberInfo}
              placeholder={"gdhong@pentasecurity.com"}
              inputProps={{ maxLength: 50 }}
            />
            <InputText
              label={"사무실번호"}
              valueKey={"officeNum"}
              onChange={handleChange}
              value={inputMemberInfo}
              placeholder={"02-2125-0000"}
              inputProps={{ maxLength: 13 }}
            />
            <InputText
              label={"팩스번호"}
              valueKey={"faxNum"}
              onChange={handleChange}
              value={inputMemberInfo}
              placeholder={"02-780-0000"}
              inputProps={{ maxLength: 13 }}
            />
          </Stack>
        </Stack>
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareLarge} />
            기타사항
          </Typography>
          <Stack sx={muiStyles.inputContainer}>
            <InputText
              label={"생년월일"}
              type={"date"}
              valueKey={"birth"}
              onChange={handleChange}
              value={inputMemberInfo}
            />
            <InputText
              label={"담당업무"}
              valueKey={"task"}
              inputProps={{ maxLength: 200 }}
              onChange={handleChange}
              value={inputMemberInfo}
              rows={5}
              multiline
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={muiStyles.screenFooter}>
        <Button
          variant="text"
          sx={muiStyles.btnLarge}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosIcon sx={muiStyles.iconArrow} />
          이전화면
        </Button>
        <Button
          variant="text"
          sx={muiStyles.btnPositive}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </Stack>
    </Stack>
  );
}

export default ModifyScreen;
