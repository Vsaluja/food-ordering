import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    cart: []
}


export const UserSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        addToCart: (state, action) => {
            let found = false;
            state.cart.map((product) => {
                if (product.productId === action.payload.productId) {
                    found = true;
                    return product.quantity < 10 ? product.quantity += 1 : product.quantity;
                }
            })

            if (!found) {
                state.cart = [...state.cart, action.payload]
            }
        },
        reduceFromCart: (state, action) => {
            state.cart.map((product) => {
                if (product.productId === action.payload.productId) {
                    if (product.quantity === 1) {
                        state.cart = state.cart.filter((product) => {
                            return product.productId !== action.payload.productId;
                        })
                    }
                    return product.quantity > 0 ? product.quantity -= 1 : product.quantity;
                }

            })

        },
        removeFromCart: (state, action) => {

            state.cart = state.cart.filter((product) => {
                return product.productId !== action.payload.productId;

            })


        },

    }

})

export const { setUser, setCart, addToCart, reduceFromCart, removeFromCart } = UserSlice.actions

export default UserSlice.reducer