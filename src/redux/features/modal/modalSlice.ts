import { Movie } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    open: boolean;
    movie: Movie | null;
}

const initialState: ModalState = {
    open: false,
    movie: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Movie | null>) => {
            state.open = true;
            state.movie = action.payload;
        },
        closeModal: (state) => {
            state.open = false;
            state.movie = null;
        },
    },
});

const { actions, reducer } = modalSlice;
export const { openModal, closeModal } = actions;
export default reducer;
