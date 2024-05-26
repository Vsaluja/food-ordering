'use client';
import { lilita } from '@/fonts/fonts';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillHome } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Cookies from 'js-cookie';
import { setUser } from '@/app/store/users';
import toast from 'react-hot-toast';
import LoginShimmer from './shimmers/LoginShimmer';
import { setInitialLoad } from '@/app/store/Category';


const Sidebar = () => {
    const { user } = useSelector((state) => state.user)
    const { initialLoad } = useSelector((state) => state.categories);

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const handleLogout = () => {
        Cookies.set("access", "")
        Cookies.set("refresh", "")
        dispatch(setUser(""))
        toast.success("Logged out successfully!")

    }

    useEffect(() => {

        if (initialLoad) {
            setTimeout(() => {
                setLoading(false);
                dispatch(setInitialLoad(false))
            }, 1000);
        }
        else {
            setLoading(false)
        }


    }, [user.user])

    return (
        <div className='px-6 py-10'>
            {loading ? <LoginShimmer /> : (

                <>

                    {user ? (
                        <div className='flex flex-col justify-center items-center gap-6'>
                            <div className=''>
                                <img className='w-[160px] h-[160px] rounded-full border-[4px] border-[#313043]' src={user.user.image} alt="" />
                            </div>
                            <div>
                                <h2 className='font-bold capitalize text-[#313043] text-[18px] text-center'>Welcome Back, {user.user.first_name}</h2>
                            </div>

                            <div className='flex items-center justify-center gap-2 bg-[#313043] px-4 py-3  font-bold rounded text-white cursor-pointer w-full max-w-[130px]'>
                                <AiFillHome />
                                <Link className='' href={`/`}>
                                    Home</Link>
                            </div>

                            <div className='flex items-center justify-center gap-2 bg-[#313043] px-4 py-3 font-bold rounded text-white cursor-pointer w-full max-w-[130px]'>
                                <IoMdSettings className='' />

                                <Link className='' href={`/`}>
                                    Settings</Link>
                            </div>
                            <div className='flex items-center justify-center gap-2 bg-[#313043] px-4 py-3 font-bold rounded text-white cursor-pointer w-full max-w-[130px]' onClick={handleLogout}>
                                <IoLogOut />
                                <Link className='' href={`/`}>
                                    Logout</Link>
                            </div>

                        </div>
                    ) : (
                        <div className='flex flex-col justify-center items-center'>
                            <div className='w-[180px] h-[180px]'>
                                <img src="./Assets/DefaultImage.png" alt="" />
                            </div>
                            <Link className={`${lilita.className} px-4 py-2 bg-[#313043] text-white rounded tracking-wider`} href={`/login`}>Login Now</Link>

                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Sidebar
