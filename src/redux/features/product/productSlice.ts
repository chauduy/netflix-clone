import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@stripe/firestore-stripe-payments";

interface ProductState {
    products: Product[]
}

const initialState: ProductState = {
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        }
    }
})

const { actions, reducer } = productSlice;
export const { setProduct } = actions;
export default reducer;