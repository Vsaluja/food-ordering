'use client'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/app/store/products';
import { useEffect } from 'react';

const FetchOnLoad = () => {
    // This component is designed to only fetch the data when the application loads the first time it will fetch all the necessary data required and put it inside global states 

    const dispatch = useDispatch();

    const fetchCategories = async () => {
        const response = await axios.get('http://127.0.0.1:8000/rest/categories/')
        console.log("Res", response);
        let all = { category_name: "All", category_image: "https://i.postimg.cc/fyxMJL7T/Screenshot-290-removebg-preview.png" }
        response.data.unshift(all)
        dispatch(setProducts(response.data))
    }

    useEffect(() => {
        fetchCategories();
    }, [])
}

export default FetchOnLoad
