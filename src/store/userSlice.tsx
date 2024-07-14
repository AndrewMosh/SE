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

type SortOrder = "asc" | "desc";

const fetchUsers = createAsyncThunk<User[], string, { rejectValue: string }>("user/fetchUsers", async (query, { rejectWithValue }) => {
    try {
        const response = await axios.get<{ items: User[] }>(`${BASIC_URL}?q=${query}`);
        return response.data.items;
    } catch (error) {
        console.error("Error:", error);
        return rejectWithValue("Failed to fetch users");
    }
});

const fetchSortedUsers = createAsyncThunk<User[], { query: string; sortOrder: SortOrder }, { rejectValue: string }>(
    "user/fetchSortedUsers",
    async ({ query, sortOrder }, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ items: User[] }>(`${BASIC_URL}?q=${query}`);
            return response.data.items.sort((a, b) => {
                const diff = a.repos_url.length - b.repos_url.length;
                return sortOrder === "asc" ? diff : -diff;
            });
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue("Failed to fetch sorted users");
        }
    }
);

const initialState: UserState = {
    users: [],
    selectedUser: null,
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
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
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch users";
            })
            .addCase(fetchSortedUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSortedUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchSortedUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch sorted users";
            });
    },
});

export const { setSelectedUser } = userSlice.actions;
export const { reducer } = userSlice;
export { fetchUsers, fetchSortedUsers };
export default reducer;
