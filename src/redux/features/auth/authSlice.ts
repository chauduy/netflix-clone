"use client";
import { lcStorage } from "@/utils/store";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { signIn, signUp, logOut } from "./authThunk";

interface AuthState {
    loading: string;
    user: User | null;
}

const initialState: AuthState = {
    loading: "idle",
    user:
        typeof window !== "undefined" && lcStorage!.getItem("user")
            ? (JSON.parse(lcStorage!.getItem("user") as string) as User)
            : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthData: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, action) => {
            state.loading = "loading";
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = "idle";
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.loading = "idle";
            lcStorage!.setItem("user", JSON.stringify(action.payload.user));
        });

        builder.addCase(signUp.pending, (state, action) => {
            state.loading = "loading";
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = "idle";
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.loading = "idle";
        });

        builder.addCase(logOut.pending, (state, action) => {
            state.loading = "loading";
        });
        builder.addCase(logOut.rejected, (state, action) => {
            state.loading = "idle";
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.user = null;
            state.loading = "idle";
        });
    },
});

const { actions, reducer } = authSlice;
export const { clearAuthData } = actions;
export default reducer;
