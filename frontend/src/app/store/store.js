'use client'
import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './products'
import UserSlice from './users'

export const store = configureStore({
    reducer: {
        // auth: AuthSlice,
        products: ProductsSlice,
        user: UserSlice
    }
})