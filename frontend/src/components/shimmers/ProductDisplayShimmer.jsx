import React from 'react'

const ProductDisplayShimmer = () => {
    return (
        <div className='py-[70px] flex flex-col md:flex-row gap-[20px] lg:gap-[100px] xl:px-[100px] w-full'>
            <div className='left flex justify-center max-h-[400px] w-full max-w-[400px] mx-auto   rounded-lg p-[20px] animate-pulse'>
                <div className='w-[200px] h-[200px] text-center sm:w-[350px] sm:h-[350px] bg-gray-300 animate-pulse rounded outline-none border-0' alt="" />
            </div>

            <div className='right w-full flex flex-col items-center gap-4 md:gap-10 justify-center'>
                <div className={`self-start h-10 w-[500px] bg-gray-300 animate-pulse rounded`}></div>
                <div className='self-start h-4 w-[500px] bg-gray-300 animate-pulse rounded'></div>
                <div className='self-start h-4 w-[500px] bg-gray-300 animate-pulse rounded'></div>
                <div className='self-start h-4 w-[500px] bg-gray-300 animate-pulse rounded'></div>
                <p className='self-start h-6 w-16 bg-gray-300 animate-pulse rounded'></p>
                <button className='h-6 w-32 font-semibold self-start bg-gray-300 animate-pulse rounded'>{" "}</button>
            </div>
        </div>
    )
}

export default ProductDisplayShimmer
