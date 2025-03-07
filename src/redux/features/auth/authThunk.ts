"use client";
import { storage } from "@/utils/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

interface authPayload {
    email: string;
    password: string;
}

export const signIn = createAsyncThunk(
    "auth/login",
    async (payload: authPayload, thunkAPI) => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const signUp = createAsyncThunk(
    "auth/registration",
    async (payload: authPayload, thunkAPI) => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const logOut = createAsyncThunk(
    "auth/logOut",
    async (payload, thunkAPI) => {
        try {
            const response = await signOut(auth);
            storage.removeItem("user");
            storage.removeItem("products");
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
