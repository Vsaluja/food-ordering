'use client'
import React, { useEffect, useState } from 'react'
import UserDashboard from '../page'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import { lilita } from '@/fonts/fonts'
import Link from 'next/link'
import moment from 'moment';

const Orders = () => {

    const { user } = useSelector((state) => state.user)
    const { products } = useSelector((state) => state.categories)
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {

        try {
            if (user?.user?.id) {

                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${user?.user?.id}/`)

                console.log("res", response);
                setOrders(response?.data?.orders)
                console.log("prod", products);

                let ordersArray = response?.data?.orders;

                let updatedOrdersArray = ordersArray.map((order) => {
                    return order.map((orderItem) => {
                        let productDetail = products.find(product => product.id === orderItem.product);
                        if (productDetail) {
                            return { ...orderItem, addProduct: productDetail };
                        } else {
                            return orderItem;
                        }
                    });
                });

                console.log("updated array", updatedOrdersArray);
                setOrders(updatedOrdersArray)
            }

        } catch (error) {
            console.log("Error while fetching orders");
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [user?.user?.id])

    return (
        <UserDashboard>
            <Container className={``}>
                <div className='flex flex-col flex-1 min-h-[88vh] bg-white my-10 m-2 pb-10 sm:m-10 px-4 sm:px-10 rounded-xl'>
                    {/* bg-[#ff7aa4] */}
                    <Navbar />
                    <h2 className={`${lilita.className} text-[25px] font-bold m-6`}>My Orders</h2>
                    <div className=''>
                        {orders.length > 0 ? (
                            <div className='flex flex-col gap-10 px-2'>
                                {orders?.reverse().map((order, i) => {
                                    return (
                                        <div key={i} className='flex flex-col p-[5px] sm:p-4 rounded-md bg-[#E7F0FD]'>
                                            <div className='flex text-center gap-2 text-[10px] md:text-[16px] justify-between items-end font-bold mb-2'>

                                                <div className=' text-[#313043]'>
                                                    Date: {moment(order[0]?.date_created).format('MMMM Do YYYY, h:mm a')}
                                                </div>

                                                <div className='text-[#313043] mt-[-15px]'>
                                                    Order No.: {order[0]?.order_number}
                                                </div>
                                            </div>
                                            <div className='flex flex-wrap rounded  justify-center sm:justify-start sm:gap-4 capitalize  font-semibold'>
                                                {order?.map((singleOrder, id) => {
                                                    return (
                                                        <div>

                                                            <Link href={`/product/${singleOrder?.addProduct?.id}`} key={id} className={`${lilita.className} flex gap-2 text-[10px] md:text-[16px] justify-between items-center border-2 p-2 px-4 tracking-wider w-[150px] h-full max-h-[70px] sm:w-full sm:max-w-[200px] lg:max-w-[300px] rounded-xl bg-[#ff9cbd]`}>
                                                                <div className='hidden sm:block'>
                                                                    <img className='h-[50px] w-[50px]' src={singleOrder.addProduct.image} alt="" />
                                                                </div>
                                                                <div className='text-center'>
                                                                    {singleOrder?.addProduct.name}
                                                                </div>
                                                                <div>x</div>
                                                                <div>
                                                                    {singleOrder?.quantity}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='self-end text-[#313043] text-[14px] font-bold md:text-[20px] mt-2'>
                                                Total ${order[0].total}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (<div className='flex justify-center items-center flex-col'>
                            <img src="/Assets/NoOrder.png" alt="" />
                            <div className={`${lilita.className} text-[#313043] text-[20px] tracking-wider`}>No Available Orders</div>
                        </div>)}
                    </div>
                </div>
            </Container>
        </UserDashboard>
    )
}

export default Orders
