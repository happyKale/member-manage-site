import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "memeber",
  initialState: {
    memberList: [],
    selectedMemberInfo: {},
    selectedIdList: [],
  },
  reducers: {
    load(state, action) {
      if (action.payload.memberList) {
        state.memberList = action.payload.memberList;
      }
      if (action.payload.selectedMemberInfo) {
        state.selectedMemberInfo = action.payload.selectedMemberInfo;
      }
    },
    add(state, action) {
      state.memberList.push(action.payload);
    },
    remove(state, action) {
      state.memberList = state.memberList.filter(
        (member) => !action.payload.selectedMemberId.includes(member.id)
      );
    },
    modify(state, action) {
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
    },
    modifySelectedIdList: (state, action) => {
      state.selectedIdList = action.payload;
    },
  },
});

export const { load, add, remove, modify, modifySelectedIdList } =
  memberSlice.actions;
export default memberSlice.reducer;
