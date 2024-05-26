import React from 'react'

const LoginShimmer = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-6'>
            <div className=''>
                <img className='w-[160px] h-[160px] rounded-full border-[4px] bg-gray-200 animate-pulse' alt="" />
            </div>
            <div className='w-[130px] rounded h-[20px] bg-gray-200 animate-pulse'>
            </div>

            <div className='flex items-center justify-center gap-2 bg-gray-200 font-bold rounded text-white cursor-pointer w-[130px] h-[20px] animate-pulse'>

            </div>

        </div>
    )
}

export default LoginShimmer
