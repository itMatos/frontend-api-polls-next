'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import * as ApiPolls from './../../app/services/SurveyProPollsApi';
import { User_Data } from './../';

const LoginPage = () => {
    const { userName, setUserName } = useContext(User_Data);
    const { userEmail, setUserEmail } = useContext(User_Data);
    const { userId, setUserId } = useContext(User_Data);
    const { isLoggedIn, setIsLoggedIn } = useContext(User_Data);

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
                    // setUserEmail(res?.data?.email);
                    // setUserName(res?.data?.name);
                    // setIsLoggedIn(true);
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
            } else {
                const newUser = await ApiPolls.createUser({
                    email: email,
                    name: userName,
                });
                if (newUser) {
                    const newUserInfo =
                        await ApiPolls.getUserInfoByEmail(email);
                    setUserId(newUserInfo.user_id);
                    router.push('/home');
                }
            }
        }
    };

    // useEffect(() => {
    //     if (isLoggedIn && userEmail) {
    //         ApiPolls.getUserInfoByEmail(userEmail).then((userExists) => {
    //             console.log('User exists:', userExists);
    //             if (userExists.user_id) {
    //                 setUserId(userExists.user_id);
    //                 setUserName(userExists.name);
    //                 setUserEmail(userExists.email);
    //                 setIsLoggedIn(true);
    //                 router.push('/home');
    //             }
    //         });
    //         // .catch(async (error) => {
    //         //     if (error.response.status === 404) {
    //         //         ApiPolls.createUser({
    //         //             email: userEmail,
    //         //             name: userName,
    //         //         })
    //         //             .then(async (newUser) => {
    //         //                 if (newUser) {
    //         //                     const newUserInfo =
    //         //                         await ApiPolls.getUserInfoByEmail(
    //         //                             userEmail,
    //         //                         );
    //         //                     setUserId(newUserInfo.user_id);
    //         //                 }
    //         //                 router.push('/home');
    //         //             })
    //         //             .catch((error) => {
    //         //                 console.log(
    //         //                     'Erro ao cadastrar novo usuário',
    //         //                     error,
    //         //                 );
    //         //             });
    //         //     }
    //         // });
    //     }
    // }, [isLoggedIn, userEmail, router, setUserId, userName, setUserName]);

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
                    <Typography variant="h5">
                        Welcome to SurveyPro Polls
                    </Typography>
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
};

export default LoginPage;
