import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/memberReducer";
import { modify } from "../../store/modalReducer";
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
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const RANKLIST = ["사원", "대리", "과장", "차장", "부장"]; //직급
const POSITIONLIST = ["팀원", "팀장"]; //직책
const MARGINBOTTOM = "30px";

function AddScreen() {
  const dispatch = useDispatch();
  const memberList = useSelector((state) => state.member.memberList);
  const lastId = memberList
    .map((member) => {
      return member.id;
    })
    .sort()
    .pop();
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

  const handleChange = (e) => {
    setInputMemberInfo({ ...inputMemberInfo, [e.target.name]: e.target.value });
    if (Object.keys(requiredInputCheck).indexOf(e.target.name) !== -1) {
      if (e.target.value !== "") {
        setRequiredInputCheck({ ...requiredInputCheck, [e.target.name]: true });
      } else {
        setRequiredInputCheck({
          ...requiredInputCheck,
          [e.target.name]: false,
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (Object.values(requiredInputCheck).includes(false)) {
      alert("필수 값을 모두 입력하세요.");
    } else {
      await dispatch(add(inputMemberInfo));
      dispatch(modify({ type: "confirm", openStatus: true }));
    }
  };

  const InputText = ({ label, required, name, value }) => {
    return (
      <>
        <InputLabel style={{ margin: "0 0 5px 0" }}>
          {label}
          {required ? <span style={{ color: "red" }}>*</span> : ""}
        </InputLabel>
        <TextField
          fullWidth
          required={required}
          value={value}
          name={name}
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        />
      </>
    );
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
        직원 등록
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
            필수입력사항
          </Typography>
          <Stack style={{ width: "65%" }}>
            <InputText
              label={"이름"}
              required
              name={"name"}
              value={inputMemberInfo.name}
            />
            <InputLabel style={{ margin: "0 0 5px 0" }}>
              부서 <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <ButtonGroup style={{ marginBottom: MARGINBOTTOM }}>
              <Button>DA팀</Button>
              <Button>DE팀</Button>
              <Button>DK팀</Button>
              <Button>DP팀</Button>
              <Button>DX팀</Button>
            </ButtonGroup>
            <InputLabel style={{ margin: "0 0 5px 0" }}>
              직책 <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              fullWidth
              name="position"
              value={inputMemberInfo.position}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            >
              {POSITIONLIST.map((position, idx) => {
                return (
                  <MenuItem key={position + idx} value={`${position}`}>
                    {position}
                  </MenuItem>
                );
              })}
            </Select>
            <InputLabel style={{ margin: "0 0 5px 0" }}>
              직급 <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              fullWidth
              name="rank"
              value={inputMemberInfo.rank}
              style={{ marginBottom: MARGINBOTTOM }}
              onChange={handleChange}
            >
              {RANKLIST.map((rank, idx) => {
                return (
                  <MenuItem key={rank + idx} value={`${rank}`}>
                    {rank}
                  </MenuItem>
                );
              })}
            </Select>
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
            연락처
          </Typography>
          <Stack style={{ width: "65%" }}>
            <InputText
              label={"핸드폰"}
              name={"phone"}
              value={inputMemberInfo.phone}
            />
            <InputText
              label={"메일주소"}
              name={"email"}
              value={inputMemberInfo.email}
            />
            <InputText
              label={"사무실번호"}
              name={"officeNum"}
              value={inputMemberInfo.officeNum}
            />
            <InputText
              label={"팩스번호"}
              name={"faxNum"}
              value={inputMemberInfo.faxNum}
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
            기타사항
          </Typography>
          <Stack>
            <InputText
              label={"생년월일"}
              name={"birth"}
              value={inputMemberInfo.birth}
            />
            <InputText
              label={"담당업무"}
              name={"task"}
              value={inputMemberInfo.task}
            />
          </Stack>
        </Stack>
      </Stack>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            style={{
              width: "80px",
              height: "35px",
              backgroundColor: "white",
              color: "gray",
              border: "1.5px solid #d3d3d3",
              fontWeight: "bold",
            }}
          >
            <ArrowBackIosIcon fontSize="14px" />
            목록
          </Button>
        </Link>
        <Button
          variant="text"
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "#1386d2",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          등록
        </Button>
      </div>
    </div>
  );
}

export { AddScreen };
