import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../feature/authenticationSlice";
import profileReducer from "../feature/profileSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    profile: profileReducer,
  },
});
