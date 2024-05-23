'use client'
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import MyGoogleLogin from "./MyGoogleLogin";

export default function Home() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();


    const res = await axios.post('http://127.0.0.1:8000/test/', { name, email, password })
    console.log("Response", res);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-60 gap-2 mx-auto m-10 text-black">
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <MyGoogleLogin />
    </div>
  );
}
