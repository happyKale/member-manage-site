import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, load } from "../../store/memberReducer";
import { modify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { inputOptionData } from "../../asset/inputOptionData";
import { checkPhoneNumber } from "../../libs/common";
import { InputText, InputSelect, InputButtonGroup } from "../../components";
import {
  Button,
  TextField,
  InputLabel,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SquareIcon from "@mui/icons-material/Square";
import { styles as muiStyles } from "./muiStyles";
import styles from "./addScreen.module.css";

function AddScreen() {
  const dispatch = useDispatch();
  const teamList = inputOptionData.teamList;
  const rankList = inputOptionData.rankList;
  const positionList = inputOptionData.positionList;
  const memberList = useSelector((state) => state.member.memberList);
  const [lastId, setLastId] = useState([...memberList]?.pop()?.id);
  const checkPhoneValueIndex = ["phone_1", "phone_2", "phone_3"];

  const [phoneNumber, setPhoneNumber] = useState(["", "", ""]);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [teamButtonActive, setTeamButtonActive] = useState({
    DA팀: false,
    DE팀: false,
    DK팀: false,
    DP팀: false,
    DX팀: false,
  });
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

  const handleChange = (e) => {
    if (e.target.name === "team") {
      setInputMemberInfo({
        ...inputMemberInfo,
        team: inputMemberInfo.team == e.target.value ? "" : e.target.value,
      });
      const init = {
        DA팀: false,
        DE팀: false,
        DK팀: false,
        DP팀: false,
        DX팀: false,
      };
      setTeamButtonActive({
        ...init,
        [e.target.value]: !teamButtonActive[e.target.value],
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
      alert("필수 값을 모두 입력하세요.");
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
    <Stack sx={muiStyles.container}>
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
              requiredCheck={requiredInputCheck}
              ariaDescribedby={"input-team-helper-text"}
              helperText={"부서를 선택하세요."}
              teamList={teamList}
              onClick={handleChange}
              teamButtonActive={teamButtonActive}
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
            <InputLabel sx={muiStyles.inputLabel}>핸드폰</InputLabel>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={muiStyles.inputPhoneSection}
            >
              <TextField
                value={phoneNumber[0]}
                name={"phone_1"}
                onChange={handleChange}
                placeholder={"010"}
                inputProps={{ maxLength: 3 }}
                sx={muiStyles.inputPhone}
              />
              <span className={styles.inputPhoneHyphen}>-</span>
              <TextField
                value={phoneNumber[1]}
                name={"phone_2"}
                onChange={handleChange}
                placeholder={"1234"}
                inputProps={{ maxLength: 4 }}
                sx={muiStyles.inputPhone}
                inputRef={(input) =>
                  isPhoneFocused &&
                  phoneNumber[0].length === 3 &&
                  phoneNumber[2].length === 0 &&
                  input?.focus()
                }
              />
              <span className={styles.inputPhoneHyphen}>-</span>
              <TextField
                value={phoneNumber[2]}
                name={"phone_3"}
                onChange={handleChange}
                placeholder={"5678"}
                inputProps={{ maxLength: 4 }}
                sx={muiStyles.inputPhone}
                inputRef={(input) =>
                  isPhoneFocused &&
                  phoneNumber[0].length == 3 &&
                  phoneNumber[1].length == 4 &&
                  phoneNumber[2].length == 0 &&
                  input?.focus()
                }
              />
            </Stack>
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
