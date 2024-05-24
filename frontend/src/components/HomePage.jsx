'use client';
import React, { useEffect, useState } from 'react';
import Container from './Container';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { lilita } from '@/fonts/fonts';
import { useSelector } from 'react-redux';
import Products from './Products';

const HomePage = () => {
    const { categories } = useSelector((state) => state.categories);

    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        console.log("Home", categories);
    }, [])

    const handleCategory = (category) => {


        setSelectedCategory(category?.id)
    }

    return (
        <Container className="flex-1 w-full">
            <div className="flex py-8 gap-2">
                <div className="left flex w-[75%] flex-col bg-white rounded-xl min-h-[88vh] p-4">
                    <Navbar />
                    <div className="flex lg:justify-center overflow-y-auto gap-10 py-2 my-16">
                        {categories && categories.map((category, i) => (
                            <div key={category.id} className={`${selectedCategory == category.id ? "bg-white border-[4px] border-[#F87192] translate-z-10" : "border-[4px] border-transparent"}  flex-shrink-0 flex flex-col cursor-pointer justify-between items-center bg-[#F5F6F8] rounded-2xl pb-2 px-2 duration-100`} onClick={() => handleCategory(category)}>
                                <img className="max-w-[80px]" src={category?.category_image} alt="" />
                                <h2 className={`${selectedCategory == category.id ? "text-[#313043]" : "text-[#313043]"} capitalize font-bold `}>{category?.category_name}</h2>
                            </div>
                        ))}
                    </div>
                    <div className='p-4 px-6'>
                        <h2 className={`${lilita.className} text-[30px] text-[#313043]`}>All Items</h2>
                        <Products category={selectedCategory} />
                    </div>

                </div>
                <div className="right w-[25%] max-h-[100vh] bg-white rounded-xl">
                    <Sidebar />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;
