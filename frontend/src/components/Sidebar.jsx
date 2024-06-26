'use client';
import { lilita } from '@/fonts/fonts';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillHome } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Cookies from 'js-cookie';
import { setCart, setUser } from '@/app/store/users';
import toast from 'react-hot-toast';
import LoginShimmer from './shimmers/LoginShimmer';
import { setInitialLoad } from '@/app/store/Category';
import { MdAddAPhoto } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";

import EditProfilePic from './EditProfilePic';



const Sidebar = () => {
    const { user } = useSelector((state) => state.user)
    const { initialLoad } = useSelector((state) => state.categories);

    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch();
    const handleLogout = () => {
        Cookies.set("access", "")
        Cookies.set("refresh", "")
        dispatch(setUser(""))
        dispatch(setCart([]))
        let load = toast.loading("Working on it")
        setTimeout(() => {
            toast.dismiss(load)
            toast.success("Logged out successfully!")
        }, [1000])

    }

    const editProfilePic = async () => {

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


    }, [user.user, user?.user?.image])


    return (
        <div className='px-6 py-10'>
            {loading ? <LoginShimmer /> : (

                <>

                    {user ? (
                        <div className='flex flex-col justify-center items-center gap-6'>
                            <div className='relative'>
                                <img className='w-[160px] h-[160px] rounded-full border-[4px] border-[#313043]' src={user?.user?.image} alt="" />
                                <div className='flex gap-2 cursor-pointer' onClick={() => setEdit((prev) => !prev)}>
                                    <MdAddAPhoto className=' bottom-2 right-4 text-gray-600 text-[20px]' />
                                    <div className='font-semibold text-[#313043]'>Edit profile picture</div>
                                </div>

                            </div>
                            <div>
                                <h2 className='font-bold capitalize text-[#313043] text-[18px] text-center'>Welcome Back, {user.user.first_name}</h2>
                            </div>

                            <div className='flex items-center justify-center gap-2 bg-[#313043] px-4 py-3  font-bold rounded text-white cursor-pointer w-full max-w-[150px]'>
                                <AiFillHome />
                                <Link className='' href={`/`}>
                                    Home</Link>
                            </div>

                            <div className='flex items-center justify-center gap-2 bg-[#313043] px-4 py-3 font-bold rounded text-white cursor-pointer w-full max-w-[150px]'>
                                {/* <IoMdSettings className='' /> */}
                                <AiFillProduct />

                                <Link className='' href={`/user/orders`}>
                                    My Orders</Link>
                            </div>
                            <div className='flex items-center justify-center gap-2 bg-[#313043] px-4 py-3 font-bold rounded text-white cursor-pointer w-full max-w-[150px]' onClick={handleLogout}>
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

            {edit && (
                <div className='absolute top-0 right-0'>
                    <EditProfilePic setEdit={setEdit} />
                </div>
            )}

        </div>
    )
}

export default Sidebar
