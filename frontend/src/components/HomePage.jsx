'use client';
import React, { useEffect, useState } from 'react';
import Container from './Container';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { lilita } from '@/fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import Products from './Products';
import CategoryCardShimmer from './shimmers/CategoryCardShimmer';
import { setInitialLoad } from '@/app/store/Category';

const HomePage = () => {
    const { categories, initialLoad } = useSelector((state) => state.categories);

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [categoryName, setCategoryName] = useState("All Items");


    useEffect(() => {

        if (initialLoad && categories.length > 1) {
            setTimeout(() => {
                setLoading(false);
                dispatch(setInitialLoad(false))
            }, 1000);
        }
        else {
            if (categories.length > 1) {
                setLoading(false)
            }
        }

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
                <div className="left flex w-[100%] md:w-[75%] flex-col bg-white rounded-xl min-h-[100vh] p-2 ">
                    <Navbar />
                    {/* <div className='flex justify-center mt-6'>
                        <img className='w-[100%] h-[300px]  rounded object-center' src="./Assets/ice.jpg" alt="" />
                    </div> */}
                    <div className={`flex items-start lg:justify-center overflow-y-auto gap-4 md:gap-10 py-2 my-10 min-h-[150px]`}>
                        {loading ? Array(6).fill(0).map((elem, index) => (<CategoryCardShimmer key={index} />)) : (
                            <>
                                {categories.map((category, i) => (
                                    <div key={category.id} className={`${selectedCategory == category.id ? "bg-white border-[4px] border-[#F87192] translate-z-10" : "border-[4px] border-transparent"}  flex-shrink-0 flex flex-col cursor-pointer justify-between h-[120px] items-center bg-[#efefef] rounded-2xl pb-2 px-2 duration-100`} onClick={() => handleCategory(category)}>
                                        <img className="max-w-[70px]" src={category?.category_image} alt="" />
                                        <h2 className={`${selectedCategory == category.id ? "text-[#313043]" : "text-[#313043]"} capitalize font-bold `}>{category?.category_name}</h2>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className='py-4 mx-4 sm:px-10 flex justify-between'>
                        <h2 className={`${lilita.className} text-[30px] text-[#313043] capitalize`}>{categoryName}</h2>
                        <img className='sm:me-10 w-[35px] h-[35px] cursor-pointer' src="./Assets/filter.png" alt="" />
                    </div>
                    <div className='flex justify-center w-full'>

                        <Products category={selectedCategory} />
                    </div>

                </div>
                <div className="right hidden md:block md:w-[25%] max-h-[100vh] bg-white rounded-xl">
                    <Sidebar />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;
