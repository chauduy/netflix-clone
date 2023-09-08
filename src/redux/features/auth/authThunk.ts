import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
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
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
