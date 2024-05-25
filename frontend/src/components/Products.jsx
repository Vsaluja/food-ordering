'use client';
import { lilita } from '@/fonts/fonts';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const Products = ({ category }) => {
    
    const router = useRouter();
    const { products } = useSelector((state) => state.categories);
    const [filterProducts, setFilterProducts] = useState([]);
    const filterProductsByCategory = () => {
        if (category === 0) {
            setFilterProducts(products);
            return
        }
        const filter = products?.filter((product) => product.category === category);

        setFilterProducts(filter)
    }



    useEffect(() => {
        filterProductsByCategory();
        console.log("Hi", category);
    }, [category, products])



    return (
        <div className='my-10 px-2 flex flex-wrap gap-6 items-center justify-center'>
            {
                filterProducts && filterProducts.map((product) => {
                    return (
                        <div key={product.id} className='product bg-[#F4F5F7] w-[200px] h-[270px] flex flex-col  justify-evenly  py-2 px-2 rounded-2xl gap-2 my-6 cursor-pointer duration-300 hover:translate-y-[-20px] border-2 border-transparent hover:border-2 hover:border-[#F87192]' onClick={()=> router.push(`/product/${product.id}`)}>
                            <div className='flex justify-center'>
                                <img className='w-[100px] h-[100px]' src={product.image} alt="" />
                            </div>
                            <h2 className={`${lilita.className} text-[#313043] text-[17px] tracking-widest capitalize font-bold text-center`}>{product.name}</h2>
                            <p className='description capitalize text-[#313043] text-center' style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>{product.description}</p>
                            <div className='flex justify-between items-center py-2 px-4'>
                                <h2 className='text-[#313043] font-bold text-[20px]'>${product.price}</h2>
                                <div className='bg-[#313043] p-[10px] rounded-full cursor-pointer'>
                                    <FaPlus className='text-white text-[13px]' />
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Products
