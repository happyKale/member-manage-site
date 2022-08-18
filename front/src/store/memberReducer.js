import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "직원1",
    phone: "010-1234-5678",
    birth: "1980-01-01",
    team: "DX",
    position: "팀장", // 직책
    rank: "부장", // 직급
    email: "123@naver.com",
    officeNum: "02-2125-6530",
    faxNum: "123456",
    task: "업무1",
  },
  {
    id: 2,
    name: "직원2",
    phone: "010-1234-5678",
    birth: "1995-01-01",
    team: "DX",
    position: "팀원", // 직책
    rank: "대리", // 직급
    email: "456@naver.com",
    officeNum: "02-2125-6547",
    faxNum: "123456",
    task: "업무2",
  },
  {
    id: 3,
    name: "직원3",
    phone: "010-1234-5678",
    birth: "1997-01-01",
    team: "DX",
    position: "팀원", // 직책
    rank: "사원", // 직급
    email: "789@naver.com",
    officeNum: "02-2125-6548",
    faxNum: "123456",
    task: "업무3",
  },
  {
    id: 4,
    name: "직원4",
    phone: "010-1234-5678",
    birth: "1996-01-01",
    team: "DX",
    position: "팀원", // 직책
    rank: "사원", // 직급
    email: "555@naver.com",
    officeNum: "02-2125-6549",
    faxNum: "123456",
    task: "업무4",
  },
];

export const memberSlice = createSlice({
  name: "memeber",
  initialState,
  reducers: {
    load: (state, action) => {},
    add: (state, action) => {
      state.push(action.payload);
      return state;
    },
    remove: (state, action) => {
      state = state.filter(
        (member) => !action.payload.selectedMemberId.includes(member.id)
      );
      return state;
    },
    modify: (state, action) => {
      let num = 0;
      state.map((member, idx) => {
        if (member.id === action.payload.id) {
          num = idx;
        }
      });
      state[num] = action.payload;
      return state;
    },
  },
});

export const { load, add, remove, modify } = memberSlice.actions;
export default memberSlice.reducer;
