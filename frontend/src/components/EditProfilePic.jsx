'use client'
import { setUser } from '@/app/store/users';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import FetchOnLoad from './FetchOnLoad';

const EditProfilePic = ({ setEdit }) => {


    const [url, setUrl] = useState("");
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        try {

            e.preventDefault();
            if (url == "") {
                return toast.error("Please enter a valid URL")
            }
            let load = toast.loading("Updating profile picture...")
            let data = { ...user.user };
            data.image = url;
            console.log("data", data);
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/pic/${user?.user?.id}/`, data)

            console.log("edit res", response);

            if (response.status == 200) {
                setTimeout(() => {
                    toast.dismiss(load)
                    toast.success("Profile picture has been updated")
                    dispatch(setUser({ user: data, tokens: { access: "", refresh: "" } }))
                    setEdit(false)
                    setUrl("")
                }, 3000);
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Something went wrong");
        }
    }

    return (
        <div className='backdrop-blur-[2px] h-[100vh] w-[100vw] flex justify-center items-center duration-500'>
            <form onSubmit={(e) => handleSubmit(e)} className='h-[200px] w-full max-w-[500px] bg-[#313043] rounded-lg flex justify-center items-center gap-2 p-4 relative'>
                <input className='rounded flex-1 p-[5px] outline-none placeholder:font-semibold' type="url" placeholder='Enter image URL' onChange={(e) => setUrl(e.target.value)} />
                <button type="submit" className='p-[5px] font-semibold bg-blue-500 rounded text-white'>Update</button>
                <ImCross className='text-red-400 absolute top-2 right-2 cursor-pointer' onClick={() => setEdit(false)} />
            </form>
        </div>
    )
}

export default EditProfilePic
