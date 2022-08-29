import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, load } from "../../store/memberReducer";
import { modify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { inputOptionData } from "../../asset/inputOptionData";
import { checkPhoneNumber } from "../../libs/common";
import InputText from "../../components/InputText/InputText";
import InputSelect from "../../components/InputSelect/InputSelect";
import {
  Button,
  ButtonGroup,
  TextField,
  InputLabel,
  Typography,
  Stack,
  Divider,
  FormHelperText,
  Box,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SquareIcon from "@mui/icons-material/Square";
import { styles } from "./muiStyles";

function AddScreen() {
  const dispatch = useDispatch();
  const teamList = inputOptionData.teamList;
  const rankList = inputOptionData.rankList;
  const positionList = inputOptionData.positionList;
  const memberList = [...useSelector((state) => state.member.memberList)];
  const lastId = memberList?.pop()?.id;
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
    } else if (!checkPhoneNumber(inputMemberInfo.phone).status) {
      alert(checkPhoneNumber(inputMemberInfo.phone).message);
      return;
    } else {
      memberRepository.add(inputMemberInfo).then((res) => {
        dispatch(add(inputMemberInfo));
        dispatch(modify({ type: "confirm", openStatus: true }));
      });
    }
  };

  return (
    <Stack direction={"column"} sx={styles.container}>
      <Typography sx={styles.screenTitle}>직원 등록</Typography>
      <Stack
        direction={"column"}
        sx={styles.boxSection}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquareLarge} />
            필수입력사항
          </Typography>
          <Stack direction={"column"} sx={styles.inputContainer}>
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
              sx={styles.marginBottom}
            />
            <Box sx={styles.marginBottom}>
              <InputLabel sx={styles.inputLabel}>
                부서 <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <ButtonGroup
                style={{
                  marginBottom: "3px",
                  height: "45px",
                  width: "100%",
                }}
                id="input-team"
                aria-describedby="input-team-helper-text"
              >
                {teamList?.map((teamName, idx) => {
                  return (
                    <Button
                      onClick={handleChange}
                      name="team"
                      value={teamName}
                      key={teamName + idx}
                      style={{
                        width: "20%",
                        backgroundColor: teamButtonActive[teamName]
                          ? "#1976d2"
                          : "white",
                        color: teamButtonActive[teamName]
                          ? "white"
                          : requiredInputCheck.team
                          ? "#1976d2"
                          : "rgba(0,0,0,0.6)",
                        border: requiredInputCheck.team
                          ? "1px solid #1976d2"
                          : "1px solid red",
                      }}
                    >
                      {teamName}
                    </Button>
                  );
                })}
              </ButtonGroup>
              <Box style={{ height: "20px", marginTop: "3px" }}>
                {!requiredInputCheck.team && (
                  <FormHelperText
                    id="input-team-helper-text"
                    style={{ color: "red", height: "20px" }}
                  >
                    부서를 선택하세요.
                  </FormHelperText>
                )}
              </Box>
            </Box>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={styles.marginBottom}
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
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquareLarge} />
            연락처
          </Typography>
          <Stack direction={"column"} sx={styles.inputContainer}>
            <InputLabel sx={styles.inputLabel}>핸드폰</InputLabel>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={styles.inputPhoneSection}
            >
              <TextField
                value={phoneNumber[0]}
                name={"phone_1"}
                onChange={handleChange}
                placeholder={"010"}
                inputProps={{ maxLength: 3 }}
                sx={styles.inputPhone}
              />
              <span sx={styles.inputPhoneHyphen}>-</span>
              <TextField
                value={phoneNumber[1]}
                name={"phone_2"}
                onChange={handleChange}
                placeholder={"1234"}
                inputProps={{ maxLength: 4 }}
                sx={styles.inputPhone}
                inputRef={(input) =>
                  isPhoneFocused &&
                  phoneNumber[0].length === 3 &&
                  phoneNumber[2].length === 0 &&
                  input?.focus()
                }
              />
              <span sx={styles.inputPhoneHyphen}>-</span>
              <TextField
                value={phoneNumber[2]}
                name={"phone_3"}
                onChange={handleChange}
                placeholder={"5678"}
                inputProps={{ maxLength: 4 }}
                sx={styles.inputPhone}
                inputRef={(input) =>
                  isPhoneFocused &&
                  phoneNumber[0].length == 3 &&
                  phoneNumber[1].length == 4 &&
                  phoneNumber[2].length == 0 &&
                  input?.focus()
                }
              />
            </Stack>
            <InputLabel sx={styles.inputLabel}>메일주소</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo.email}
              name={"email"}
              sx={styles.marginBottom}
              onChange={handleChange}
              placeholder={"gdhong@pentasecurity.com"}
              inputProps={{ maxLength: 50 }}
            />
            <InputLabel sx={styles.inputLabel}>사무실번호</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo.officeNum}
              name={"officeNum"}
              sx={styles.marginBottom}
              onChange={handleChange}
              placeholder={"02-2125-0000"}
              inputProps={{ maxLength: 13 }}
            />
            <InputLabel sx={styles.inputLabel}>팩스번호</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo.faxNum}
              name={"faxNum"}
              sx={styles.marginBottom}
              onChange={handleChange}
              placeholder={"02-780-0000"}
              inputProps={{ maxLength: 13 }}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquareLarge} />
            기타사항
          </Typography>
          <Stack direction={"column"} sx={styles.inputContainer}>
            <InputLabel sx={styles.inputLabel}>생년월일</InputLabel>
            <TextField
              fullWidth
              type={"date"}
              value={inputMemberInfo.birth}
              name={"birth"}
              sx={styles.marginBottom}
              onChange={handleChange}
            />
            <InputLabel sx={styles.inputLabel}>담당업무</InputLabel>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={inputMemberInfo.task}
              name={"task"}
              sx={styles.marginBottom}
              onChange={handleChange}
              inputProps={{ maxLength: 200 }}
            />
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
        <Button variant="text" sx={styles.btnPositive} onClick={handleSubmit}>
          등록
        </Button>
      </Stack>
    </Stack>
  );
}

export default AddScreen;
