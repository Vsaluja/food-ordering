'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const HandleCart = () => {
    const { cart } = useSelector((state) => state.user)

    useEffect(() => {
        console.log("changed cart");
    }, [cart])
}

export default HandleCart
