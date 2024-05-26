import React from 'react'

const ProductCardShimmer = () => {
    return (

        <div className=' bg-[#F4F5F7] w-[200px] h-[270px] flex flex-col justify-evenly py-2 px-2 rounded-2xl gap-2 my-6 cursor-pointer border-2 border-transparent'>
            < div className='flex justify-center' >
                <div className='w-[100px] h-[100px] bg-gray-300 animate-pulse rounded-md'></div>
            </div >
            <div className='h-[17px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='h-[34px] bg-gray-300 animate-pulse rounded-md'></div>
            <div className='flex justify-between items-center py-2 px-4'>
                <div className='h-[20px] w-[60px] bg-gray-300 animate-pulse rounded-md'></div>
                <div className='h-[20px] w-[20px] bg-gray-300 animate-pulse rounded-full'></div>
            </div>
        </div >


    )
}

export default ProductCardShimmer
