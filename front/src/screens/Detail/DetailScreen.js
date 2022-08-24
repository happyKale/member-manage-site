import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../store/modalReducer";
import { load } from "../../store/memberReducer";
import { memberRepository } from "../../repositories/member-repository";
import { Button, Box, Stack, Typography, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SquareIcon from "@mui/icons-material/Square";

const Item = ({ label, content }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{
        border: "1px solid #eef2f5",
        height: "50px",
        marginBottom: "10px",
        borderRadius: "2px",
      }}
    >
      <span
        style={{
          backgroundColor: "#eef2f5",
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
          paddingLeft: "10px",
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
  const memberInfo = useSelector((state) => state.member.selectedMemberInfo);

  useEffect(() => {
    memberRepository.getOne(params.id).then((res) => {
      dispatch(load({ selectedMemberInfo: res.data }));
    });
  }, []);

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
      <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
        직원 정보
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
              width: "25%",
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
            기본 직원 정보
          </Typography>
          <Stack style={{ width: "75%" }}>
            <Item label={"이름"} content={memberInfo?.name} />
            <Item label={"부서"} content={memberInfo?.team} />
            <Item label={"직급"} content={memberInfo?.rank} />
            <Item label={"직책"} content={memberInfo?.position} />
          </Stack>
        </Stack>
        <Stack direction={"row"} margin={"20px 0"}>
          <Typography
            style={{
              width: "25%",
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
            직원 연락처
          </Typography>
          <Stack style={{ width: "75%" }}>
            <Item label={"핸드폰"} content={memberInfo?.phone} />
            <Item label={"메일주소"} content={memberInfo?.email} />
            <Item label={"사무실번호"} content={memberInfo?.officeNum} />
            <Item label={"팩스번호"} content={memberInfo?.faxNum} />
          </Stack>
        </Stack>
        <Stack direction={"row"} margin={"20px 0"}>
          <Typography
            style={{
              width: "25%",
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
            기타 직원 정보
          </Typography>
          <Stack style={{ width: "75%" }}>
            <Item label={"생년월일"} content={memberInfo?.birth} />
            <Item label={"담당업무"} content={memberInfo?.task} />
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
              padding: "1.5px",
              fontWeight: "bold",
            }}
          >
            <ArrowBackIosIcon fontSize="14px" />
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
                backgroundColor: "#1386d2",
                marginRight: "15px",
                color: "white",
                fontWeight: "bold",
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
              backgroundColor: "white",
              color: "gray",
              border: "1.5px solid #d3d3d3",
              fontWeight: "bold",
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
