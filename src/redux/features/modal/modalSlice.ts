import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    open: boolean;
}

const initialState: ModalState = {
    open: false,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            console.log("innn");
            state.open = action.payload;
        },
    },
});

export const { setOpen } = modalSlice.actions;

export default modalSlice.reducer;
