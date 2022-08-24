import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load, modify as memberModify } from "../../store/memberReducer";
import { modify as modalModify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import {
  Button,
  ButtonGroup,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Stack,
  Divider,
  FormHelperText,
  Box,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SquareIcon from "@mui/icons-material/Square";

const MARGINBOTTOM = "30px";

function ModifyScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const teamList = useSelector((state) => state.inputOption.teamList);
  const rankList = useSelector((state) => state.inputOption.rankList);
  const positionList = useSelector((state) => state.inputOption.positionList);
  const memberInfo = useSelector((state) => state.member.selectedMemberInfo);
  const [inputMemberInfo, setInputMemberInfo] = useState(memberInfo);
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
    setInputMemberInfo({
      ...inputMemberInfo,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "team") {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "50px 0",
      }}
    >
      <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
        직원 수정
      </Typography>
      <Stack
        direction={"column"}
        style={{
          borderTop: "1px solid #e5e5e5",
          borderBottom: "1px solid #e5e5e5",
          margin: "30px 0",
        }}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack direction={"row"} margin={"20px 0"}>
          <Typography
            style={{
              width: "35%",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#5b5b5b",
            }}
          >
            <SquareIcon
              style={{
                fontSize: "12px",
                marginRight: "5px",
                paddingBottom: "3px",
              }}
            />
            필수입력사항
          </Typography>
          <Stack style={{ width: "65%" }}>
            <Box style={{ marginBottom: `${MARGINBOTTOM}` }}>
              <InputLabel style={{ margin: "0 0 5px 0" }}>
                이름 <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                fullWidth
                error={requiredInputCheck.name ? false : true}
                id="input-name"
                aria-describedby="input-name-helper-text"
                value={inputMemberInfo?.name || ""}
                name={"name"}
                onChange={handleChange}
              />
              <Box style={{ height: "20px", marginTop: "3px" }}>
                {!requiredInputCheck.name && (
                  <FormHelperText
                    id="input-name-helper-text"
                    style={{ color: "red", height: "20px" }}
                  >
                    이름을 입력하세요.
                  </FormHelperText>
                )}
              </Box>
            </Box>
            <Box style={{ marginBottom: `${MARGINBOTTOM}` }}>
              <InputLabel style={{ margin: "0 0 5px 0" }}>
                부서 <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <ButtonGroup
                style={{
                  marginBottom: "3px",
                  height: "45px",
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
              style={{ marginBottom: `${MARGINBOTTOM}` }}
            >
              <Box style={{ width: "46%" }}>
                <InputLabel style={{ margin: "0 0 5px 0" }}>
                  직책 <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  error={requiredInputCheck.position ? false : true}
                  id="input-position"
                  name="position"
                  aria-describedby="input-position-helper-text"
                  value={inputMemberInfo?.position || ""}
                  onChange={handleChange}
                >
                  {positionList?.map((position, idx) => {
                    return (
                      <MenuItem key={position + idx} value={`${position}`}>
                        {position}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Box style={{ height: "20px", marginTop: "3px" }}>
                  {!requiredInputCheck.position && (
                    <FormHelperText
                      id="input-position-helper-text"
                      style={{ color: "red", height: "20px" }}
                    >
                      직책을 선택하세요.
                    </FormHelperText>
                  )}
                </Box>
              </Box>
              <Box style={{ width: "46%" }}>
                <InputLabel style={{ margin: "0 0 5px 0" }}>
                  직급 <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  error={requiredInputCheck.rank ? false : true}
                  id="input-rank"
                  name="rank"
                  aria-describedby="input-rank-helper-text"
                  value={inputMemberInfo?.rank || ""}
                  onChange={handleChange}
                >
                  {rankList?.map((rank, idx) => {
                    return (
                      <MenuItem key={rank + idx} value={`${rank}`}>
                        {rank}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Box style={{ height: "20px", marginTop: "3px" }}>
                  {!requiredInputCheck.rank && (
                    <FormHelperText
                      id="input-rank-helper-text"
                      style={{ color: "red", height: "20px" }}
                    >
                      직급을 선택하세요.
                    </FormHelperText>
                  )}
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} margin={"20px 0"}>
          <Typography
            style={{
              width: "35%",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#5b5b5b",
            }}
          >
            <SquareIcon
              style={{
                fontSize: "12px",
                marginRight: "5px",
                paddingBottom: "3px",
              }}
            />
            연락처
          </Typography>
          <Stack style={{ width: "65%" }}>
            <InputLabel style={{ margin: "0 0 5px 0" }}>핸드폰</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo?.phone || ""}
              name={"phone"}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            />
            <InputLabel style={{ margin: "0 0 5px 0" }}>메일주소</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo?.email || ""}
              name={"email"}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            />
            <InputLabel style={{ margin: "0 0 5px 0" }}>사무실번호</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo?.officeNum || ""}
              name={"officeNum"}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            />
            <InputLabel style={{ margin: "0 0 5px 0" }}>팩스번호</InputLabel>
            <TextField
              fullWidth
              value={inputMemberInfo?.faxNum || ""}
              name={"faxNum"}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} margin={"20px 0"}>
          <Typography
            style={{
              width: "35%",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#5b5b5b",
            }}
          >
            <SquareIcon
              style={{
                fontSize: "12px",
                marginRight: "5px",
                paddingBottom: "3px",
              }}
            />
            기타사항
          </Typography>
          <Stack style={{ width: "65%" }}>
            <InputLabel style={{ margin: "0 0 5px 0" }}>생년월일</InputLabel>
            <TextField
              fullWidth
              type={"date"}
              value={inputMemberInfo?.birth || ""}
              name={"birth"}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            />
            <InputLabel style={{ margin: "0 0 5px 0" }}>담당업무</InputLabel>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={inputMemberInfo?.task || ""}
              name={"task"}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      </Stack>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`/detail/${params.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            style={{
              width: "110px",
              height: "35px",
              backgroundColor: "white",
              color: "gray",
              border: "1.5px solid #d3d3d3",
              fontWeight: "bold",
            }}
          >
            <ArrowBackIosIcon fontSize="14px" />
            이전화면
          </Button>
        </Link>
        <Button
          variant="text"
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "#1386d2",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </div>
    </div>
  );
}

export { ModifyScreen };
