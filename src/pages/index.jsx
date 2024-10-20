/* eslint-disable no-undef */
'use client';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from '../auth/LoginPage';

function App() {
    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
            <LoginPage />
        </GoogleOAuthProvider>
    );
}

export default App;
