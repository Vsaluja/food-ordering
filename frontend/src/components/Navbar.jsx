"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setCart, setUser } from "@/app/store/users";
import { usePathname } from 'next/navigation'


const Navbar = () => {
  const [width, setWidth] = useState()
  const { user, cart } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false)
  const dispatch = useDispatch();
  const pathname = usePathname()
  const handleLogout = () => {
    toast.success("Logged out successfully!")
    Cookies.set("access", "")
    Cookies.set("refresh", "")
    dispatch(setUser(""))
    dispatch(setCart([]))
    let load = toast.loading("Working on it")
    setTimeout(() => {
      toast.dismiss(load)
    }, [1000])
    setDropdown(false)
    console.log("WORKED");

  }

  useEffect(() => {
    const size = window.innerWidth;
    setWidth(size)
  }, [user?.user?.image])

  return (
    <div className="border-b-2 px-4 py-2">
      <div className="flex items-center justify-between gap-8">
        <Link href={`/`}>
          <img
            className="w-[50x] h-[50px] sm:w-[100px] sm:h-[80px] "
            src="/Logo.png"
            alt=""
          />
        </Link>

        <div className="flex gap-2 sm:gap-6">
          <div className="bg-[#F6F6F6] rounded-2xl self-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex justify-center items-center cursor-pointer">
            <FaSearch className="text-[20px]" />
          </div>

          <Link href={'/cart'} className="self-center w-[40px] h-[40px] sm:h-[50px] sm:w-[50px]  bg-[#333042] rounded-2xl flex justify-center items-center cursor-pointer relative">
            <MdOutlineShoppingCart className="text-[20px] text-gray-200" />
            <div className="absolute top-[-5px] right-[-5px] bg-[#FE1861] rounded-full text-[12px] sm:text-[15px] px-[7px] text-center align-middle text-white font-semibold">{cart && cart.length}</div>
          </Link>

          <div className={`flex ${pathname == "/" && width > 768 ? "hidden" : "block"} rounded-2xl justify-center items-center cursor-pointer relative`}>
            {user ? (
              <div onClick={() => setDropdown((prev) => !prev)}>
                <img className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full border-[3px] border-[#313043]" src={`${user?.user?.image}`} alt="" />
              </div>
            ) : (

              <Link href={`/login`} className="p-[5px] px-4 font-bold bg-transparent border-2 border-[#313043] text-[#313043] rounded hover:bg-[#313043] hover:text-white">
                Login
              </Link>
            )}
            {dropdown && (<div className="absolute top-[53px] md:top-[70px] right-[-18px] text-left bg-white w-[200px] border-2 border-t-0 border-r-0 duration-300 rounded">
              <div className="py-4 flex flex-col justify-center items-center gap-6 font-bold text-[#313043]">
                <Link
                  href="/"
                >
                  Home
                </Link>
                <Link
                  href="/user/orders"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
