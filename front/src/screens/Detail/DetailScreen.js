import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";

const Item = ({ label, content }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{
        border: "1px solid lightgrey",
        height: "50px",
        marginBottom: "10px",
        borderRadius: "4px",
      }}
    >
      <span
        style={{
          backgroundColor: "lightgrey",
          display: "inline-block",
          width: "25%",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          lineHeight: "45px",
          paddingLeft: "15px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: "inline-block",
          width: "75%",
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px",
          lineHeight: "45px",
          paddingLeft: "15px",
        }}
      >
        {content}
      </span>
    </Stack>
  );
};

function DetailScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const memberList = useSelector((state) => state.member);
  const memberInfo = memberList.filter(
    (member) => member.id === Number(params.id)
  )[0];

  const handleRemove = () => {
    dispatch(
      modify({
        type: "remove",
        openStatus: true,
        selectedMemberId: [Number(params.id)],
      })
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
      <div>
        <h3>직원 정보: {params.id}</h3>
      </div>
      <Box sx={{ width: "100%" }}>
        <Item label={"이름"} content={memberInfo.name} />
        <Item label={"핸드폰"} content={memberInfo.phone} />
        <Item label={"생년월일"} content={memberInfo.birth} />
        <Item label={"부서"} content={memberInfo.team} />
        <Item label={"직급"} content={memberInfo.rank} />
        <Item label={"직책"} content={memberInfo.position} />
        <Item label={"메일주소"} content={memberInfo.email} />
        <Item label={"사무실번호"} content={memberInfo.officeNum} />
        <Item label={"팩스번호"} content={memberInfo.faxNum} />
        <Item label={"담당업무"} content={memberInfo.task} />
      </Box>
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
        <div>
          <Link to={`/modify/${params.id}`} style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              style={{
                width: "80px",
                height: "35px",
                backgroundColor: "blue",
                marginRight: "15px",
                color: "white",
              }}
            >
              수정
            </Button>
          </Link>
          <Button
            variant="text"
            style={{
              width: "80px",
              height: "35px",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={handleRemove}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export { DetailScreen };
