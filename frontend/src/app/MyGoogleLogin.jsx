'use client'
import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google';

const MyGoogleLogin = () => {


    return (
        <div>
            <h1>Login</h1>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Sign in with Google
                    </button>
                )}

            />
            <button onClick={() => googleLogout()}>Logout</button>
        </div>
    );
}

export default MyGoogleLogin
