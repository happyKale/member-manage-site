import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { load, modify as memberModify } from "../../store/memberReducer";
import { modify as modalModify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const TEAMLIST = ["DA팀", "DE팀", "DK팀", "DP팀", "DX팀"];
const RANKLIST = ["사원", "대리", "과장", "차장", "부장"]; //직급
const POSITIONLIST = ["팀원", "팀장"]; //직책
const MARGINBOTTOM = "30px";

function ModifyScreen() {
  const params = useParams();
  const dispatch = useDispatch();

  const memberInfo = useSelector((state) => state.member.selectedMemberInfo);

  const [inputMemberInfo, setInputMemberInfo] = useState(memberInfo);
  const [requiredInputCheck, setRequiredInputCheck] = useState({
    name: memberInfo["name"] ? true : false,
    team: memberInfo["team"] ? true : false,
    rank: memberInfo["rank"] ? true : false,
    position: memberInfo["position"] ? true : false,
  });

  useEffect(() => {
    memberRepository.getOne(params.id).then((res) => {
      dispatch(load({ selectedMemberInfo: res.data }));
    });
  }, []);

  useEffect(() => {
    setInputMemberInfo(memberInfo);
  }, [memberInfo]);

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
      await dispatch(memberModify(inputMemberInfo));
      dispatch(modalModify({ type: "confirm", openStatus: true }));
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
        <h3>직원 수정: {params.id}</h3>
      </div>
      <div style={{ padding: "30px 0" }}>
        <TextField
          fullWidth
          required
          name="name"
          error={requiredInputCheck["name"] === true ? false : true}
          helperText={
            requiredInputCheck["name"] === true ? "" : "이름을 입력하세요."
          }
          label={"이름"}
          style={{ marginBottom: MARGINBOTTOM }}
          value={inputMemberInfo?.name || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="phone"
          label={"핸드폰"}
          style={{ marginBottom: MARGINBOTTOM }}
          value={inputMemberInfo?.phone || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="birth"
          label={"생년월일"}
          style={{ marginBottom: MARGINBOTTOM }}
          value={inputMemberInfo?.birth || ""}
          onChange={handleChange}
        />
        <Select
          fullWidth
          required
          name="team"
          label={"부서"}
          style={{ marginBottom: MARGINBOTTOM }}
          defaultValue=""
          value={inputMemberInfo?.team || ""}
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
          required
          name="rank"
          label={"직급"}
          style={{ marginBottom: MARGINBOTTOM }}
          defaultValue=""
          value={inputMemberInfo?.rank || ""}
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
          required
          name="position"
          label={"직책"}
          style={{ marginBottom: MARGINBOTTOM }}
          defaultValue=""
          value={inputMemberInfo?.position || ""}
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
          label={"메일주소"}
          style={{ marginBottom: MARGINBOTTOM }}
          value={inputMemberInfo?.email || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="officeNum"
          label={"사무실번호"}
          style={{ marginBottom: MARGINBOTTOM }}
          value={inputMemberInfo?.officeNum || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="faxNum"
          label={"팩스번호"}
          style={{ marginBottom: MARGINBOTTOM }}
          value={inputMemberInfo?.faxNum || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="task"
          label={"담당업무"}
          value={inputMemberInfo?.task || ""}
          onChange={handleChange}
        />
      </div>
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
