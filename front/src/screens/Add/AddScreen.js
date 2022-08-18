import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/memberReducer";

const TEAMLIST = ["DA", "DE", "DK", "DP", "DX"];
const RANKLIST = ["사원", "대리", "과장", "차장", "부장"]; //직급
const POSITIONLIST = ["팀원", "팀장"]; //직책
const MARGINBOTTOM = "30px";

function AddScreen() {
  const dispatch = useDispatch();

  const memberList = useSelector((state) => state.member);
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

  const handleSubmit = () => {
    if (Object.values(requiredInputCheck).includes(false)) {
      alert("필수 값을 모두 입력하세요.");
    } else {
      dispatch(add(inputMemberInfo));
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
      <div>
        <h3>직원 등록</h3>
      </div>
      <div style={{ padding: "30px 0" }}>
        <TextField
          fullWidth
          required
          value={inputMemberInfo.name}
          name="name"
          label={"이름"}
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          value={inputMemberInfo.phone}
          name="phone"
          label={"핸드폰"}
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          value={inputMemberInfo.birth}
          label={"생년월일"}
          name="birth"
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        />
        <Select
          fullWidth
          name="team"
          value={inputMemberInfo.team}
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        >
          {TEAMLIST.map((team, idx) => {
            return (
              <MenuItem key={team + idx} value={`${team}`}>
                {team}
              </MenuItem>
            );
          })}
        </Select>
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
        <TextField
          fullWidth
          name="email"
          value={inputMemberInfo.email}
          label={"메일주소"}
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="officeNum"
          value={inputMemberInfo.officeNum}
          label={"사무실번호"}
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="faxNum"
          value={inputMemberInfo.faxNum}
          label={"팩스번호"}
          style={{ marginBottom: MARGINBOTTOM }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="task"
          value={inputMemberInfo.task}
          label={"담당업무"}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            style={{
              width: "80px",
              height: "35px",
              backgroundColor: "lightgray",
              color: "white",
            }}
          >
            목록
          </Button>
        </Link>
        <Button
          variant="text"
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "green",
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
