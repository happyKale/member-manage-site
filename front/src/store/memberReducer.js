import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
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
  },
];

export const memberSlice = createSlice({
  name: "memeber",
  initialState,
  reducers: {
    load: (state, action) => {
      return state;
    },
    add: (state, action) => {
      return state.push(action.payload);
    },
    remove: (state, action) => {
      return state;
    },
    modify: (state, action) => {
      return state;
    },
  },
});

export const { load, add, remove, modify } = memberSlice.actions;
export default memberSlice.reducer;
