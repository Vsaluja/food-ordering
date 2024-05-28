'use client'
import { addToCart } from '@/app/store/users';
import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import ProductDisplayShimmer from '@/components/shimmers/ProductDisplayShimmer';
import { lilita } from '@/fonts/fonts';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


const ProductDisplay = ({ params }) => {
  const { id } = params
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();



  const fetchProduct = async () => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rest/product/${id}/`)
      console.log("res", response);
      if (response.status == 200) {
        setProduct(response.data)
        setLoading(false)

      }

    } catch (error) {
      console.log("erorr while fetching product data");
    }
  }


  const add = () => {
    toast.success("Item added to cart")
    dispatch(addToCart({ productId: product?.id, quantity: 1 }))

  }

  useEffect(() => {
    fetchProduct()
  }, [])



  return (
    <Container className={``}>
      <div className='flex flex-col min-h-[88vh] bg-white my-10 m-2 md:m-10 px-4 md:px-10 rounded-xl'>
        <Navbar />
        {loading ? (
          <ProductDisplayShimmer />

        ) : (
          <div className='py-[70px] flex flex-col md:flex-row gap-[20px] lg:gap-[100px] xl:px-[100px] w-full'>
            <div className='left flex justify-center max-h-[400px] w-full max-w-[400px] mx-auto  bg-gray-100 rounded-lg p-[20px]'>
              <img className='w-[200px] h-[200px] text-center sm:w-[350px] sm:h-[350px]' src={product?.image} alt="" />
            </div>

            <div className='right w-full flex flex-col items-center gap-4 md:gap-10 justify-center'>
              <div className={`${lilita.className} capitalize font-bold tracking-wider text-[30px] sm:text-[40px] text-[#313043] self-start`}>{product?.name}</div>
              <div className='capitalize font-semibold text-[18px] text-[#313043] self-start'>{product?.description}</div>
              <p className='capitalize font-bold text-[25px] text-gray-500 self-start'>${product?.price}</p>
              <button className='bg-[#FD1860] text-[18px] py-2 px-4 rounded font-semibold text-white self-start' onClick={add}>Add to cart</button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default ProductDisplay