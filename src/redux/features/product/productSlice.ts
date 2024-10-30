import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@stripe/firestore-stripe-payments";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: localStorage.getItem("products")
        ? (JSON.parse(localStorage.getItem("products") as string)
              .products as Product[])
        : [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            localStorage.setItem(
                "products",
                JSON.stringify({ products: action.payload })
            );
            state.products = action.payload;
        },
    },
});

const { actions, reducer } = productSlice;
export const { setProduct } = actions;
export default reducer;