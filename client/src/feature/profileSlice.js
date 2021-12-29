import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
  posts: [],
  change: false,
};

export const setProfile = createAsyncThunk(
  "profile/getProfilePosts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/home", {
        method: "GET",
        headers: { token: data.token },
      });
      const parseResponse = await response.json();
      return parseResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const body = { description: data.description };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", data.token);
      const response = await fetch("/home/posts", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      return parseResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, { rejectWithValue }) => {
    try {
      const body = { description: data.description };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", data.token);
      const response = await fetch(`/home/posts/${data.id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      return parseResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/home/posts/${data.id}`, {
        method: "DELETE",
        headers: { token: data.token },
      });
      const parseResponse = await response.json();
      return parseResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setProfile.fulfilled, (state, { payload }) => {
      state.posts = payload;
      const { user_name, user_email } = payload[0];
      state.profile = { user_name, user_email };
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      if (payload === true) {
        state.change = !state.change;
      }
    });
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      if (payload === true) {
        state.change = !state.change;
      }
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      if (payload === "Success!") {
        state.change = !state.change;
      }
    });
  },
});

export default profileSlice.reducer;
