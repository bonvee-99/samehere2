import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const body = loginData.body;
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      return parseResponse;
    } catch (error) {
      // fix later
      return rejectWithValue(error.message);
    }
  }
);

export const isAuth = createAsyncThunk(
  "auth/isAuth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/auth/is-verified", {
        method: "GET",
        headers: { token: localStorage.getItem("token") },
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeAuth: (state, action) => {
      state.value = false;
    },
  },
  extraReducers: (builder) => {
    // for asynchronous requests
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload.token) {
        localStorage.setItem("token", payload.token);
        state.value = true;
      } else {
        state.value = false;
      }
    });
    builder.addCase(isAuth.fulfilled, (state, { payload }) => {
      if (payload === true) {
        state.value = true;
      } else {
        state.value = false;
      }
    });
  },
});

// for synchronous actions
export const { removeAuth } = authSlice.actions;

// for store
export default authSlice.reducer;

// TODO: change name from authentication...
