import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    products: []
}


export const CategorySlice = createSlice({

    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        }

    }

})

export const { setCategories, setProducts } = CategorySlice.actions

export default CategorySlice.reducer