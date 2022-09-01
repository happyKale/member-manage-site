import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    type: "",
    openStatus: false,
    content: {
      title: "",
      contentTitle: "",
      contentText: "",
    },
  },
  reducers: {
    modify(state, action) {
      return action.payload;
    },
  },
});

export const { modify } = modalSlice.actions;
export default modalSlice.reducer;
