import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  openStatus: false,
  selectedMemberId: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    load: (state, action) => {
      return state;
    },
    modify: (state, action) => {
      Object.keys(action.payload).map((key) => {
        state[`${key}`] = action.payload[`${key}`];
      });
    },
  },
});

export const { load, modify } = modalSlice.actions;
export default modalSlice.reducer;
