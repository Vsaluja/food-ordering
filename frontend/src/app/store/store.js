'use client'
import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './users'
import CategorySlice from './Category'

export const store = configureStore({
    reducer: {
        // auth: AuthSlice,
        categories: CategorySlice,
        user: UserSlice
    }
})