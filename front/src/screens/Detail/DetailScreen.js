import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";
import Stack from "@mui/material/Stack";

function DetailScreen() {
  const params = useParams();

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
        <Item label={"이름"} content={"김세연"} />
        <Item label={"핸드폰"} content={"010-9270-1210"} />
        <Item label={"생년월일"} content={"19961202"} />
        <Item label={"부서"} content={"부서"} />
        <Item label={"직급"} content={"직급"} />
        <Item label={"직책"} content={"직책"} />
        <Item label={"메일주소"} content={"syk767@naver.com"} />
        <Item label={"사무실번호"} content={"1234"} />
        <Item label={"팩스번호"} content={"6789"} />
        <Item label={"담당업무"} content={"업무"} />
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
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export { DetailScreen };
