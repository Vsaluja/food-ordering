'use client'
import React from 'react'

const CategoryCardShimmer = () => {
    return (
        <div className={`border-[4px] border-transparent flex-shrink-0 flex flex-col cursor-pointer justify-between items-center bg-[#fdfdfd] rounded-2xl py-2 px-2 duration-100 animate-pulse bg-gray-100 w-[100px]`} >
            <div className="w-[80px] rounded h-[80px] bg-gray-300 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 animate-pulse mt-2"></div>
        </div>
    )
}

export default CategoryCardShimmer
