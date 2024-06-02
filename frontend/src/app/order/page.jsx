'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


const Order = ({ children }) => {

    const router = useRouter()
    const searchParams = useSearchParams();

    const success = searchParams.get('success');



    return success ? children : router.push('/');
}

export default Order