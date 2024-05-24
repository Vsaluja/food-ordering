'use client';
import React from 'react';
import Container from './Container';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { lilita } from '@/fonts/fonts';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { products } = useSelector((state) => state.products);

    return (
        <Container className="flex-1 w-full">
            <div className="flex py-8 gap-2">
                <div className="left flex w-[75%] flex-col bg-white rounded-xl min-h-[88vh] p-4">
                    <Navbar />
                    <div className="flex lg:justify-center overflow-y-auto gap-6 py-2 my-16">
                        {products && products.map((category, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col cursor-pointer justify-between items-center bg-[#F5F6F8] rounded-2xl pb-2 px-2">
                                <img className="max-w-[80px]" src={category?.category_image} alt="" />
                                <h2 className="capitalize font-bold text-[#313043]">{category?.category_name}</h2>
                            </div>
                        ))}
                    </div>
                    <h2 className={`${lilita.className} text-[30px] text-[#313043]`}>All Items</h2>
                </div>
                <div className="right w-[25%] bg-white rounded-xl">
                    <Sidebar />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;
