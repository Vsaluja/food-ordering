import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";


const Navbar = () => {
    return (
        <div>
            <div className='flex items-center justify-between gap-8'>
                <img className='w-24' src="/Logo.png" alt="" />

                <div className='flex items-center border-[1px] w-[60%] rounded-lg  gap-4 px-[5px]' >
                    <input className=' w-full rounded-lg   py-[3px]' type="text" placeholder='Search for your favorite food' />
                    <div className='p-[12px] bg-[#F6F6F6] rounded-2xl'>
                        <FaSearch />
                    </div>

                </div>

                <div className='p-[12px] bg-[#333042] rounded-2xl'>
                    <MdOutlineShoppingCart className='text-[20px] text-gray-200' />
                </div>


            </div>
        </div>
    )
}

export default Navbar
