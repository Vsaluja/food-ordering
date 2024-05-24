import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import { lilita } from '@/fonts/fonts'
import Link from 'next/link'
import React from 'react'

const Register = () => {

    return (
        <Container className={`flex flex-col flex-1 bg-white m-10 px-10 rounded-xl`}>
            <Navbar />
            <div className='flex flex-1 my-10 lg:my-4'>
                <form className=' flex flex-col gap-6 bg-[#E7F0FD] max-h-[550px] w-[400px] mx-auto py-4 px-6 rounded'>
                    <h2 className={`${lilita.className} font-bold text-[40px] font-sans mb-2 text-[#313043]`}>Sign Up</h2>
                    <input className='border-2 p-2 rounded w-full' type="text" placeholder='First name' />
                    <input className='border-2 p-2 rounded w-full' type="text" placeholder='Last name' />
                    <input className='border-2 p-2 rounded w-full' type="email" placeholder='Email' />
                    <input className='border-2 p-2 rounded w-full' type="password" placeholder='Password' />
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
