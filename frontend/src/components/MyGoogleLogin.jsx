'use client'
import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { setUser } from '@/app/store/users';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const MyGoogleLogin = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const toastId = "loginToast"
    const handleOAuthLogin = async (response) => {

        toast.loading("Signing you in...", { id: toastId });

        const credential = response.credential;

        try {
            const googleTokenVerification = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`)

            console.log("goog", googleTokenVerification);
            const email = googleTokenVerification.data.email;
            const first_name = googleTokenVerification.data.given_name;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/oauth/login/`, { email, first_name })

            console.log("res", response);
            const authenticatedUser = {
                user: response.data.user,
                tokens: response.data.tokens
            }
            dispatch(setUser(authenticatedUser))
            Cookies.set("access", response.data.tokens.access)
            Cookies.set("refresh", response.data.tokens.refresh)
            toast.dismiss(toastId)
            toast.success("Signed in successfully. Redirecting...")
            setTimeout(() => {
                router.push('/')
            }, 1000);

        } catch (error) {
            toast.dismiss(toastId)
            toast.error("Incorrect credentials, Try again!")
            console.log("Error while verifying information in OAuth");
        }


    }

    return (
        <div>
            <GoogleLogin
                onSuccess={(credentialResponse) => { handleOAuthLogin(credentialResponse) }}
                onError={() => {
                    console.log('Login Failed');
                }}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Sign in with Google
                    </button>
                )}

            />
            {/* <button onClick={() => googleLogout()}>Logout</button> */}
        </div>
    );
}

export default MyGoogleLogin
