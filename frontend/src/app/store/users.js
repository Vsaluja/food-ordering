import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: []
}


export const UserSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.products = action.payload
        }

    }

})

export const { setUser } = UserSlice.actions

export default UserSlice.reducer