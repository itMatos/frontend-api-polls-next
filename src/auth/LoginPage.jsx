'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import * as ApiPolls from '../app/services/BeuniPollsApi';
import { User_Data } from '../context/UserContext';

function LoginPage() {
    const { userName, setUserName } = useContext(User_Data);
    const { setUserEmail } = useContext(User_Data);
    const { setUserId } = useContext(User_Data);
    const { setIsLoggedIn } = useContext(User_Data);

    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json',
                        },
                    },
                )
                .then((res) => {
                    handleNavigation(res?.data?.email);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const handleNavigation = async (email) => {
        if (email) {
            const userExists = await ApiPolls.getUserInfoByEmail(email);
            if (userExists.user_id) {
                setUserId(userExists.user_id);
                setUserName(userExists.name);
                setUserEmail(userExists.email);
                setIsLoggedIn(true);
                router.push('/home');
                console.log('userExists', userExists);
            } else {
                const newUser = await ApiPolls.createUser({
                    email: email,
                    name: userName,
                });
                console.log('newUser', newUser);
                if (newUser) {
                    const newUserInfo =
                        await ApiPolls.getUserInfoByEmail(email);
                    setUserId(newUserInfo.user_id);
                }
                router.push('/home');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h5">Welcome to Beuni Polls</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            startIcon={<GoogleIcon />}
                            onClick={() => login()}
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;
