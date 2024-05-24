'use client'
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import { lilita } from '@/fonts/fonts'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {

    const [email, setEmail] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            if (!email | email == "") {
                return
            }
            else if (!password | password == "") {
                return
            }
            else if (!first_name | first_name == "") {
                return
            }
            else if (!last_name | last_name == "") {
                return
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register/`, { email, password, first_name, last_name })
            console.log(response);
            if (response?.status === 201) {
                router.push('/login')
            }


        } catch (error) {
            console.log("Error", error);
        }


    }


    return (
        <Container className={`flex flex-col flex-1 bg-white m-10 px-10 rounded-xl`}>
            <Navbar />
            <div className='flex flex-1 my-10 lg:my-4'>
                <form onSubmit={(e) => handleRegister(e)} className=' flex flex-col gap-6 bg-[#E7F0FD] max-h-[550px] w-[400px] mx-auto py-4 px-6 rounded'>
                    <h2 className={`${lilita.className} font-bold text-[40px] font-sans mb-2 text-[#313043]`}>Sign Up</h2>
                    <input className='border-2 p-2 rounded w-full' type="text" placeholder='First name' onChange={(e) => setFirstName(e.target.value)} />
                    <input className='border-2 p-2 rounded w-full' type="text" placeholder='Last name' onChange={(e) => setLastName(e.target.value)} />
                    <input className='border-2 p-2 rounded w-full' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input className='border-2 p-2 rounded w-full' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    <button className='self-start ms-4 py-2 px-6 bg-[#313043] rounded font-bold text-white' type="submit">Register</button>
                    <div className='ms-4 flex gap-2 text-[#313043] font-bold'>
                        Already a user ?
                        <Link className='text-[#F77193]' href={`/login`} >Sign in here</Link>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Register
