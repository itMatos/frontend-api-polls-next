/* eslint-disable no-undef */
'use client';
import React from 'react';
import LoginPage from './LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from '../../context/UserContext';

export default function Login() {
    return (
        <UserProvider>
            {/* <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            > */}
            <LoginPage />
            {/* </GoogleOAuthProvider> */}
        </UserProvider>
    );
}
