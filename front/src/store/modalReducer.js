import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  openStatus: false,
  content: {
    title: "",
    contentTitle: "",
    contentText: "",
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modify: (state, action) => {
      Object.keys(action.payload).map((key) => {
        if (key === "content") {
          state[`${key}`] = {
            ...state[`${key}`],
            ...action.payload[`${key}`],
          };
        } else {
          state[`${key}`] = action.payload[`${key}`];
        }
      });
    },
  },
});

export const { modify } = modalSlice.actions;
export default modalSlice.reducer;
