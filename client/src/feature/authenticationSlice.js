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

export const register = createAsyncThunk(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    try {
      const body = registerData.body;
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      return parseResponse;
    } catch (error) {
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

export const authenticatedSlice = createSlice({
  name: "authentication",
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
    builder.addCase(register.fulfilled, (state, { payload }) => {
      // if (payload.token) {
      //   redirect;
      // } else {
      //   state.value = false;
      // }
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
export const { removeAuth } = authenticatedSlice.actions;

// for store
export default authenticatedSlice.reducer;

// TODO: change name from authentication...
