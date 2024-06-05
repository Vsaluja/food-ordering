'use client'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { setUser } from '@/app/store/users';
import { setCategories, setProducts } from '@/app/store/Category';

const FetchOnLoad = () => {
    // This component is designed to only fetch the data when the application loads the first time it will fetch all the necessary data required and put it inside global states 
    const dispatch = useDispatch();

    const fetchUserDataAccess = async () => {
        console.log("ran user data access");
        const accessToken = Cookies.get('access');
        const refreshToken = Cookies.get('refresh');
        try {
            if (!accessToken || accessToken == "") {
                return
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/verify/`, { token: accessToken })


            if (response.status == 200) {
                const userId = response.data.decoded.user_id;
                const findUser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}/`)
                const authenticatedUser = { user: findUser.data, tokens: { access: accessToken, refresh: refreshToken } }
                dispatch(setUser(authenticatedUser))
            }
            else {
                verifyRefreshToken();
                console.log("Could not set user");
            }

        } catch (error) {
            verifyRefreshToken();
            console.log("Error while fetching user data");
        }
    }

    const verifyRefreshToken = async () => {

        const refreshToken = Cookies.get('refresh');
        console.log("ref", refreshToken);
        try {
            if (!refreshToken || refreshToken == "") {
                return
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/refresh/`, { refresh: refreshToken })

            if (response.status == 200) {
                console.log("res", response);
                Cookies.set('access', response.data.access);
                Cookies.set('refresh', response.data.refresh);
                fetchUserDataAccess();
            }



        } catch (error) {
            console.log("Error while verifying refresh token");
        }

    }


    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rest/categories/`)
            let all = { id: 0, category_name: "All", category_image: "https://i.postimg.cc/fyxMJL7T/Screenshot-290-removebg-preview.png" }
            response.data.unshift(all)
            dispatch(setCategories(response.data))

        } catch (error) {
            console.log("Could not fetch categories data");
        }
    }
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rest/products/`)
            dispatch(setProducts(response.data))

        } catch (error) {
            console.log("Could not fetch products data");
        }
    }



    useEffect(() => {
        fetchUserDataAccess();
        fetchCategories();
        fetchProducts();
    }, [])
}

export default FetchOnLoad
