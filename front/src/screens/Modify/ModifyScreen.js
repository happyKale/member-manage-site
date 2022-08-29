import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load, modify as memberModify } from "../../store/memberReducer";
import { modify as modalModify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { inputOptionData } from "../../asset/inputOptionData";
import InputText from "../../components/InputText/InputText";
import InputSelect from "../../components/InputSelect/InputSelect";
import InputButtonGroup from "./../../components/InputButtonGroup/InputButtonGroup";
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
import { styles } from "./muiStyles";

function ModifyScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const teamList = inputOptionData.teamList;
  const rankList = inputOptionData.rankList;
  const positionList = inputOptionData.positionList;
  const memberInfo = useSelector((state) => state.member.selectedMemberInfo);
  const [inputMemberInfo, setInputMemberInfo] = useState({ ...memberInfo });
  const [requiredInputCheck, setRequiredInputCheck] = useState({
    name: true,
    team: true,
    rank: true,
    position: true,
  });
  const [teamButtonActive, setTeamButtonActive] = useState({});

  useEffect(() => {
    memberRepository.getOne(params.id).then((res) => {
      dispatch(load({ selectedMemberInfo: res.data }));
      setTeamButtonActive({
        DA팀: false,
        DE팀: false,
        DK팀: false,
        DP팀: false,
        DX팀: false,
        [res.data["team"]]: true,
      });
    });
  }, []);

  useEffect(() => {
    setInputMemberInfo(memberInfo);
  }, [memberInfo]);

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
    } else {
      memberRepository.update(params.id, inputMemberInfo).then((res) => {
        dispatch(memberModify(inputMemberInfo));
        dispatch(modalModify({ type: "confirm", openStatus: true }));
      });
    }
  };

  return (
    <Stack direction={"column"} style={{ padding: "50px 0" }}>
      <Typography sx={styles.screenTitle}>직원 수정</Typography>
      <Stack
        direction={"column"}
        sx={styles.screenContent}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquareLarge} />
            필수입력사항
          </Typography>
          <Stack sx={styles.inputContainer}>
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
          <Stack sx={styles.inputContainer}>
            <InputLabel sx={styles.inputLabel}>핸드폰</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo?.phone || ""}
              name={"phone"}
              style={{ marginBottom: "30px" }}
              onChange={handleChange}
              placeholder={"010-1234-5678"}
              inputProps={{ maxLength: 13 }}
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
        <Stack direction={"row"} sx={styles.section}>
          <Typography sx={styles.sectionTitle}>
            <SquareIcon sx={styles.iconSquareLarge} />
            기타사항
          </Typography>
          <Stack sx={styles.inputContainer}>
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
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Link to={`/detail/${params.id}`}>
          <Button variant="text" sx={styles.btnLarge}>
            <ArrowBackIosIcon sx={styles.iconArrow} />
            이전화면
          </Button>
        </Link>
        <Button variant="text" sx={styles.btnPositive} onClick={handleSubmit}>
          저장
        </Button>
      </Stack>
    </Stack>
  );
}

export default ModifyScreen;
