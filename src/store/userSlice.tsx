import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASIC_URL } from "../api/api";
import { User } from "../types/User";

export interface UserState {
    users: User[];
    selectedUser: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export const fetchUsers = createAsyncThunk<User[], string, { rejectValue: string }>(
    "user/fetchUsers",
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASIC_URL}?q=${query}`);
            return response.data.items;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue("Failed to fetch users");
        }
    }
);

export const fetchSortedUsersDesc = createAsyncThunk<User[], string, { rejectValue: string }>(
    "user/fetchSortedUsersDesc",
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASIC_URL}?q=${query}`);
            return response.data.items.sort((a: User, b: User) => b.repos_url.length - a.repos_url.length);
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue("Failed to fetch sorted users");
        }
    }
);

export const fetchSortedUsersAsc = createAsyncThunk<User[], string, { rejectValue: string }>(
    "user/fetchSortedUsersAsc",
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASIC_URL}?q=${query}`);
            return response.data.items.sort((a: User, b: User) => a.repos_url.length - b.repos_url.length);
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue("Failed to fetch sorted users");
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
    } as UserState,
    reducers: {
        setSelectedUser: (state, action: PayloadAction<User | null>) => {
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
                state.error = action.payload || "Failed to fetch users";
            })
            .addCase(fetchSortedUsersDesc.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSortedUsersDesc.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchSortedUsersDesc.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch sorted users";
            })
            .addCase(fetchSortedUsersAsc.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSortedUsersAsc.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchSortedUsersAsc.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch sorted users";
            });
    },
});

export const { setSelectedUser } = userSlice.actions;

export const { reducer } = userSlice;

export default reducer;
