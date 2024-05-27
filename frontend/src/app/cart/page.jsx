'use client'
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImCross } from "react-icons/im";
import { addToCart, reduceFromCart, removeFromCart } from '../store/users'


const CartPage = () => {

    const { cart } = useSelector((state) => state.user)
    const { products } = useSelector((state) => state.categories)
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch()

    const [userCart, setUserCart] = useState([])

    const getUserCart = () => {

        let subtotal = 0;
        const updatedCart = []
        for (let i = 0; i < cart.length; i++) {
            const cartItem = products.find(item => item.id === cart[i].productId)
            if (cartItem) {
                subtotal += (cart[i].quantity * cartItem.price)
                // setTotal((total) => total += (cart[i].quantity * cartItem.price ))
                updatedCart.push({ ...cartItem, quantity: cart[i].quantity })
            }
        }
        setTotal(subtotal)
        setUserCart(updatedCart)


    }

    const addProduct = (productId) => {
        dispatch(addToCart({ productId: productId, quantity: 1 }))
    }

    const reduce = (productId) => {
        dispatch(reduceFromCart({ productId: productId }))
    }

    const remove = (productId) => {
        dispatch(removeFromCart({ productId }))
    }

    useEffect(() => {
        getUserCart()

    }, [products, cart])



    return (
        <Container>
            <div className='flex flex-col min-h-[90vh] bg-white m-10 px-4 sm:px-10 rounded-xl'>
                <Navbar />

                {cart.length > 0 ? (
                    <div className='flex flex-col md:flex-row'>
                        <div className="left w-full max-w-[70%] my-10 px-10">
                            <div className='flex justify-between border-b-4 border-[#313043] pb-4 p-2 font-bold text-[20px] mb-4'>
                                <h2>
                                    Shopping Cart
                                </h2>
                                <h2>
                                    {userCart?.length} item(s)
                                </h2>
                            </div>
                            {
                                userCart?.map((product) => {
                                    return (
                                        <div key={product.id} className='flex border-b-[1px] py-4 gap-6 items-center'>
                                            <div className='bg-gray-100 p-2 rounded min-w-[100px]' >
                                                <img className='w-[80px] h-[60px]' src={product.image} alt="" />
                                            </div>
                                            <div className='flex w-full max-w-[200px] flex-col items-center justify-evenly'>
                                                <h2 className='capitalize text-[17px] text-[#313043] font-bold'>{product.name}</h2>
                                                <div className='flex gap-6'>
                                                    <div className='font-bold cursor-pointer' onClick={() => reduce(product.id)}>-</div>
                                                    <div className='bg-gray-200 px-2 py-[1px] rounded font-semibold text-[16px]'>{product.quantity}</div>
                                                    <div className='font-bold cursor-pointer' onClick={() => addProduct(product.id)}>+</div>
                                                </div>
                                            </div>
                                            <div className='text-18px text-[#313043] font-bold'>
                                                ${product.price}
                                            </div>
                                            <div className='ms-auto me-[20px] cursor-pointer' onClick={() => remove(product.id)}>
                                                <ImCross className='text-red-400' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="right my-10 w-full max-w-[300px] px-2 mx-auto">
                            <h2 className='border-b-4 border-[#313043] pb-4 p-2 font-bold text-[20px] mb-4 md:text-center'>Order Summary</h2>
                            <div className='w-full flex flex-col gap-4 mt-4 px-4'>
                                <div className="subtotal w-full flex justify-between py-2">
                                    <p className='font-semibold'>Subtotal</p>
                                    <p className='font-semibold'>{total.toFixed(2)}</p>
                                </div>
                                <div className="shipping w-full justify-between border-b-2 pb-4">
                                    <p className='font-semibold'>Delivery</p>
                                    <p className="text-gray-400 text-[12px] py-2 px-4">Delivery Fee - $4</p>
                                </div>
                                <div className="total flex justify-between text-[18px] font-semibold">
                                    <p className='uppercase'>total cost</p>
                                    <p>{(total + 4).toFixed(2)}</p>
                                </div>
                                <button className='capitalize mt-10 bg-[#313043] font-bold p-4 rounded text-white text-[16px] max-w-[400px]'>Proceed to checkout</button>
                            </div>
                        </div>


                    </div>
                ) : (
                    <div className='flex flex-col  items-center justify-center'>
                        <img src="https://i.postimg.cc/WbjYK3Q2/Screenshot-293-removebg-preview.png" alt="" />
                        <h2 className='text-[20px] text-[#313043] font-bold tracking-wider'>Your cart is empty</h2>
                    </div>
                )}



            </div>
        </Container >
    )
}

export default CartPage
