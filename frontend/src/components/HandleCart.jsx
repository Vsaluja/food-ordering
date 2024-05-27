'use client'
import { setCart } from '@/app/store/users';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const HandleCart = () => {
    const { cart, user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const fetchInitialCartData = async () => {
        let userId = user?.user?.id

        if (!user) {
            return
        }

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getcart/`, { user: userId })
            const updatedCart = response.data.cartData
            console.log("user cart", response.data.cartData);

            cart?.map((product) => {
                updatedCart.push(product)
            })

            dispatch(setCart(updatedCart))
        } catch (error) {
            console.log("err", error);
        }
    }

    useEffect(() => {
        // This will run when the user logs in or if the user was already logged in and it will update the cart
        fetchInitialCartData();
    }, [user])


    const updateCart = async () => {
        //  The user must be logged in to update the cart in his database


        try {

            if (!user) {
                return
            }

            const cartData = []

            cart?.map((product) => {
                cartData.push({ ...product, product: product.productId, user: user.user.id })
            })

            console.log("cart", cartData);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/`, { userId: user?.user?.id, mycart: cartData })

            console.log("posted", response);
        } catch (error) {
            console.log('err', error);
        }





    }

    useEffect(() => {
        // This will run whenever the state of cart changes whether an item is added or deleted
        updateCart()
    }, [cart])


}

export default HandleCart
