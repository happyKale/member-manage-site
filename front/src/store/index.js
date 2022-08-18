import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import memberSlice from "./memberReducer";
import modalSlice from "./modalReducer";

const logger = createLogger();

const reducer = combineReducers({
  member: memberSlice,
  modal: modalSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
