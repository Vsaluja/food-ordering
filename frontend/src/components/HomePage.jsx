'use client';
import React, { useEffect, useState } from 'react';
import Container from './Container';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { lilita } from '@/fonts/fonts';
import { useSelector } from 'react-redux';
import Products from './Products';
import { useRouter } from 'next/navigation';
import CategoryCardShimmer from './shimmers/CategoryCardShimmer';

const HomePage = () => {
    const { categories } = useSelector((state) => state.categories);

    const router = useRouter();

    console.log("router ", router);

    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [categoryName, setCategoryName] = useState("All Items");

    useEffect(() => {
        if (categories.category_image) {
        }
        setLoading(false)
    }, [categories])

    const handleCategory = (category) => {


        setSelectedCategory(category?.id)
        if (category.id === 0) {
            return setCategoryName("All items")
        }

        setCategoryName(category.category_name)
    }

    return (
        <Container className="flex-1 w-full">
            <div className="flex justify-between py-8 gap-2">
                <div className="left flex w-[75%] flex-col bg-white rounded-xl min-h-[88vh] p-4 ">
                    <Navbar />
                    <div className={`flex items-start lg:justify-center overflow-y-auto gap-10 py-2 my-10 min-h-[150px]`}>
                        {loading ? Array(6).fill(0).map((elem, index) => (<CategoryCardShimmer key={index} />)) : (
                            <>
                                {categories.map((category, i) => (
                                    <div key={category.id} className={`${selectedCategory == category.id ? "bg-white border-[4px] border-[#F87192] translate-z-10" : "border-[4px] border-transparent"}  flex-shrink-0 flex flex-col cursor-pointer justify-between items-center bg-[#fdfdfd] rounded-2xl pb-2 px-2 duration-100 transi `} onClick={() => handleCategory(category)}>
                                        <img className="max-w-[80px]" src={category?.category_image} alt="" />
                                        <h2 className={`${selectedCategory == category.id ? "text-[#313043]" : "text-[#313043]"} capitalize font-bold `}>{category?.category_name}</h2>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className='py-4 px-10 flex justify-between'>
                        <h2 className={`${lilita.className} text-[30px] text-[#313043] capitalize`}>{categoryName}</h2>
                        <img className='me-10 w-[35px] h-[35px] cursor-pointer' src="./Assets/filter.png" alt="" />
                    </div>
                    <div className='flex justify-center w-full'>

                        <Products category={selectedCategory} />
                    </div>

                </div>
                <div className="right w-[25%] max-h-[88vh] bg-white rounded-xl">
                    <Sidebar />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;
