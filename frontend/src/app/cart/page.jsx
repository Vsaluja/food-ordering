'use client'
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImCross } from "react-icons/im";
import { addToCart, reduceFromCart, removeFromCart, setCart } from '../store/users'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { lilita } from '@/fonts/fonts'


const CartPage = () => {

    const { user, cart } = useSelector((state) => state.user)
    const { products } = useSelector((state) => state.categories)
    const [total, setTotal] = useState(0);
    const router = useRouter();
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


    const placeOrder = async () => {
        let load = toast.loading("Placing your order...")
        let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let orderId = "";
        for (let i = 0; i < 10; i++) {
            let random = Math.floor(Math.random() * abc.length)
            orderId += abc.charAt(random);
        }

        let mytotal = (Number(total.toFixed(2)) + 4);
        let orderItems = userCart.map((order) => ({ ...order, user: user.user.id, product: order['id'], total: mytotal, product_price: order['price'], order_number: orderId }))

        orderItems.map((order) => {
            delete order.id
            delete order.category
            delete order.description
            delete order.image
            delete order.name
            delete order.price
            delete order.size
        })

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/`, orderItems)

        if (response.status == 201) {
            setTimeout(() => {
                toast.dismiss(load)
                toast.success("Your order has been placed")
                dispatch(setCart([]))
                router.push('/user/orders')
            }, 3000);
        }

    }



    useEffect(() => {
        getUserCart()

    }, [products, cart])



    return (
        <Container>
            <div className='flex flex-col min-h-[90vh] bg-white my-10 m-2 sm:m-10 px-2 sm:px-10 rounded-xl'>
                <Navbar />

                {cart.length > 0 ? (
                    <div className='flex flex-col md:flex-row'>
                        <div className="left w-full md:max-w-[70%] my-10 md:px-10">
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
                                        <div key={product.id} className='flex border-b-[1px] py-4 gap-6 justify-between items-center'>
                                            <Link href={`/product/${product.id}`} className='bg-gray-100 p-2 rounded min-w-[100px]' >
                                                <img className='w-[80px] h-[60px]' src={product.image} alt="" />
                                            </Link>
                                            <div className='flex w-full max-w-[200px] gap-4 flex-col items-center justify-evenly'>
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
                                            <div className='ms-auto me-[5px] md:me-[20px] cursor-pointer' onClick={() => remove(product.id)}>
                                                <ImCross className='text-red-400' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="right my-10 w-full max-w-[300px] px-2 mx-auto">
                            <h2 className='border-b-4 border-[#313043] pb-4 p-2 font-bold text-[20px] mb-4 text-center'>Order Summary</h2>
                            <div className='w-full flex flex-col gap-4 mt-4 px-4'>
                                <div className="subtotal w-full flex justify-between py-2">
                                    <p className='font-semibold'>Subtotal</p>
                                    <p className='font-semibold'>${total.toFixed(2)}</p>
                                </div>
                                <div className="shipping w-full justify-between border-b-2 pb-4">
                                    <p className='font-semibold'>Delivery</p>
                                    <p className="text-gray-400 text-[12px] py-2 px-4">Delivery Fee - $4</p>
                                </div>
                                <div className="total flex justify-between text-[18px] font-bold">
                                    <p className='uppercase'>total cost</p>
                                    <p>${(total + 4).toFixed(2)}</p>
                                </div>
                                {user ? (
                                    <button onClick={placeOrder} className='capitalize mt-10 bg-[#313043] font-bold p-4 rounded text-white text-[16px] max-w-[400px]'>Place Order</button>

                                ) : (
                                    <Link href={'/login'} className='capitalize mt-10 bg-[#313043] font-bold p-4 rounded text-white text-[16px] max-w-[400px] text-center'>Sign in to place order</Link>
                                )}
                            </div>
                        </div>


                    </div>
                ) : (
                    <div className='flex flex-col  items-center justify-center'>
                        <img src="https://i.postimg.cc/WbjYK3Q2/Screenshot-293-removebg-preview.png" alt="" />
                        <h2 className={`${lilita.className} text-[#313043] text-[20px] tracking-wider`}>Your cart is empty</h2>
                    </div>
                )}



            </div>
        </Container >
    )
}

export default CartPage
