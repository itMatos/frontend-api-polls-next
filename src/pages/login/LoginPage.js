'use client';
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import * as ApiPolls from './../../app/services/BeuniPollsApi';

export default function LoginPage() {
    const [user, setUser] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [payload, setPayload] = useState(null);
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
                    const info = {
                        email: res?.data?.email,
                        name: res?.data?.name,
                    };
                    setPayload(info);
                    setLoginSuccess(true);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    useEffect(() => {
        const handleUserLoginOrSignup = async () => {
            if (loginSuccess && payload.email) {
                const userExists = await ApiPolls.getUserInfoByEmail(
                    payload.email,
                );
                if (userExists) {
                    console.log('userExists', userExists);
                    router.push({
                        pathname: '/home',
                        query: {
                            userId: userExists.user_id,
                            email: userExists.email,
                            name: userExists.name,
                        },
                        as: '/home',
                    });
                } else {
                    try {
                        const newUser = await ApiPolls.createUser(payload);
                        if (newUser) {
                            const newUserInfo =
                                await ApiPolls.getUserInfoByEmail(
                                    payload.email,
                                );

                            router.push({
                                pathname: '/home',
                                query: {
                                    userId: newUserInfo.user_id,
                                    email: newUserInfo.email,
                                    name: newUserInfo.name,
                                },
                                as: '/home',
                            });
                        }
                    } catch (error) {
                        console.log('Erro ao cadastrar novo usuário', error);
                    }
                }
            }
        };

        handleUserLoginOrSignup();
    }, [loginSuccess, payload, router]);

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
                            onClick={login}
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
