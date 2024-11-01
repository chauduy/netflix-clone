import { lcStorage } from "@/utils/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@stripe/firestore-stripe-payments";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: lcStorage!.getItem("products")
        ? (JSON.parse(lcStorage!.getItem("products") as string)
              .products as Product[])
        : [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            lcStorage!.setItem(
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
