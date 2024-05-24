'use client'
import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { setUser } from '@/app/store/users';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const MyGoogleLogin = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const handleOAuthLogin = async (response) => {
        const credential = response.credential;

        // console.log("cred", credential);

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
            router.push('/')

        } catch (error) {
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
