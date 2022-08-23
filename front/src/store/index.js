import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import memberSlice from "./memberReducer";
import modalSlice from "./modalReducer";
import inputOptionSlice from "./inputOptionReducer";

const logger = createLogger();

const reducer = combineReducers({
  member: memberSlice,
  modal: modalSlice,
  inputOption: inputOptionSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
