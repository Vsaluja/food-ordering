'use client'
import HomePage from '@/components/HomePage'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const UserDashboard = ({ children }) => {

    const { user } = useSelector((state) => state.user)
    const router = useRouter();



    useEffect(() => {
        console.log("ID", user?.user?.id);
    }, [user])


    return user?.user?.id ? children : router.push("/")
}

export default UserDashboard
