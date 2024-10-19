'use client';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import LoginPage from './login/LoginPage';
import Login from './login';

export default function Page() {
    return (
        <>
            <GoogleOAuthProvider
                // eslint-disable-next-line no-undef
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            >
                <>
                    <Login />
                </>
            </GoogleOAuthProvider>
        </>
    );
}
