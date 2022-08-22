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
