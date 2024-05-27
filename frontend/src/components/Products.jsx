'use client';
import { lilita } from '@/fonts/fonts';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import ProductCardShimmer from './shimmers/ProductCardShimmer';
import { setInitialLoad } from '@/app/store/Category';
import { addToCart } from '@/app/store/users';

const Products = ({ category }) => {
    const router = useRouter();

    const dispatch = useDispatch()

    const { products, initialLoad } = useSelector((state) => state.categories);

    const { cart, user } = useSelector((state) => state.user);


    const [filterProducts, setFilterProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const filterProductsByCategory = () => {
        let filtered = products;

        if (category !== 0) {
            filtered = products?.filter((product) => product.category === category);
        }


        if (initialLoad && products.length > 1) {
            setTimeout(() => {
                setLoading(false);
                dispatch(setInitialLoad(false))
            }, 1000);
        }
        else {
            if (products.length > 1) {
                setLoading(false)
            }
        }
        setFilterProducts(filtered);
    };

    const handleAdd = (e, id) => {
        e.stopPropagation();
        dispatch(addToCart({ productId: id, quantity: 1 }))
    }


    useEffect(() => {
        filterProductsByCategory();

    }, [category, products]);

    return (
        <div className='my-10 flex flex-wrap gap-2 sm:gap-6 items-center justify-center'>
            {
                loading ? (Array(8).fill(0).map((elem, index) => (<ProductCardShimmer key={index} />))) : (

                    filterProducts && filterProducts.map((product) => (
                        <div key={product.id} className='product bg-[#F4F5F7] w-[170px] sm:w-[200px] h-[270px] flex flex-col justify-evenly py-2 px-2 rounded-2xl gap-2 my-6 cursor-pointer duration-300  border-2 border-transparent hover:shadow-lg shadow-[#313043]' onClick={() => router.push(`/product/${product.id}`)}>

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
                                <div className='bg-[#313043] hover:bg-[#484662] duration-300 p-[10px] rounded-full cursor-pointer' onClick={(e) => handleAdd(e, product.id)}>
                                    <FaPlus className='text-white text-[13px]' />
                                </div>
                            </div>

                        </div>
                    ))
                )
            }
        </div>
    );
};

export default Products;
