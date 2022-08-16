import { configureStore, combineReducers } from "@reduxjs/toolkit";
import memberSlice from "./memberReducer";

const reducer = combineReducers({
  member: memberSlice,
});

const store = configureStore({
  reducer,
});

export default store;
