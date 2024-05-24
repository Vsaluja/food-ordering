'use client';
import React, { useEffect, useState } from 'react'
import Container from './Container'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { lilita } from '@/fonts/fonts'
import { useSelector } from 'react-redux';




const HomePage = () => {

    const { products } = useSelector((state) => state.products)


    return (
        <Container className={`flex-1 w-full`}>
            <div className='flex py-8 gap-2'>
                <div className={`left flex w-[75%] flex-col  bg-white rounded-xl min-h-[88vh] p-4`}>
                    <Navbar />
                    <div className='px-10'>
                        <div className='flex gap-6 justify-center px-10 m-16'>
                            {products && products.map((category, i) => {
                                return (

                                    <div key={i} className='flex flex-col cursor-pointer justify-between items-center bg-[#F5F6F8] rounded-2xl pb-2 px-2'>
                                        <img className='max-w-[80px]' src={category?.category_image} alt="" />
                                        <h2 className='capitalize font-bold text-[#313043]'>{category?.category_name}</h2>
                                    </div>
                                )

                            })}

                        </div>
                        <h2 className={`${lilita.className} text-[30px] text-[#313043]`}>All Items</h2>
                    </div>
                </div>
                <div className='right w-[25%] bg-[#E7F0FD] px-6 border-2 border-black'>
                    <Sidebar />

                </div>
            </div>
        </Container>
    )
}

export default HomePage
