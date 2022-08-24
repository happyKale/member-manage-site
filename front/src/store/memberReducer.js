import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memberList: [],
  selectedMemberInfo: {},
};

export const memberSlice = createSlice({
  name: "memeber",
  initialState,
  reducers: {
    load: (state, action) => {
      if (action.payload.memberList) {
        state.memberList = action.payload.memberList;
      }
      if (action.payload.selectedMemberInfo) {
        state.selectedMemberInfo = action.payload.selectedMemberInfo;
      }
      return state;
    },
    add: (state, action) => {
      state.memberList.push(action.payload);
      return state;
    },
    remove: (state, action) => {
      state.memberList = state.memberList.filter(
        (member) => !action.payload.selectedMemberId.includes(member.id)
      );
      return state;
    },
    modify: (state, action) => {
      let num = 0;
      state.selectedMemberInfo = action.payload;
      if (state.memberList.length !== 0) {
        state.memberList.map((member, idx) => {
          if (member.id === action.payload.id) {
            num = idx;
          }
        });
        state.memberList[num] = action.payload;
      } else {
        state.memberList.push(state.selectedMemberInfo);
      }
      return state;
    },
  },
});

export const { load, add, remove, modify } = memberSlice.actions;
export default memberSlice.reducer;
