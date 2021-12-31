import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import profileReducer from "../feature/profileSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    profile: profileReducer,
  },
});
