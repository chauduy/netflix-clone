import { Genre, Movie, MovieType } from "@/type";
import { toastStyle } from "@/utils/toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { fetchTrailer } from "./modalThunk";

interface ModalState {
    open: boolean;
    movie: Movie | DocumentData | null;
    loading: string;
    trailer: string | null;
    genres: Genre[];
}

const initialState: ModalState = {
    open: false,
    movie: null,
    loading: "idle",
    trailer: null,
    genres: [],
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalMovie: (
            state,
            action: PayloadAction<Movie | null | DocumentData>
        ) => {
            state.movie = action.payload;
        },
        closeModal: (state) => {
            state.open = false;
            state.movie = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrailer.pending, (state, action) => {
            state.loading = "loading";
        });
        builder.addCase(fetchTrailer.rejected, (state, action) => {
            state.loading = "idle";
        });
        builder.addCase(fetchTrailer.fulfilled, (state, action) => {
            const trailerIndex = action.payload?.videos?.results?.findIndex(
                (item: MovieType) => item?.type === "Trailer"
            );
            state.loading = "idle";
            state.trailer =
                action.payload?.videos?.results?.[trailerIndex]?.key || "";
            state.genres = action.payload.genres;
            if (trailerIndex === -1) {
                toast.error("The trailer could not be loaded", {
                    duration: 5000,
                    style: toastStyle.error,
                });
            } else {
                state.open = true;
            }
        });
    },
});

const { actions, reducer } = modalSlice;
export const { setModalMovie, closeModal } = actions;
export default reducer;
