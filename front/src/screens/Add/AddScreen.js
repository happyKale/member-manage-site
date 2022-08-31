import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, load } from "../../store/memberReducer";
import { modify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { inputOptionData } from "../../asset/inputOptionData";
import { checkPhoneNumber } from "../../libs/common";
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

function AddScreen() {
  const dispatch = useDispatch();
  const teamList = inputOptionData.teamList;
  const rankList = inputOptionData.rankList;
  const positionList = inputOptionData.positionList;
  const memberList = useSelector((state) => state.member.memberList);
  const [lastId, setLastId] = useState(0);
  const checkPhoneValueIndex = ["phone_1", "phone_2", "phone_3"];

  const [phoneNumber, setPhoneNumber] = useState(["", "", ""]);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [inputMemberInfo, setInputMemberInfo] = useState({
    id: lastId + 1,
    name: "",
    phone: "",
    birth: "",
    team: "",
    position: "", // 직책
    rank: "", // 직급
    email: "",
    officeNum: "",
    faxNum: "",
    task: "",
  });
  const [requiredInputCheck, setRequiredInputCheck] = useState({
    name: false,
    team: false,
    rank: false,
    position: false,
  });

  useEffect(() => {
    if (memberList.length == 0) {
      memberRepository.getAll().then((res) => {
        dispatch(load({ memberList: Object.values(res.data) }));
      });
    }
  }, []);

  useEffect(() => {
    setLastId([...memberList]?.pop()?.id);
    setInputMemberInfo({
      ...inputMemberInfo,
      id: [...memberList]?.pop()?.id + 1,
    });
  }, [memberList]);

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
        modify({
          type: "alert",
          openStatus: true,
          content: {
            title: "직원 명단 항목 확인",
            contentTitle: "필수 항목을 모두 입력하세요.",
          },
        })
      );
      return;
    } else if (!checkPhoneNumber(inputMemberInfo?.phone)?.status) {
      alert(checkPhoneNumber(inputMemberInfo?.phone)?.message);
      return;
    } else {
      memberRepository.add(inputMemberInfo).then((res) => {
        dispatch(add(inputMemberInfo));
        dispatch(modify({ type: "confirm", openStatus: true }));
      });
    }
  };

  return (
    <Stack sx={muiStyles.screenContainer}>
      <Typography sx={muiStyles.screenTitle}>직원 등록</Typography>
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
              name={"name"}
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
              name={"team"}
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
                name={"position"}
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
                name={"rank"}
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
              name={"email"}
              onChange={handleChange}
              value={inputMemberInfo}
              placeholder={"gdhong@pentasecurity.com"}
              inputProps={{ maxLength: 50 }}
            />
            <InputText
              label={"사무실번호"}
              name={"officeNum"}
              onChange={handleChange}
              value={inputMemberInfo}
              placeholder={"02-2125-0000"}
              inputProps={{ maxLength: 13 }}
            />
            <InputText
              label={"팩스번호"}
              name={"faxNum"}
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
              name={"birth"}
              onChange={handleChange}
              value={inputMemberInfo}
            />
            <InputText
              label={"담당업무"}
              name={"task"}
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
        <Link to={"/"}>
          <Button variant="text" sx={muiStyles.btnSmall}>
            <ArrowBackIosIcon sx={muiStyles.iconArrow} />
            목록
          </Button>
        </Link>
        <Button
          variant="text"
          sx={muiStyles.btnPositive}
          onClick={handleSubmit}
        >
          등록
        </Button>
      </Stack>
    </Stack>
  );
}

export default AddScreen;
