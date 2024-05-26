import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    products: [],
    initialLoad: true,
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
        },
        setInitialLoad: (state, action) => {
            state.initialLoad = action.payload
        },

    }

})

export const { setCategories, setProducts, setInitialLoad } = CategorySlice.actions

export default CategorySlice.reducer