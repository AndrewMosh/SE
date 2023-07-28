// src/features/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASIC_URL } from "../api/api";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (query) => {
  try {
    const response = await axios.get(`${BASIC_URL}?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});
export const fetchSortedUsersDesc = createAsyncThunk(
  "user/fetchUsers",
  async (query) => {
    try {
      const response = await axios.get(`${BASIC_URL}?q=${query}`);
      return response.data.items.sort(
        (a, b) => b.repos_url.length - a.repos_url.length
      );
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
);
export const fetchSortedUsersAsc = createAsyncThunk(
  "user/fetchUsers",
  async (query) => {
    try {
      const response = await axios.get(`${BASIC_URL}?q=${query}`);
      return response.data.items.sort(
        (a, b) => a.repos_url.length - b.repos_url.length
      );
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
