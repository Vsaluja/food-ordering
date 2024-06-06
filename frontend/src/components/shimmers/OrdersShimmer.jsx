import React from 'react'

const OrdersShimmer = () => {
    return (
        <div className='py-[20px] mb-[20px] flex flex-col gap-[30px] xl:px-[50px] w-full bg-gray-100 animate-pulse'>
            <div className='flex justify-between'>
                <p className='self-start h-6 w-[100px] md:w-[150px] bg-gray-300 animate-pulse rounded'></p>
                <p className='self-start h-6 w-[100px] md:w-[150px] bg-gray-300 animate-pulse rounded'></p>
            </div>
            <div className='right w-full flex items-center gap-4 md:gap-10 justify-center'>
                {Array(4).fill(0).map((elem, index) => {
                    return <div className={`self-start h-16 w-[200px] bg-gray-300 animate-pulse rounded`}></div>
                })}
            </div>
            <p className='self-end h-6 w-[100px] bg-gray-300 animate-pulse rounded'></p>
        </div>

    )
}

export default OrdersShimmer
