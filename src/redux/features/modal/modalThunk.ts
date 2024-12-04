import { Movie } from "@/type";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import requests from "@/api/requests";
import { DocumentData } from "firebase/firestore";

interface modalPayload {
    movie: Movie | DocumentData | null;
}

export const fetchTrailer = createAsyncThunk(
    "modal/fetchTrailer",
    async (payload: modalPayload, thunkAPI) => {
        try {
            const response = await fetch(requests.fetchTrailer(payload.movie));
            const result = await response.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
