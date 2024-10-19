import React from 'react';
import LoginPage from './LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Login() {
    return (
        <GoogleOAuthProvider
            // eslint-disable-next-line no-undef
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
            <LoginPage />
        </GoogleOAuthProvider>
    );
}
