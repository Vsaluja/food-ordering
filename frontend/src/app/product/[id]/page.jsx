'use client'
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductDisplay = ({params}) => {

    const {id} = params
    const [product, setProduct] = useState([]);

    const fetchProduct = async () =>{

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rest/product/${id}/`)
        console.log("res", response);
        if(response.status == 200){
          setProduct(response.data)
        }
        
      } catch (error) {
          console.log("erorr while fetching product data");
      }
    }

    useEffect(()=>{
      fetchProduct()
    }, [])



  return (
    <Container className={`flex flex-col flex-1 bg-white m-10 px-10 rounded-xl`}>
            <Navbar />
            <div className='flex flex-col gap-4 items-center flex-1 my-10 lg:my-4'>
                Hi, {id}
            </div>
        </Container>
  )
}

export default ProductDisplay