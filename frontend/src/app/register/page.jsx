'use client'
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import { lilita } from '@/fonts/fonts'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Register = () => {

    const [email, setEmail] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            if (!first_name | first_name == "") {
                toast.error("Please enter first name")
                return
            }
            else if (!last_name | last_name == "") {
                toast.error("Please enter last name")
                return
            }
            else if (!email | email == "") {
                toast.error("Please enter valid email")
                return
            }
            else if (!password | password == "") {
                toast.error("Please enter valid password")
                return
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register/`, { email, password, first_name, last_name })
            console.log(response);
            if (response?.status === 201) {
                toast.success("Registration successful")
                let load = toast("Redirecting")
                setTimeout(() => {
                    toast.dismiss(load)
                    router.push('/login')
                }, 1000);
            }


        } catch (error) {
            console.log("Error", error);
        }


    }


    return (
        <Container className={``}>
            <div className='flex flex-col flex-1 min-h-[88vh] bg-white my-10 m-2 sm:m-10 px-4 sm:px-10 rounded-xl'>

                <Navbar />
                <div className='flex my-10 lg:my-4'>
                    <form onSubmit={(e) => handleRegister(e)} className=' flex flex-col gap-6 bg-[#E7F0FD] max-h-[550px] w-full max-w-[400px]  mx-auto py-4 px-6 rounded'>
                        <h2 className={`${lilita.className} font-bold text-[40px] font-sans mb-2 text-[#313043]`}>Sign Up</h2>
                        <input className='border-2 p-2 rounded w-full' type="text" placeholder='First name' onChange={(e) => setFirstName(e.target.value)} />
                        <input className='border-2 p-2 rounded w-full' type="text" placeholder='Last name' onChange={(e) => setLastName(e.target.value)} />
                        <input className='border-2 p-2 rounded w-full' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input className='border-2 p-2 rounded w-full' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <button className='self-start ms-4 py-2 px-6 bg-[#313043] rounded font-bold text-white' type="submit">Register</button>
                        <div className='ms-4 flex flex-col text-center sm:flex-row gap-2 text-[#313043] font-bold'>
                            Already a user ?
                            <Link className='text-[#F77193]' href={`/login`} >Sign in here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default Register
