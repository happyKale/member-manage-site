import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load, modify as memberModify } from "../../store/memberReducer";
import { modify as modalModify } from "../../store/modalReducer";
import { memberRepository } from "../../repositories/member-repository";
import { inputOptionData } from "../../asset/inputOptionData";
import {
  InputText,
  InputSelect,
  InputButtonGroup,
  InputPhone,
} from "../../components";
import { Button, Typography, Stack, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SquareIcon from "@mui/icons-material/Square";
import { styles as muiStyles } from "./muiStyles";

function ModifyScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teamList = inputOptionData.teamList;
  const rankList = inputOptionData.rankList;
  const positionList = inputOptionData.positionList;
  const memberInfo = useSelector((state) => state.member.selectedMemberInfo);
  const checkPhoneValueIndex = ["phone_1", "phone_2", "phone_3"];

  const [phoneNumber, setPhoneNumber] = useState(["", "", ""]);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [inputMemberInfo, setInputMemberInfo] = useState({ ...memberInfo });
  const [requiredInputCheck, setRequiredInputCheck] = useState({
    name: true,
    team: true,
    rank: true,
    position: true,
  });

  useEffect(() => {
    if (Object.values(memberInfo).length === 0) {
      memberRepository.getOne(params.id).then((res) => {
        dispatch(load({ selectedMemberInfo: res.data }));

        if (res.data.phone === "") {
          setPhoneNumber(["", "", ""]);
        } else {
          const numList = res.data.phone.split("-");
          setPhoneNumber([numList[0], numList[1], numList[2]]);
        }
      });
    } else {
      if (memberInfo.phone === "") {
        setPhoneNumber(["", "", ""]);
      } else {
        const numList = memberInfo.phone.split("-");
        setPhoneNumber([numList[0], numList[1], numList[2]]);
      }
    }
  }, []);

  useEffect(() => {
    setInputMemberInfo(memberInfo);
  }, [memberInfo]);

  const handleChange = (e, value) => {
    if (e.target.name === "team") {
      setIsPhoneFocused(false);
      setInputMemberInfo({
        ...inputMemberInfo,
        team: value,
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
      setIsPhoneFocused(false);
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
      dispatch(
        modalModify({
          type: "alert",
          openStatus: true,
          content: {
            title: "?????? ?????? ?????? ??????",
            contentTitle: "?????? ????????? ?????? ???????????????.",
          },
        })
      );
    } else {
      memberRepository.update(params.id, inputMemberInfo).then((res) => {
        dispatch(memberModify(inputMemberInfo));
        dispatch(
          modalModify({
            type: "confirm",
            openStatus: true,
            content: {
              title: "?????? ?????? ?????? ??????",
              contentTitle: "?????? ????????? ?????????????????????.",
              contentText:
                "????????? ????????????????????????? ????????? ??????????????? ?????????????????????????",
            },
          })
        );
      });
    }
  };

  return (
    <Stack sx={muiStyles.screenContainer}>
      <Typography sx={muiStyles.screenTitle}>?????? ??????</Typography>
      <Stack
        sx={muiStyles.screenContent}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareLarge} />
            ??????????????????
          </Typography>
          <Stack sx={muiStyles.inputContainer}>
            <InputText
              label={"??????"}
              valueKey={"name"}
              placeholder={"?????????"}
              inputProps={{ maxLength: 30 }}
              required
              requiredCheck={requiredInputCheck}
              onChange={handleChange}
              value={inputMemberInfo}
              helperText={"????????? ???????????????."}
            />
            <InputButtonGroup
              label={"??????"}
              require
              valueKey={"team"}
              value={inputMemberInfo}
              requiredCheck={requiredInputCheck}
              ariaDescribedby={"input-team-helper-text"}
              helperText={"????????? ???????????????."}
              teamList={teamList}
              onChange={handleChange}
            />
            <Stack
              sx={{ ...muiStyles.input2Column, ...muiStyles.marginBottom }}
            >
              <InputSelect
                label={"??????"}
                require
                requiredCheck={requiredInputCheck}
                valueKey={"position"}
                onChange={handleChange}
                value={inputMemberInfo}
                ariaDescribedby={"input-position-helper-text"}
                itemList={positionList}
                helperText={"????????? ???????????????."}
              />
              <InputSelect
                label={"??????"}
                require
                requiredCheck={requiredInputCheck}
                valueKey={"rank"}
                onChange={handleChange}
                value={inputMemberInfo}
                ariaDescribedby={"input-rank-helper-text"}
                itemList={rankList}
                helperText={"????????? ???????????????."}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={muiStyles.section}>
          <Typography sx={muiStyles.sectionTitle}>
            <SquareIcon sx={muiStyles.iconSquareLarge} />
            ?????????
          </Typography>
          <Stack sx={muiStyles.inputContainer}>
            <InputPhone
              label={"?????????"}
              value={phoneNumber}
              onChange={handleChange}
              isPhoneFocused={isPhoneFocused}
            />
            <InputText
              label={"????????????"}
              valueKey={"email"}
              onChange={handleChange}
              value={inputMemberInfo}
              placeholder={"gdhong@pentasecurity.com"}
              inputProps={{ maxLength: 50 }}
            />
            <InputText
              label={"???????????????"}
              valueKey={"officeNum"}
              onChange={handleChange}
              value={inputMemberInfo}
              placeholder={"02-2125-0000"}
              inputProps={{ maxLength: 13 }}
            />
            <InputText
              label={"????????????"}
              valueKey={"faxNum"}
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
            ????????????
          </Typography>
          <Stack sx={muiStyles.inputContainer}>
            <InputText
              label={"????????????"}
              type={"date"}
              valueKey={"birth"}
              onChange={handleChange}
              value={inputMemberInfo}
            />
            <InputText
              label={"????????????"}
              valueKey={"task"}
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
        <Button
          variant="text"
          sx={muiStyles.btnLarge}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosIcon sx={muiStyles.iconArrow} />
          ????????????
        </Button>
        <Button
          variant="text"
          sx={muiStyles.btnPositive}
          onClick={handleSubmit}
        >
          ??????
        </Button>
      </Stack>
    </Stack>
  );
}

export default ModifyScreen;
