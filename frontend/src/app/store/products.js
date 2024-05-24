import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}


export const ProductsSlice = createSlice({

    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        }

    }

})

export const { setProducts } = ProductsSlice.actions

export default ProductsSlice.reducer