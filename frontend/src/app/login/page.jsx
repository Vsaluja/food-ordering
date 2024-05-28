'use client';
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import { lilita } from '@/fonts/fonts'
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/users';
import MyGoogleLogin from '@/components/MyGoogleLogin';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const dispatch = useDispatch();


    const handleLogin = async (e) => {

        const toastId = "loginToast";
        try {
            e.preventDefault();


            // if (!toast.isActive(toastId)) {
            toast.loading("Signing you in...", { id: toastId });
            // }

            if (!email | email == "") {
                toast.dismiss(toastId);
                toast.error("Incorrect credentials")
                return
            }
            else if (!password | password == "") {
                toast.dismiss(toastId);
                toast.error("Incorrect credentials")
                return
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login/`, { email, password })
            console.log(response);
            const authenticatedUser = { user: response.data.user, tokens: response.data.tokens }
            if (response?.status === 200) {
                dispatch(setUser(authenticatedUser))
                Cookies.set("access", response.data.tokens.access)
                Cookies.set("refresh", response.data.tokens.refresh)
                toast.dismiss(toastId);
                toast.success("Signed in successfully. Redirecting...")
                setTimeout(() => {
                    router.push('/')
                }, 1000);

            }

        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Incorrect credentials, Try again!")
            console.log("Error", error);
        }


    }


    return (
        <Container className={``}>
            <div className='flex flex-col flex-1 bg-white my-10 m-2 sm:m-10 px-4 sm:px-10 rounded-xl'>

                <Navbar />
                <div className='flex flex-col gap-4 items-center flex-1 my-10 lg:my-4'>
                    <form onSubmit={(e) => handleLogin(e)} className=' flex flex-col gap-6 bg-[#E7F0FD] h-[400px]  w-full max-w-[400px] mx-auto py-4 px-2 sm:px-6 rounded'>
                        <h2 className={`${lilita.className} font-bold text-[40px] font-sans mb-2 text-[#313043]`}>Sign In</h2>
                        <input className='border-2 p-2 rounded w-full' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input className='border-2 p-2 rounded w-full' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <button className='self-start ms-4 py-2 px-6 bg-[#313043] rounded font-bold text-white  ' type="submit">Sign in</button>
                        <div className='flex flex-col text-center sm:flex-row gap-2 text-[#313043] font-bold'>
                            Don't have an account ?
                            <Link className='text-[#F77193]' href={`/register`} >Sign up here</Link>
                        </div>
                    </form>
                    <div className=' bg-[#313043 rounded font-bold'>
                        Or
                    </div>
                    <MyGoogleLogin />
                </div>
            </div>
        </Container>
    )
}

export default Login
